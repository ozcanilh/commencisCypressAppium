const SauceLabsBasePage = require('./SauceLabsBasePage');

class DrawingPage extends SauceLabsBasePage {
  constructor(driver) {
    super(driver);
    this.locators = {
      title: this.id('drawingTV'),
      canvas: this.id('signature_pad'),
      clearButton: this.id('clearBtn'),
      saveButton: this.id('saveBtn'),
    };
  }

  async isDrawingVisible(timeout = 10000) {
    try {
      await this.waitForVisible(this.locators.canvas, timeout);
      return true;
    } catch {
      return false;
    }
  }

  async drawSquare() {
    const canvas = await this.driver.$(this.locators.canvas);
    const { x, y } = await canvas.getLocation();
    const size = await canvas.getSize();

    const cx = x + size.width / 2;
    const cy = y + size.height / 2;
    const half = Math.min(size.width, size.height) * 0.2;

    const tl = { x: Math.round(cx - half), y: Math.round(cy - half) };
    const tr = { x: Math.round(cx + half), y: Math.round(cy - half) };
    const br = { x: Math.round(cx + half), y: Math.round(cy + half) };
    const bl = { x: Math.round(cx - half), y: Math.round(cy + half) };

    await this.driver.performActions([
      {
        type: 'pointer',
        id: 'finger1',
        parameters: { pointerType: 'touch' },
        actions: [
          { type: 'pointerMove', duration: 0, x: tl.x, y: tl.y },
          { type: 'pointerDown', button: 0 },
          { type: 'pointerMove', duration: 300, x: tr.x, y: tr.y },
          { type: 'pointerMove', duration: 300, x: br.x, y: br.y },
          { type: 'pointerMove', duration: 300, x: bl.x, y: bl.y },
          { type: 'pointerMove', duration: 300, x: tl.x, y: tl.y },
          { type: 'pointerUp', button: 0 },
        ],
      },
    ]);

    await this.driver.releaseActions();
  }
}

module.exports = DrawingPage;
