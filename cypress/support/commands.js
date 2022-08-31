/// <reference types="Cypress" />

var timeout = { timeout: 60000 }

Cypress.Commands.add('login', () => {
  cy.visit('/');
  cy.get('#username', timeout).type('admin');
  cy.get('#password', timeout).type('password');
  cy.get('.ant-btn', timeout).click();
});