const path = require('path');

exports.config = {
  runner: 'local',

  // ─── Appium ───────────────────────────────────────────────────────────────
  hostname: process.env.APPIUM_HOST || '127.0.0.1',
  port: parseInt(process.env.APPIUM_PORT || '4723', 10),

  // ─── Capabilities ────────────────────────────────────────────────────────
  capabilities: [
    {
      platformName: 'Android',
      'appium:deviceName': process.env.DEVICE_NAME || 'Android Emulator',
      'appium:platformVersion': process.env.PLATFORM_VERSION || '15',
      'appium:automationName': 'UiAutomator2',
      'appium:appPackage': process.env.APP_PACKAGE || 'com.pozitron.hepsiburada',
      'appium:appActivity': process.env.APP_ACTIVITY || 'com.hepsiburada.ui.startup.SplashActivity',
      'appium:autoGrantPermissions': true,
      'appium:noReset': false,
      'appium:newCommandTimeout': 300,
    },
  ],

  // ─── Test Framework ───────────────────────────────────────────────────────
  framework: 'mocha',
  mochaOpts: {
    ui: 'bdd',
    timeout: 120000,
  },

  // ─── Test Files ───────────────────────────────────────────────────────────
  specs: [path.resolve(__dirname, '../tests/**/*.test.js')],

  // ─── Reporters ────────────────────────────────────────────────────────────
  reporters: [
    'spec',
    [
      'mochawesome',
      {
        outputDir: path.resolve(__dirname, '../../mobile/reports'),
        outputFileJson: 'mochawesome.json',
        outputFileHtml: 'mochawesome.html',
        reportTitle: 'Commencis Mobile Test Report',
        inline: true,
        charts: true,
      },
    ],
  ],

  // ─── Timeouts ─────────────────────────────────────────────────────────────
  connectionRetryTimeout: 120000,
  connectionRetryCount: 3,
  waitforTimeout: 15000,
  waitforInterval: 500,

  // ─── Hooks ────────────────────────────────────────────────────────────────
  afterTest: async function (test, context, { error, passed }) {
    if (!passed) {
      await browser.takeScreenshot();
    }
  },

  onComplete: function (exitCode, config, capabilities, results) {
    const SlackNotifier = require('../utils/SlackNotifier');
    const total = results.passed + results.failed + results.skipped;
    SlackNotifier.send(total, results.passed, results.failed, results.skipped, 0);
  },
};
