import './commands'
import '@shelex/cypress-allure-plugin'

Cypress.on('uncaught:exception', (err, runnable) => false);

before(() => {
  cy.login();
  Cypress.Cookies.preserveOnce('secret');
  cy.wait(3000);
});

beforeEach(() => {
  Cypress.Cookies.preserveOnce('secret');
});

