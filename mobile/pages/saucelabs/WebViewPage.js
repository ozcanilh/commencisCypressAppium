const SauceLabsBasePage = require('./SauceLabsBasePage');

class WebViewPage extends SauceLabsBasePage {
  constructor(driver) {
    super(driver);
    this.locators = {
      title: this.id('webViewTV'),
      urlInput: this.id('urlET'),
      goButton: this.id('goBtn'),
      webView: this.id('webView'),
    };
  }

  async isWebViewFormVisible(timeout = 10000) {
    try {
      await this.waitForVisible(this.locators.urlInput, timeout);
      return true;
    } catch {
      return false;
    }
  }

  async navigateTo(url) {
    const input = await this.waitForVisible(this.locators.urlInput);
    await input.clearValue();
    await input.setValue(url);
    await this.click(this.locators.goButton);
  }

  async isWebViewLoaded(timeout = 15000) {
    try {
      const el = await this.driver.$(this.locators.webView);
      await el.waitForExist({ timeout });
      return true;
    } catch {
      return false;
    }
  }

  async getContexts() {
    return this.driver.getContexts();
  }

  async switchToWebViewContext() {
    const contexts = await this.getContexts();
    const webContext = contexts.find((c) => c.includes('WEBVIEW'));
    if (webContext) {
      await this.driver.switchContext(webContext);
      return webContext;
    }
    return null;
  }

  async switchToNativeContext() {
    await this.driver.switchContext('NATIVE_APP');
  }

  async getPageUrl() {
    return this.driver.getUrl();
  }
}

module.exports = WebViewPage;
