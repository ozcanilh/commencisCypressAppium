const SauceLabsBasePage = require('./SauceLabsBasePage');

class CatalogPage extends SauceLabsBasePage {
  constructor(driver) {
    super(driver);
    this.locators = {
      productsTitle: this.id('productTV'),
      sortButton: this.id('sortIV'),
      priceAscOption: this.id('priceAscCL'),
      itemImage: this.id('productIV'),
      itemTitle: this.id('titleTV'),
      itemPrice: this.id('priceTV'),
    };
  }

  async waitForCatalog(timeout = 15000) {
    await this.waitForVisible(this.locators.productsTitle, timeout);
  }

  async isCatalogVisible() {
    return this.isDisplayed(this.locators.productsTitle);
  }

  async tapSortButton() {
    await this.click(this.locators.sortButton);
  }

  async selectPriceAscending() {
    await this.click(this.locators.priceAscOption);
  }

  async getVisiblePrices(count = 4) {
    const elements = await this.driver.$$(this.locators.itemPrice);
    const prices = [];
    const limit = Math.min(count, elements.length);
    for (let i = 0; i < limit; i++) {
      const text = await elements[i].getText();
      prices.push(parseFloat(text.replace('$', '')));
    }
    return prices;
  }

  async tapProductByIndex(index) {
    const titles = await this.driver.$$(this.locators.itemTitle);
    const images = await this.driver.$$(this.locators.itemImage);
    if (index >= titles.length) {
      throw new Error(`Product index ${index} out of bounds (${titles.length} items)`);
    }
    const productName = await titles[index].getText();
    await images[index].click();
    return productName;
  }
}

module.exports = CatalogPage;
