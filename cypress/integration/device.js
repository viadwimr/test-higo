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

  describe('Sorting Data', () => {
    it('Sorting List Device', () => {
      cy.wait(60000);
      cy.get(':nth-child(1) > a > .sector-card', timeout).should('have.contain', 'Aauto test');
      cy.get(':nth-child(2) > a > .sector-card', timeout).should('have.contain', 'ac Produksi Aktual Per Detik');
      cy.get(':nth-child(3) > a > .sector-card', timeout).should('have.contain', 'ac Produksi Recipe Per Detik');
      cy.get(':nth-child(4) > a > .sector-card', timeout).should('have.contain', 'ac Produksi Recipe Per Menit');
      cy.get(':nth-child(5) > a > .sector-card', timeout).should('have.contain', 'Agromon');
      cy.get(':nth-child(6) > a > .sector-card', timeout).should('have.contain', 'Agromon');
      cy.get(':nth-child(7) > a > .sector-card', timeout).should('have.contain', 'air blower c');
    });

    it('Sorting List Filter Sektor', () => {
      cy.wait(3000);
      cy.get('[data-testid=select-sector] > .ant-select-selector > .ant-select-selection-item', timeout)
        .click({force:true});
      cy.contains('Semua Sektor', timeout).should('be.visible');
      cy.contains('Agromon', timeout).should('be.visible');
      cy.contains('auto trial', timeout).should('be.visible');
      cy.contains('Ball Mill', timeout).should('be.visible');
      cy.contains('Ball Mill Line 2', timeout).should('be.visible');
      cy.contains('Enrober', timeout).should('be.visible');
      cy.contains('Forming Baking', timeout).should('be.visible');
      cy.contains('Forming Baking Line 2', timeout).should('be.visible');
    });

    it('Sorting List Filter Sektor di Form', () => {
      cy.wait(60000);
      cy.get(':nth-child(1) > a > .sector-card', timeout).click();
      cy.get('[style="margin-left: -5px; margin-right: -5px; row-gap: 0px;"] > :nth-child(1) > .Button__BaseButton-sc-1hmbtsr-0', timeout)
        .click({multiple:true});
      cy.get('[data-testid=select-sector] > .ant-select-selector', timeout).click();
      cy.contains('Agromon', timeout).should('be.visible');
      cy.contains('auto trial', timeout).should('be.visible');
      cy.contains('Ball Mill', timeout).should('be.visible');
      cy.contains('Ball Mill Line 2', timeout).should('be.visible');
      cy.contains('Enrober', timeout).should('be.visible');
      cy.contains('Forming Baking', timeout).should('be.visible');
      cy.contains('Forming Baking Line 2', timeout).should('be.visible');
    });

    it('Sorting List Sektor di Tabel', () => {
      cy.wait(3000);
      cy.get('[data-testid=atur-sector-button]', timeout).click();
      cy.get('[data-row-key="6155695cb1c82400013665b4"] > :nth-child(1)', timeout)
        .contains('Agromon').should('be.visible');
      cy.get('[data-row-key="617a5f86af2eb10001802249"] > :nth-child(1)', timeout)
        .contains('auto trial').should('be.visible');
      cy.get('[data-row-key="6020f89178b2e30001e0cff4"] > :nth-child(1)', timeout)
        .should('have.contain', 'Ball Mill');
      cy.get('[data-row-key="616efef25493c40001803758"] > :nth-child(1)', timeout)
        .should('have.contain', 'Ball Mill Line 2');
      cy.get('[data-row-key="6020f89178b2e30001e0cff5"] > :nth-child(1)', timeout)
        .should('have.contain', 'Enrober');
      cy.get('[data-row-key="60138417516ed50001e90948"] > :nth-child(1)', timeout)
        .should('have.contain', 'Forming Baking');
    });

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
        cy.get('.ant-row-end > .ant-col > .Button__BaseButton-sc-1hmbtsr-0').click({force:true});
        cy.contains('Berhasil', timeout).should('be.visible');
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
        cy.get('.ant-row-end > .ant-col > .Button__BaseButton-sc-1hmbtsr-0').click({force:true});
        cy.contains('Berhasil', timeout).should('be.visible');
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
        cy.contains('Berhasil', timeout).should('be.visible');
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
        cy.contains('Berhasil', timeout).should('be.visible');
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