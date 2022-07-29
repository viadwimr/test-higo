import './commands'
import 'cypress-mochawesome-reporter/register'

Cypress.on('uncaught:exception', (err, runnable) => false);

before(function () {
  cy.visit('/');
  Cypress.Cookies.preserveOnce('secret');
});

beforeEach(function () {
  Cypress.Cookies.preserveOnce('secret');
});

afterEach(function () {
  Cypress.Cookies.preserveOnce('secret');
});
