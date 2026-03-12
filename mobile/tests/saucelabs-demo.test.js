const CatalogPage = require('../pages/saucelabs/CatalogPage');
const ProductDetailPage = require('../pages/saucelabs/ProductDetailPage');
const SidebarPage = require('../pages/saucelabs/SidebarPage');
const WebViewPage = require('../pages/saucelabs/WebViewPage');
const DrawingPage = require('../pages/saucelabs/DrawingPage');

describe('SauceLabs Demo App', () => {
  let catalogPage;
  let detailPage;
  let sidebarPage;
  let webViewPage;
  let drawingPage;

  before(() => {
    catalogPage = new CatalogPage(browser);
    detailPage = new ProductDetailPage(browser);
    sidebarPage = new SidebarPage(browser);
    webViewPage = new WebViewPage(browser);
    drawingPage = new DrawingPage(browser);
  });

  it('Step 1-2: should open app and verify catalog screen', async () => {
    await catalogPage.waitForCatalog();
    const visible = await catalogPage.isCatalogVisible();
    expect(visible).toBe(true);
  });

  it('Step 3-4: should sort products by price ascending', async () => {
    await catalogPage.tapSortButton();
    await catalogPage.selectPriceAscending();
  });

  it('Step 5: should verify first 4 products are in ascending price order', async () => {
    const prices = await catalogPage.getVisiblePrices(4);
    expect(prices.length).toBe(4);
    for (let i = 1; i < prices.length; i++) {
      expect(prices[i]).toBeGreaterThanOrEqual(prices[i - 1]);
    }
  });

  it('Step 6-7: should open the 3rd product and verify detail page', async () => {
    const productName = await catalogPage.tapProductByIndex(2);
    expect(productName).toBeTruthy();

    const detailVisible = await detailPage.isProductDetailVisible();
    expect(detailVisible).toBe(true);
  });

  it('Step 8-9: should open sidebar and select WebView', async () => {
    await sidebarPage.openSidebar();
    const menuVisible = await sidebarPage.isSidebarVisible();
    expect(menuVisible).toBe(true);

    await sidebarPage.selectWebView();
    const formVisible = await webViewPage.isWebViewFormVisible();
    expect(formVisible).toBe(true);
  });

  it('Step 10-11: should navigate to commencis.com and verify', async () => {
    await webViewPage.navigateTo('https://www.commencis.com');
    const loaded = await webViewPage.isWebViewLoaded();
    expect(loaded).toBe(true);

    const contexts = await webViewPage.getContexts();
    expect(contexts.length).toBeGreaterThan(1);

    const webCtx = await webViewPage.switchToWebViewContext();
    expect(webCtx).toBeTruthy();

    const url = await webViewPage.getPageUrl();
    expect(url).toContain('commencis');

    await webViewPage.switchToNativeContext();
  });

  it('Step 12-13: should tap header menu button and verify menu opens', async () => {
    await sidebarPage.openSidebar();
    const menuVisible = await sidebarPage.isSidebarVisible();
    expect(menuVisible).toBe(true);
  });

  it('Step 15-16: should open Drawing from sidebar', async () => {
    await sidebarPage.selectDrawing();
    const drawingVisible = await drawingPage.isDrawingVisible();
    expect(drawingVisible).toBe(true);
  });

  it('Step 17: should draw a square on the canvas', async () => {
    await drawingPage.drawSquare();
  });
});
