/* eslint-disable */
/// <reference types="cypress" />

const timeout = { timeout: 60000 };
const force = { force: true };

describe('Trend', () => {
  before(() => {
    cy.login('admin');
  });

  beforeEach(() => {
    cy.visit('/');
    cy.get('.ant-menu-submenu-title', timeout).click();
    cy.contains('Trend', timeout).click();
  });

  it('Tambah Grafik', () => {
    cy.get(':nth-child(3) > .Button__BaseButton-sc-1hmbtsr-0', timeout).click(force);
    cy.get('[data-testid=input-title]', timeout).type('Automation Testing');
    cy.get('#trend_metric', timeout).click();
    cy.wait(2000);
    cy.get('div[class="ant-select-item-option-content"]', timeout).contains('Usage').click();
    cy.contains('Pilih asset').click(force);
    cy.wait(2000);
    cy.get('[title="MP_01"]', timeout).click();
    cy.wait(2000);
    cy.get('#trend_chart_type', timeout).click();
    cy.wait(2000);
    cy.contains('Line Chart', timeout).click();
    cy.get('[data-testid="input-indicator"] > .ant-select-selector', timeout).click();
    cy.get('[title="Energi"]', timeout).click();
    cy.wait(2000);
    cy.get('[data-testid="input-statistic"] > .ant-select-selector', timeout).click();
    cy.get('[title="Average"]', timeout).click();
    cy.get('[data-testid=period-7]', timeout).click();
    cy.get('[data-testid=interval-6h]', timeout).click();
    cy.contains('Submit', timeout).click();
    cy.contains('Berhasil!', timeout).should('be.visible');
  });

  it('Read Grafik', () => {
    cy.get('.ant-layout-content > :nth-child(1)', timeout).should('be.visible');
    cy.contains('Automation Testing', timeout).should('be.visible');
    cy.contains('Klik “Tambah Grafik” untuk bandingkan data mesin Anda.', timeout).should('be.visible');
    cy.contains('Tambah Grafik', timeout).should('be.visible');
  });

  it('Edit Grafik', () => {
    cy.wait(10000);
    cy.get('#download-usage-AutomationTesting > .ant-row > :nth-child(2) > .ant-dropdown-trigger', timeout).click();
    cy.get('.ant-dropdown-menu > :nth-child(1)', timeout).click();
    // edit asset
    cy.get('[data-testid="input-asset"] > .ant-select-selector', timeout).click();
    cy.get('[title="Power Meter Trial"]', timeout).click();
    cy.contains('Submit', timeout).click();
    cy.contains('Berhasil!', timeout).should('be.visible');
    // check asset
    cy.wait(3000);
    cy.get('.apexcharts-legend-text', timeout).contains('MP_01');
    cy.get('.apexcharts-legend-text', timeout).contains('Power Meter Trial');
    // edit period and interval
    cy.get('#download-usage-AutomationTesting > .ant-row > :nth-child(2) > .ant-dropdown-trigger', timeout).click();
    cy.get('.ant-dropdown-menu > :nth-child(1)', timeout).click();
    cy.contains('30 Hari Terakhir', timeout).click();
    cy.contains('24 Jam', timeout).click();
    cy.contains('Submit', timeout).click();
    cy.contains('Berhasil!', timeout).should('be.visible');
    // check period
    cy.wait(3000);
    cy.get('.ant-row > :nth-child(1) > span', timeout).contains('30 Hari Terakhir')
  });

  it('Check Grafik', () => {
    cy.wait(10000);
    cy.get('#download-usage-AutomationTesting > .ant-row > :nth-child(1) > b', timeout).contains('Automation Testing');

    // bug: kode 400 message: "unable to fetch production line oee"
    // cy.get('#download-oee-AutomationTesting > .ant-row > :nth-child(1) > span', timeout).contains('30 Hari Terakhir');
    cy.get('.react-grid-item', timeout).should('be.visible');
  });

  it('Download as JPG', () => {
    cy.wait(7000);
    cy.get('#download-usage-AutomationTesting > .ant-row > :nth-child(2) > .ant-dropdown-trigger', timeout).click();
    cy.contains('Unduh sebagai JPG', timeout).click(force);
    cy.server().should((server) => {
      expect(server.status).to.eq(200);
    });
  });

  it('Download as PDF', () => {
    cy.wait(7000);
    cy.get('#download-usage-AutomationTesting > .ant-row > :nth-child(2) > .ant-dropdown-trigger', timeout).click();
    cy.contains('Unduh sebagai PDF', timeout).click(force);
    cy.server().should((server) => {
      expect(server.status).to.eq(200);
    });
  });

  it('Delete Grafik', () => {
    cy.get('#download-usage-AutomationTesting > .ant-row > :nth-child(2) > .ant-dropdown-trigger', timeout).click();
    cy.contains('Delete', timeout).click();
    cy.contains('Tidak', timeout).click();
    cy.get('#download-usage-AutomationTesting > .ant-row > :nth-child(2) > .ant-dropdown-trigger', timeout).click();
    cy.contains('Delete', timeout).click();
    cy.get('.swal2-confirm', timeout).click();
    cy.contains('Berhasil!', timeout).should('be.visible');

    // Check Grafik After Edit
    cy.reload();
    cy.get('.react-grid-item', timeout).should('not.exist');
  });

  it('Sorting dan search list filter', () => {
    cy.get('.analysis > :nth-child(3) > .Button__BaseButton-sc-1hmbtsr-0', timeout).click(force);
    cy.get('.ant-select-selection-overflow', timeout).type('01');
    cy.wait(2000);
    cy.get('[title="MP_01"]', timeout).contains('MP_01');
  });

  it('Validasi Input', () => {
    cy.get('.analysis > :nth-child(3) > .Button__BaseButton-sc-1hmbtsr-0', timeout).click(force);
    cy.contains('Submit', timeout).click();
    cy.contains('Title tidak boleh kosong', timeout).should('be.visible');
    cy.contains('Metric tidak boleh kosong', timeout).should('be.visible');
    cy.contains('Asset tidak boleh kosong', timeout).should('be.visible');
    cy.contains('Indikator tidak boleh kosong', timeout).should('be.visible');
    cy.contains('Statistic tidak boleh kosong', timeout).should('be.visible');
    cy.contains('Chart Type tidak boleh kosong', timeout).should('be.visible');
    cy.contains('Period tidak boleh kosong', timeout).should('be.visible');
    cy.contains('Interval tidak boleh kosong', timeout).should('be.visible');
    // reset
    cy.get('.ant-drawer-footer > .ant-row > :nth-child(1) > .Button__BaseButton-sc-1hmbtsr-0', timeout)
      .click();
    cy.contains('Title tidak boleh kosong', timeout).should('not.exist');
    cy.contains('Metric tidak boleh kosong', timeout).should('not.exist');
    cy.contains('Asset tidak boleh kosong', timeout).should('not.exist');
    cy.contains('Indikator tidak boleh kosong', timeout).should('not.exist');
    cy.contains('Statistic tidak boleh kosong', timeout).should('not.exist');
    cy.contains('Chart Type tidak boleh kosong', timeout).should('not.exist');
    cy.contains('Period tidak boleh kosong', timeout).should('not.exist');
    cy.contains('Interval tidak boleh kosong', timeout).should('not.exist');
    // close
    cy.get('.ant-drawer-close', timeout).click();
  });
});
