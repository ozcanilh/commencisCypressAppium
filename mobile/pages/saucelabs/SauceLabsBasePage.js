const MobileBasePage = require('../MobileBasePage');

const APP_ID = 'com.saucelabs.mydemoapp.android:id/';

class SauceLabsBasePage extends MobileBasePage {
  id(name) {
    return `id:${APP_ID}${name}`;
  }
}

module.exports = SauceLabsBasePage;
