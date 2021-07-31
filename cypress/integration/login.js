/// <reference types="Cypress" />

var timeout = { timeout: 60000 }
var force = { force: true }

describe('Login', () => {
  before(() => {
    cy.get('.ant-dropdown-trigger', timeout).click();
    cy.get('[style="font-size: 12px; font-weight: 500; color: rgb(240, 66, 73);"] > .ant-dropdown-menu-title-content', timeout).click();
  });

  beforeEach(() => {
    cy.visit('/');
  });

  it('Wrong Password', () => {
    cy.get('#username', timeout).type('admingf');
    cy.get('#password', timeout).type('12334');
    cy.get('.ant-btn', timeout).click();
    cy.contains('User not found, username or password is incorrect', timeout).should('be.visible');
    cy.get('.swal2-confirm', timeout).click();
  });

  it('Null Data', () => {
    cy.get('.ant-btn', timeout).click();
    cy.contains('DASHBOARD', timeout).should('not.be.visible');
  });

  it('Success Login', () => {
    cy.get('#username', timeout).type('admingf');
    cy.get('#password', timeout).type('password');
    cy.get('.ant-btn', timeout).click();
    cy.contains('DASHBOARD', timeout).should('be.visible');
  });
});