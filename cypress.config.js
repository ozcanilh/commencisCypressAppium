const { defineConfig } = require('cypress');
const { beforeRunHook, afterRunHook } = require('cypress-mochawesome-reporter/lib');
const SlackNotifier = require('./cypress/utils/SlackNotifier');

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    reportDir: 'cypress/reports/mocha',
    charts: true,
    reportPageTitle: 'Commencis Web Test Report',
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false,
    overwrite: false,
    html: true,
    json: true,
  },
  e2e: {
    baseUrl: 'https://techcrunch.com',
    specPattern: 'cypress/e2e/tests/**/*.cy.js',
    screenshotsFolder: 'cypress/reports/screenshots',
    videosFolder: 'cypress/reports/videos',
    video: false,
    screenshotOnRunFailure: true,
    defaultCommandTimeout: 15000,
    pageLoadTimeout: 30000,
    viewportWidth: 1280,
    viewportHeight: 800,
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);

      on('before:run', async (details) => {
        await beforeRunHook(details);
      });

      on('after:run', async (results) => {
        await SlackNotifier.send(results);
        await afterRunHook();
      });

      on('before:browser:launch', (browser = {}, launchOptions) => {
        if (browser.family === 'chromium') {
          launchOptions.args.push('--disable-dev-shm-usage'); // Avoid /dev/shm memory issues in CI containers
          launchOptions.args.push('--no-sandbox'); // Required for many Linux CI environments
          launchOptions.args.push('--disable-gpu'); // Prevent GPU-related instability in headless runs
          launchOptions.args.push('--disable-extensions'); // Keep browser session clean and deterministic
          launchOptions.args.push('--disable-background-timer-throttling'); // Prevent timer slowdowns in background tabs
          launchOptions.args.push('--disable-renderer-backgrounding'); // Keep renderer active during test execution
          launchOptions.args.push('--disable-backgrounding-occluded-windows'); // Avoid throttling when window is not visible
          launchOptions.args.push('--disable-ipc-flooding-protection'); // Reduce IPC throttling that can affect automation
        }
        return launchOptions;
      });

      return config;
    },
  },
});
