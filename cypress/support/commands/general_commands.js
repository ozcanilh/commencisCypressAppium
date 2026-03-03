Cypress.Commands.add('clickIfExists', (selector) => {
  cy.get('body').then(($body) => {
    if ($body.find(selector).length) {
      cy.get(selector).click();
    }
  });
});

Cypress.Commands.add('verifyVisible', (selector) => {
  cy.get(selector).should('be.visible');
});
