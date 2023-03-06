// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, pass) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

/* cy.url().then(($url) => {
    if($url.includes('/runtime')) {
      cy.url()
        .should('include', '/runtime')
      cy.get('.ant-layout-content')
        .get('.ant-row-space-between')
        .contains('RUNTIME')
        .get('.ant-layout-content > :nth-child(1) > :nth-child(2) > :nth-child(1)')
        .contains('SEDANG BERJALAN')
        .get('.ant-layout-content > :nth-child(1) > :nth-child(2) > :nth-child(2)')
        .contains('DAFTAR')
    } else if($url.includes('/products')) {
      cy.url()
        .should('include', '/products')
      cy.get('.ant-layout-content')
        .get('.ant-row-space-between')
        .contains('SKU')
        .get('.ant-layout-content > :nth-child(1) > :nth-child(2) > :nth-child(1)')
        .contains('SEDANG BERJALAN')
        .get('.ant-layout-content > :nth-child(1) > :nth-child(2) > :nth-child(2)')
        .contains('DAFTAR')
    } else {
      cy.url()
        .should('include', '/')
      cy.get('.ant-page-header')
        .contains('Operator Produksi')
        .get('[style="min-height: 100vh; display: flex; flex-direction: column; justify-content: center; align-items: center;"]')
        .contains('Tidak ada runtime yang berjalan')
    }
  }) */

/* cy.get(':button')
    .then((x) => {
      if (!x.is(':disabled')) {
        //do something if enabled
        cy.get(':nth-child(3) > div > .ant-btn')
      } else {
        //do something else
      }
  }) */

//const timeout = { timeout: 5000 };

var timeout = { timeout: 60000 }
var force = { force: true }

Cypress.Commands.add('login', (numb) => {
  cy.clearCookies();
  cy.clearLocalStorage();
  cy.visit('/');
  if(numb === 'admin') {
    cy.get('#username', timeout).type('admindenso');
    cy.get('#password', timeout).type('Jeager123');
    cy.get('.ant-btn', timeout).click();
    cy.contains('Dashboard', timeout).should('be.visible');
    cy.contains('Device', timeout).should('be.visible');
    cy.contains('Report', timeout).should('be.visible');
    cy.contains('User', timeout).should('be.visible');
    // cy.contains('Alert', timeout).should('be.visible');
    cy.get('[title="Target"] > .ant-menu-title-content > a', timeout).should('be.visible');
    cy.contains('Indicator', timeout).should('be.visible');
    cy.contains('Analysis', timeout).click();
    cy.contains('Trend', timeout).should('be.visible');
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



