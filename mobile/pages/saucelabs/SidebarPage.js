const SauceLabsBasePage = require('./SauceLabsBasePage');

class SidebarPage extends SauceLabsBasePage {
  constructor(driver) {
    super(driver);
    this.locators = {
      menuButton: this.id('menuIV'),
      menuList: this.id('menuRV'),
    };
  }

  async openSidebar() {
    await this.click(this.locators.menuButton);
    await this.waitForVisible(this.locators.menuList);
  }

  async isSidebarVisible() {
    return this.isDisplayed(this.locators.menuList);
  }

  async selectMenuItem(text) {
    const item = await this.driver.$(`android=new UiSelector().text("${text}")`);
    await item.waitForDisplayed({ timeout: 5000 });
    await item.click();
  }

  async selectWebView() {
    await this.selectMenuItem('WebView');
  }

  async selectDrawing() {
    await this.selectMenuItem('Drawing');
  }
}

module.exports = SidebarPage;
