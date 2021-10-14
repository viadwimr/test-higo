/// <reference types="Cypress" />

var timeout = { timeout: 60000 }

describe('Dashboard', () => {
  describe('List dan Filter Device', () => {
    beforeEach(() => {
      cy.visit('/');
      cy.get('.Devices__Wrapper-amwub4-0', { timeout: 150000 }).should('be.visible');
    });

    describe('Realtime', () => {
      it('Check List Device', () => {
        cy.wait(10000);
        cy.get('[href="/device/1_wiener_line_1_Arus_Agitator_Ball_1"] > .ant-card > .ant-card-body', { timeout: 200000 }).should('exist');
        cy.contains('Arus Agitator Ball 1', timeout).should('be.visible');
        cy.contains('Temperatur', timeout).should('be.visible');
      });

      it('Sorting list filter sector', () => {
        cy.wait(10000);
        cy.get(':nth-child(1) > .ant-select > .ant-select-selector', timeout).click();
        cy.contains('Ball Mill', timeout).should('be.visible');
        cy.contains('Enrober', timeout).should('be.visible');
        cy.contains('Forming Baking', timeout).should('be.visible');
        cy.contains('Mixer', timeout).should('be.visible');
        cy.contains('Mixer 2', timeout).should('be.visible');
      });
      
      it('Sorting list filter device', () => {
        cy.wait(10000);
        cy.get(':nth-child(2) > .ant-select > .ant-select-selector > .ant-select-selection-item', timeout).click();
        cy.contains('ac Produksi', timeout).should('be.visible');
        cy.contains('ac Produksi Aktual Per Detik', timeout).should('be.visible');
        cy.contains('air blower c', timeout).should('be.visible');
        cy.contains('air blower p', timeout).should('be.visible');
      });

      it('Sorting list filter indikator', () => {
        cy.wait(10000);
        cy.get(':nth-child(3) > .ant-select > .ant-select-selector > .ant-select-selection-item', timeout).click();
        cy.contains('Arus Listrik', timeout).should('be.visible');
        cy.contains('Daya', timeout).should('be.visible');
        cy.contains('Frequency', timeout).should('be.visible');
        cy.contains('Intensitas Cahaya', timeout).should('be.visible');
        cy.contains('Kecepatan Angin', timeout).should('be.visible');
      });

      it('Sorting list device di halaman dashboard', () => {
        cy.wait(120000);
        cy.get(':nth-child(2) > .ant-select > .ant-select-selector > .ant-select-selection-item', timeout).click();
        cy.contains('ac Produksi', timeout).should('be.visible');
        cy.contains('ac Produksi Aktual Per Detik', timeout).should('be.visible');
        cy.contains('ac Produksi Recipe Per Detik', timeout).should('be.visible');
        cy.contains('air blower c', timeout).should('be.visible');
      });
    });

    describe('Overview', () => {
      it('Filter indikator online', () => {
        cy.get('#rc-tabs-0-tab-overview', timeout).click();
        cy.wait(3000);
        cy.get('[data-testid=sector] > .ant-select-selector > .ant-select-selection-item', timeout).click();
        cy.contains('Oven Baking', timeout).click();
        cy.wait(3000);
        cy.get('[data-testid=indicator] > .ant-select-selector > .ant-select-selection-item', timeout).click();
        cy.wait(3000);
        cy.contains('Temperatur (℃)', timeout).click({force:true});
        cy.get('.apexcharts-legend').contains('Suhu Aktual Zona 2', timeout).should('be.visible');
        cy.get('.apexcharts-legend').contains('Suhu Aktual Zona 3', timeout).should('be.visible');
        cy.get('.apexcharts-legend').contains('Suhu Aktual Zona 4', timeout).should('be.visible');
        cy.get('.apexcharts-legend').contains('Suhu Aktual Zona 5', timeout).should('be.visible');
        cy.get('.apexcharts-legend').contains('Suhu Aktual Zona P', timeout).should('be.visible');
        cy.get('.apexcharts-legend').contains('suhu set zona 1', timeout).should('be.visible');
        cy.get('.apexcharts-legend').contains('suhu set zona 2', timeout).should('be.visible');
        cy.get('.apexcharts-legend').contains('suhu set zona 3', timeout).should('be.visible');
        cy.get('.apexcharts-legend').contains('suhu set zona 4', timeout).should('be.visible');
        cy.get('.apexcharts-legend').contains('suhu set zona 5', timeout).should('be.visible');
        cy.get('.apexcharts-legend').contains('wiremesh temperature', timeout).should('be.visible');
      });
      
      it('Filter Indikator Sebagian Online', () => {
        cy.get('#rc-tabs-0-tab-realtime', timeout).click();
        cy.wait(3000);
        cy.get(':nth-child(3) > .ant-select > .ant-select-selector > .ant-select-selection-item', timeout).click();
        cy.contains('Arus Listrik (A)', timeout).click();
        cy.get('div[class="ant-card-body"]', timeout).should('be.visible');
      });

      it('List Filter', () => {
        cy.get('#rc-tabs-0-tab-overview', timeout).click();
        cy.wait(15000);
        cy.get('[data-testid=indicator] > .ant-select-selector > .ant-select-selection-item', timeout).click();
        cy.contains('Arus Listrik (A)', timeout).should('be.visible');
        cy.get('div[class="ant-select-item ant-select-item-option"]', timeout).contains('Daya', timeout).should('be.visible');
        cy.get('div[class="ant-select-item ant-select-item-option"]', timeout).contains('Frequency').should('be.visible');
        cy.get('div[class="ant-select-item ant-select-item-option"]', timeout).contains('Intensitas Cahaya', timeout).should('be.visible');
        cy.get('div[class="ant-select-item ant-select-item-option"]', timeout).contains('Kecepatan Angin', timeout).should('be.visible');
        cy.get('div[class="ant-select-item ant-select-item-option"]', timeout).contains('Kelembaban', timeout).should('be.visible');
        cy.get('div[class="ant-select-item ant-select-item-option"]', timeout).contains('Kelembaban Tanah', timeout).should('be.visible');
      });
    });
  });

  describe('Detail Device', () => {
    beforeEach(() => {
      cy.visit('/');
      cy.wait(6000);
    });
    
    describe('Edit Device', () => {
      it('Simpan', () => {
        cy.get(':nth-child(1) > .ant-select > .ant-select-selector', timeout).click({force:true});
        cy.contains('Ball Mill', timeout).click();
        cy.get('[href="/device/1_wiener_line_1_Cold_Water_Ball_2"] > .ant-card > .ant-card-body', timeout).click();
        cy.get('[style="margin-left: -5px; margin-right: -5px; row-gap: 0px;"] > :nth-child(1) > .Button__BaseButton-sc-1hmbtsr-0', timeout).click({multiple:true});
        cy.get('[data-testid=input-device_name]', timeout).clear().type('Aauto test 2');
        cy.get('[data-testid=select-sector] > .ant-select-selector', timeout).click();
        cy.contains('Mixer', timeout).click();
        cy.get('[data-testid=input-location]', timeout).clear().type('auto test 2');
        cy.get('.ant-row-end > .ant-col > .Button__BaseButton-sc-1hmbtsr-0').click();
      });

      it('Add Additional Info', () => {
        cy.get(':nth-child(1) > .ant-select > .ant-select-selector', timeout).click({force:true});
        cy.contains('Mixer', timeout).click();
        cy.get('[href="/device/1_wiener_line_1_Cold_Water_Ball_2"] > .ant-card > .ant-card-body', timeout).click();
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
        cy.get(':nth-child(1) > .ant-select > .ant-select-selector', timeout).click({force:true});
        cy.contains('Ball Mill', timeout).click();
        cy.get('[href="/device/1_wiener_line_1_Cold_Water_Ball_2"] > .ant-card > .ant-card-body', timeout).click();
        cy.get('[style="margin-left: -5px; margin-right: -5px; row-gap: 0px;"] > :nth-child(1) > .Button__BaseButton-sc-1hmbtsr-0', timeout).click({multiple:true});
        cy.get('[style="margin-bottom: 198px;"] > .ant-btn', timeout).click();
        cy.get(':nth-child(6) > .ant-row > .ant-col > .ant-form-item-control-input > .ant-form-item-control-input-content > [data-testid=input-additional_info]', timeout).clear({force:true}).type('auto update 2', {force:true});
        cy.get(':nth-child(8) > .ant-row > .ant-col > .ant-form-item-control-input > .ant-form-item-control-input-content > [data-testid=input-additional_info]', timeout).clear({force:true}).type('auto 2 update 2', {force:true});
        cy.get('.ant-row-end > .ant-col > .Button__BaseButton-sc-1hmbtsr-0').click({force:true});
      });

      it('Cek Data Additional Info', () => {
        cy.get(':nth-child(1) > .ant-select > .ant-select-selector', timeout).click({force:true});
        cy.contains('Ball Mill', timeout).click();
        cy.get('[href="/device/1_wiener_line_1_Cold_Water_Ball_2"] > .ant-card > .ant-card-body', timeout).click();
        cy.get('[style="margin-left: -5px; margin-right: -5px; row-gap: 0px;"] > :nth-child(1) > .Button__BaseButton-sc-1hmbtsr-0', timeout).click({multiple:true});
        cy.get('[data-testid=input-device_name]', timeout).should('have.value', 'Aauto test 2');
        cy.get('[data-testid=select-sector] > .ant-select-selector', timeout).should('have.contain', 'Ball Mill');
        cy.get('[data-testid=input-location]', timeout).should('have.value', 'auto test 2');
        cy.get(':nth-child(6) > .ant-row > .ant-col > .ant-form-item-control-input > .ant-form-item-control-input-content > [data-testid=input-additional_info]', timeout).should('have.value', 'auto update 2');
        cy.get(':nth-child(8) > .ant-row > .ant-col > .ant-form-item-control-input > .ant-form-item-control-input-content > [data-testid=input-additional_info]', timeout).should('have.value', 'auto 2 update 2');
        cy.get('.ant-modal-close-x > .anticon > svg').click();
      });

      it('Hapus Additional Info', () => {
        cy.get(':nth-child(1) > .ant-select > .ant-select-selector', timeout).click({force:true});
        cy.contains('Ball Mill', timeout).click();
        cy.get('[href="/device/1_wiener_line_1_Cold_Water_Ball_2"] > .ant-card > .ant-card-body', timeout).click();
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
        cy.get(':nth-child(1) > .ant-select > .ant-select-selector', timeout).click({force:true});
        cy.contains('Ball Mill', timeout).click();
        cy.get('[href="/device/1_wiener_line_1_Cold_Water_Ball_2"] > .ant-card > .ant-card-body', timeout).click();
        cy.get(':nth-child(2) > .ant-row > :nth-child(2) > .ant-dropdown-trigger', timeout).click();
        cy.contains('Edit Kalibrasi', timeout).click();
        cy.get('.DetailCondition__InputNum-z5ehht-1', timeout).clear().type('abc').should('have.value', '');
        cy.get('.DetailCondition__InputNum-z5ehht-1', timeout).clear().type('3,9').should('have.value', '39');
        cy.get('.DetailCondition__InputNum-z5ehht-1', timeout).clear().type('44').should('have.value', '44');
        cy.get('.ant-row-end > .Button__BaseButton-sc-1hmbtsr-0', timeout).click();
      });

      it('Cek Data Kalibrasi', () => {
        cy.get(':nth-child(1) > .ant-select > .ant-select-selector', timeout).click({force:true});
        cy.contains('Ball Mill', timeout).click();
        cy.get('[href="/device/1_wiener_line_1_Cold_Water_Ball_2"] > .ant-card > .ant-card-body', timeout).click();
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
        cy.get(':nth-child(1) > .ant-select > .ant-select-selector', timeout).click({force:true});
        cy.contains('Ball Mill', timeout).click();
        cy.get('[href="/device/1_wiener_line_1_Cold_Water_Ball_2"] > .ant-card > .ant-card-body', timeout).click();
        cy.get(':nth-child(2) > .ant-row > :nth-child(2) > .ant-dropdown-trigger', timeout).click();
        cy.contains('Unduh sebagai JPG', timeout).click();
      });
      
      it('Export PDF', () => {
        cy.get(':nth-child(1) > .ant-select > .ant-select-selector', timeout).click({force:true});
        cy.contains('Ball Mill', timeout).click();
        cy.get('[href="/device/1_wiener_line_1_Cold_Water_Ball_2"] > .ant-card > .ant-card-body', timeout).click();
        cy.get(':nth-child(2) > .ant-row > :nth-child(2) > .ant-dropdown-trigger', timeout).click();
        cy.contains('Unduh sebagai PDF', timeout).click();
      });
    });
  });
});