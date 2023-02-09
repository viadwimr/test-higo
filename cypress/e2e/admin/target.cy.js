/// <reference types="Cypress" />

var timeout = { timeout: 5000 }

describe('Target', () => {
  before(() => {
    cy.login('admin');
  });
  
  describe('Save Target', () => {
    beforeEach(() => {
      cy.visit('/setting-target');
      cy.wait(3000);
      // filter sektor
      cy.get('.ant-select-selection-item', timeout).click();
      cy.wait(3000);
      cy.contains('Gedung 2', timeout).click();
      cy.contains('No data', timeout).should('be.visible');
      cy.get('.ant-select-selection-item', timeout).click();
      cy.wait(3000);
      cy.contains('Gedung 1', timeout).click();
      // filter device
      cy.get('form > :nth-child(1) > label', timeout).click({force:true});
    });
    
    describe('Validasi Input', () => {
      it('Kosong', () => {
        cy.get('#target_form_target_energy > .ant-input-number > .ant-input-number-input-wrap > .ant-input-number-input', timeout)
          .clear();
        cy.get('#target_form_target_index > .ant-input-number > .ant-input-number-input-wrap > .ant-input-number-input', timeout)
          .clear();
        cy.get('.TargetPage__BtnSave-sc-1qpmm05-5', timeout).click();
        cy.get('#target_form_target_index_help > .ant-form-item-explain-error', timeout).contains('Target is required');
        cy.get('#target_form_target_energy_help > .ant-form-item-explain-error', timeout)
          .contains('Target is required');
      });

      it('Input letter', () => {
        cy.get('#target_form_target_energy > .ant-input-number > .ant-input-number-input-wrap > .ant-input-number-input', timeout)
          .clear().type('satu');
        cy.get('#target_form_target_index > .ant-input-number > .ant-input-number-input-wrap > .ant-input-number-input', timeout)
          .clear().type('dua');
        cy.get('.TargetPage__BtnSave-sc-1qpmm05-5', timeout).click();
        cy.get('#target_form_target_index_help > .ant-form-item-explain-error', timeout).contains('Target is required');
        cy.get('#target_form_target_energy_help > .ant-form-item-explain-error', timeout)
          .contains('Target is required');
      });

      it('Input float', () => {
        // comma
        cy.get('#target_form_target_energy > .ant-input-number > .ant-input-number-input-wrap > .ant-input-number-input', timeout)
          .clear().type('0,2');
        cy.get('#target_form_target_index > .ant-input-number > .ant-input-number-input-wrap > .ant-input-number-input', timeout)
          .clear().type('9,8');
        cy.get('.TargetPage__BtnSave-sc-1qpmm05-5', timeout).click();
        // input comma can't visible
        cy.get('#target_form_target_energy > .ant-input-number > .ant-input-number-input-wrap > .ant-input-number-input', timeout)
          .should('have.value','2');
        cy.get('#target_form_target_index > .ant-input-number > .ant-input-number-input-wrap > .ant-input-number-input', timeout)
          .should('have.value','98');

        // dot
        cy.get('#target_form_target_energy > .ant-input-number > .ant-input-number-input-wrap > .ant-input-number-input', timeout)
          .clear().type('0.2');
        cy.get('#target_form_target_index > .ant-input-number > .ant-input-number-input-wrap > .ant-input-number-input', timeout)
          .clear().type('9.8');
        cy.get('.TargetPage__BtnSave-sc-1qpmm05-5', timeout).click();
        // check input
        cy.get('#target_form_target_energy > .ant-input-number > .ant-input-number-input-wrap > .ant-input-number-input', timeout)
          .should('have.value','0.2');
        cy.get('#target_form_target_index > .ant-input-number > .ant-input-number-input-wrap > .ant-input-number-input', timeout)
          .should('have.value','9.8');
      });

      it('Input minus', () => {
        cy.get('#target_form_target_energy > .ant-input-number > .ant-input-number-input-wrap > .ant-input-number-input', timeout)
          .clear().type('-1');
        cy.get('#target_form_target_index > .ant-input-number > .ant-input-number-input-wrap > .ant-input-number-input', timeout)
          .clear().type('-99');
        cy.get('.TargetPage__BtnSave-sc-1qpmm05-5', timeout).click();
        // check input
        cy.get('#target_form_target_energy > .ant-input-number > .ant-input-number-input-wrap > .ant-input-number-input', timeout)
          .should('have.value','-1');
        cy.get('#target_form_target_index > .ant-input-number > .ant-input-number-input-wrap > .ant-input-number-input', timeout)
          .should('have.value','-99');
      });
    });

    describe('CRUD', () => {
      beforeEach(() => {
        cy.visit('/setting-target');
        cy.wait(3000);
        // filter sektor
        cy.get('.ant-select-selection-item', timeout).click();
        cy.wait(3000);
        cy.contains('Gedung 2', timeout).click();
        cy.contains('No data', timeout).should('be.visible');
        cy.get('.ant-select-selection-item', timeout).click();
        cy.wait(3000);
        cy.contains('Gedung 1', timeout).click();
        // filter device
        cy.get('form > :nth-child(1) > label', timeout).click({force:true});
      });

      it('Add target', () => {
        cy.get('#target_form_target_energy > .ant-input-number > .ant-input-number-input-wrap > .ant-input-number-input', timeout)
          .clear().type('1');
        cy.get('#target_form_target_index > .ant-input-number > .ant-input-number-input-wrap > .ant-input-number-input', timeout)
          .clear().type('90000');
        cy.get('.TargetPage__BtnSave-sc-1qpmm05-5', timeout).click();
      });

      it('Check target', () => {
        cy.get('#target_form_target_energy > .ant-input-number > .ant-input-number-input-wrap > .ant-input-number-input', timeout)
          .should('have.contain', '1');
        cy.get('#target_form_target_index > .ant-input-number > .ant-input-number-input-wrap > .ant-input-number-input', timeout)
        .should('have.contain', '90000');
      });

      it('Update target', () => {
        cy.get('#target_form_target_energy > .ant-input-number > .ant-input-number-input-wrap > .ant-input-number-input', timeout)
          .clear().type('90000');
        cy.get('#target_form_target_index > .ant-input-number > .ant-input-number-input-wrap > .ant-input-number-input', timeout)
          .clear().type('1');
        cy.get('.TargetPage__BtnSave-sc-1qpmm05-5', timeout).click();

        // check target after update
        cy.get('#target_form_target_energy > .ant-input-number > .ant-input-number-input-wrap > .ant-input-number-input', timeout)
        .should('have.contain', '90000');
        cy.get('#target_form_target_index > .ant-input-number > .ant-input-number-input-wrap > .ant-input-number-input', timeout)
        .should('have.contain', '1');
      });
    });
  });
  
  describe('Search Device', () => {
    beforeEach(() => {
      cy.visit('/setting-target');
      cy.wait(3000);
      cy.get('.ant-select-selection-item', timeout).click();
      cy.wait(3000);
    });

    it('Semua Sektor', () => {
      cy.contains('Semua Sektor', timeout).click();
      cy.get('.ant-input-affix-wrapper', timeout).clear().type('01');
      cy.get('form > :nth-child(1) > label', timeout).contains('MP_01');
      cy.get('form > :nth-child(2) > label', timeout).should('not.exist');
      cy.contains('Power Meter Trial', timeout).should('not.exist');
    });

    it('No Device Sektor', () => {
      cy.contains('Gedung 2', timeout).click();
      cy.get('.ant-input-affix-wrapper', timeout).should('not.be.enabled');
      cy.get('form > :nth-child(1) > label', timeout).should('not.exist');
      cy.get('form > :nth-child(2) > label', timeout).should('not.exist');
      cy.contains('MP_01', timeout).should('not.exist');
      cy.contains('Power Meter Trial', timeout).should('not.exist');
    });
  });
});