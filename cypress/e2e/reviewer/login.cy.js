/// <reference types="Cypress" />

var timeout = { timeout: 6000 }
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
    cy.get('img')
    .should('be.visible')
    .and(($img) => {
      expect($img[0].complete).to.be.true;
      expect($img[0].naturalWidth).to.be.greaterThan(0);
    });
  });

  it('Jika username dan password yang di-entry tidak valid maka web menampilkan notifikasi', () => {
    // wrong password
    cy.get('#username', timeout).type('reviewer-ibr');
    cy.get('#password', timeout).type('12334345');
    cy.get('.ant-btn', timeout).click();
    cy.contains('Username or password is incorrect', timeout).should('be.visible');
    cy.get('.swal2-confirm', timeout).click();

    // long password
    // cy.get('#username', timeout).clear().type('tes-reviewer');
    // cy.get('#password', timeout).type('Jeager123');
    // cy.get('.ant-btn', timeout).click();
    // cy.contains('Failure', timeout).should('be.visible');
    // cy.get('.swal2-confirm', timeout).click();

    // wrong username
    cy.get('#username', timeout).clear().type('reviewer-denso');
    cy.get('#password', timeout).clear().type('password');
    cy.get('.ant-btn', timeout).click();
    cy.contains("Username or password is incorrect", timeout).should('be.visible');
    cy.get('.swal2-confirm', timeout).click();

    // wrong username & password
    cy.get('#username', timeout).clear().type('reviewer-denso');
    cy.get('#password', timeout).clear().type('12334345');
    cy.get('.ant-btn', timeout).click();
    cy.contains('Failure', timeout).should('be.visible');
    cy.get('.swal2-confirm', timeout).click();
  });

  it('Jika username dan password yang di-entry valid maka web akan menampilkan Halaman Home / halaman sebelum melakukan login', () => {
    cy.get('#username', timeout).clear().type('reviewer-ibr');
    cy.get('#password', timeout).clear().type('password');
    cy.get('.ant-btn', timeout).click();
    cy.get('.logo > img', timeout).should('be.visible');
    cy.contains('Dashboard', timeout).should('be.visible');
    cy.contains('Device', timeout).should('be.visible');
    cy.contains('Report', timeout).should('be.visible');
    cy.get('.logo > img')
    .should('be.visible')
    .and(($img) => {
      expect($img[0].complete).to.be.true;
      expect($img[0].naturalWidth).to.be.greaterThan(0);
    });
  });
});
