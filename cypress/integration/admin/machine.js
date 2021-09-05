/* eslint-disable */
/// <reference types="cypress" />

const timeout = { timeout: 60000 };
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
      cy.contains('spv_line_1', timeout).click(force);
      cy.contains('Submit', timeout).click();
      cy.contains('Success!', timeout).should('be.visible');
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
        cy.contains('mixer', timeout).click(force);
        cy.contains('Submit', timeout).click();
      });

      it('Disable status OEE', () => {
        cy.contains('Testing Line', timeout).click();
        cy.get('.ant-tree-treenode-selected > .ant-tree-switcher', timeout).click();
        cy.wait(2000);
        cy.get('.ant-tree-treenode-switcher-close.ant-tree-treenode-leaf-last > .ant-tree-node-content-wrapper > .ant-tree-title', timeout).eq(0).click(force);
        cy.contains('GENERAL', timeout).should('be.visible');
        cy.contains('RUNTIME', timeout).should('be.visible');
        cy.get('.ant-switch-handle', timeout).click();
        cy.contains('Simpan', timeout).click();
        cy.contains('Success!', timeout).should('be.visible');

        // Check
        cy.contains('Testing Line', timeout).click();
        cy.get('.ant-tree-treenode-selected > .ant-tree-switcher', timeout).click();
        cy.wait(2000);
        cy.get('.ant-tree-treenode-switcher-close.ant-tree-treenode-leaf-last > .ant-tree-node-content-wrapper > .ant-tree-title', timeout).eq(0).click(force);
        cy.contains('GENERAL', timeout).should('be.visible');
        cy.get('button[aria-checked="false"]', timeout).should('exist');
      });

      it('Enable status OEE', () => {
        cy.contains('Testing Line', timeout).click();
        cy.get('.ant-tree-treenode-selected > .ant-tree-switcher', timeout).click();
        cy.wait(2000);
        cy.get('.ant-tree-treenode-switcher-close.ant-tree-treenode-leaf-last > .ant-tree-node-content-wrapper > .ant-tree-title', timeout).eq(0).click(force);
        cy.contains('GENERAL', timeout).should('be.visible');
        cy.contains('RUNTIME', timeout).should('be.visible');
        cy.get('.ant-switch-handle', timeout).click();
        cy.contains('Simpan', timeout).click();
        cy.contains('Success!', timeout).should('be.visible');

        // Check
        cy.contains('Testing Line', timeout).click();
        cy.get('.ant-tree-treenode-selected > .ant-tree-switcher', timeout).click();
        cy.wait(2000);
        cy.get('.ant-tree-treenode-switcher-close.ant-tree-treenode-leaf-last > .ant-tree-node-content-wrapper > .ant-tree-title', timeout).eq(0).click(force);
        cy.contains('GENERAL', timeout).should('be.visible');
        cy.get('button[aria-checked="true"]', timeout).should('exist');
      });

      it('Update Lini name success', () => {
        cy.contains('Testing Line', timeout).click();
        cy.get('.ant-tree-treenode-selected > .ant-tree-switcher', timeout).click();
        cy.wait(2000);
        cy.get('.ant-tree-treenode-switcher-close.ant-tree-treenode-leaf-last > .ant-tree-node-content-wrapper > .ant-tree-title', timeout).eq(0).click(force);
        cy.contains('GENERAL', timeout).should('be.visible');
        cy.contains('RUNTIME', timeout).should('be.visible');
        cy.get('input[id="name"]', timeout).should('exist').clear().type('Test Lini New')
        cy.contains('Simpan', timeout).click();
        cy.contains('Success!', timeout).should('be.visible');

        cy.contains('Testing Line', timeout).click();
        cy.get('.ant-tree-treenode-selected > .ant-tree-switcher', timeout).click();
        cy.wait(2000);
        cy.get('.ant-tree-treenode-switcher-close.ant-tree-treenode-leaf-last > .ant-tree-node-content-wrapper > .ant-tree-title', timeout).eq(0).click(force);
        cy.get('input[id="name"]', timeout).should('exist').clear().type('Test Lini');
        cy.contains('Simpan', timeout).click();
        cy.contains('Success!', timeout).should('be.visible');
      });
    });

    describe('Runtime', () => {
      beforeEach(() => {
        cy.contains('Testing Line', timeout).click();
        cy.get('.ant-tree-treenode-selected > .ant-tree-switcher', timeout).click();
        cy.wait(2000);
        cy.get('.ant-tree-treenode-switcher-close.ant-tree-treenode-leaf-last > .ant-tree-node-content-wrapper > .ant-tree-title', timeout).eq(0).click(force);
        cy.contains('RUNTIME', timeout).click();
      });

      it('Check data', () => {
        cy.contains('No Data', timeout).should('be.visible');
      });
    });

    describe('Operator', () => {
      beforeEach(() => {
        cy.contains('Testing Line', timeout).click();
        cy.get('.ant-tree-treenode-selected > .ant-tree-switcher', timeout).click();
        cy.wait(2000);
        cy.get('.ant-tree-treenode-switcher-close.ant-tree-treenode-leaf-last > .ant-tree-node-content-wrapper > .ant-tree-title', timeout).eq(0).click(force);
        cy.contains('OPERATOR', timeout).click();
      });

      it('Select Operator', () => {
        cy.get('.ant-select-selection-item', timeout).click();
        cy.contains('Machine Packaging A1', timeout).click();
        cy.get('.ant-form-item-control-input-content > .Button__StyledButton-lb9z7q-0', timeout).click();
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
        cy.get('.ant-select-item-option-content', timeout).contains('Production Line 2').click({ force: true });
        cy.get('input[id="lini"]', timeout).click();
        cy.get('.ant-select-item-option-content', timeout).contains('Test Lini').click({ force: true });
        cy.get('input[id="user"]', timeout).click();
        cy.get('.ant-select-item-option-content', timeout).contains('gerysalut').click({ force: true });
        cy.contains('Submit', timeout).click();
      });

      it('Update Mesin name success', () => {
        cy.contains('Production Line 2', timeout).click();
        cy.get('.ant-tree-treenode-selected > .ant-tree-switcher', timeout).click();
        cy.wait(2000);
        cy.get('.ant-tree-treenode-switcher-close.ant-tree-treenode-leaf-last > .ant-tree-node-content-wrapper > .ant-tree-title', timeout).eq(0).click(force);
        cy.get('.ant-tree-treenode-selected > .ant-tree-switcher > .anticon > svg', timeout).eq(0).click();
        cy.wait(2000);
        cy.get(':nth-child(3) > .ant-tree-node-content-wrapper > .ant-tree-title', timeout).eq(0).click();
        cy.get('input[id="name"]', timeout).should('exist').clear().type('Test Mesin New');
        cy.contains('Simpan', timeout).click();
        cy.contains('Success!', timeout).should('be.visible');

        cy.contains('Production Line 2', timeout).click();
        cy.get('.ant-tree-treenode-selected > .ant-tree-switcher', timeout).click();
        cy.wait(2000);
        cy.get('.ant-tree-treenode-switcher-close.ant-tree-treenode-leaf-last > .ant-tree-node-content-wrapper > .ant-tree-title', timeout).eq(0).click(force);
        cy.get('.ant-tree-treenode-selected > .ant-tree-switcher > .anticon > svg', timeout).eq(0).click();
        cy.wait(2000);
        cy.get(':nth-child(3) > .ant-tree-node-content-wrapper > .ant-tree-title', timeout).eq(0).click();
        cy.get('input[id="name"]', timeout).should('exist').clear().type('Test Mesin');
        cy.contains('Simpan', timeout).click();
        cy.contains('Success!', timeout).should('be.visible');
      });

      it('Disable Status OEE', () => {
        cy.contains('Production Line 2', timeout).click();
        cy.get('.ant-tree-treenode-selected > .ant-tree-switcher', timeout).click();
        cy.wait(2000);
        cy.get('.ant-tree-treenode-switcher-close.ant-tree-treenode-leaf-last > .ant-tree-node-content-wrapper > .ant-tree-title', timeout).eq(0).click(force);
        cy.get('.ant-tree-treenode-selected > .ant-tree-switcher > .anticon > svg', timeout).eq(0).click();
        cy.wait(2000);
        cy.get(':nth-child(3) > .ant-tree-node-content-wrapper > .ant-tree-title', timeout).eq(0).click();

        cy.get('.ant-switch-handle', timeout).click();
        cy.contains('Simpan', timeout).click();
        cy.contains('Success!', timeout).should('be.visible');

        // Check
        cy.contains('Production Line 2', timeout).click();
        cy.get('.ant-tree-treenode-selected > .ant-tree-switcher', timeout).click();
        cy.wait(2000);
        cy.get(':nth-child(2) > .ant-tree-node-content-wrapper > .ant-tree-title', timeout).eq(0).click();
        cy.get('.ant-tree-treenode-selected > .ant-tree-switcher > .anticon > svg', timeout).eq(0).click();
        cy.wait(2000);
        cy.get(':nth-child(3) > .ant-tree-node-content-wrapper > .ant-tree-title', timeout).eq(0).click();
        cy.get('button[aria-checked="false"]', timeout).should('exist');
      });


      it('Enable Status OEE', () => {
        cy.contains('Production Line 2', timeout).click();
        cy.get('.ant-tree-treenode-selected > .ant-tree-switcher', timeout).click();
        cy.wait(2000);
        cy.get('.ant-tree-treenode-switcher-close.ant-tree-treenode-leaf-last > .ant-tree-node-content-wrapper > .ant-tree-title', timeout).eq(0).click(force);
        cy.get('.ant-tree-treenode-selected > .ant-tree-switcher > .anticon > svg', timeout).eq(0).click();
        cy.wait(2000);
        cy.get(':nth-child(3) > .ant-tree-node-content-wrapper > .ant-tree-title', timeout).eq(0).click();

        cy.get('.ant-switch-handle', timeout).click();
        cy.contains('Simpan', timeout).click();
        cy.contains('Success!', timeout).should('be.visible');

        // Check
        cy.contains('Production Line 2', timeout).click();
        cy.get('.ant-tree-treenode-selected > .ant-tree-switcher', timeout).click();
        cy.wait(2000);
        cy.get(':nth-child(2) > .ant-tree-node-content-wrapper > .ant-tree-title', timeout).eq(0).click();
        cy.get('.ant-tree-treenode-selected > .ant-tree-switcher > .anticon > svg', timeout).eq(0).click();
        cy.wait(3000);
        cy.get(':nth-child(3) > .ant-tree-node-content-wrapper > .ant-tree-title', timeout).eq(0).click();
        cy.get('button[aria-checked="true"]', timeout).should('exist');
      });
    });

    describe('Runtime', () => {
      beforeEach(() => {
        cy.contains('Production Line 2', timeout).click();
        cy.get('.ant-tree-treenode-selected > .ant-tree-switcher', timeout).click();
        cy.wait(2000);
        cy.get('.ant-tree-treenode-switcher-close.ant-tree-treenode-leaf-last > .ant-tree-node-content-wrapper > .ant-tree-title', timeout).eq(0).click(force);
        cy.get('.ant-tree-treenode-selected > .ant-tree-switcher > .anticon > svg', timeout).eq(0).click();
        cy.wait(2000);
        cy.get(':nth-child(3) > .ant-tree-node-content-wrapper > .ant-tree-title', timeout).eq(0).click();
        cy.contains('RUNTIME', timeout).click();
      });

      it('Check data', () => {
        cy.contains('No Data', timeout).should('be.visible');
      });
    });

    describe('Product', () => {
      beforeEach(() => {
        cy.contains('Production Line 2', timeout).click();
        cy.get('.ant-tree-treenode-selected > .ant-tree-switcher', timeout).click();
        cy.wait(2000);
        cy.get('.ant-tree-treenode-switcher-close.ant-tree-treenode-leaf-last > .ant-tree-node-content-wrapper > .ant-tree-title', timeout).eq(0).click(force);
        cy.get('.ant-tree-treenode-selected > .ant-tree-switcher > .anticon > svg', timeout).eq(0).click();
        cy.wait(2000);
        cy.get(':nth-child(3) > .ant-tree-node-content-wrapper > .ant-tree-title', timeout).eq(0).click();
        cy.contains('PRODUCT', timeout).click();
      });

      it('Check data', () => {
        cy.contains('No Data', timeout).should('be.visible');
      });
    });
  });
});
