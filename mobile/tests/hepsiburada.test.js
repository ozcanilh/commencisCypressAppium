const MainPage = require('../pages/hepsiburada/MainPage');

describe('Hepsiburada - Add to Cart', () => {
  it('Search for product, add to cart, verify product is in cart', async () => {
    const mainPage = new MainPage(browser);
    await mainPage.skipOnboardingIfPresent();

    const isVisible = await mainPage.isMainPageVisible();
    expect(isVisible).toBe(true);

    const resultsPage = await mainPage.searchFor('iphone 16 pro max');
    const cartPage = await resultsPage.addFirstProductToCartAndGoToCart();

    const inCart = await cartPage.isProductInCart();
    expect(inCart).toBe(true);
  });
});
