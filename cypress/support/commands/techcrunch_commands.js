import HomePage from '../../e2e/pages/1_techcrunch/homePage';
import ArticlePage from '../../e2e/pages/1_techcrunch/articlePage';

const homePage = new HomePage();
const articlePage = new ArticlePage();
const normalizeText = (text = '') =>
  text
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/\s+/g, ' ')
    .trim();

Cypress.Commands.add('openTechCrunchHome', () => {
  cy.visit('/');
  cy.verifyVisible(homePage.getLatestNewsSection());
});

Cypress.Commands.add('verifyLatestNewsHasAuthorAndImage', () => {
  cy.get(homePage.getLatestNewsArticles()).then(($articles) => {
    expect($articles.length, 'No articles found in The Latest News section').to.be.greaterThan(0);

    $articles.each((index, article) => {
      const $article = Cypress.$(article);
      const authorText = $article.find(homePage.getArticleAuthor()).first().text().trim();
      const imageSrc =
        $article.find(homePage.getArticleImage()).first().attr('src') ||
        $article.find(homePage.getArticleImage()).first().attr('data-src') ||
        '';

      expect(authorText.length, `Article ${index + 1} is missing an author`).to.be.greaterThan(0);
      expect(imageSrc.trim().length, `Article ${index + 1} is missing an image`).to.be.greaterThan(
        0
      );
    });
  });
});

Cypress.Commands.add('verifyArticleTitleAndContentLinks', () => {
  cy.get(homePage.getLatestNewsArticles()).then(($articles) => {
    expect($articles.length, 'No articles found in The Latest News section').to.be.greaterThan(0);

    const firstArticle = $articles[0];
    const expectedTitle = Cypress.$(firstArticle)
      .find(homePage.getArticleTitleLink())
      .text()
      .trim();

    expect(expectedTitle.length, 'Article title should not be empty').to.be.greaterThan(0);

    cy.wrap(firstArticle).find(homePage.getArticleTitleLink()).first().click();

    cy.title().then((pageTitle) => {
      expect(normalizeText(pageTitle)).to.include(normalizeText(expectedTitle));
    });

    cy.get(articlePage.getContentLinks()).each(($link, index) => {
      const href = $link.attr('href') || '';
      expect(href.trim().length, `Invalid or empty href on link ${index + 1}`).to.be.greaterThan(0);
      expect(href.trim(), `Invalid href on link ${index + 1}`).not.to.equal('#');
    });
  });
});
