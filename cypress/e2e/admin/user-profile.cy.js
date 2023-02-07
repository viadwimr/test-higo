/* eslint-disable */
/// <reference types="cypress" />

const timeout = { timeout: 60000 };
const force = { force: true };

describe('User Profile dan Logout', () => {
  before(() => {
    cy.login('admin');
  });
  
  beforeEach(() => {
    cy.visit('/');
    cy.get(':nth-child(2) > .ant-dropdown-trigger', timeout).click();
    cy.wait(5000);
  });

  it('Informasi Akun', () => {
    cy.get('.ant-dropdown-menu-title-content', timeout).eq(0).click();
    cy.get('#profile_form > :nth-child(2)', timeout).should('have.contain', 'Admin');
    cy.get(':nth-child(2) > .menu-content__btn-edit', timeout).click();
    cy.get('#profile_form_firstName', timeout).clear().type('Test');
    cy.get('.ant-btn', timeout).click();
    cy.contains('Berhasil disimpan', timeout).should('be.visible');
    cy.reload();
    cy.get(':nth-child(2) > .ant-dropdown-trigger', timeout).click();
    cy.get('.ant-dropdown-menu-title-content', timeout).eq(0).click();
    cy.get('#profile_form > :nth-child(8)', timeout).should('have.contain', 'muhamad.bahri.a3@ap.denso.com');
    cy.get('#profile_form > :nth-child(10)', timeout).should('have.contain', '09876543210');
    cy.get(':nth-child(8) > .menu-content__btn-edit', timeout).click();
    cy.get('#email', timeout).clear().type('test@denso.com');
    cy.get('.ant-btn', timeout).click();
    cy.contains('Berhasil disimpan', timeout).should('be.visible');
    cy.reload();
    cy.get(':nth-child(2) > .ant-dropdown-trigger', timeout).click();
    cy.get('.ant-dropdown-menu-title-content', timeout).eq(0).click();
    cy.get(':nth-child(2) > .ant-dropdown-trigger', timeout).click();
    cy.get(':nth-child(10) > .menu-content__btn-edit', timeout).click();
    cy.get('#phone', timeout).clear().type('01234567890');
    cy.get('.ant-btn', timeout).click();
    cy.contains('Berhasil disimpan', timeout).should('be.visible');
  });

  it('Edit Informasi Akun', () => {
    cy.get('.ant-dropdown-menu-title-content', timeout).eq(0).click();
    cy.get('#profile_form > :nth-child(2)', timeout).should('have.contain', 'Test');
    cy.get('#profile_form > :nth-child(8)', timeout).should('have.contain', 'test@denso');
    cy.get('#profile_form > :nth-child(10)', timeout).should('have.contain', '01234567890');
    cy.get(':nth-child(2) > .menu-content__btn-edit', timeout).click();
    cy.get('#profile_form_firstName', timeout).clear().type('Admin');
    cy.get('.ant-btn', timeout).click();
    cy.contains('Berhasil disimpan', timeout).should('be.visible');
    cy.reload();
    cy.get(':nth-child(2) > .ant-dropdown-trigger', timeout).click();
    cy.get('.ant-dropdown-menu-title-content', timeout).eq(0).click();
    cy.get(':nth-child(8) > .menu-content__btn-edit', timeout).click();
    cy.get('#email', timeout).clear().type('muhamad.bahri.a3@ap.denso.com');
    cy.get('.ant-btn', timeout).click();
    cy.contains('Berhasil disimpan', timeout).should('be.visible');
    cy.reload();
    cy.get(':nth-child(2) > .ant-dropdown-trigger', timeout).click();
    cy.get('.ant-dropdown-menu-title-content', timeout).eq(0).click();;
    cy.get(':nth-child(10) > .menu-content__btn-edit', timeout).click();
    cy.get('#phone', timeout).clear().type('09876543210');
    cy.get('.ant-btn', timeout).click();
    cy.contains('Berhasil disimpan', timeout).should('be.visible');

    // edit foto profil
    // edit telegram
  });

  it('Edit Password', () => {
    cy.get('.ant-dropdown-menu-title-content', timeout).eq(0).click();
    cy.get('.menu-item', timeout).click();
    cy.get('#change_password_form_old_password', timeout).clear().type('Jeager123');
    cy.get('#change_password_form_new_password', timeout).type('password-test');
    cy.get('#change_password_form_confirm_password', timeout).type('password-test.');
    cy.get('.ant-show-help-item-appear', timeout).contains('Password tidak tepat!')
    cy.get('#change_password_form_confirm_password', timeout).clear().type('password-test');
    cy.get('.ant-btn', timeout).click();
    cy.contains('Success', timeout).should('be.visible');
    cy.get('.swal2-confirm', timeout).click();
  });

  it('Logout', () => {
    cy.contains('Logout', timeout).click();

    // Re-login
    cy.get('#username', timeout).type('admindenso');
    cy.get('#password', timeout).type('password-test');
    cy.get('.ant-btn', timeout).click();

    // Back to previous password
    cy.get(':nth-child(2) > .ant-dropdown-trigger', timeout).click();
    cy.get('.ant-dropdown-menu-title-content', timeout).eq(0).click();
    cy.get('.menu-item', timeout).click();
    cy.get('#change_password_form_old_password', timeout).type('password-test');
    cy.get('#change_password_form_new_password', timeout).type('Jeager123');
    cy.get('#change_password_form_confirm_password', timeout).type('Jeager123');
    cy.get('.ant-btn', timeout).click();
    cy.get('.swal2-confirm', timeout).click();

    // Re-logout
    cy.get(':nth-child(2) > .ant-dropdown-trigger', timeout).click();
    cy.contains('Logout', timeout).click();
  });
});
