const http = require('http');
const fs = require('fs');
const path = require('path');
const { execSync, spawn } = require('child_process');

const APPIUM_HOST = process.env.APPIUM_HOST || '127.0.0.1';
const APPIUM_PORT = process.env.APPIUM_PORT || '4723';
const APP_PACKAGE = process.env.APP_PACKAGE || 'com.pozitron.hepsiburada';
const APP_PATH = process.env.APP_PATH || path.resolve(process.cwd(), 'apk/hepsiburada.apk');

function runCommand(command, options = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, {
      shell: true,
      stdio: 'inherit',
      ...options,
    });

    child.on('close', (code) => {
      if (code === 0) resolve();
      else reject(new Error(`Command failed (${code}): ${command}`));
    });
  });
}

function checkAdbDevices() {
  const output = execSync('adb devices', { encoding: 'utf8' });
  const lines = output
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);

  const connected = lines.filter((line) => /\tdevice$/.test(line));
  if (connected.length === 0) {
    throw new Error('No Android device/emulator connected. Start emulator and try again.');
  }

  console.log('Connected devices:', connected.join(', '));
}

function isPackageInstalled() {
  const output = execSync(`adb shell pm list packages ${APP_PACKAGE}`, { encoding: 'utf8' });
  return output.includes(APP_PACKAGE);
}

function ensureAppInstalled() {
  if (fs.existsSync(APP_PATH)) {
    console.log(`APK found: ${APP_PATH}`);
    execSync(`adb install -r "${APP_PATH}"`, { stdio: 'inherit' });
    return;
  }

  if (isPackageInstalled()) {
    console.log(
      `APK not found at ${APP_PATH}, but ${APP_PACKAGE} is already installed on device. Continuing...`
    );
    return;
  }

  throw new Error(
    `APK not found at ${APP_PATH} and ${APP_PACKAGE} is not installed on device. Set APP_PATH or install the app manually.`
  );
}

function isAppiumRunning() {
  return new Promise((resolve) => {
    const req = http.get(
      {
        host: APPIUM_HOST,
        port: APPIUM_PORT,
        path: '/status',
        timeout: 1000,
      },
      (res) => {
        resolve(res.statusCode >= 200 && res.statusCode < 500);
      }
    );

    req.on('error', () => resolve(false));
    req.on('timeout', () => {
      req.destroy();
      resolve(false);
    });
  });
}

function waitForAppiumReady(timeoutMs = 20000) {
  const start = Date.now();
  return new Promise((resolve, reject) => {
    const check = async () => {
      const up = await isAppiumRunning();
      if (up) return resolve();
      if (Date.now() - start > timeoutMs) {
        return reject(new Error('Appium did not become ready in time.'));
      }
      setTimeout(check, 500);
    };
    check();
  });
}

async function main() {
  let appiumProcess = null;
  let startedByScript = false;

  try {
    console.log('Step 1/4: Checking connected emulator/device...');
    checkAdbDevices();

    console.log('Step 2/4: Ensuring Hepsiburada app is installed...');
    ensureAppInstalled();

    console.log('Step 3/4: Ensuring Appium server is running...');
    const running = await isAppiumRunning();

    if (!running) {
      appiumProcess = spawn('npx', ['appium'], {
        stdio: 'inherit',
      });
      startedByScript = true;
      await waitForAppiumReady();
      console.log(`Appium started on http://${APPIUM_HOST}:${APPIUM_PORT}`);
    } else {
      console.log(`Appium already running on http://${APPIUM_HOST}:${APPIUM_PORT}`);
    }

    console.log('Step 4/4: Running mobile test suite...');
    await runCommand('npm run mobile:run:core');
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  } finally {
    if (startedByScript && appiumProcess && !appiumProcess.killed) {
      appiumProcess.kill('SIGTERM');
    }
  }
}

main();
