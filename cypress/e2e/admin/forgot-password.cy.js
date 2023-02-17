/// <reference types="Cypress" />

var timeout = { timeout: 60000 }
const d = new Date();

describe('Forgot Password', () => {
  before(() => {
    cy.visit('/');
    cy.wait(1000);
  });
  
  it('Muncul halaman lupa password', () => {
    cy.get(':nth-child(2) > a', timeout).click();
    cy.get('#check_account_email', timeout).should('be.visible');
    cy.get('#check_account_no_hp', timeout).should('be.visible');
    cy.wait(1000);
  })

  it('Tombol Kirim akan aktif setelah memasukkan email dan no HP', () => {
    cy.get('#check_account_email', timeout).type('qaevomotelkom@gmail.com');
    cy.get('#check_account_no_hp', timeout).type('09876543210');
    cy.get('.ant-btn-primary', timeout).click();
  })

  it('Akan mengirim link reset untuk password di alamat email yang terdaftar', () => {
    cy.contains('Success', timeout).should('be.visible');
    cy.wait(1000);
  })
});

