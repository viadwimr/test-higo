/// <reference types="Cypress" />

var timeout = { timeout: 60000 }
var force = { force: true }

describe('Signout', () => {
  before(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.login('reviewer');
  });

  it('Keluar Aplikasi', () => {
    cy.get(':nth-child(2) > .ant-dropdown-trigger', timeout).click();
    cy.wait(1000);
    cy.contains('Logout', timeout).click();
    cy.get('.swal2-confirm', timeout).click();
    cy.wait(7000);
    cy.get('#username', timeout).should('be.visible');
    cy.get('#password', timeout).should('be.visible');
    cy.get('.ant-btn', timeout).should('be.visible');
  });
});
