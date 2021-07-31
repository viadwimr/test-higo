import './commands'

Cypress.on('uncaught:exception', (err, runnable) => false);

before(function () {
  cy.clearCookies();
  cy.clearLocalStorage();
  cy.login();
  Cypress.Cookies.preserveOnce('secret');
});

beforeEach(function () {
  Cypress.Cookies.preserveOnce('secret');
});
