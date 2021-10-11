/// <reference types="Cypress" />

var timeout = { timeout: 60000 }

describe('Device', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get('[title="Device"] > .ant-menu-title-content > a', timeout).click();
  });

  it('Check list device', () => {

  });

  it('Filter sektor', () => {
    cy.wait(3000);
    cy.get('[data-testid=select-sector] > .ant-select-selector > .ant-select-selection-item', timeout).click({force:true});
    cy.contains('Enrober', timeout).click();
  });

  describe('Detail Device', () => {
    describe('Edit Device', () => {
      it('Simpan', () => {
        cy.wait(3000);
        cy.get('[data-testid=select-sector] > .ant-select-selector > .ant-select-selection-item', timeout).click({force:true});
        cy.contains('Ball Mill', timeout).click();
        cy.get(':nth-child(1) > a > .sector-card', timeout).click();
        cy.get('[style="margin-left: -5px; margin-right: -5px; row-gap: 0px;"] > :nth-child(1) > .Button__BaseButton-sc-1hmbtsr-0', timeout).click({multiple:true});
        cy.get('[data-testid=input-device_name]', timeout).clear().type('Aauto test');
        cy.get('[data-testid=select-sector] > .ant-select-selector', timeout).click();
        cy.contains('Mixer', timeout).click();
        cy.get('[data-testid=input-location]', timeout).clear().type('auto test');
        cy.get('.ant-row-end > .ant-col > .Button__BaseButton-sc-1hmbtsr-0').click();
      });

      it('Add Additional Info', () => {
        cy.wait(3000);
        cy.get('[data-testid=select-sector] > .ant-select-selector > .ant-select-selection-item', timeout).click({force:true});
        cy.contains('Mixer', timeout).click();
        cy.get(':nth-child(1) > a > .sector-card', timeout).click();
        cy.get('[style="margin-left: -5px; margin-right: -5px; row-gap: 0px;"] > :nth-child(1) > .Button__BaseButton-sc-1hmbtsr-0', timeout).click({multiple:true});
        cy.get('[data-testid=select-sector] > .ant-select-selector', timeout).click();
        cy.contains('Ball Mill', timeout).click();
        cy.get('[style="margin-bottom: 198px;"] > .ant-btn', timeout).click();
        cy.get('[data-testid=input-new-label]', timeout).clear().type('test');
        cy.get('[data-testid=input-new-info]', timeout).clear().type('auto');
        cy.get('[style="display: flex; width: 100%; justify-content: flex-end;"] > .Button__BaseButton-sc-1hmbtsr-0').click();
        cy.get('[style="margin-bottom: 198px;"] > .ant-btn', timeout).click();
        cy.get('[data-testid=input-new-label]', timeout).clear().type('test 2');
        cy.get('[data-testid=input-new-info]', timeout).clear().type('auto 2');
        cy.get('[style="display: flex; width: 100%; justify-content: flex-end;"] > .Button__BaseButton-sc-1hmbtsr-0').click();
        cy.get('.ant-row-end > .ant-col > .Button__BaseButton-sc-1hmbtsr-0').click();
      });

      it('Update Additional Info', () => {
        cy.wait(3000);
        cy.get('[data-testid=select-sector] > .ant-select-selector > .ant-select-selection-item', timeout).click({force:true});
        cy.contains('Ball Mill', timeout).click();
        cy.get(':nth-child(1) > a > .sector-card', timeout).click();
        cy.get('[style="margin-left: -5px; margin-right: -5px; row-gap: 0px;"] > :nth-child(1) > .Button__BaseButton-sc-1hmbtsr-0', timeout).click({multiple:true});
        cy.get('[style="margin-bottom: 198px;"] > .ant-btn', timeout).click();
        cy.get(':nth-child(6) > .ant-row > .ant-col > .ant-form-item-control-input > .ant-form-item-control-input-content > [data-testid=input-additional_info]', timeout).clear({force:true}).type('auto update', {force:true});
        cy.get(':nth-child(8) > .ant-row > .ant-col > .ant-form-item-control-input > .ant-form-item-control-input-content > [data-testid=input-additional_info]', timeout).clear({force:true}).type('auto 2 update', {force:true});
        cy.get('.ant-row-end > .ant-col > .Button__BaseButton-sc-1hmbtsr-0').click({force:true});
      });

      it('Cek Data Additional Info', () => {
        cy.wait(3000);
        cy.get('[data-testid=select-sector] > .ant-select-selector > .ant-select-selection-item', timeout).click({force:true});
        cy.contains('Ball Mill', timeout).click();
        cy.get(':nth-child(1) > a > .sector-card', timeout).click();
        cy.get('[style="margin-left: -5px; margin-right: -5px; row-gap: 0px;"] > :nth-child(1) > .Button__BaseButton-sc-1hmbtsr-0', timeout).click({multiple:true});
        cy.get('[data-testid=input-device_name]', timeout).should('have.value', 'Aauto test');
        cy.get('[data-testid=select-sector] > .ant-select-selector', timeout).should('have.contain', 'Ball Mill');
        cy.get('[data-testid=input-location]', timeout).should('have.value', 'auto test');
        cy.get(':nth-child(6) > .ant-row > .ant-col > .ant-form-item-control-input > .ant-form-item-control-input-content > [data-testid=input-additional_info]', timeout).should('have.value', 'auto update');
        cy.get(':nth-child(8) > .ant-row > .ant-col > .ant-form-item-control-input > .ant-form-item-control-input-content > [data-testid=input-additional_info]', timeout).should('have.value', 'auto 2 update');
        cy.get('.ant-modal-close-x > .anticon > svg').click();
      });

      it('Hapus Additional Info', () => {
        cy.wait(3000);
        cy.get('[data-testid=select-sector] > .ant-select-selector > .ant-select-selection-item', timeout).click({force:true});
        cy.contains('Ball Mill', timeout).click();
        cy.get(':nth-child(1) > a > .sector-card', timeout).click();
        cy.get('[style="margin-left: -5px; margin-right: -5px; row-gap: 0px;"] > :nth-child(1) > .Button__BaseButton-sc-1hmbtsr-0', timeout).click({multiple:true});
        cy.get(':nth-child(6) > [style="height: 40px; display: flex; align-items: center;"]', timeout).click();
        cy.contains('Hapus').click({force:true});
        cy.get(':nth-child(6) > [style="height: 40px; display: flex; align-items: center;"]', timeout).click();
        cy.contains('Hapus').click({force:true});
        cy.get('.ant-row-end > .ant-col > .Button__BaseButton-sc-1hmbtsr-0').click({force:true});
      });
    });
      
    describe('Setting Kalibrasi', () => {
      it('Validasi Input dan Simpan', () => {
        cy.wait(3000);
        cy.get('[data-testid=select-sector] > .ant-select-selector > .ant-select-selection-item', timeout).click({force:true});
        cy.contains('Ball Mill', timeout).click();
        cy.get(':nth-child(1) > a > .sector-card', timeout).click();
        cy.get(':nth-child(2) > .ant-row > :nth-child(2) > .ant-dropdown-trigger', timeout).click();
        cy.contains('Edit Kalibrasi', timeout).click();
        cy.get('.DetailCondition__InputNum-z5ehht-1', timeout).clear().type('abc').should('have.value', '');
        cy.get('.DetailCondition__InputNum-z5ehht-1', timeout).clear().type('3,9').should('have.value', '39');
        cy.get('.DetailCondition__InputNum-z5ehht-1', timeout).clear().type('44').should('have.value', '44');
        cy.get('.ant-row-end > .Button__BaseButton-sc-1hmbtsr-0', timeout).click();
      });

      it('Cek Data Kalibrasi', () => {
        cy.wait(3000);
        cy.get('[data-testid=select-sector] > .ant-select-selector > .ant-select-selection-item', timeout).click({force:true});
        cy.contains('Ball Mill', timeout).click();
        cy.get(':nth-child(1) > a > .sector-card', timeout).click();
        cy.get(':nth-child(2) > .ant-row > :nth-child(2) > .ant-dropdown-trigger', timeout).click();
        cy.contains('Edit Kalibrasi', timeout).click();
        cy.get('.DetailCondition__InputNum-z5ehht-1', timeout).should('have.value', '44');
        const todaysDate = Cypress.moment().format('DD/MM/YYYY')
        cy.get('p', timeout).should('have.contain', 'Terakhir Diubah: ' + todaysDate);
        cy.get('.ant-modal-close-x').click();
      });
    });

    describe('Export Chart', () => {
      it('Export JPG', () => {
        cy.wait(3000);
        cy.get('[data-testid=select-sector] > .ant-select-selector > .ant-select-selection-item', timeout).click({force:true});
        cy.contains('Ball Mill', timeout).click();
        cy.get(':nth-child(1) > a > .sector-card', timeout).click();
        cy.get(':nth-child(2) > .ant-row > :nth-child(2) > .ant-dropdown-trigger', timeout).click();
        cy.contains('Unduh sebagai JPG', timeout).click();
      });
      
      it('Export PDF', () => {
        cy.wait(3000);
        cy.get('[data-testid=select-sector] > .ant-select-selector > .ant-select-selection-item', timeout).click({force:true});
        cy.contains('Ball Mill', timeout).click();
        cy.get(':nth-child(1) > a > .sector-card', timeout).click();
        cy.get(':nth-child(2) > .ant-row > :nth-child(2) > .ant-dropdown-trigger', timeout).click();
        cy.contains('Unduh sebagai PDF', timeout).click();
      });
    });
  });
});