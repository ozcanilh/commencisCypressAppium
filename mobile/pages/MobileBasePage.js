// Shared base class for mobile page objects
class MobileBasePage {
  constructor(driver) {
    this.driver = driver;
  }

  async waitForVisible(locator, timeout = 15000) {
    const el = await this.driver.$(locator);
    await el.waitForDisplayed({ timeout });
    return el;
  }

  async click(locator) {
    const el = await this.waitForVisible(locator);
    await el.click();
  }

  async type(locator, text) {
    const el = await this.waitForVisible(locator);
    await el.clearValue();
    await el.addValue(text);
  }

  async isDisplayed(locator) {
    try {
      const el = await this.driver.$(locator);
      return await el.isDisplayed();
    } catch {
      return false;
    }
  }

  async tapIfPresent(locator) {
    if (await this.isDisplayed(locator)) {
      await this.click(locator);
    }
  }

  async clickFirstVisible(locators, timeout = 4000) {
    for (const locator of locators) {
      try {
        const el = await this.driver.$(locator);
        await el.waitForDisplayed({ timeout });
        await el.click();
        return locator;
      } catch {
        // Try next locator
      }
    }

    throw new Error(`None of the locators were visible: ${locators.join(' | ')}`);
  }

  async typeFirstVisible(locators, text, timeout = 4000) {
    for (const locator of locators) {
      try {
        const el = await this.driver.$(locator);
        await el.waitForDisplayed({ timeout });
        await el.clearValue();
        await el.addValue(text);
        return locator;
      } catch {
        // Try next locator
      }
    }

    throw new Error(`None of the input locators were visible: ${locators.join(' | ')}`);
  }
}

module.exports = MobileBasePage;
