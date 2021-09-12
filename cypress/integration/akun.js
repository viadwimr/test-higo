/// <reference types="Cypress" />

var timeout = { timeout: 60000 }

describe('Check menu pada akun', () => {
  beforeEach(() => {
    cy.get('.ant-dropdown-trigger', timeout).click();
    cy.contains('Logout', timeout).click();
    cy.wait(5000);
    cy.clearLocalStorage();
    cy.clearCookies();
  });

  it('Admin', () => {
    cy.visit('/');
    cy.get('#username', timeout).type('admingf');
    cy.get('#password', timeout).type('password');
    cy.get('.ant-btn', timeout).click();

    cy.contains('Dashboard', timeout).should('be.visible');
    cy.contains('Device', timeout).should('be.visible');
    cy.contains('Report', timeout).should('be.visible');

    cy.contains('User', timeout).should('be.visible');
    cy.contains('Threshold', timeout).should('be.visible');
  });

  it('Operator', () => {
    cy.visit('/');
    cy.get('#username', timeout).type('operator');
    cy.get('#password', timeout).type('password');
    cy.get('.ant-btn', timeout).click();

    cy.contains('Dashboard', timeout).should('be.visible');
    cy.contains('Device', timeout).should('be.visible');
    cy.contains('Report', timeout).should('be.visible');
  });

  it('SuperAdmin', () => {
    cy.visit('/');
    cy.get('#username', timeout).type('superadmin');
    cy.get('#password', timeout).type('password');
    cy.get('.ant-btn', timeout).click();

    cy.contains('Superadmin cannot access Environment Monitoring System', timeout).should('be.visible');
  });
});