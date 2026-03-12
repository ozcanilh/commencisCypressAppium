const path = require('path');

exports.config = {
  runner: 'local',

  hostname: process.env.APPIUM_HOST || '127.0.0.1',
  port: parseInt(process.env.APPIUM_PORT || '4723', 10),

  capabilities: [
    {
      platformName: 'Android',
      'appium:deviceName': process.env.DEVICE_NAME || 'Android Emulator',
      'appium:platformVersion': process.env.PLATFORM_VERSION || '15',
      'appium:automationName': 'UiAutomator2',
      'appium:app': process.env.APP_PATH || path.resolve(__dirname, '../../apk/mda-androidTest-2.2.0-25.apk'),
      'appium:appPackage': 'com.saucelabs.mydemoapp.android',
      'appium:appActivity': '.view.activities.SplashActivity',
      'appium:autoGrantPermissions': true,
      'appium:noReset': false,
      'appium:newCommandTimeout': 300,
    },
  ],

  framework: 'mocha',
  mochaOpts: {
    ui: 'bdd',
    timeout: 120000,
  },

  specs: [path.resolve(__dirname, '../tests/saucelabs-demo.test.js')],

  reporters: [
    'spec',
    [
      'mochawesome',
      {
        outputDir: path.resolve(__dirname, '../../mobile/reports'),
        outputFileJson: 'saucelabs-mochawesome.json',
        outputFileHtml: 'saucelabs-mochawesome.html',
        reportTitle: 'SauceLabs Demo App Test Report',
        inline: true,
        charts: true,
      },
    ],
  ],

  connectionRetryTimeout: 120000,
  connectionRetryCount: 3,
  waitforTimeout: 15000,
  waitforInterval: 500,

  afterTest: async function (test, context, { passed }) {
    if (!passed) {
      await browser.takeScreenshot();
    }
  },
};
