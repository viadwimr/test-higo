/// <reference types="Cypress" />

var timeout = { timeout: 60000 }
var force = { force: true }

describe('Login', () => {
  before(() => {
    cy.login('admin');
  });

  before(() => {
    cy.get(':nth-child(2) > .ant-dropdown-trigger', timeout).click();
    cy.contains('Logout', timeout).click();
    cy.wait(7000);
    cy.clearCookies();
    cy.clearLocalStorage();
  });

  beforeEach(() => {
    cy.visit('/');
  });

  it('Wrong Password', () => {
    cy.get('#username', timeout).type('admindenso');
    cy.get('#password', timeout).type('12334345');
    cy.get('.ant-btn', timeout).click();
    cy.contains('User not found, username or password is incorrect', timeout).should('be.visible');
    cy.get('.swal2-confirm', timeout).click();
  });

  it('Password length', () => {
    cy.get('#username', timeout).type('admindenso');
    cy.get('#password', timeout).type('1233');
    cy.get('.ant-btn', timeout).click();
    cy.contains('"password" length must be at least 6 characters long', timeout).should('be.visible');
    cy.get('.swal2-confirm', timeout).click();
  });

  it('Wrong Username', () => {
    cy.get('#username', timeout).type('test');
    cy.get('#password', timeout).type('Jeager123');
    cy.get('.ant-btn', timeout).click();
    cy.contains(`400 Cannot read property 'clientId' of null`, timeout).should('be.visible');
    cy.get('.swal2-confirm', timeout).click();
  });

  it('Success Login', () => {
    cy.get('#username', timeout).type('admindenso');
    cy.get('#password', timeout).type('Jeager123');
    cy.get('.ant-btn', timeout).click();
    cy.get('.logo > img', timeout).should('be.visible');
  });
});
