/// <reference types="Cypress" />

var timeout = { timeout: 60000 }

describe('Report', () => {
  describe('Generate Daily', () => {
    before(() => {
      cy.get('[title="Report"] > .ant-menu-title-content > a', timeout).click();
    });

    it('Filter Daily', () => {
      cy.get('#report_form_device', timeout).click(timeout);
      cy.contains('Cold Water Ball 1', timeout).click();
      cy.get('.css-1hwfws3', timeout).click();
      cy.contains('Percent', timeout).click();
      cy.get('.css-1hwfws3', timeout).click();
      cy.get('#report_form_period', timeout).click();
      cy.get('div[class="ant-select-item ant-select-item-option"]', timeout).eq(3).click();
      cy.get('[data-testid=form-interval] > .ant-select-selector', timeout).click();
      cy.contains('15 Menit', timeout).click({force:true});
      cy.get('[data-testid=time-daily-report] > [data-testid=label]', timeout).click();
      cy.get('[data-testid=submit-btn-report]').click({force:true});
  
      cy.get('[data-testid=download-report]', timeout).should('be.visible');
      cy.get('[data-testid=save-report-btn]', timeout).should('be.visible');
      cy.get('.ant-card-head-title', timeout).contains('Report Cold Water Ball 1', timeout).should('be.visible');
      cy.get('.ant-card-body', timeout).should('be.visible');
      cy.get('.ant-layout-content > :nth-child(3)', timeout).should('be.visible');
    });
  
    it('Download CSV', () => {
      cy.get('[data-testid=download-report]', timeout).click();
      cy.get('[data-testid=download-csv-report] > .ant-dropdown-menu-title-content', timeout).click();
      cy.contains('Download Berhasil!', timeout).should('be.visible');
    });

    it('Download PDF', () => {
      cy.get('[data-testid=download-report]', timeout).click();
      cy.get('[data-testid=download-pdf-report] > .ant-dropdown-menu-title-content', timeout).click();
      cy.contains('Download Berhasil!', timeout).should('be.visible');
    });

    it('Simpan sebagai report terjadwal', () => {
      cy.get('[data-testid=save-report-btn]', timeout).click();
      cy.get('[data-testid=schedule-name-form]', timeout).type('Test');
      cy.get('[data-testid=schedule-note-form]', timeout).type('Test');
      cy.get('[data-testid=schedule-daily-btn] > [data-testid=label]').click();

      cy.get('[data-testid=schedule-send-date-form]').click();
      cy.get('a[class="ant-picker-today-btn"]', timeout).click();
      cy.get('#scheduled_report_form_send_time', timeout).click();
      cy.get('li[class="rc-time-picker-panel-select-option-selected"]', timeout).eq(0).click();
      cy.get('[data-testid=schedule-daily-btn] > [data-testid=label]').click();
      cy.get('[data-testid=schedule-type-send] > :nth-child(1) > :nth-child(2)', timeout).click();
    
      cy.get('[data-testid=schedule-submit-btn]').click();
      cy.contains('Berhasil Disimpan!', timeout).should('be.visible');
    });
  });

  describe('Generate Hourly', () => {
    before(() => {
      cy.visit('/report');
    });

    it('Filter Hourly', () => {
      cy.get('#report_form_device', timeout).click(timeout);
      cy.contains('Cold Water Ball 1', timeout).click();
      cy.get('.css-1hwfws3', timeout).click();
      cy.contains('Percent', timeout).click();
      cy.get('.css-1hwfws3', timeout).click();
      cy.get('#report_form_period', timeout).click();
      cy.get('div[class="ant-select-item ant-select-item-option"]', timeout).eq(3).click();
      cy.get('[data-testid=form-interval] > .ant-select-selector', timeout).click();
      cy.contains('5 Menit', timeout).click({force:true});
      cy.get('[data-testid=time-hour-report] > [data-testid=label]', timeout).click();
      cy.get('#report_form_start_time', timeout).click();
      cy.get(':nth-child(1) > ul > .rc-time-picker-panel-select-option-selected', timeout).click();
      cy.get('#report_form_end_time', timeout).click();
      cy.get(':nth-child(1) > ul > .rc-time-picker-panel-select-option-selected', timeout).click();
      cy.get('[data-testid=submit-btn-report]').click();
  
      cy.get('[data-testid=download-report]', timeout).should('be.visible');
      cy.get('[data-testid=save-report-btn]', timeout).should('be.visible');
      cy.get('.ant-card-head-title', timeout).contains('Report Cold Water Ball 1', timeout).should('be.visible');
      cy.get('.ant-card-body', timeout).should('be.visible');
      cy.get('.ant-layout-content > :nth-child(3)', timeout).should('be.visible');
    });
  
    it('Download CSV', () => {
      cy.get('[data-testid=download-report]', timeout).click();
      cy.get('[data-testid=download-csv-report] > .ant-dropdown-menu-title-content', timeout).click();
      cy.contains('Download Berhasil!', timeout).should('be.visible');
    });

    it('Download PDF', () => {
      cy.get('[data-testid=download-report]', timeout).click();
      cy.get('[data-testid=download-pdf-report] > .ant-dropdown-menu-title-content', timeout).click();
      cy.contains('Download Berhasil!', timeout).should('be.visible');
    });

    it('Simpan sebagai report terjadwal', () => {
      cy.get('[data-testid=save-report-btn]', timeout).click();
      cy.get('[data-testid=schedule-name-form]', timeout).type('Test');
      cy.get('[data-testid=schedule-note-form]', timeout).type('Test');
      cy.get('[data-testid=schedule-daily-btn] > [data-testid=label]').click();

      cy.get('[data-testid=schedule-send-date-form]').click();
      cy.get('a[class="ant-picker-today-btn"]', timeout).click();
      cy.get('#scheduled_report_form_send_time', timeout).click();
      cy.get('li[class="rc-time-picker-panel-select-option-selected"]', timeout).eq(0).click();
      cy.get('[data-testid=schedule-daily-btn] > [data-testid=label]').click();
      cy.get('[data-testid=schedule-type-send] > :nth-child(1) > :nth-child(2)', timeout).click();
    
      cy.get('[data-testid=schedule-submit-btn]').click();
      cy.contains('Berhasil Disimpan!', timeout).should('be.visible');
    });
  });

  describe('Filter by Periode', () => {
    before(() => {
      cy.get('[title="Report"] > .ant-menu-title-content > a', timeout).click();
    });

    beforeEach(() => {
      cy.visit('/report');
    });

    it('Hari ini', () => {
      cy.get('#report_form_device', timeout).click(timeout);
      cy.contains('Cold Water Ball 1', timeout).click();
      cy.get('.css-1hwfws3', timeout).click();
      cy.contains('Percent', timeout).click();
      cy.get('.css-1hwfws3', timeout).click();
      cy.get('#report_form_period', timeout).click();
      cy.contains('Hari ini', timeout).click();
      cy.get('[data-testid=form-interval] > .ant-select-selector', timeout).click();
      cy.contains('30 Menit', timeout).click({force:true});
      cy.get('[data-testid=time-daily-report] > [data-testid=label]', timeout).click();
      cy.get('[data-testid=submit-btn-report]').click();
  
      cy.get('[data-testid=download-report]', timeout).should('be.visible');
      cy.get('[data-testid=save-report-btn]', timeout).should('be.visible');
      cy.get('.ant-card-head-title', timeout).contains('Report Cold Water Ball 1', timeout).should('be.visible');
      cy.get('.ant-card-body', timeout).should('be.visible');
      cy.get('.ant-layout-content > :nth-child(3)', timeout).should('be.visible');
    });

    it('Kemaren', () => {
      cy.get('#report_form_device', timeout).click(timeout);
      cy.contains('Cold Water Ball 1', timeout).click();
      cy.get('.css-1hwfws3', timeout).click();
      cy.contains('Percent', timeout).click();
      cy.get('.css-1hwfws3', timeout).click();
      cy.get('#report_form_period', timeout).click();
      cy.contains('Kemarin', timeout).click();
      cy.get('[data-testid=form-interval] > .ant-select-selector', timeout).click();
      cy.contains('60 Menit', timeout).click({force:true});
      cy.get('[data-testid=time-daily-report] > [data-testid=label]', timeout).click();
      cy.get('[data-testid=submit-btn-report]').click();
  
      cy.get('[data-testid=download-report]', timeout).should('be.visible');
      cy.get('[data-testid=save-report-btn]', timeout).should('be.visible');
      cy.get('.ant-card-head-title', timeout).contains('Report Cold Water Ball 1', timeout).should('be.visible');
      cy.get('.ant-card-body', timeout).should('be.visible');
      cy.get('.ant-layout-content > :nth-child(3)', timeout).should('be.visible');
    });

    it('Seminggu terakhir', () => {
      cy.get('#report_form_device', timeout).click(timeout);
      cy.contains('Cold Water Ball 1', timeout).click();
      cy.get('.css-1hwfws3', timeout).click();
      cy.contains('Percent', timeout).click();
      cy.get('.css-1hwfws3', timeout).click();
      cy.get('#report_form_period', timeout).click();
      cy.contains('Seminggu Terakhir', timeout).click();
      cy.get('[data-testid=form-interval] > .ant-select-selector', timeout).click();
      cy.contains('30 Menit', timeout).click({force:true});
      cy.get('[data-testid=time-daily-report] > [data-testid=label]', timeout).click();
      cy.get('[data-testid=submit-btn-report]').click();
  
      cy.get('[data-testid=download-report]', { timeout : 200000}).should('be.visible');
      cy.get('[data-testid=save-report-btn]', timeout).should('be.visible');
      cy.get('.ant-card-head-title', timeout).contains('Report Cold Water Ball 1', timeout).should('be.visible');
      cy.get('.ant-card-body', timeout).should('be.visible');
      cy.get('.ant-layout-content > :nth-child(3)', timeout).should('be.visible');
    });

    it('Dua minggu terakhir', () => {
      cy.get('#report_form_device', timeout).click(timeout);
      cy.contains('Cold Water Ball 1', timeout).click();
      cy.get('.css-1hwfws3', timeout).click();
      cy.contains('Percent', timeout).click();
      cy.get('.css-1hwfws3', timeout).click();
      cy.get('#report_form_period', timeout).click();
      cy.contains('Dua Minggu Terakhir', timeout).click();
      cy.get('[data-testid=form-interval] > .ant-select-selector', timeout).click();
      cy.contains('60 Menit', timeout).click({force:true});
      cy.get('[data-testid=time-daily-report] > [data-testid=label]', timeout).click();
      cy.get('[data-testid=submit-btn-report]').click();
  
      cy.get('[data-testid=download-report]', { timeout : 200000}).should('be.visible');
      cy.get('[data-testid=save-report-btn]', timeout).should('be.visible');
      cy.get('.ant-card-head-title', timeout).contains('Report Cold Water Ball 1', timeout).should('be.visible');
      cy.get('.ant-card-body', timeout).should('be.visible');
      cy.get('.ant-layout-content > :nth-child(3)', timeout).should('be.visible');
    });
  });
  
  describe('Report >= 3 Bulan', () => {
    
    before(() => {
      cy.get('[title="Report"] > .ant-menu-title-content > a', timeout).click();
    });

    beforeEach(() => {
      cy.visit('/report');
    });

    it('Auto Download Report', () => {
      cy.get('#report_form_device', timeout).click(timeout);
      cy.contains('Auto Test 1', timeout).click();
      cy.get('.css-1hwfws3', timeout).click();
      cy.contains('Percent', timeout).click();
      cy.get('.css-1hwfws3', timeout).click();
      cy.get('#report_form_period', timeout).click();
      cy.get('div[class="ant-select-item ant-select-item-option"]', timeout).eq(4).click();
      cy.get('[data-testid=form-interval] > .ant-select-selector', timeout).click();
      cy.contains('30 Menit', timeout).click()
      cy.get('[data-testid=time-daily-report] > [data-testid=label]', timeout).click();
      cy.get('[data-testid=download-report]', timeout).click();
      cy.contains('CSV', timeout).should('be.visible');
      cy.contains('PDF', timeout).should('be.visible')
      cy.contains('CSV', timeout).click();
    });
    
    it('Simpan Sebagai Report Terjadwal', () => {
      cy.get('#report_form_device', timeout).click(timeout);
      cy.contains('Auto Test 1', timeout).click();
      cy.get('.css-1hwfws3', timeout).click();
      cy.contains('Percent', timeout).click({force:true});
      cy.get('.css-1hwfws3', timeout).click();
      cy.get('#report_form_period', timeout).click();
      cy.get('div[class="ant-select-item ant-select-item-option"]', timeout).eq(5).click();
      cy.get('[data-testid=form-interval] > .ant-select-selector', timeout).click();
      cy.contains('30 Menit', timeout).click()
      cy.get('[data-testid=time-daily-report] > [data-testid=label]', timeout).click();
      cy.get('[data-testid=download-report]', timeout).contains('Download').should('be.visible');
      cy.get('[data-testid=save-report-btn]', timeout).click();
      cy.get('[data-testid=schedule-name-form]', timeout).type("autotes");
      cy.get('[data-testid=schedule-note-form]', timeout).type("auto tes");
      cy.get('[data-testid=schedule-daily-btn] > [data-testid=label]', timeout).click();
      cy.get('.ant-picker', timeout).click();
      cy.contains('Today', timeout).click();
      cy.get('#scheduled_report_form_send_time', timeout).click();
      cy.get('.rc-time-picker-panel-combobox > :nth-child(1) > ul > :nth-child(3)', timeout).click({force:true});
      cy.get(':nth-child(2) > ul > :nth-child(5)', timeout).click({force:true});
      cy.get(':nth-child(3) > ul > :nth-child(6)').click({force:true});
      cy.get('#scheduled_report_form > :nth-child(21)', timeout).click();
      cy.contains('Email', timeout).click();
      cy.get('[data-testid=schedule-submit-btn]', timeout).click({force:true});
    });
  });
  
  describe('Edit dan Hapus Report Terjadwal', () => {
    before(() => {
      cy.get('[title="Report"] > .ant-menu-title-content > a', timeout).click();
    });

    beforeEach(() => {
      cy.visit('/report');
    });

    it('Edit Status On/Off', () => {
      cy.get('.ant-table-row > :nth-child(5)', timeout).eq(0).click({force:true});
    });

    it('Hapus Report Terjadwal', () => {
      cy.get('.ant-table-row > :nth-child(6)', timeout).eq(0).click();
      cy.contains('Hapus', timeout).click({force:true});
      cy.contains('Tidak', timeout).click();
      cy.get('.ant-table-row > :nth-child(6)', timeout).eq(0).click();
      cy.contains('Hapus', timeout).click({force:true});
      cy.get('.swal2-confirm', timeout).click();
      cy.contains('Report berhasil dihapus.', timeout).should('be.visible');
    });
  });

  describe('Sorting Data', () => {
    before(() => {
      cy.get('[title="Report"] > .ant-menu-title-content > a', timeout).click();
    });

    it('Filter Device', () => {
      cy.wait(3000);
      cy.get('#report_form_device', timeout).click({force:true});
      cy.contains('Agromon', timeout).should('be.visible');
      cy.contains('auto trial', timeout).should('be.visible');
      cy.contains('Ball Mill', timeout).should('be.visible');
      cy.contains('Aauto test', timeout).should('be.visible');
      cy.contains('Arus Agitator Ball 1', timeout).should('be.visible');
      cy.contains('Arus Agitator Ball 1', timeout).should('be.visible');
      cy.contains('Arus Agitator Ball 2', timeout).should('be.visible');
      cy.contains('Cold Water Ball 1', timeout).should('be.visible');
    });

    it('Filter Indicator', () => {
      cy.wait(3000);
      cy.get('#report_form_device', timeout).type('kibimaru');
      cy.contains('kibimaru', timeout).click();
      cy.get('.css-yk16xz-control', timeout).click();
      cy.contains('Arus Listrik', timeout).should('be.visible');
      cy.contains('Daya', timeout).should('be.visible');
      cy.contains('Frequency', timeout).should('be.visible');
      cy.contains('Intensitas Cahaya', timeout).should('be.visible');
    });
  });
});