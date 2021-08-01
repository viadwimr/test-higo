import './commands'

Cypress.on('uncaught:exception', (err, runnable) => false);

before(() => {
  cy.login();
  Cypress.Cookies.preserveOnce('secret');
});

beforeEach(() => {
  Cypress.Cookies.preserveOnce('secret');
});

after(() => {
  cy.clearCookies();
  cy.clearLocalStorage();
})
