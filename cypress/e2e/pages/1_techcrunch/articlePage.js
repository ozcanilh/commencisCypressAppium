class ArticlePage {
  constructor() {
    this.elements = {
      contentLinks: 'div.entry-content a[href]',
    };
  }

  getContentLinks() {
    return this.elements.contentLinks;
  }
}

export default ArticlePage;
