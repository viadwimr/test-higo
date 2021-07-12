/* eslint-disable */
/// <reference types="cypress" />

const timeout = { timeout: 60000 };
const ipData = '34.87.144.83:3009';

describe('Machine', () => {
  beforeEach(() => {
    cy.mockUserAdmin();
    cy.mockResponse();
    cy.login('admin');
    cy.wait(2000);
    cy.get('[title="Machine"] > a', timeout).click();
    cy.wait(5000);
  });

  afterEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
  });

  describe('Line', () => {
    it('Create Line', () => {
      cy.contains('Tambah', timeout).click();
      cy.contains('Tambah Line', timeout).click();
      cy.contains('Tambah Line', timeout).should('be.visible');
      cy.get('input[id="nama_line"]', timeout).type('Test Line');
      cy.get('input[id="nama_plant"]', timeout).type('Test Plant');
      cy.contains('Submit', timeout).click();
    });

    it('Update Line name be exist', () => {
      cy.get('span[class="ant-tree-title"]', timeout).eq(9).click();
      cy.contains('GENERAL', timeout).should('be.visible');
      cy.get('input[id="name"]', timeout).should('exist').clear();
      cy.contains('Simpan', timeout).click();
    });

    it('Update Line name success', () => {
      cy.get('span[class="ant-tree-title"]', timeout).eq(9).click();
      cy.contains('GENERAL', timeout).should('be.visible');
      cy.get('input[id="name"]', timeout).should('exist').clear().type('Test Line New')
      cy.contains('Simpan', timeout).click();
    });
  });

  describe('Lini', () => {
    it('Create Lini', () => {
      cy.contains('Tambah', timeout).click();
      cy.contains('Tambah Lini', timeout).click();
      cy.contains('Tambah Lini', timeout).should('be.visible');
      cy.get('input[id="nama_lini"]', timeout).type('Test Lini');
      cy.get('input[id="line"]', timeout).click();
      cy.get('.ant-select-item-option-active > .ant-select-item-option-content', timeout).click({ force: true });
      cy.contains('Submit', timeout).click();
    });

    it('Update Lini name be exist', () => {
      cy.get('span[class="ant-tree-title"]', timeout).eq(9).click();
      cy.get('span[class="ant-tree-title"]', timeout).eq(10).click();
      cy.contains('GENERAL', timeout).should('be.visible');
      cy.contains('RUNTIME', timeout).should('be.visible');
      cy.get('input[id="name"]', timeout).should('exist').clear();
      cy.contains('Simpan', timeout).click();
    });

    it('Update Lini name success', () => {
      cy.get('span[class="ant-tree-title"]', timeout).eq(8).click();
      cy.get('span[class="ant-tree-title"]', timeout).eq(9).click();
      cy.contains('GENERAL', timeout).should('be.visible');
      cy.contains('RUNTIME', timeout).should('be.visible');
      cy.get('input[id="name"]', timeout).should('exist').clear().type('Test Lini New')
      cy.contains('Simpan', timeout).click();
    });
  });

  describe('Mesin', () => {
    it('Create Mesin', () => {
      cy.contains('Tambah', timeout).click();
      cy.contains('Tambah Mesin', timeout).click();
      cy.contains('Tambah Mesin', timeout).should('be.visible');
      cy.get('input[id="nama_mesin"]', timeout).type('Test Mesin');
      cy.get('input[id="line"]', timeout).click();
      cy.get('.ant-select-item-option-active > .ant-select-item-option-content', timeout).click({ force: true });
      cy.get('input[id="lini"]', timeout).click();
      cy.get('.ant-select-item-option-active > .ant-select-item-option-content', timeout).click({ force: true });
      cy.get('input[id="user"]', timeout).click();
      cy.get('.ant-select-item-option-active > .ant-select-item-option-content', timeout).click({ force: true });
      cy.contains('Submit', timeout).click();
    });

    it.skip('Update Mesin name be exist', () => {
      cy.get('span[class="ant-tree-title"]', timeout).eq(9).click();
      cy.get('span[class="ant-tree-title"]', timeout).eq(10).click();
      cy.get('span[class="ant-tree-title"]', timeout).eq(11).click();
      cy.contains('GENERAL', timeout).should('be.visible');
      cy.contains('RUNTIME', timeout).should('be.visible');
      cy.contains('PRODUCT', timeout).should('be.visible');
      cy.get('input[id="name"]', timeout).should('exist').clear();
      cy.contains('Simpan', timeout).click();
    });

    it('Update Lini name success', () => {
      cy.get('span[class="ant-tree-title"]', timeout).eq(9).click();
      cy.get('span[class="ant-tree-title"]', timeout).eq(10).click();
      cy.get('span[class="ant-tree-title"]', timeout).eq(11).click();
      cy.contains('GENERAL', timeout).should('be.visible');
      cy.contains('RUNTIME', timeout).should('be.visible');
      cy.contains('PRODUCT', timeout).should('be.visible');
      cy.get('input[id="name"]', timeout).should('exist').clear().type('Test Mesin New')
      cy.contains('Simpan', timeout).click();
    });
  });
});
