/// <reference types="Cypress" />

var timeout = { timeout: 60000 }

describe('Report', () => {
  before(() => {
    cy.login('admin');
    cy.get('[title="Report"] > .ant-menu-title-content > a', timeout).click();
  });
     
  it('Akan muncul halaman untuk men-generate report dari dashboard', () => {
    cy.get('.title', timeout).contains('REPORT');
    cy.get(':nth-child(1) > .ant-col-3 > .ant-row', timeout).contains('Device');
    cy.get(':nth-child(2) > .ant-col-3 > .ant-row', timeout).contains('Indikator');
    cy.get(':nth-child(3) > .ant-col-3 > .ant-row', timeout).contains('Periode');
    cy.get(':nth-child(4) > .ant-col-3 > .ant-row', timeout).contains('Interval');
    cy.get(':nth-child(5) > .ant-col-3 > .ant-row', timeout).contains('Waktu');
    cy.get('#report_form_device', timeout).should('be.visible');
    cy.get('.css-1hwfws3', timeout).should('be.visible');
    cy.get('[data-testid="form-period"] > .ant-select-selector', timeout).should('be.visible');
    cy.get('[data-testid=form-interval] > .ant-select-selector', timeout).should('be.visible');
    cy.get('[data-testid=time-daily-report] > [data-testid=label]', timeout).should('be.visible');
    cy.get('[data-testid="time-hour-report"] > [data-testid="label"]', timeout).should('be.visible');
    cy.get('[data-testid=submit-btn-report]', timeout).should('be.visible');
    cy.get('[data-testid="save-report-btn"]', timeout).should('be.visible');
  });

  it('Menu drop-down nama device yang ada', () => {
    cy.get('#report_form_device', timeout).click(timeout);
    cy.get('[data-testid="select-MP_01"]', timeout).click();
  });

  it('Menu drop-down indikator yang ada', () => {
    cy.get('.css-1hwfws3', timeout).click();
    cy.contains('Energi', timeout).click();
    cy.get('.css-1hwfws3', timeout).click();
  });

  it('Menu drop-down untuk jangka waktu yang ada', () => {
    cy.get('[data-testid="form-period"] > .ant-select-selector', timeout).click();
    cy.get('div[class="ant-select-item ant-select-item-option"]', timeout).eq(3).click();
  });

  it('Menu drop-down interval mulai dari Lihat Semua, 5 Menit hingga 60 Menit', () => {
    cy.get('[data-testid=form-interval] > .ant-select-selector', timeout).click();
    cy.contains('Lihat Semua', timeout).should('be.visible');
    cy.contains('5 Menit', timeout).should('be.visible');
    cy.contains('15 Menit', timeout).should('be.visible');
    cy.contains('30 Menit', timeout).should('be.visible');
    cy.contains('60 Menit', timeout).should('be.visible');
    cy.contains('15 Menit', timeout).click({force:true});
  });

  it('Daily satuan terkecil harian dan Hourly untuk satuan terkecil per-jam', () => {
    cy.get('[data-testid=time-daily-report] > [data-testid=label]', timeout).click();
    // hourly
  });

  it('Report tampil berupa tabel di bawah form', () => {
    cy.get('[data-testid=submit-btn-report]').click({force:true});
    cy.get('.ant-card-head-title', timeout).contains('Report MP_01', timeout).should('be.visible');
    cy.get('.ant-card-body', timeout).should('be.visible');
    cy.get('.ant-layout-content > :nth-child(3)', timeout).should('be.visible');
  });

  it('Untuk file PDF berupa laporan dengan format file .pdf dan untuk CSV dengan format .csv', () => {
    //csv
    cy.get('[data-testid=download-report]', timeout).click();
    cy.get('[data-testid=download-csv-report] > .ant-dropdown-menu-title-content', timeout).click();
    cy.contains('Download Berhasil!', timeout).should('be.visible');
    // pdf
    cy.wait(3000);
    cy.get('[data-testid=download-report]', timeout).click();
    cy.get('[data-testid=download-pdf-report] > .ant-dropdown-menu-title-content', timeout).click();
    cy.contains('Download Berhasil!', timeout).should('be.visible');
  });
});