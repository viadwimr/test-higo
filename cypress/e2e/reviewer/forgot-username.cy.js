/// <reference types="Cypress" />

var timeout = { timeout: 6000 }
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
    // wrong email
    cy.get('#lupa_username_email', timeout).type('mviadwi.test@gmail.com');
    cy.get('#lupa_username_no_hp', timeout).type('085221971010');
    cy.get('.ant-btn-primary', timeout).click();
    cy.contains('Failure', timeout).should('be.visible')
    cy.get('.swal2-confirm', timeout).click();

    // wrong no hp
    cy.get('#lupa_username_email', timeout).clear().type('mviadwi@gmail.com');
    cy.get('#lupa_username_no_hp', timeout).clear().type('09876543210123');
    cy.get('.ant-btn-primary', timeout).click();
    cy.contains('Failure', timeout).should('be.visible')
    cy.get('.swal2-confirm', timeout).click();

    // wrong email dan no hp
    cy.get('#lupa_username_email', timeout).clear().type('qa-evomo_.telkom@gmail.com');
    cy.get('#lupa_username_no_hp', timeout).clear().type('09876543210123');
    cy.get('.ant-btn-primary', timeout).click();
    cy.contains('Failure', timeout).should('be.visible')
    cy.get('.swal2-confirm', timeout).click();
    cy.wait(3000);

    // valid email dan no hp
    cy.get('#lupa_username_email', timeout).clear().type('mviadwi@gmail.com');
    cy.get('#lupa_username_no_hp', timeout).clear().type('085221971010');
    cy.get('.ant-btn-primary', timeout).click();
  })

  it('Akan mengirim pemberitahuan username di alamat email yang terdaftar', () => {
    cy.contains('Success', timeout).should('be.visible');
    cy.wait(1000);
    cy.server().should((server) => {
      expect(server.status).to.eq(200);
    });
  })
});

