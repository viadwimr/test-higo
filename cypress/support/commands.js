/// <reference types="Cypress" />

var timeout = { timeout: 60000 }

Cypress.Commands.add('login', (numb) => {
  if(numb === 'direktur') {
    cy.get('#login_username', timeout).type('DIR1');
    cy.get('#login_password', timeout).type('marketleader');
    cy.get('#btn-login', timeout).click();
  } else if (numb === 'engineering') {
    cy.get('#login_username', timeout).type('MFG1');
    cy.get('#login_password', timeout).type('tastebetter');
    cy.get('#btn-login', timeout).click();
  }
  cy.wait(3000);
});