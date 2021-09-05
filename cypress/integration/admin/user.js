/* eslint-disable */
/// <reference types="cypress" />

const timeout = { timeout: 60000 };
const ipData = '34.87.144.83:3009';
const force = { force: true }

describe('Product', () => {
  before(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.login('admin');
    cy.wait(3000);
  });

  beforeEach(() => {
    cy.visit('/setting-users');
  });

  describe('CRUD Data User', () => {
    it('Tambah Product Already Exist', () => {
      cy.contains('Tambah', timeout).click();
      cy.get('#users_form_step1_firstName', timeout).type('Teknik');
      cy.get('#users_form_step1_email', timeout).type('teknik@mailinator.com');
      cy.get('#users_form_step1_no_hp', timeout).type('08123123123');
      cy.get('#users_form_step1_scope', timeout).click();
      cy.get('div[class="ant-select-item ant-select-item-option ant-select-item-option-active"]', timeout).click(force);
      cy.get('.ant-btn > span', timeout).click();
      cy.get('#users_form_step2_username', timeout).type('teknik');
      cy.get('#users_form_step2_password', timeout).type('123456');
      cy.get('#users_form_step2_confirm_password', timeout).type('123456');
      cy.get(':nth-child(2) > .ant-btn > span', timeout).click();
      cy.contains('Username "teknik" is already taken in client 5e4b58ba2b91b5525a1bf8a1', timeout).should('be.visible');
    });

    it('Tambah Product Success', () => {
      cy.contains('Tambah', timeout).click();
      cy.get('#users_form_step1_firstName', timeout).type('User Test');
      cy.get('#users_form_step1_email', timeout).type('test@mailinator.com');
      cy.get('#users_form_step1_no_hp', timeout).type('081222333444');
      cy.get('#users_form_step1_scope', timeout).click();
      cy.get('div[class="ant-select-item ant-select-item-option ant-select-item-option-active"]', timeout).click(force);
      cy.get('.ant-btn > span', timeout).click();
      cy.get('#users_form_step2_username', timeout).type('usertest');
      cy.get('#users_form_step2_password', timeout).type('123456');
      cy.get('#users_form_step2_confirm_password', timeout).type('123456');
      cy.get(':nth-child(2) > .ant-btn > span', timeout).click();
      cy.contains('Berhasil', timeout).should('be.visible');
    });
    
    it('Edit user with null name', () => {
      cy.get('.ant-input', timeout).type('user test');
      cy.get('.ant-btn', timeout).click();
      cy.get('.ant-dropdown-menu > :nth-child(1)', timeout).click();

      cy.get('#update_user_form_firstName', timeout).clear();
      cy.contains('Nama Lengkap tidak boleh kosong', timeout).should('be.visible');
    });

    it('Edit user success', () => {
      cy.get('.ant-input', timeout).type('user test');
      cy.get('.ant-btn', timeout).click();
      cy.get('.ant-dropdown-menu > :nth-child(1)', timeout).click();

      cy.get('#update_user_form_firstName', timeout).clear().type('User test edit');
      cy.get('.ant-btn > span', timeout).click();
      cy.contains('Berhasil', timeout).should('be.visible');
    });

    it('Delete user', () => {
      cy.get('.ant-input', timeout).type('user test');
      cy.get('.ant-btn', timeout).click();
      cy.get('.ant-dropdown-menu > :nth-child(2)', timeout).click();
      cy.get('.swal2-confirm', timeout).click();
      cy.contains('Berhasil', timeout).should('be.visible');
    });

  });
});
