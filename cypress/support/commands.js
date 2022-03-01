/// <reference types="Cypress" />

var timeout = { timeout: 60000 }

Cypress.Commands.add('login', (numb) => {
  if(numb === 'admin') {
    cy.get('#login_username', timeout).type('admingf');
    cy.get('#login_password', timeout).type('password');
    cy.get('#btn-login', timeout).click();
  } else if (numb === 'engineering') {
    cy.get('#login_username', timeout).type('engineering');
    cy.get('#login_password', timeout).type('password');
    cy.get('#btn-login', timeout).click();
  } else if (numb === 'direktur') {
    cy.get('#login_username', timeout).type('pungky');
    cy.get('#login_password', timeout).type('password');
    cy.get('#btn-login', timeout).click();
  } else if (numb === 'kepala_pabrik') {
    cy.get('#login_username', timeout).type('putraputrijaya');
    cy.get('#login_password', timeout).type('password');
    cy.get('#btn-login', timeout).click();
  }
  cy.wait(3000);
});