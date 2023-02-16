/// <reference types="Cypress" />

var timeout = { timeout: 60000 }

describe('Target', () => {
  before(() => {
    cy.login('admin');
  });

  it('Akan muncul halaman untuk setting target', () => {
    cy.get('[title="Target"] > .ant-menu-title-content > a', timeout).click();
    cy.get('.title', timeout).contains('TARGET');
  });

  it('Menampilkan device berdasarkan pilihan sektor', () => {
    cy.wait(3000);
    // list device
    cy.get('form > :nth-child(1) > label', timeout).contains('MP_01');
    cy.get('form > :nth-child(2) > label', timeout).contains('Power Meter Trial');
    // filter sektor
    cy.get('.ant-select-selection-item', timeout).click();
    cy.wait(1000);
    cy.contains('Gedung 1', timeout).click();
    // list device
    cy.get('form > :nth-child(1) > label', timeout).contains('Power Meter Trial');
  });

  it('Menampilkan kolom indikator yang ada pada form target', () => {
    cy.get('form > :nth-child(1) > label', timeout).click({force:true});
    cy.get('.ant-col-24 > .TargetPage__H5-sc-1qpmm05-1', timeout).contains('Target');
    cy.get('#target_form_target_energy > .TargetPage__Label-sc-1qpmm05-3', timeout).contains('Energy (kWh)');
    cy.get('#target_form_target_energy > .ant-input-number > .ant-input-number-input-wrap > .ant-input-number-input', timeout).should('be.visible');
    cy.get('#target_form_target_index > .TargetPage__Label-sc-1qpmm05-3', timeout).contains('Index');
    // bug: unit satuan index belum ditulis
    cy.get('#target_form_target_index > .ant-input-number > .ant-input-number-input-wrap > .ant-input-number-input', timeout).should('be.visible');
    cy.get('.TargetPage__BtnSave-sc-1qpmm05-5', timeout).should('be.visible');
  });
  
  it('Data nilai target berhasil diperbarui dan disimpan', () => {
    cy.get('#target_form_target_energy > .ant-input-number > .ant-input-number-input-wrap > .ant-input-number-input', timeout)
      .clear().type('1');
    cy.get('#target_form_target_index > .ant-input-number > .ant-input-number-input-wrap > .ant-input-number-input', timeout)
      .clear().type('90000');
    cy.get('.TargetPage__BtnSave-sc-1qpmm05-5', timeout).click();

    // check the result
    cy.reload();
    cy.get('.title', timeout).contains('TARGET');
    // filter sektor
    cy.wait(3000);
    cy.get('.ant-select-selection-item', timeout).click();
    cy.wait(1000);
    cy.contains('Gedung 1', timeout).click();
    // filter device
    cy.get('form > :nth-child(1) > label', timeout).click({force:true});
    // form target
    cy.get('.ant-col-24 > .TargetPage__H5-sc-1qpmm05-1', timeout).contains('Target');
    cy.get('#target_form_target_energy > .TargetPage__Label-sc-1qpmm05-3', timeout).contains('Energy (kWh)');
    cy.get('#target_form_target_energy > .ant-input-number > .ant-input-number-input-wrap > .ant-input-number-input', timeout).should('be.visible');
    cy.get('#target_form_target_index > .TargetPage__Label-sc-1qpmm05-3', timeout).contains('Index');
    // bug: unit satuan index belum ditulis
    cy.get('#target_form_target_index > .ant-input-number > .ant-input-number-input-wrap > .ant-input-number-input', timeout).should('be.visible');
    cy.get('.TargetPage__BtnSave-sc-1qpmm05-5', timeout).should('be.visible');
    // check value
    cy.get('#target_form_target_energy > .ant-input-number > .ant-input-number-input-wrap > .ant-input-number-input', timeout)
    .should('have.value', '1');
    cy.get('#target_form_target_index > .ant-input-number > .ant-input-number-input-wrap > .ant-input-number-input', timeout)
    .should('have.value', '90000');

    // back to prev data
    cy.get('#target_form_target_energy > .ant-input-number > .ant-input-number-input-wrap > .ant-input-number-input', timeout)
    .clear().type('90000');
    cy.get('#target_form_target_index > .ant-input-number > .ant-input-number-input-wrap > .ant-input-number-input', timeout)
      .clear().type('1');
    cy.get('.TargetPage__BtnSave-sc-1qpmm05-5', timeout).click();
    // check the result
    cy.reload();
    // filter sektor
    cy.wait(3000);
    cy.get('.ant-select-selection-item', timeout).click();
    cy.wait(1000);
    cy.contains('Gedung 1', timeout).click();
    // filter device
    cy.get('form > :nth-child(1) > label', timeout).click({force:true});
    // check value
    cy.get('#target_form_target_energy > .ant-input-number > .ant-input-number-input-wrap > .ant-input-number-input', timeout)
    .should('have.value', '90000');
    cy.get('#target_form_target_index > .ant-input-number > .ant-input-number-input-wrap > .ant-input-number-input', timeout)
    .should('have.value', '1');
  });
});