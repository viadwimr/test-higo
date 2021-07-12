/* eslint-disable */
/// <reference types="cypress" />

const timeout = { timeout: 60000 };
const ipData = '34.87.144.83:3009';

describe('Reason', () => {
  before(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.mockUserAdmin();
    cy.login('admin');
    cy.get('[title="Reason"] > a', timeout).click();
  });

  describe('Check List Reason', () => {
    it('Data Reason Name is null', () => {
      cy.get('[title="Heat Map"] > a', timeout).click();
      cy.intercept(`${ipData}/reasons`, { fixture: '/data/reason.json' }).as('reason');
      cy.get('[title="Reason"] > a', timeout).click();
      cy.contains('Anda belum memiliki Reason Group', timeout).should('be.visible');
    });

    it('Data > 1', () => {
      cy.get('[title="Heat Map"] > a', timeout).click();
      cy.get('[title="Reason"] > a', timeout).click();
      cy.contains('REASON', timeout).should('be.visible');
      cy.contains('Reason Group', timeout).should('be.visible');
    });
  });

  describe('CRUD Data Reason Group', () => {
    it('Tambah Reason', () => {
      cy.wait(3000);
      cy.contains('Tambah', timeout).click();
      cy.contains('Tambah Reason Group', timeout).click();
      cy.get('input[id="reason_form_name"]', timeout).type(`Test Reason Group ${Math.floor(Math.random() * 100)}`);
      cy.contains('CREATE', timeout).click();
      cy.contains('Success!', timeout).should('be.visible');
    });

    it.skip('Edit Reason', () => {
      cy.wait(5000);
      cy.get('.box-1 > .reason-container > :nth-child(14) > .color-group > .ant-dropdown-trigger', timeout).click();
      cy.contains('Edit', timeout).click();
      cy.get('input[id="reason_form_name"]', timeout).clear().type(`Test Reason Group ${Math.floor(Math.random() * 100)}`);
      cy.contains('UPDATE', timeout).click();
      cy.contains('Berhasil!', timeout).should('be.visible');
    });

    it('Delete Reason', () => {
      cy.wait(5000);
      cy.get('.box-1 > .reason-container > :nth-child(14) > .color-group > .ant-dropdown-trigger > svg', timeout).click();
      cy.contains('Delete', timeout).click();
      cy.contains('Ya', timeout).click();
    });
  });

  describe('CRUD Data Reason Name', () => {
    it('Tambah Reason Name', () => {
      cy.wait(3000);
      cy.contains('Tambah', timeout).click();
      cy.contains('Tambah Reason Name', timeout).click();
      cy.get('input[id="reason_form_name"]', timeout).type(`Test Reason Name ${Math.floor(Math.random() * 100)}`);
      cy.get('input[id="reason_form_reason_group_id"]', timeout).click();
      cy.get('div[class="ant-select-item-option-content"]', timeout).contains('change belt', timeout).click();
      cy.get('.ant-select-selection-overflow', timeout).click();
      cy.get('div[class="ant-select-item-option-content"]', timeout).contains('Mixer', timeout).click();
      cy.contains('Add', timeout).click();
      cy.contains('CREATE', timeout).click();
      cy.contains('Success!', timeout).should('be.visible');
    });

    it('Search Reason Name', () => {
      cy.wait(5000);
      cy.contains('change belt').click();
      cy.get('input[placeholder="Cari"]', timeout).type('Test Reason Name');
      cy.get('div[class="reason-container"]', timeout).contains('Test Reason Name').should('be.visible');
    });

    it('Edit Reason Name', () => {
      cy.get('.box-3 > .reason-container > .card-group > .color-group > .ant-dropdown-trigger > svg', timeout).click();
      cy.contains('Edit', timeout).click();
      cy.get('input[id="reason_form_name"]', timeout).clear().type(`Test Reason Name ${Math.floor(Math.random() * 100)}`);
      cy.contains('UPDATE', timeout).click();
      cy.contains('Success!', timeout).should('be.visible');
    });

    it('Delete Reason Name', () => {
      cy.get('.box-3 > .reason-container > .card-group > .color-group > .ant-dropdown-trigger > svg', timeout).click();
      cy.contains('Delete', timeout).click();
      cy.contains('Ya', timeout).click();
    });
  });
});
