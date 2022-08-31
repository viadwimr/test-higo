/// <reference types="Cypress" />

var timeout = { timeout: 60000 }
var force = { force: true }

describe('Login', () => {
  before(() => {
    cy.get('.ant-dropdown-trigger', timeout).click();
    cy.contains('Logout', timeout).click();
    cy.wait(3000);
    cy.clearCookies();
    cy.clearLocalStorage();
  });

  beforeEach(() => {
    cy.visit('/');
  });

  it('Wrong Password', () => {
    cy.get('#username', timeout).type('admin');
    cy.get('#password', timeout).type('12334345');
    cy.get('.ant-btn', timeout).click();
    cy.contains('User not found, username or password is incorrect', timeout).should('be.visible');
    cy.get('.swal2-confirm', timeout).click();
  });

  it('Password length', () => {
    cy.get('#username', timeout).type('admingf');
    cy.get('#password', timeout).type('1233');
    cy.get('.ant-btn', timeout).click();
    cy.contains('"password" length must be at least 6 characters long', timeout).should('be.visible');
    cy.get('.swal2-confirm', timeout).click();
  });

  it('Success Login', () => {
    cy.get('#username', timeout).type('admin');
    cy.get('#password', timeout).type('password');
    cy.get('.ant-btn', timeout).click();
    cy.contains('DASHBOARD', timeout).should('be.visible');
  });
});