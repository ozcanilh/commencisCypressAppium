Cypress.Commands.add('apiGet', (url, headers = {}) => {
  return cy.request({
    method: 'GET',
    url,
    headers,
    failOnStatusCode: false,
  });
});

Cypress.Commands.add('apiPost', (url, body, headers = {}) => {
  return cy.request({
    method: 'POST',
    url,
    body,
    headers: { 'Content-Type': 'application/json', ...headers },
    failOnStatusCode: false,
  });
});

Cypress.Commands.add('apiPut', (url, body, headers = {}) => {
  return cy.request({
    method: 'PUT',
    url,
    body,
    headers: { 'Content-Type': 'application/json', ...headers },
    failOnStatusCode: false,
  });
});

Cypress.Commands.add('apiDelete', (url, headers = {}) => {
  return cy.request({
    method: 'DELETE',
    url,
    headers,
    failOnStatusCode: false,
  });
});
