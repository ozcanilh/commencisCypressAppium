const MobileBasePage = require('../MobileBasePage');

const APP_ID = 'com.pozitron.hepsiburada:id/';

class MainPage extends MobileBasePage {
  constructor(driver) {
    super(driver);
    this.locators = {
      homeRecycler: `id:${APP_ID}homeComponents`,
      bottomNavigation: `id:${APP_ID}bottom_navigation`,
      searchPlaceholderCandidates: [
        `//*[@text='Ürün, kategori veya marka ara']`,
        `-android uiautomator:new UiSelector().textContains("Ürün, kategori veya marka ara")`,
        `id:${APP_ID}etSearchBox`,
        `id:${APP_ID}search_src_text`,
      ],
      searchInputCandidates: [
        `-android uiautomator:new UiSelector().className("android.widget.EditText")`,
        `id:${APP_ID}search_src_text`,
        `id:${APP_ID}etSearchBox`,
      ],
      allowPermission: `-android uiautomator:new UiSelector().textContains("İzin ver")`,
      allowEnglish: `-android uiautomator:new UiSelector().textContains("Allow")`,
      acceptButton: `-android uiautomator:new UiSelector().textContains("Kabul")`,
      okButton: `-android uiautomator:new UiSelector().textContains("Tamam")`,
      laterButton: `-android uiautomator:new UiSelector().textContains("Daha Sonra")`,
    };
  }

  async skipOnboardingIfPresent() {
    await this.tapIfPresent(this.locators.allowPermission);
    await this.tapIfPresent(this.locators.allowEnglish);
    await this.tapIfPresent(this.locators.acceptButton);
    await this.tapIfPresent(this.locators.okButton);
    await this.tapIfPresent(this.locators.laterButton);
    return this;
  }

  async isMainPageVisible() {
    return (
      (await this.isDisplayed(this.locators.homeRecycler)) ||
      (await this.isDisplayed(this.locators.bottomNavigation)) ||
      (await this.isDisplayed(this.locators.searchPlaceholderCandidates[0]))
    );
  }

  async searchFor(query) {
    const SearchResultsPage = require('./SearchResultsPage');
    await this.clickFirstVisible(this.locators.searchPlaceholderCandidates, 5000);
    await this.typeFirstVisible(this.locators.searchInputCandidates, query, 5000);
    await this.driver.pressKeyCode(66); // ENTER key
    return new SearchResultsPage(this.driver);
  }
}

module.exports = MainPage;
