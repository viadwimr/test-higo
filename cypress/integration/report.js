/// <reference types="Cypress" />

var timeout = { timeout: 60000 }

describe('Report', () => {
  describe('Generate Daily', () => {
    before(() => {
      cy.get('[title="Report"] > .ant-menu-title-content > a', timeout).click();
    });

    it('Filter Daily', () => {
      cy.get('#report_form_device', timeout).click(timeout);
      cy.contains('Suhu Aktual Zona 1', timeout).click();
      cy.get('.css-1hwfws3', timeout).click();
      cy.contains('Temperatur', timeout).click();
      cy.get('.css-1hwfws3', timeout).click();
      cy.get('#report_form_period', timeout).click();
      cy.get('div[class="ant-select-item ant-select-item-option"]', timeout).eq(3).click();
      cy.get('[data-testid=time-daily-report] > [data-testid=label]', timeout).click();
      cy.get('[data-testid=submit-btn-report]').click();
  
      cy.get('[data-testid=download-report]', timeout).should('be.visible');
      cy.get('[data-testid=save-report-btn]', timeout).should('be.visible');
      cy.get('.ant-card-head-title', timeout).contains('Report Suhu Aktual Zona 1', timeout).should('be.visible');
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
      cy.contains('Suhu Aktual Zona 1', timeout).click();
      cy.get('.css-1hwfws3', timeout).click();
      cy.contains('Temperatur', timeout).click();
      cy.get('.css-1hwfws3', timeout).click();
      cy.get('#report_form_period', timeout).click();
      cy.get('div[class="ant-select-item ant-select-item-option"]', timeout).eq(3).click();
      cy.get('[data-testid=time-hour-report] > [data-testid=label]', timeout).click();
      cy.get('#report_form_start_time', timeout).click();
      cy.get(':nth-child(1) > ul > .rc-time-picker-panel-select-option-selected', timeout).click();
      cy.get('#report_form_end_time', timeout).click();
      cy.get(':nth-child(1) > ul > .rc-time-picker-panel-select-option-selected', timeout).click();
      cy.get('[data-testid=submit-btn-report]').click();
  
      cy.get('[data-testid=download-report]', timeout).should('be.visible');
      cy.get('[data-testid=save-report-btn]', timeout).should('be.visible');
      cy.get('.ant-card-head-title', timeout).contains('Report Suhu Aktual Zona 1', timeout).should('be.visible');
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
      cy.contains('Suhu Aktual Zona 1', timeout).click();
      cy.get('.css-1hwfws3', timeout).click();
      cy.contains('Temperatur', timeout).click();
      cy.get('.css-1hwfws3', timeout).click();
      cy.get('#report_form_period', timeout).click();
      cy.get('div[class="ant-select-item ant-select-item-option"]', timeout).eq(1).click();
      cy.get('[data-testid=time-daily-report] > [data-testid=label]', timeout).click();
      cy.get('[data-testid=submit-btn-report]').click();
  
      cy.get('[data-testid=download-report]', timeout).should('be.visible');
      cy.get('[data-testid=save-report-btn]', timeout).should('be.visible');
      cy.get('.ant-card-head-title', timeout).contains('Report Suhu Aktual Zona 1', timeout).should('be.visible');
      cy.get('.ant-card-body', timeout).should('be.visible');
      cy.get('.ant-layout-content > :nth-child(3)', timeout).should('be.visible');
    });

    it('Kemaren', () => {
      cy.get('#report_form_device', timeout).click(timeout);
      cy.contains('Suhu Aktual Zona 1', timeout).click();
      cy.get('.css-1hwfws3', timeout).click();
      cy.contains('Temperatur', timeout).click();
      cy.get('.css-1hwfws3', timeout).click();
      cy.get('#report_form_period', timeout).click();
      cy.get('div[class="ant-select-item ant-select-item-option"]', timeout).eq(2).click();
      cy.get('[data-testid=time-daily-report] > [data-testid=label]', timeout).click();
      cy.get('[data-testid=submit-btn-report]').click();
  
      cy.get('[data-testid=download-report]', timeout).should('be.visible');
      cy.get('[data-testid=save-report-btn]', timeout).should('be.visible');
      cy.get('.ant-card-head-title', timeout).contains('Report Suhu Aktual Zona 1', timeout).should('be.visible');
      cy.get('.ant-card-body', timeout).should('be.visible');
      cy.get('.ant-layout-content > :nth-child(3)', timeout).should('be.visible');
    });

    it('Seminggu terakhir', () => {
      cy.get('#report_form_device', timeout).click(timeout);
      cy.contains('Suhu Aktual Zona 1', timeout).click();
      cy.get('.css-1hwfws3', timeout).click();
      cy.contains('Temperatur', timeout).click();
      cy.get('.css-1hwfws3', timeout).click();
      cy.get('#report_form_period', timeout).click();
      cy.get('div[class="ant-select-item ant-select-item-option"]', timeout).eq(3).click();
      cy.get('[data-testid=time-daily-report] > [data-testid=label]', timeout).click();
      cy.get('[data-testid=submit-btn-report]').click();
  
      cy.get('[data-testid=download-report]', { timeout : 200000}).should('be.visible');
      cy.get('[data-testid=save-report-btn]', timeout).should('be.visible');
      cy.get('.ant-card-head-title', timeout).contains('Report Suhu Aktual Zona 1', timeout).should('be.visible');
      cy.get('.ant-card-body', timeout).should('be.visible');
      cy.get('.ant-layout-content > :nth-child(3)', timeout).should('be.visible');
    });

    it('Dua minggu terakhir', () => {
      cy.get('#report_form_device', timeout).click(timeout);
      cy.contains('Suhu Aktual Zona 1', timeout).click();
      cy.get('.css-1hwfws3', timeout).click();
      cy.contains('Temperatur', timeout).click();
      cy.get('.css-1hwfws3', timeout).click();
      cy.get('#report_form_period', timeout).click();
      cy.get('div[class="ant-select-item ant-select-item-option"]', timeout).eq(4).click();
      cy.get('[data-testid=time-daily-report] > [data-testid=label]', timeout).click();
      cy.get('[data-testid=submit-btn-report]').click();
  
      cy.get('[data-testid=download-report]', { timeout : 200000}).should('be.visible');
      cy.get('[data-testid=save-report-btn]', timeout).should('be.visible');
      cy.get('.ant-card-head-title', timeout).contains('Report Suhu Aktual Zona 1', timeout).should('be.visible');
      cy.get('.ant-card-body', timeout).should('be.visible');
      cy.get('.ant-layout-content > :nth-child(3)', timeout).should('be.visible');
    });
  });
});