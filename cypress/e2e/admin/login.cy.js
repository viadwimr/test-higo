/// <reference types="Cypress" />

var timeout = { timeout: 60000 }
var force = { force: true }

describe('Login', () => {
  before(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
  });

  it('Menampilkan Halaman Login', () => {
    cy.get('#username', timeout).should('be.visible');
    cy.get('#password', timeout).should('be.visible');
    cy.get('.ant-btn', timeout).should('be.visible');
  });

  it('Jika username dan password yang di-entry valid maka web akan menampilkan Halaman Home / halaman sebelum melakukan login', () => {
    cy.get('#username', timeout).type('admindenso');
    cy.get('#password', timeout).type('12334345');
    cy.get('.ant-btn', timeout).click();
    cy.contains('User not found, username or password is incorrect', timeout).should('be.visible');
    cy.get('.swal2-confirm', timeout).click();
  });

  it('Jika username dan password yang di-entry tidak valid maka web menampilkan notifikasi', () => {
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
});
