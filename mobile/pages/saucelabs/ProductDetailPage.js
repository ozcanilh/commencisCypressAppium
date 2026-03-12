const SauceLabsBasePage = require('./SauceLabsBasePage');

class ProductDetailPage extends SauceLabsBasePage {
  constructor(driver) {
    super(driver);
    this.locators = {
      addToCartButton: this.id('cartBt'),
    };
  }

  async isProductDetailVisible(timeout = 10000) {
    try {
      const el = await this.driver.$(this.locators.addToCartButton);
      await el.waitForExist({ timeout });
      return true;
    } catch {
      return false;
    }
  }
}

module.exports = ProductDetailPage;
