/// <reference types="Cypress" />

var timeout = { timeout: 60000 }

Cypress.Commands.add('login', (numb) => {
  cy.clearCookies();
  cy.clearLocalStorage();
  cy.visit('/');
  if(numb === 'admin') {
    cy.get('#username', timeout).type('tes-admin');
    cy.get('#password', timeout).type('password');
    cy.get('.ant-btn', timeout).click();
    cy.contains('Dashboard', timeout).should('be.visible');
    cy.contains('Device', timeout).should('be.visible');
    cy.contains('Report', timeout).should('be.visible');
    cy.contains('User', timeout).should('be.visible');
    cy.contains('Threshold', timeout).should('be.visible');
  } else if (numb === 'operator') {
    // cy.visit('/');
    cy.get('#username', timeout).type('tes-operator');
    cy.get('#password', timeout).type('password');
    cy.get('.ant-btn', timeout).click();
    cy.contains('Dashboard', timeout).should('be.visible');
    cy.contains('Device', timeout).should('be.visible');
    cy.contains('Report', timeout).should('be.visible');
  }
});
