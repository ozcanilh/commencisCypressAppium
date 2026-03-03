const MobileBasePage = require('../MobileBasePage');

class CartPage extends MobileBasePage {
  constructor(driver) {
    super(driver);
    this.locators = {
      productNameCandidates: [
        `id:com.pozitron.hepsiburada:id/productName`,
        `-android uiautomator:new UiSelector().resourceId("productName")`,
        `-android uiautomator:new UiSelector().resourceIdMatches(".*:id/productName")`,
      ],
    };
  }

  async isProductInCart() {
    for (const locator of this.locators.productNameCandidates) {
      if (await this.isDisplayed(locator)) {
        return true;
      }
    }
    return false;
  }
}

module.exports = CartPage;
