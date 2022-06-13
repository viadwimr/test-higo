/// <reference types="Cypress" />

var timeout = { timeout: 60000 }

Cypress.Commands.add('login', (numb) => {
  if(numb === 'operator') {
    cy.get('#login_username', timeout).type('OPR PRD 4');
    cy.get('#login_password', timeout).type('password');
    cy.get('#btn-login', timeout).click();
  } else if (numb === 'supervisor') {
    cy.get('#login_username', timeout).type('SPV PRD 1');
    cy.get('#login_password', timeout).type('password');
    cy.get('#btn-login', timeout).click();
  } else if (numb === 'team_leader') {
    cy.get('#login_username', timeout).type('LDR PRD 4');
    cy.get('#login_password', timeout).type('password');
    cy.get('#btn-login', timeout).click();
  }
  cy.wait(3000);
});