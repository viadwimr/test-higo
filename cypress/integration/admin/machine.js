/* eslint-disable */
/// <reference types="cypress" />

const timeout = { timeout: 15000 };
const ipData = '34.87.144.83:3009';
const force = { force: true };

describe('Machine', () => {
  before(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.login('admin');
    cy.wait(3000);
  });

  beforeEach(() => {
    cy.visit('/machine');
  });

  describe('Line', () => {
    it('Create Line', () => {
      cy.contains('Tambah', timeout).click();
      cy.contains('Tambah Line', timeout).click();
      cy.contains('Tambah Line', timeout).should('be.visible');
      cy.get('input[id="nama_line"]', timeout).type('Test Line');
      cy.get('input[id="nama_plant"]', timeout).type('Test Plant');
      cy.get('#user', timeout).click();
      cy.contains('Supervisor', timeout).click(force);
      cy.contains('Submit', timeout).click();
    });

    it('Update Line name with null', () => {
      cy.contains('Test Line', timeout).click();
      cy.contains('GENERAL', timeout).should('be.visible');
      cy.get('input[id="name"]', timeout).should('exist').clear();
      cy.contains('Simpan', timeout).click();
      cy.contains('Nama Line tidak boleh kosong', timeout).should('be.visible');
      cy.contains('Success!', timeout).should('not.exist');
    });

    it('Update Line name success', () => {
      cy.get('.ant-tree-treenode-leaf-last > .ant-tree-node-content-wrapper', timeout).click();
      cy.contains('GENERAL', timeout).should('be.visible');
      cy.get('input[id="name"]', timeout).should('exist').clear().type('Test Line New')
      cy.contains('Simpan', timeout).click();
    });
  });

  describe('Lini', () => {
    describe('General', () => {
      it('Create Lini', () => {
        cy.contains('Tambah', timeout).click();
        cy.contains('Tambah Lini', timeout).click();
        cy.get('input[id="nama_lini"]', timeout).type('Test Lini');
        cy.get('input[id="line"]', timeout).click();
        cy.get('.ant-select-item-option-active > .ant-select-item-option-content', timeout).click({ force: true });
        cy.get('#user', timeout).click();
        cy.contains('Tim Leader', timeout).click(force);
        cy.contains('Submit', timeout).click();
      });

      it('Disable status OEE', () => {
        cy.get(':nth-child(1) > .ant-tree-switcher', timeout).click();
        cy.contains('Ball Mill', timeout).click();
        cy.contains('GENERAL', timeout).should('be.visible');
        cy.contains('RUNTIME', timeout).should('be.visible');
        cy.get('.ant-switch-handle', timeout).click();
        cy.contains('Simpan', timeout).click();
        cy.contains('Success!', timeout).should('be.visible');
      });

      it('Enable status OEE', () => {
        cy.get(':nth-child(1) > .ant-tree-switcher', timeout).click();
        cy.contains('Ball Mill', timeout).click();
        cy.contains('GENERAL', timeout).should('be.visible');
        cy.contains('RUNTIME', timeout).should('be.visible');
        cy.get('.ant-switch-handle', timeout).click();
        cy.contains('Simpan', timeout).click();
        cy.contains('Success!', timeout).should('be.visible');
      });

      it('Update Lini name success', () => {
        cy.get(':nth-child(1) > .ant-tree-switcher', timeout).click();
        cy.wait(3000);
        cy.contains('Test Lini', timeout).click();
        cy.contains('GENERAL', timeout).should('be.visible');
        cy.contains('RUNTIME', timeout).should('be.visible');
        cy.get('input[id="name"]', timeout).should('exist').clear().type('Test Lini New')
        cy.contains('Simpan', timeout).click();
        cy.contains('Success!', timeout).should('be.visible');

        cy.get(':nth-child(1) > .ant-tree-switcher', timeout).click();
        cy.contains('Test Lini New', timeout).click();
        cy.contains('GENERAL', timeout).should('be.visible');
        cy.contains('RUNTIME', timeout).should('be.visible');
        cy.get('input[id="name"]', timeout).should('exist').clear().type('Test Lini')
        cy.contains('Simpan', timeout).click();
        cy.contains('Success!', timeout).should('be.visible');
      });
    });

    describe('Runtime', () => {
      beforeEach(() => {
        cy.get(':nth-child(1) > .ant-tree-switcher', timeout).click();
        cy.contains('Ball Mill', timeout).click();
        cy.contains('GENERAL', timeout).should('be.visible');
        cy.contains('RUNTIME', timeout).click();
      });

      it('Check data', () => {
        cy.contains('No Data', timeout).should('be.visible');
      });
    });

    describe('Operator', () => {
      beforeEach(() => {
        cy.get(':nth-child(1) > .ant-tree-switcher', timeout).click();
        cy.wait(3000);
        cy.contains('Test Lini', timeout).click();
        cy.contains('GENERAL', timeout).should('be.visible');
        cy.contains('OPERATOR', timeout).click();
      });

      it('Select Operator', () => {
        cy.get('.ant-select-selection-item', timeout).click();
        cy.contains('Machine Packaging A1', timeout).click();
        cy.get('[data-testid=submit-btn]', timeout).click();
        cy.contains('Success!', timeout).should('be.visible');
      });
    });
  });

  describe('Mesin', () => {
    describe('General', () => {
      it('Create Mesin', () => {
        cy.contains('Tambah', timeout).click();
        cy.contains('Tambah Mesin', timeout).click();
        cy.contains('Tambah Mesin', timeout).should('be.visible');
        cy.get('[data-testid=id_mesin]', timeout).type(`${Math.floor(Math.random() * 100000)}`)
        cy.get('input[id="nama_mesin"]', timeout).type('Test Mesin');
        cy.get('input[id="line"]', timeout).click();
        cy.get('.ant-select-item-option-content', timeout).contains('Packaging Line 1').click({ force: true });
        cy.get('input[id="lini"]', timeout).click();
        cy.get('.ant-select-item-option-content', timeout).contains('Packaging').click({ force: true });
        cy.get('input[id="user"]', timeout).click();
        cy.get('.ant-select-item-option-content', timeout).contains('gery').click({ force: true });
        cy.contains('Submit', timeout).click();
      });

      it('Update Mesin name success', () => {
        cy.get(':nth-child(1) > .ant-tree-switcher', timeout).click();
        cy.wait(3000);
        cy.get('.ant-tree-treenode-motion > :nth-child(4) > .ant-tree-switcher', timeout).click();
        cy.get(':nth-child(3) > .ant-tree-node-content-wrapper > .ant-tree-title', timeout).click();
        cy.get('[data-testid=name]', timeout).clear().type('Testing New');
        cy.get('[data-testid=submit]', timeout).click();
        cy.contains('Success!', timeout).should('be.visible');

        cy.get(':nth-child(1) > .ant-tree-switcher', timeout).click();
        cy.get(':nth-child(1) > .ant-tree-switcher', timeout).click();
        cy.get(':nth-child(3) > .ant-tree-node-content-wrapper > .ant-tree-title', timeout).click();
        cy.get('[data-testid=name]', timeout).clear().type('Testing');
        cy.get('[data-testid=submit]', timeout).click();
        cy.contains('Success!', timeout).should('be.visible');
      });

      it('Disable Status OEE', () => {
        cy.get(':nth-child(1) > .ant-tree-switcher', timeout).click();
        cy.get(':nth-child(1) > .ant-tree-switcher', timeout).eq(1).click();
        cy.get(':nth-child(3) > .ant-tree-node-content-wrapper > .ant-tree-title', timeout).click();

        cy.get('.ant-switch-handle', timeout).click();
        cy.contains('Simpan', timeout).click();
        cy.contains('Success!', timeout).should('be.visible');
      });


      it('Enable Status OEE', () => {
        cy.get(':nth-child(1) > .ant-tree-switcher', timeout).click();
        cy.get(':nth-child(1) > .ant-tree-switcher', timeout).click();
        cy.get(':nth-child(3) > .ant-tree-node-content-wrapper > .ant-tree-title', timeout).click();
        cy.get('.ant-switch-handle', timeout).click();
        cy.contains('Simpan', timeout).click();
        cy.contains('Success!', timeout).should('be.visible');
      });
    });

    describe('Runtime', () => {
      beforeEach(() => {
        cy.get(':nth-child(1) > .ant-tree-switcher', timeout).click();
        cy.get(':nth-child(1) > .ant-tree-switcher', timeout).click();
        cy.get(':nth-child(3) > .ant-tree-node-content-wrapper > .ant-tree-title', timeout).click();
        cy.contains('RUNTIME', timeout).click();
      });

      it('Check data', () => {
        cy.contains('No Data', timeout).should('be.visible');
      });
    });

    describe('Product', () => {
      beforeEach(() => {
        cy.get(':nth-child(1) > .ant-tree-switcher', timeout).click();
        cy.get(':nth-child(1) > .ant-tree-switcher', timeout).click();
        cy.get(':nth-child(3) > .ant-tree-node-content-wrapper > .ant-tree-title', timeout).click();
        cy.contains('PRODUCT', timeout).click();
      });

      it('Check data', () => {
        cy.contains('No Data', timeout).should('be.visible');
      });
    });
  });
});
