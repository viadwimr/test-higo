/// <reference types="Cypress" />

var timeout = { timeout: 60000 }
var force = { force: true }

describe('Login and Signout', () => {
  before(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
  });

  describe('Login', () => {
    it('Wrong Password', () => {
      cy.get('#username', timeout).type('admindenso');
      cy.get('#password', timeout).type('12334345');
      cy.get('.ant-btn', timeout).click();
      cy.contains('User not found, username or password is incorrect', timeout).should('be.visible');
      cy.get('.swal2-confirm', timeout).click();
    });
  
    it('Password length', () => {
      cy.get('#username', timeout).clear().type('admindenso');
      cy.get('#password', timeout).clear().type('1233');
      cy.get('.ant-btn', timeout).click();
      cy.contains('"password" length must be at least 6 characters long', timeout).should('be.visible');
      cy.get('.swal2-confirm', timeout).click();
    });
  
    it('Wrong Username', () => {
      cy.get('#username', timeout).clear().type('test');
      cy.get('#password', timeout).clear().type('Jeager123');
      cy.get('.ant-btn', timeout).click();
      cy.contains(`400 Cannot read property 'clientId' of null`, timeout).should('be.visible');
      cy.get('.swal2-confirm', timeout).click();
    });
  
    it('Success Login', () => {
      cy.get('#username', timeout).clear().type('admindenso');
      cy.get('#password', timeout).clear().type('Jeager123');
      cy.get('.ant-btn', timeout).click();
      cy.get('.logo > img', timeout).should('be.visible');
      cy.contains('Dashboard', timeout).should('be.visible');
      cy.contains('Device', timeout).should('be.visible');
      cy.contains('Report', timeout).should('be.visible');
      cy.contains('User', timeout).should('be.visible');
      cy.contains('Alert', timeout).should('be.visible');
      cy.get('[title="Target"] > .ant-menu-title-content > a', timeout).should('be.visible');
      cy.contains('Indicator', timeout).should('be.visible');
      cy.contains('Analysis', timeout).click();
      cy.contains('Trend', timeout).should('be.visible');
    });
  })

  describe('Signout', () => {
    it('Logout', () => {
      cy.get(':nth-child(2) > .ant-dropdown-trigger', timeout).click();
      cy.wait(1000);
      cy.contains('Logout', timeout).click();
      cy.wait(7000);
      cy.get('#username', timeout).should('be.visible');
      cy.get('#password', timeout).should('be.visible');
      cy.get('.ant-btn', timeout).should('be.visible');
    });
  });
});
