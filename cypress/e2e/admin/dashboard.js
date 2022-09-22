/// <reference types="Cypress" />

var timeout = { timeout: 60000 }
const d = new Date();

describe('Dashboard', () => {
  before(() => {
    cy.login('admin');
  });
  
  describe('List dan Filter Device', () => {
    beforeEach(() => {
      cy.visit('/');
    });
    
    it('Check Card Device', () => {
      cy.wait(3000);
      cy.get(':nth-child(1) > .ant-card > .ant-card-body', timeout).should('be.visible');
      cy.contains('PM5300', timeout).should('be.visible');
      cy.contains('PM_POH_1', timeout).should('be.visible');
    });
    
    describe('Realtime', () => {
      it('Check List Device', () => {
        cy.wait(3000);
        cy.get(':nth-child(1) > .ant-select > .ant-select-selector', timeout).click();
        cy.get('[data-testid=daya_hour]', timeout).click();
        cy.get('.ant-card-body', timeout).click();
        cy.contains('PM5300', timeout).should('not.be.visible');
        cy.contains('PM_POH_1', timeout).should('be.visible');
        cy.get('.ant-layout-content > :nth-child(1)', timeout).contains('Daya per Hour');
      });

      it('Sorting list filter sector', () => {
        cy.wait(3000);
        cy.get('[data-testid=button-sector-filter]', timeout).click();
        cy.get('[data-testid=list-sector-1] > .label', timeout).contains('Antares Power Monitoring');
        cy.get('[data-testid=list-sector-2] > .label', timeout).contains('Baking Line 2');
        cy.get('[data-testid=list-sector-3] > .label', timeout).contains('Ball Mill');
        cy.get('[data-testid=list-sector-4] > .label', timeout).contains('Ball Mill Line 2');
        cy.get('[data-testid=list-sector-5] > .label', timeout).contains('Enrober');
      });
      
      it('Sorting list filter device', () => {
        cy.wait(3000);
        cy.get('[data-testid=button-sector-filter]', timeout).click();
        cy.get('[data-testid=list-sector-0] > .label', timeout).click();
        cy.contains('Agromon', timeout).should('be.visible');
        cy.get('[data-testid=list-device-5] > .label', timeout).contains('air blower c');
        cy.get('[data-testid=list-device-6] > .label', timeout).contains('air blower p');
        cy.get('[data-testid=list-device-7] > .label', timeout).contains('Antares Perangkat');
        cy.get('[data-testid=list-device-8] > .label', timeout).contains('Antares Perangkat 1');
        cy.get('[data-testid=list-device-9] > .label', timeout).contains('Antares perangkat 2');
      });

      it('Sorting list filter indikator', () => {
        cy.wait(3000);
        cy.get('[data-testid=indikator] > .ant-select-selector', timeout).click();
        cy.get('[data-testid=arus_listrik]', timeout).contains('Arus Listrik (A)');
        cy.get('[data-testid=daya]', timeout).contains('Daya (kW)');
        cy.get('[data-testid=active_power_delivered]', timeout).contains('Daya Aktif Kirim (W)');
        cy.get('[data-testid=active_power_received]', timeout).contains('Daya Aktif Terima (W)');
        cy.get('[data-testid=daya_hour]', timeout).contains('Daya per Hour (kWh)');
      });

      it('Sorting list device di halaman dashboard', () => {
        cy.wait(3000);
        cy.get('[data-testid=button-sector-filter]', timeout).click();
        cy.get('[data-testid=list-sector-0] > .label', timeout).click();
        cy.get('[data-testid=list-device-0] > .label', timeout).click();
        cy.get('[data-testid=ok-filter]', timeout).click();


        cy.wait(7000);
        cy.get(':nth-child(1) > .ant-select > .ant-select-selector', timeout).click();
        cy.get('[data-testid=arus_listrik]', timeout).click();
        cy.wait(3000);

        cy.get('[href="/device/NamaAntares"] > .ant-card > .ant-card-body', timeout).contains('Antares Perangkat');
        cy.get('[href="/device/AntaresName"] > .ant-card > .ant-card-body', timeout).contains('Antares Perangkat 1');
        cy.get('[href="/device/1_wiener_line_1_Arus_Agitator_Ball_2"] > .ant-card > .ant-card-body', timeout).contains('Arus Agitator Ball 2');
        cy.get('[href="/device/2_forming_ima_1_Belt_rotary_ampere"] > .ant-card > .ant-card-body', timeout).contains('Belt rotary_ampere');
        cy.get('[href="/device/Pzem-004t"] > .ant-card > .ant-card-body', timeout).contains('Electrical Monitoring');
      });
    });
    
    describe('Overview', () => {
      it('Filter indikator online', () => {
        cy.wait(3000);
        cy.get('#rc-tabs-0-tab-overview', timeout).click();
        cy.get('[data-testid=sector] > .ant-select-selector > .ant-select-selection-item', timeout).click();
        cy.contains('Forming Baking', timeout).click();
        cy.wait(3000);
        cy.get('[data-testid=indicator] > .ant-select-selector > .ant-select-selection-item', timeout).click();
        cy.wait(3000);
        cy.contains('Arus Listrik (A)', timeout).click({force:true});
        cy.get('.apexcharts-legend').contains('Roll 1 amps', timeout).should('be.visible');
        cy.get('.apexcharts-legend').contains('Roll 2 amps', timeout).should('be.visible');
        cy.get('.apexcharts-legend').contains('Rot cut_ampere', timeout).should('be.visible');
        cy.get('.apexcharts-legend').contains('Sprinkle brush1_ampere', timeout).should('be.visible');
        cy.get('.apexcharts-legend').contains('Sprinkle brush2_ampere', timeout).should('be.visible');
        cy.get('.apexcharts-legend').contains('Sprinkle wiremesh_ampere', timeout).should('be.visible');
        cy.get('.apexcharts-legend').contains('roll 3 amps', timeout).should('be.visible');
      });
      
      it('Filter Indikator Sebagian Online', () => {
        cy.wait(3000);
        cy.get('[data-testid=button-sector-filter]', timeout).click();
        cy.get('[data-testid=list-sector-6] > .label', timeout).click();
        cy.get('[data-testid=list-device-0] > .label', timeout).click();
        cy.get('[data-testid=ok-filter]', timeout).click();

        cy.wait(3000);
        cy.contains('Belt rotary_ampere', timeout).should('be.visible');
        cy.contains('Roll 1 amps', timeout).should('be.visible');
        cy.contains('Roll 2 amps', timeout).should('be.visible');
        cy.contains('Rot cut_ampere', timeout).should('be.visible');
        cy.contains('Sprinkle brush1_ampere', timeout).should('be.visible');
        cy.contains('Sprinkle brush2_ampere', timeout).should('be.visible');
        cy.contains('Sprinkle wiremesh_ampere', timeout).should('be.visible');
        cy.contains('roll 3 amps', timeout).should('be.visible');
      });

      it('Sorting List Filter Sektor', () => {
        cy.wait(3000);
        cy.get('#rc-tabs-0-tab-overview', timeout).click();
        cy.get('[data-testid=sector] > .ant-select-selector > .ant-select-selection-item', timeout).click();
        
        cy.get('[title="Antares Power Monitoring"]', timeout).should('be.visible');
        cy.get('[title="Baking Line 2"]', timeout).should('be.visible');
        cy.get('[title="Ball Mill"]', timeout).should('be.visible');
        cy.get('[title="Ball Mill Line 2"]', timeout).should('be.visible');
        cy.get('[title="Enrober"]', timeout).should('be.visible');
        cy.get('[title="Forming Baking"]', timeout).should('be.visible');
        cy.get('[title="Forming Baking Line 2"]', timeout).should('be.visible');
      });

      it('Sorting List Filter Indicator', () => {
        cy.wait(3000);
        cy.get('#rc-tabs-0-tab-overview', timeout).click();
        cy.wait(7000);
        cy.get('[data-testid=indicator] > .ant-select-selector > .ant-select-selection-item', timeout).click();
        cy.contains('Arus Listrik (A)', timeout).should('be.visible');
        cy.get('div[class="ant-select-item ant-select-item-option"]', timeout).contains('Daya (kW)', timeout).should('be.visible');
        cy.get('div[class="ant-select-item ant-select-item-option"]', timeout).contains('Daya Aktif Kirim (W)').should('be.visible');
        cy.get('div[class="ant-select-item ant-select-item-option"]', timeout).contains('Daya Aktif Terima (W)', timeout).should('be.visible');
        cy.get('div[class="ant-select-item ant-select-item-option"]', timeout).contains('Daya per Hour (kWh)', timeout).should('be.visible');
        cy.get('div[class="ant-select-item ant-select-item-option"]', timeout).contains('EOB Stand Aktif Energy Kirim (Wh)', timeout).should('be.visible');
        cy.get('div[class="ant-select-item ant-select-item-option"]', timeout).contains('EOB Stand Aktif Energy Terima (Wh)', timeout).should('be.visible');
      });
    });
  });
  
  describe('Detail Device', () => {
    beforeEach(() => {
      cy.visit('/');
      cy.wait(3000);
      cy.get('[data-testid=indikator] > .ant-select-selector', timeout).click();
      cy.get('.ant-select-item-option-active', timeout).click({force: true});
      cy.get('[data-testid=button-sector-filter]', timeout).click();
    });
    
    describe('Edit Device', () => {
      it('Simpan', () => {
        cy.get('[data-testid=list-sector-3] > .label', timeout).click();
        cy.get('[data-testid=list-device-0] > .label', timeout).click();
        cy.get('[data-testid=ok-filter]', timeout).click();
        cy.get('[href="/device/1_wiener_line_1_Cold_Water_Ball_2"] > .ant-card > .ant-card-body', timeout).click();
        cy.get('[style="margin-left: -5px; margin-right: -5px;"] > :nth-child(1) > .Button__BaseButton-sc-1hmbtsr-0', timeout).click({multiple:true});
        cy.get('[data-testid=input-device_name]', timeout).clear().type('Aauto test 2');
        cy.get('[data-testid=select-sector] > .ant-select-selector', timeout).click();
        cy.contains('Mixer', timeout).click({force:true});
        cy.get('[data-testid=input-location]', timeout).clear().type('auto test 2');
        cy.get('.ant-row-end > .ant-col > .Button__BaseButton-sc-1hmbtsr-0').click({force:true});
        cy.contains('Berhasil', timeout).should('be.visible');
      });

      it('Add Additional Info', () => {
        cy.get('[data-testid=list-sector-10] > .label', timeout).click();
        cy.get('[data-testid=list-device-0] > .label', timeout).click();
        cy.get('[data-testid=ok-filter]', timeout).click();
        cy.get('[href="/device/1_wiener_line_1_Cold_Water_Ball_2"] > .ant-card > .ant-card-body', timeout).click();
        cy.get('[style="margin-left: -5px; margin-right: -5px;"] > :nth-child(1) > .Button__BaseButton-sc-1hmbtsr-0', timeout).click({multiple:true});
        cy.get('[data-testid=select-sector] > .ant-select-selector', timeout).click();
        cy.contains('Ball Mill', timeout).click({force:true});
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
        cy.get('[data-testid=list-sector-3] > .label', timeout).click();
        cy.get('[data-testid=list-device-0] > .label', timeout).click();
        cy.get('[data-testid=ok-filter]', timeout).click();
        cy.get('[href="/device/1_wiener_line_1_Cold_Water_Ball_2"] > .ant-card > .ant-card-body', timeout).click();
        cy.get('[style="margin-left: -5px; margin-right: -5px;"] > :nth-child(1) > .Button__BaseButton-sc-1hmbtsr-0', timeout).click({multiple:true});
        cy.get(':nth-child(6) > .ant-form-item > .ant-row > .ant-col > .ant-form-item-control-input > .ant-form-item-control-input-content > [data-testid=input-additional_info]', timeout).clear({force:true}).type('auto update 2', {force:true});
        cy.get(':nth-child(8) > .ant-form-item > .ant-row > .ant-col > .ant-form-item-control-input > .ant-form-item-control-input-content > [data-testid=input-additional_info]', timeout).clear({force:true}).type('auto 2 update 2', {force:true});
        cy.get('.ant-row-end > .ant-col > .Button__BaseButton-sc-1hmbtsr-0').click({force:true});
        cy.contains('Berhasil', timeout).should('be.visible');
      });

      it('Cek Data Additional Info', () => {
        cy.get('[data-testid=list-sector-3] > .label', timeout).click();
        cy.get('[data-testid=list-device-0] > .label', timeout).click();
        cy.get('[data-testid=ok-filter]', timeout).click();

        cy.get('[href="/device/1_wiener_line_1_Cold_Water_Ball_2"] > .ant-card > .ant-card-body', timeout).click();
        cy.get('[style="margin-left: -5px; margin-right: -5px;"] > :nth-child(1) > .Button__BaseButton-sc-1hmbtsr-0', timeout).click({multiple:true});
        cy.get('[data-testid=input-device_name]', timeout).should('have.value', 'Aauto test 2');
        cy.get('[data-testid=select-sector] > .ant-select-selector', timeout).should('have.contain', 'Ball Mill');
        cy.get('[data-testid=input-location]', timeout).should('have.value', 'auto test 2');
        cy.get(':nth-child(6) > .ant-form-item > .ant-row > .ant-col > .ant-form-item-control-input > .ant-form-item-control-input-content > [data-testid=input-additional_info]', timeout).should('have.value', 'auto update 2');
        cy.get(':nth-child(8) > .ant-form-item > .ant-row > .ant-col > .ant-form-item-control-input > .ant-form-item-control-input-content > [data-testid=input-additional_info]', timeout).should('have.value', 'auto 2 update 2');
        cy.get('.ant-modal-close-x > .anticon > svg').click();

        // Back to previous data
        cy.get('[style="margin-left: -5px; margin-right: -5px;"] > :nth-child(1) > .Button__BaseButton-sc-1hmbtsr-0', timeout).click({multiple:true});
        cy.get('[data-testid=input-device_name]', timeout).clear().type('Cold Water Ball')
        cy.get('[data-testid=input-location]', timeout).clear().type(' ');
        cy.get('.ant-row-end > .ant-col > .Button__BaseButton-sc-1hmbtsr-0').click({force:true});
        cy.contains('Berhasil', timeout).should('be.visible');
      });

      it('Hapus Additional Info', () => {
        cy.get('[data-testid=list-sector-3] > .label', timeout).click();
        cy.get('[data-testid=list-device-0] > .label', timeout).click();
        cy.get('[data-testid=ok-filter]', timeout).click();

        cy.get('[href="/device/1_wiener_line_1_Cold_Water_Ball_2"] > .ant-card > .ant-card-body', timeout).click();
        cy.get('[style="margin-left: -5px; margin-right: -5px;"] > :nth-child(1) > .Button__BaseButton-sc-1hmbtsr-0', timeout).click({multiple:true});
        cy.get(':nth-child(6) > [style="height: 40px; display: flex; align-items: center;"]', timeout).click();
        cy.contains('Hapus').click({force:true});
        cy.get(':nth-child(6) > [style="height: 40px; display: flex; align-items: center;"]', timeout).click();
        cy.contains('Hapus').click({force:true});
        cy.get('.ant-row-end > .ant-col > .Button__BaseButton-sc-1hmbtsr-0').click({force:true});
        cy.contains('Berhasil', timeout).should('be.visible');
      });
    });
    
    describe('Setting Kalibrasi', () => {
      beforeEach(() => {
        cy.visit('/');
        cy.wait(3000);
        cy.get('[data-testid=indikator] > .ant-select-selector', timeout).click();
        cy.get('.ant-select-item-option-active', timeout).click();
        cy.get('[data-testid=button-sector-filter]', timeout).click();
        cy.get('[data-testid=list-sector-3] > .label', timeout).click();
        cy.get('[data-testid=list-device-0] > .label', timeout).click();
        cy.get('[data-testid=ok-filter]', timeout).click();
        cy.get('[href="/device/1_wiener_line_1_Cold_Water_Ball_2"] > .ant-card > .ant-card-body', timeout).click();
        cy.wait(3000);
        cy.get(':nth-child(2) > .ant-row > :nth-child(2) > .ant-dropdown-trigger', timeout).click();
        cy.contains('Edit Kalibrasi', timeout).click({force:true});
      });

      it('Validasi Input dan Simpan', () => {
        cy.get('.DetailCondition__InputNum-z5ehht-1', timeout).clear().type('abc').should('have.value', '');
        cy.get('.DetailCondition__InputNum-z5ehht-1', timeout).clear().type('3,9').should('have.value', '39');
        
        // input float
        cy.get('.DetailCondition__InputNum-z5ehht-1', timeout).clear().type('46.8');
        cy.get('.ant-row-end > .Button__BaseButton-sc-1hmbtsr-0', timeout).click({force:true});
        cy.contains('Berhasil', timeout).should('be.visible');
        cy.wait(7000);
        cy.get(':nth-child(2) > .ant-row > :nth-child(2) > .ant-dropdown-trigger', timeout).click();
        cy.contains('Edit Kalibrasi', timeout).click({force:true});
        cy.get('.DetailCondition__InputNum-z5ehht-1', timeout).should('have.value', '46.8');

        // input integer
        cy.get('.DetailCondition__InputNum-z5ehht-1', timeout).clear().type('44').should('have.value', '44');
        cy.get('.ant-row-end > .Button__BaseButton-sc-1hmbtsr-0', timeout).click({force:true});
        cy.contains('Berhasil', timeout).should('be.visible');
      });

      it('Cek Data Kalibrasi', () => {
        cy.get('.DetailCondition__InputNum-z5ehht-1', timeout).should('have.value', '44');
        const todaysDate = Cypress.moment().format('DD/MM/YYYY')
        cy.get('p', timeout).should('have.contain', 'Terakhir Diubah: ' + todaysDate);
        cy.get('.ant-modal-close-x').click();
      });
    });

    describe('Export Chart', () => {
      beforeEach(() => {
        cy.visit('/');
        cy.wait(3000);
        cy.get('[data-testid=indikator] > .ant-select-selector', timeout).click();
        cy.get('.ant-select-item-option-active', timeout).click();
        cy.get('[data-testid=button-sector-filter]', timeout).click();
        cy.get('[data-testid=list-sector-3] > .label', timeout).click();
        cy.get('[data-testid=list-device-0] > .label', timeout).click();
        cy.get('[data-testid=ok-filter]', timeout).click();
        cy.get('[href="/device/1_wiener_line_1_Cold_Water_Ball_2"] > .ant-card > .ant-card-body', timeout).click();
        cy.wait(3000);
        cy.get(':nth-child(2) > .ant-row > :nth-child(2) > .ant-dropdown-trigger', timeout).click();
      });

      it('Export JPG', () => {
        cy.contains('Unduh sebagai JPG', timeout).click();
        cy.server().should((server) => {
          expect(server.status).to.eq(200);
        });
      });
      
      it('Export PDF', () => {
        cy.contains('Unduh sebagai PDF', timeout).click();
        cy.server().should((server) => {
          expect(server.status).to.eq(200);
        });
      });
    });
    
    describe('Anomali Reason', () => {
      beforeEach(() => {
        cy.visit('/');
        cy.wait(3000);
        cy.get('[data-testid=indikator] > .ant-select-selector', timeout).click();
        cy.get('.ant-select-item-option-active', timeout).click({force: true});
        cy.get('[data-testid=button-sector-filter]', timeout).click();
        cy.get('[data-testid=list-sector-3] > .label', timeout).click();
        cy.get('[data-testid=list-device-0] > .label', timeout).click();
        cy.get('[data-testid=ok-filter]', timeout).click();
        cy.get('[href="/device/1_wiener_line_1_Cold_Water_Ball_2"] > .ant-card > .ant-card-body', timeout).click();
        cy.wait(3000);
        cy.get(':nth-child(3) > .ant-form-item > .ant-row > .ant-col > .ant-form-item-control-input > .ant-form-item-control-input-content > .CustomPopup__Container-sc-183k7je-0 > [data-testid=date-root]', timeout)
          .click();
        cy.get('[data-testid=start-date]', timeout).click();

        if(d.getFullYear()!=2022) {
          var minusYear = d.getFullYear()-2022;
          var i = 0;
          while (i < minusYear) {
            cy.get(':nth-child(1) > .ant-picker-date-panel > .ant-picker-header > .ant-picker-header-super-prev-btn', timeout)
              .click();
            i++;
          }
        }
        if(d.getMonth() + 1 != 9) {
          if(d.getMonth() + 1 > 9) {
            var minusMonth = d.getMonth() + 1 - 9;
            var j = 0;
            while (j < minusMonth) {
              cy.get(':nth-child(1) > .ant-picker-date-panel > .ant-picker-header > .ant-picker-header-prev-btn', timeout)
                .click();
              j++;
            }
          } else {
            var plusMonth = 9 - (d.getMonth() + 1);
            var j = 0;
            while (j < plusMonth) {
              cy.get(':nth-child(2) > .ant-picker-date-panel > .ant-picker-header > .ant-picker-header-next-btn', timeout)
                .click();
              j++;
            }
          }
        }
    
        cy.get('[title="2022-09-07"]', timeout).click();
        // 00:00
        cy.get(':nth-child(1) > :nth-child(1) > .ant-picker-time-panel-cell-inner', timeout).click();
        cy.get(':nth-child(2) > :nth-child(1) > .ant-picker-time-panel-cell-inner', timeout).click();
        cy.get('.ant-picker-ok > .ant-btn', timeout).click();
        cy.get('[data-testid=end-date]', timeout).click();

        if(d.getFullYear()!=2022) {
          var minusYear = d.getFullYear()-2022;
          var i = 0;
          while (i < minusYear) {
            cy.get(':nth-child(1) > .ant-picker-date-panel > .ant-picker-header > .ant-picker-header-super-prev-btn', timeout)
              .click();
            i++;
          }
        }
        if(d.getMonth() + 1 != 9) {
          if(d.getMonth() + 1 > 9) {
            var minusMonth = d.getMonth() + 1 - 9;
            var j = 0;
            while (j < minusMonth) {
              cy.get(':nth-child(1) > .ant-picker-date-panel > .ant-picker-header > .ant-picker-header-prev-btn', timeout)
                .click();
              j++;
            }
          } else {
            var plusMonth = 9 - (d.getMonth() + 1);
            var j = 0;
            while (j < plusMonth) {
              cy.get(':nth-child(2) > .ant-picker-date-panel > .ant-picker-header > .ant-picker-header-next-btn', timeout)
                .click();
              j++;
            }
          }
        }
        //15.00
        cy.get('[title="2022-09-07"]', timeout).eq(1).click();
        cy.get(':nth-child(1) > :nth-child(16) > .ant-picker-time-panel-cell-inner', timeout).eq(1).click();
        cy.get(':nth-child(2) > :nth-child(1) > .ant-picker-time-panel-cell-inner', timeout).eq(1).click();
        cy.get('.ant-picker-ok > .ant-btn', timeout).eq(1).click();
        cy.get('.ant-form-item-control-input-content > .Button__BaseButton-sc-1hmbtsr-0', timeout).click();
      });

      it('Read and Update', () => {
        cy.get('.ant-card-body', timeout).eq(1).contains('Cold Water Ball - Percent').should('be.visible');
        cy.get('.reason-card__title--danger', timeout).eq(1).should('be.visible');
        cy.get('.reason-card__container--danger > :nth-child(2)', timeout).eq(1).should('be.visible');
        cy.get('.reason-card__container--danger > :nth-child(3)', timeout).eq(1).click();
        cy.get('#input_reason_reason', timeout).clear().type('auto tes cwb');
        cy.contains('Submit', timeout).click();
        cy.contains('Data berhasil diperbaharui', timeout).should('be.visible');
      });

      it('Read and Validasi Input', () => {
        cy.get('.ant-card-body', timeout).eq(1).click();
        cy.get(':nth-child(2) > .input-reason-form__row__field', timeout)
          .should('have.contain', 'Cold Water Ball - Percent');
        cy.get('[style="margin-left: -12px; margin-right: -12px;"] > :nth-child(1) > .input-reason-form__row > .input-reason-form__row__field', timeout)
          .should('be.visible');
        cy.get(':nth-child(2) > .input-reason-form__row > .input-reason-form__row__field', timeout)
          .should('be.visible');
        cy.get('#input_reason_reason', timeout).should('have.value', 'auto tes cwb');
        cy.get('.ant-modal-close-x', timeout).click();
        cy.get('.ant-card-body', timeout).eq(1).click();
        cy.get('#input_reason_reason', timeout).clear();
        cy.contains('Submit', timeout).click();
        cy.get('.ant-form-item-explain-error', timeout).contains('Keterangan harus diisi');
        cy.get('#input_reason_reason', timeout).clear().type('test');
        cy.contains('Submit', timeout).click();
        cy.contains('Data berhasil diperbaharui', timeout).should('be.visible');
      });

      it('Update', () => {
        cy.get('.ant-card-body', timeout).eq(1).click();
        cy.get('#input_reason_reason', timeout).clear().type('test');
        cy.contains('Submit', timeout).click();
        cy.contains('Data berhasil diperbaharui', timeout).should('be.visible');
      })

      it('Read', () => {
        cy.get('.ant-card-body', timeout).eq(1).click();
        cy.get('#input_reason_reason', timeout).should('have.value', 'test');
        cy.get('.ant-modal-close-x', timeout).click();
      });
    });
  });

  describe('Analysis', () => {
    beforeEach(() => {
      cy.visit('/');
      cy.wait(3000);
    });

    it('Read Grafik', () => {
      cy.get('.ant-tabs-nav-list > :nth-child(3)', timeout).click();
      cy.get('#rc-tabs-0-panel-analysis > :nth-child(1)', timeout).contains('testing');
      cy.get('#rc-tabs-0-panel-analysis > :nth-child(2)', timeout).contains('testing');
      cy.get('#rc-tabs-0-panel-analysis > :nth-child(3)', timeout).contains('comparison')
    });
  });
});