/// <reference types="Cypress" />

var timeout = { timeout: 60000 }

Cypress.Commands.add('login', (numb) => {
  if(numb === 'admin') {
    cy.visit('/');
    cy.get('#username', timeout).type('tes-admin');
    cy.get('#password', timeout).type('password');
    cy.get('.ant-btn', timeout).click();
  } else if (numb === 'engineering') {
    cy.visit('/');
    cy.get('#username', timeout).type('tes-engineering');
    cy.get('#password', timeout).type('password');
    cy.get('.ant-btn', timeout).click();
  } else if (numb === 'operator') {
    cy.visit('/');
    cy.get('#username', timeout).type('tes-operator');
    cy.get('#password', timeout).type('password');
    cy.get('.ant-btn', timeout).click();
  }
});
