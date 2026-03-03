describe('TechCrunch - The Latest News', () => {
  beforeEach(() => {
    cy.openTechCrunchHome();
  });

  it('Verify each article in The Latest News has an author and an image', () => {
    cy.verifyLatestNewsHasAuthorAndImage();
  });

  it('Verify article page title matches browser title and content links are valid', () => {
    cy.verifyArticleTitleAndContentLinks();
  });
});
