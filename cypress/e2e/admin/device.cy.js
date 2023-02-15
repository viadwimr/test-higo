/// <reference types="Cypress" />

var timeout = { timeout: 5000 }

describe('Device', () => {
  before(() => {
    cy.login('admin');
    cy.get('[title="Device"] > .ant-menu-title-content > a', timeout).click();
  });
  /*
  describe('Sektor', () => {
    it('Validasi Input', () => {
      cy.get('[data-testid="atur-sector-button"]', timeout).click();
      cy.contains('Tambah Sektor', timeout).click();
      cy.get('[data-testid="sector_name"]', timeout).clear();
      cy.get('[data-testid="sector_description"]', timeout).clear();
      cy.contains('Nama Sektor tidak boleh kosong').should('be.visible');
      cy.contains('Deskripsi tidak boleh kosong').should('be.visible');
    })

    it('Add Sector', () => {
      cy.get('[data-testid="sector_name"]', timeout).clear().type('test');
      cy.get('[data-testid="sector_description"]', timeout).clear().type('uji coba');
      cy.get('[data-testid="confirm-batal"]', timeout).click();
      cy.contains('Tambah Sektor', timeout).click();
      cy.get('[data-testid="sector_name"]', timeout).clear().type('test lagi');
      cy.get('[data-testid="sector_description"]', timeout).clear().type('uji coba lagi');
      cy.contains('Nama Sektor tidak boleh kosong').should('not.exist');
      cy.contains('Deskripsi tidak boleh kosong').should('not.exist');
      cy.get('[data-row-key="new_item"] > [style="text-align: center;"] > .ant-row > :nth-child(1)', timeout)
        .click();
      cy.contains('Berhasil', timeout).should('be.visible');
      cy.wait(3000);
    })

    it('Read Sector', () => {
      cy.get('[data-testid="atur-sector-button"]', timeout).click();
      cy.wait(1000);
      cy.get('.ant-table-container', timeout).contains('DMIA').should('be.visible');
      cy.get('.ant-table-container', timeout).contains('test lagi').should('be.visible');
      cy.get('.ant-table-container', timeout).contains('uji coba lagi').should('be.visible');
    })

    it('Update Sector', () => {
      cy.get('[data-testid="edit-button"]', timeout).eq(1).click();
      cy.get('[data-testid="sector_name"]', timeout).clear().type('test edit');
      cy.get('[data-testid="sector_description"]', timeout).clear().type('uji coba edit');
      cy.get('[data-testid="confirm-simpan"]', timeout).click();
      cy.contains('Berhasil', timeout).should('be.visible');
      cy.wait(3000);
      // check after update
      cy.get('[data-testid="atur-sector-button"]', timeout).click();
      cy.wait(1000);
      cy.get('.ant-table-container', timeout).contains('DMIA').should('be.visible');
      cy.get('.ant-table-container', timeout).contains('test edit').should('be.visible');
      cy.get('.ant-table-container', timeout).contains('uji coba edit').should('be.visible');
      cy.get('.ant-table-container', timeout).contains('test lagi').should('not.exist');
      cy.get('.ant-table-container', timeout).contains('uji coba lagi').should('not.exist');
      // close
      cy.get('.ant-modal-close-x', timeout).click();
    })

    it('Hapus Sector', () => {
      cy.get('[data-testid="atur-sector-button"]', timeout).click();
      cy.get('[data-testid="hapus-button"]', timeout).eq(1).click();
      cy.contains('Ya, Hapus', timeout).click();
      cy.contains('Berhasil', timeout).should('be.visible');
      cy.wait(3000);
      // check after update
      cy.contains('test edit', timeout).should('not.exist');
    });
  });
  */
  describe('Device', () => {
    it('Check list device', () => {
      cy.get(':nth-child(1) > a > .sector-card', timeout).should('be.visible');
      cy.get('#rc-tabs-0-panel-condition_monitoring', timeout).should('be.visible');
      cy.get(':nth-child(2) > a > .sector-card', timeout).should('be.visible');
      cy.get(':nth-child(3) > a > .sector-card', timeout).should('not.exist');
    });

    it('Informasi device', () => {
      cy.contains('MP_01', timeout).click();
      cy.get('.ant-layout-content > :nth-child(1)', timeout).should('be.visible');
      cy.get('.AnomaliWrapper__Container-sc-1qw2y45-0', timeout).should('be.visible')
    });
  });
  
  describe('Detail Device', () => {
    describe('Edit Device', () => {
      beforeEach(() => {
        cy.visit('/')
        cy.get('[title="Device"] > .ant-menu-title-content > a', timeout).click();
      });  
      
      it('Simpan', () => {
        cy.wait(7000);
        cy.get('[data-testid=select-sector] > .ant-select-selector > .ant-select-selection-item', timeout).click({force:true});
        cy.contains('DMIA', timeout).click();
        cy.get(':nth-child(1) > a > .sector-card', timeout).click();
        cy.wait(3000);
        cy.get('[style="margin-left: -5px; margin-right: -5px;"] > :nth-child(1) > .Button__BaseButton-sc-1hmbtsr-0', timeout).click({multiple:true});
        cy.get('[data-testid=input-device_name]', timeout).clear().type('MP_01-edit');
        // cy.get('[data-testid=select-sector] > .ant-select-selector', timeout).click();
        // cy.contains('test edit', timeout).click();
        cy.get('[data-testid=input-location]', timeout).clear().type('auto test');
        cy.get('.ant-row-end > .ant-col > .Button__BaseButton-sc-1hmbtsr-0').click({force:true});
        cy.contains('Berhasil', timeout).should('be.visible');

        // check data
        cy.get('[data-testid=input-device_name]', timeout).should('have.value', 'MP_01-edit');
        //cy.get('[data-testid=select-sector] > .ant-select-selector', timeout).should('have.contain', 'test edit');
        cy.get('[data-testid=input-location]', timeout).should('have.value', 'auto test');
      });

      it('Add Additional Info', () => {
        cy.wait(7000);
        cy.get('[data-testid=select-sector] > .ant-select-selector > .ant-select-selection-item', timeout).click({force:true});
        cy.contains('DMIA', timeout).click();
        cy.get(':nth-child(1) > a > .sector-card', timeout).click();
        cy.wait(3000);
        cy.get('[style="margin-left: -5px; margin-right: -5px;"] > :nth-child(1) > .Button__BaseButton-sc-1hmbtsr-0', timeout).click({multiple:true});
        // cy.get('.ant-select-selector', timeout).click();
        // cy.contains('DMIA', timeout).click();
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
        cy.wait(7000);
        cy.get('[data-testid=select-sector] > .ant-select-selector > .ant-select-selection-item', timeout).click({force:true});
        cy.contains('DMIA', timeout).click();
        cy.get(':nth-child(1) > a > .sector-card', timeout).click();
        cy.get('[style="margin-left: -5px; margin-right: -5px;"] > :nth-child(1) > .Button__BaseButton-sc-1hmbtsr-0', timeout).click({multiple:true});
        cy.get('[style="margin-bottom: 198px;"] > .ant-btn', timeout).click();
        cy.get(':nth-child(6) > .ant-form-item > .ant-row > .ant-col > .ant-form-item-control-input > .ant-form-item-control-input-content > [data-testid="input-additional_info"]', timeout).clear({force:true}).type('auto update', {force:true});
        cy.get(':nth-child(8) > .ant-form-item > .ant-row > .ant-col > .ant-form-item-control-input > .ant-form-item-control-input-content > [data-testid="input-additional_info"]', timeout).clear({force:true}).type('auto 2 update', {force:true});
        cy.get('.ant-row-end > .ant-col > .Button__BaseButton-sc-1hmbtsr-0').click({force:true});
        cy.contains('Berhasil', timeout).should('be.visible');
      });

      it('Update Info', () => {
        cy.wait(7000);
        cy.get('[data-testid=select-sector] > .ant-select-selector > .ant-select-selection-item', timeout).click({force:true});
        cy.contains('DMIA', timeout).click();
        cy.get(':nth-child(1) > a > .sector-card', timeout).click();
        cy.get('[style="margin-left: -5px; margin-right: -5px;"] > :nth-child(1) > .Button__BaseButton-sc-1hmbtsr-0', timeout).click({multiple:true});
        cy.get('[data-testid=input-device_name]', timeout).clear().type('MP_01');
        cy.get('[data-testid=input-location]', timeout).clear().type('0');
        cy.get('.ant-row-end > .ant-col > .Button__BaseButton-sc-1hmbtsr-0').click({force:true});
        cy.contains('Berhasil', timeout).should('be.visible');
      });

      it('Cek Data Additional Info', () => {
        cy.wait(7000);
        cy.get('[data-testid=select-sector] > .ant-select-selector > .ant-select-selection-item', timeout).click({force:true});
        cy.contains('DMIA', timeout).click();
        cy.get(':nth-child(1) > a > .sector-card', timeout).click();
        cy.get('[style="margin-left: -5px; margin-right: -5px;"] > :nth-child(1) > .Button__BaseButton-sc-1hmbtsr-0', timeout).click({multiple:true});
        cy.get('[data-testid=input-device_name]', timeout).should('have.value', 'MP_01');
        cy.get('[data-testid=select-sector] > .ant-select-selector', timeout).should('have.contain', 'DMIA');
        cy.get('[data-testid=input-location]', timeout).should('have.value', '0');
        cy.get(':nth-child(6) > .ant-form-item > .ant-row > .ant-col > .ant-form-item-control-input > .ant-form-item-control-input-content > [data-testid="input-additional_info"]', timeout).should('have.value', 'auto update');
        cy.get(':nth-child(8) > .ant-form-item > .ant-row > .ant-col > .ant-form-item-control-input > .ant-form-item-control-input-content > [data-testid="input-additional_info"]', timeout).should('have.value', 'auto 2 update');
        cy.get('.ant-modal-close-x > .anticon > svg').click();
      });

      it('Hapus Additional Info', () => {
        cy.wait(3000);
        cy.get('[data-testid=select-sector] > .ant-select-selector > .ant-select-selection-item', timeout).click({force:true});
        cy.contains('DMIA', timeout).click();
        cy.get(':nth-child(1) > a > .sector-card', timeout).click();
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
      it('Edit Kalibrasi', () => {
        cy.wait(3000);
        // cy.get('[data-testid=select-sector] > .ant-select-selector > .ant-select-selection-item', timeout).click({force:true});
        // cy.contains('DMIA', timeout).click();
        // cy.get(':nth-child(1) > a > .sector-card', timeout).click();
        cy.get(':nth-child(2) > .ant-row > :nth-child(2) > .ant-dropdown-trigger', timeout).click({force:true});
        cy.contains('Edit Kalibrasi', timeout).click({force:true});
        cy.get('.DetailCondition__InputNum-z5ehht-1', timeout).clear().type('44').should('have.value', '44');
        cy.get('.ant-row-end > .Button__BaseButton-sc-1hmbtsr-0', timeout).click({force:true});
        cy.contains('Berhasil', timeout).should('be.visible')
      });

      it('Cek Data Kalibrasi', () => {
        cy.wait(3000);
        // cy.get('[data-testid=select-sector] > .ant-select-selector > .ant-select-selection-item', timeout).click({force:true});
        // cy.contains('DMIA', timeout).click();
        // cy.get(':nth-child(1) > a > .sector-card', timeout).click();
        cy.get(':nth-child(2) > .ant-row > :nth-child(2) > .ant-dropdown-trigger', timeout).click({force:true});
        cy.contains('Edit Kalibrasi', timeout).click({force:true});
        cy.get('.DetailCondition__InputNum-z5ehht-1', timeout).should('have.value', '44');
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        today = dd + '/' + mm + '/' + yyyy;
        cy.get('p', timeout).should('have.contain', 'Terakhir Diubah: ' + today);
        cy.get('.ant-modal-close-x').click();
      });
    });
    /*
    describe('Export Chart', () => {
      beforeEach(() => {
        cy.visit('/device')
        cy.wait(3000);
        cy.get('[data-testid=select-sector] > .ant-select-selector > .ant-select-selection-item', timeout).click({force:true});
        cy.contains('DMIA', timeout).click();
        cy.wait(3000);
        cy.get(':nth-child(1) > a > .sector-card', timeout).click();
        cy.wait(3000);
        cy.get(':nth-child(2) > .ant-row > :nth-child(2) > .ant-dropdown-trigger > svg', timeout).click();
      });

      it('Export JPG', () => {
        cy.contains('Unduh sebagai JPG', timeout).click({force:true});
        cy.server().should((server) => {
          expect(server.status).to.eq(200);
        });  
      });
      
      it('Export PDF', () => {
        cy.contains('Unduh sebagai PDF', timeout).click({force:true});
        cy.server().should((server) => {
          expect(server.status).to.eq(200);
        });  
      });
    });
    */
    /*
    describe('Anomali Reason', () => {
      it('Read and Update', () => {
        cy.wait(3000);
        cy.get('[data-testid=select-sector] > .ant-select-selector > .ant-select-selection-item', timeout).click({force:true});
        cy.contains('Mixer', timeout).click();
        cy.get(':nth-child(4) > a > .sector-card', timeout).click();
        cy.get(':nth-child(4) > .ant-card-body > .reason-card__container--warning > .reason-card__title--warning', timeout)
          .contains('Arus Agitator Ball 2 - Arus Listrik').should('be.visible');
        cy.get(':nth-child(4) > .ant-card-body > .reason-card__container--warning > :nth-child(2)', timeout)
          .should('be.visible');
        cy.get(':nth-child(4) > .ant-card-body > .reason-card__container--warning > :nth-child(3)', timeout)
          .should('be.visible');
        cy.get(':nth-child(3) > .ant-card-body > .reason-card__container--warning', timeout)
          .click();
        cy.get('#input_reason_reason', timeout).clear().type('auto tes aab 2');
        cy.contains('Submit', timeout).click();
        cy.contains('Data berhasil diperbaharui', timeout).should('be.visible');
        cy.get(':nth-child(3) > .ant-card-body > .reason-card__container--warning', timeout)
          .click();
        cy.get(':nth-child(2) > .input-reason-form__row__field', timeout)
          .should('have.contain', 'Arus Agitator Ball 2 - Arus Listrik');
        cy.get('[style="margin-left: -12px; margin-right: -12px;"] > :nth-child(1) > .input-reason-form__row > .input-reason-form__row__field', timeout)
          .should('be.visible');
        cy.get(':nth-child(2) > .input-reason-form__row > .input-reason-form__row__field', timeout)
          .should('be.visible');
        cy.get('#input_reason_reason', timeout).should('have.value', 'auto tes aab 2');
        cy.get('.ant-modal-close-x', timeout).click();
        cy.get(':nth-child(3) > .ant-card-body > .reason-card__container--warning', timeout)
          .click();
        cy.get('#input_reason_reason', timeout).clear();
        cy.contains('Submit', timeout).click();
        cy.get('.ant-form-item-explain-error', timeout).contains('Keterangan harus diisi');
        cy.get('#input_reason_reason', timeout).type('test');
        cy.contains('Submit', timeout).click();
        cy.contains('Data berhasil diperbaharui', timeout).should('be.visible');
        cy.get(':nth-child(3) > .ant-card-body > .reason-card__container--warning', timeout)
          .click();
        cy.get('#input_reason_reason', timeout).should('have.value', 'test');
        cy.get('.ant-modal-close-x', timeout).click();
      });
    });
  */
  });
});