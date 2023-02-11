/// <reference types="Cypress" />

var timeout = { timeout: 60000 }
const d = new Date();

describe('Forgot Password and Username', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.wait(1000);
  });

  describe('Username', () => {
    it('Kosong', () => {
      cy.get(':nth-child(1) > a', timeout).click();
      cy.get('#lupa_username_email', timeout).type('1').clear();
      cy.get('#lupa_username_no_hp', timeout).type('1').clear();
      cy.contains('Email tidak boleh kosong', timeout).should('be.visible');
      cy.contains('Nomor tidak boleh kosong', timeout).should('be.visible');
      cy.wait(1000);
    })

    it('Wrong Input', () => {
      cy.get(':nth-child(1) > a', timeout).click();
      cy.get('#lupa_username_email', timeout).type('0');
      cy.get('#lupa_username_no_hp', timeout).type('s');
      cy.contains('Email Tidak Tepat', timeout).should('be.visible');
      cy.contains('Harus berupa nomor, max 15 digit', timeout).should('be.visible');
      cy.wait(1000);
    })

    it('Wrong Email', () => {
      cy.get(':nth-child(1) > a', timeout).click();
      cy.get('#lupa_username_email', timeout).type('m.viadwi@gmail.com');
      cy.get('#lupa_username_no_hp', timeout).type('09876543210');
      cy.get('.ant-btn-primary', timeout).click();
      cy.contains('User Not Found', timeout).should('be.visible');
      cy.wait(1000);
    })

    it('Wrong No Hp', () => {
      cy.get(':nth-child(1) > a', timeout).click();
      cy.get('#lupa_username_email', timeout).type('qaevomotelkom@gmail.com');
      cy.get('#lupa_username_no_hp', timeout).type('098765432101');
      cy.get('.ant-btn-primary', timeout).click();
      cy.contains('User Not Found', timeout).should('be.visible');
      cy.wait(1000);
    })

    it('Success', () => {
      cy.get(':nth-child(1) > a', timeout).click();
      cy.get('#lupa_username_email', timeout).type('qaevomotelkom@gmail.com');
      cy.get('#lupa_username_no_hp', timeout).type('09876543210');
      cy.get('.ant-btn-primary', timeout).click();
      cy.contains('Success', timeout).should('be.visible');
      cy.wait(1000);
    })
  })
  
  describe('Password', () => {
    it('Kosong', () => {
      cy.get(':nth-child(2) > a', timeout).click();
      cy.get('#check_account_email', timeout).type('1').clear();
      cy.get('#check_account_no_hp', timeout).type('1').clear();
      cy.contains('Email tidak boleh kosong', timeout).should('be.visible');
      cy.contains('Nomor tidak boleh kosong', timeout).should('be.visible');
      cy.wait(1000);
    })

    it('Wrong Input', () => {
      cy.get(':nth-child(2) > a', timeout).click();
      cy.get('#check_account_email', timeout).type('0');
      cy.get('#check_account_no_hp', timeout).type('s');
      cy.contains('Email Tidak Tepat', timeout).should('be.visible');
      cy.contains('Harus berupa nomor, max 15 digit', timeout).should('be.visible');
      cy.wait(1000);
    })

    it('Wrong Email', () => {
      cy.get(':nth-child(2) > a', timeout).click();
      cy.get('#check_account_email', timeout).type('mvia.dwi@gmail.com');
      cy.get('#check_account_no_hp', timeout).type('09876543210');
      cy.get('.ant-btn-primary', timeout).click();
      cy.contains('User Not Found', timeout).should('be.visible');
      cy.wait(1000);
    })

    it('Wrong No hp', () => {
      cy.get(':nth-child(2) > a', timeout).click();
      cy.get('#check_account_email', timeout).type('qaevomotelkom@gmail.com');
      cy.get('#check_account_no_hp', timeout).type('01234567789');
      cy.get('.ant-btn-primary', timeout).click();
      cy.contains('User Not Found', timeout).should('be.visible');
      cy.wait(1000);
    })

    it('Success', () => {
      cy.get(':nth-child(2) > a', timeout).click();
      cy.get('#check_account_email', timeout).type('qaevomotelkom@gmail.com');
      cy.get('#check_account_no_hp', timeout).type('09876543210');
      cy.get('.ant-btn-primary', timeout).click();
      cy.contains('Success', timeout).should('be.visible');
      cy.wait(1000);
    })
  });
});

