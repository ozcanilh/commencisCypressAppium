class HomePage {
  constructor() {
    this.elements = {
      latestNewsSection: 'div.latest-news-section',
      latestNewsArticles:
        'div.latest-news-section li.wp-block-post:has(a.loop-card__title-link):has(figure.loop-card__figure)',
      articleAuthor: 'a.loop-card__author',
      articleImage: 'figure.loop-card__figure img',
      articleTitleLink: 'h3.loop-card__title a.loop-card__title-link',
    };
  }

  getLatestNewsSection() {
    return this.elements.latestNewsSection;
  }

  getLatestNewsArticles() {
    return this.elements.latestNewsArticles;
  }

  getArticleAuthor() {
    return this.elements.articleAuthor;
  }

  getArticleImage() {
    return this.elements.articleImage;
  }

  getArticleTitleLink() {
    return this.elements.articleTitleLink;
  }
}

export default HomePage;
