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
    // filter asset
    cy.get('.ant-select-selector', timeout).click();
    cy.wait(1000);
    cy.contains('DMIA 1', timeout).click();
    cy.wait(1000);
    // list sektor
    cy.get('form > :nth-child(1) > label', timeout).contains('Gedung 1');
    cy.get('form > :nth-child(2) > label', timeout).contains('Gedung 2');
    cy.get('form > :nth-child(3) > label', timeout).contains('Gedung 3');
    /*
    // filter sektor
    cy.get('.ant-select-selection-item', timeout).click();
    cy.wait(1000);
    cy.contains('Gedung 1', timeout).click();
    */
  });

  it('Menampilkan kolom indikator yang ada pada form target', () => {
    cy.get('form > :nth-child(1) > label', timeout).click({force:true});
    cy.get('.ant-col-24 > .TargetPage__H5-sc-1qpmm05-1', timeout).contains('TARGET');
    cy.get('#target_form_index > .TargetPage__Label-sc-1qpmm05-3', timeout).contains('Index');
    cy.get('#target_form_index > .ant-input-number > .ant-input-number-input-wrap > .ant-input-number-input', timeout).should('be.visible');
    cy.get('#target_form_daya_hour > .TargetPage__Label-sc-1qpmm05-3', timeout).contains('Energi (kWh)');
    // bug: unit satuan index belum ditulis
    cy.get('#target_form_daya_hour > .ant-input-number > .ant-input-number-input-wrap > .ant-input-number-input', timeout).should('be.visible');
    cy.get('.TargetPage__BtnSave-sc-1qpmm05-5', timeout).should('be.visible');
  });
  
  it('Data nilai target berhasil diperbarui dan disimpan', () => {
    cy.get('#target_form_daya_hour > .ant-input-number > .ant-input-number-input-wrap > .ant-input-number-input', timeout)
      .clear().type('90000');
    cy.get('#target_form_index > .ant-input-number > .ant-input-number-input-wrap > .ant-input-number-input', timeout)
      .clear().type('1');
    cy.get('.TargetPage__BtnSave-sc-1qpmm05-5', timeout).click();

    // check the result
    cy.reload();
    cy.get('.title', timeout).contains('TARGET');
    // filter sektor
    cy.wait(3000);
    cy.get('.ant-select-selection-item', timeout).click();
    cy.wait(1000);
    cy.get(':nth-child(2) > .ant-select-tree-node-content-wrapper', timeout).click();
    cy.wait(1000);
    cy.contains('Gedung 1', timeout).click();
    // filter device
    cy.get('form > :nth-child(1) > label', timeout).click({force:true});
    // form target
    cy.get('.ant-col-24 > .TargetPage__H5-sc-1qpmm05-1', timeout).contains('TARGET');
    cy.get('#target_form_index > .TargetPage__Label-sc-1qpmm05-3', timeout).contains('Index');
    cy.get('#target_form_index > .ant-input-number > .ant-input-number-input-wrap > .ant-input-number-input', timeout).should('be.visible');
    cy.get('#target_form_daya_hour > .TargetPage__Label-sc-1qpmm05-3', timeout).contains('Energi (kWh)');
    // bug: unit satuan index belum ditulis
    cy.get('#target_form_daya_hour > .ant-input-number > .ant-input-number-input-wrap > .ant-input-number-input', timeout).should('be.visible');
    cy.get('.TargetPage__BtnSave-sc-1qpmm05-5', timeout).should('be.visible');
    // check value
    cy.get('#target_form_index > .ant-input-number > .ant-input-number-input-wrap > .ant-input-number-input', timeout)
    .should('have.value', '1');
    cy.get('#target_form_daya_hour > .ant-input-number > .ant-input-number-input-wrap > .ant-input-number-input', timeout)
    .should('have.value', '90000');

    // back to prev data
    cy.get('#target_form_daya_hour > .ant-input-number > .ant-input-number-input-wrap > .ant-input-number-input', timeout)
    .clear().type('90000');
    cy.get('#target_form_index > .ant-input-number > .ant-input-number-input-wrap > .ant-input-number-input', timeout)
      .clear().type('1');
    cy.get('.TargetPage__BtnSave-sc-1qpmm05-5', timeout).click();
    // check the result the other form
    cy.reload();
    // filter sektor
    cy.wait(3000);
    cy.get('.ant-select-selection-item', timeout).click();
    cy.wait(1000);
    cy.get(':nth-child(3) > .ant-select-tree-node-content-wrapper', timeout).click();
    cy.wait(1000);
    cy.contains('Fasilitas', timeout).click();
    // bug: jika diisi 0 tidak tersimpan tapi status sukses
    // cy.get('#target_form_target_energy > .ant-input-number > .ant-input-number-input-wrap > .ant-input-number-input', timeout)
    // .should('have.value', '4');
    // cy.get('#target_form_target_index > .ant-input-number > .ant-input-number-input-wrap > .ant-input-number-input', timeout)
    // .should('have.value', '6');

    // check the result
    // filter sektor
    cy.wait(3000);
    cy.get('.ant-select-selection-item', timeout).click();
    cy.wait(1000);
    cy.get(':nth-child(1) > .ant-select-tree-node-content-wrapper', timeout).click();
    cy.wait(1000);
    // filter device
    cy.get('form > :nth-child(1) > label', timeout).click({force:true});
    // check value
    cy.get('#target_form_daya_hour > .ant-input-number > .ant-input-number-input-wrap > .ant-input-number-input', timeout)
    .should('have.value', '90000');
    cy.get('#target_form_index > .ant-input-number > .ant-input-number-input-wrap > .ant-input-number-input', timeout)
    .should('have.value', '1');
  });
});