import './commands'

Cypress.on('uncaught:exception', (err, runnable) => false);

beforeEach(function () {
  Cypress.Cookies.preserveOnce('test');
});

afterEach(function () {
  Cypress.Cookies.preserveOnce('test');
});
