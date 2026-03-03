const MobileBasePage = require('../MobileBasePage');

const APP_ID = 'com.pozitron.hepsiburada:id/';

class SearchResultsPage extends MobileBasePage {
  constructor(driver) {
    super(driver);
    this.locators = {
      addToCartCandidates: [`~Sepete ekle`, `//*[@text='Sepete ekle']`, `//*[@text='Sepete Ekle']`],
      variantSheetAddToCartCandidates: [
        `id:${APP_ID}button`,
        `//*[@text='Sepete ekle']`,
        `//*[@text='Sepete Ekle']`,
      ],
      cartTabCandidates: [
        `-android uiautomator:new UiSelector().className("android.widget.FrameLayout").descriptionContains("Sepetim")`,
        `//*[@text='Sepetim']`,
        `~Sepetim`,
      ],
    };
  }

  async addFirstProductToCartAndGoToCart() {
    const CartPage = require('./CartPage');
    await this.clickFirstVisible(this.locators.addToCartCandidates, 8000);
    try {
      await this.clickFirstVisible(this.locators.variantSheetAddToCartCandidates, 3000);
    } catch {
      // Variant popup may not appear
    }
    await this.clickFirstVisible(this.locators.cartTabCandidates, 8000);
    return new CartPage(this.driver);
  }
}

module.exports = SearchResultsPage;
