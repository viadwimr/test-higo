import './commands'
import 'cypress-mochawesome-reporter/register'
import '@shelex/cypress-allure-plugin'
import 'cypress-real-events/support';

Cypress.on('uncaught:exception', (err, runnable) => false);

before(function () {
  cy.clearCookies();
  cy.clearLocalStorage();
  cy.visit('/');
  Cypress.Cookies.preserveOnce('secret');
});

beforeEach(function () {
  Cypress.Cookies.preserveOnce('secret');
});

afterEach(function () {
  Cypress.Cookies.preserveOnce('secret');
});
