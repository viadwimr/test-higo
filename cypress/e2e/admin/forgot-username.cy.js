/// <reference types="Cypress" />

var timeout = { timeout: 60000 }
const d = new Date();

describe('Forgot Username', () => {
  before(() => {
    cy.visit('/');
    cy.wait(1000);
  });

  it('Muncul halaman lupa username', () => {
    cy.get(':nth-child(1) > a', timeout).click();
    cy.get('#lupa_username_email', timeout).should('be.visible');
    cy.get('#lupa_username_no_hp', timeout).should('be.visible');
  })

  it('Tombol Kirim akan aktif setelah memasukkan email dan no HP', () => {
    cy.get('#lupa_username_email', timeout).type('qaevomotelkom@gmail.com');
    cy.get('#lupa_username_no_hp', timeout).type('09876543210');
    cy.get('.ant-btn-primary', timeout).click();
  })

  it('Akan mengirim pemberitahuan username di alamat email yang terdaftar', () => {
    cy.contains('Success', timeout).should('be.visible');
    cy.wait(1000);
  })
});

