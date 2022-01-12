/* eslint-disable */
/// <reference types="cypress" />

const timeout = { timeout: 60000 };
const force = { force: true };

describe('Trend', () => {
  before(() => {
    cy.login('direktur');
  });

  beforeEach(() => {
    cy.visit('/trend');
  });

  it('Tambah Grafik', () => {
    cy.get(':nth-child(3) > .Button__BaseButton-lb9z7q-0', timeout).click(force);
    cy.get('[data-testid=input-title]', timeout).type('Testing');
    cy.get('#trend_metric', timeout).click();
    cy.wait(2000);
    cy.get('div[class="ant-select-item-option-content"]', timeout).contains('OEE').click();
    cy.contains('Pilih asset').click(force);
    cy.wait(2000);
    cy.get('span[title="Production Line 1"]', timeout).click();
    cy.get('#trend_chart_type', timeout).click();
    cy.contains('Line Chart', timeout).click();
    cy.get('[data-testid=period-7]', timeout).click();
    cy.get('[data-testid=interval-6h]', timeout).click();
    cy.contains('Submit', timeout).click();
    cy.contains('Berhasil!', timeout).should('be.visible');
  });

  it('Read Grafik', () => {
    cy.get('.ant-layout-content > :nth-child(1)', timeout).should('be.visible');
    cy.contains('Klik “Tambah Grafik” untuk bandingkan data mesin Anda.', timeout).should('be.visible');
    cy.contains('Tambah Grafik', timeout).should('be.visible');
  });

  it('Edit Grafik', () => {
    cy.get('button[class="ant-dropdown-trigger AnalysisLineChart__DropDown-sc-1ue03a2-0 lpvECR Button__BaseButton-lb9z7q-0 kvyqRA"]', timeout).eq(5).click();
    cy.contains('Edit', timeout).click();
    cy.contains('30 Hari Terakhir', timeout).click();
    cy.contains('24 Jam', timeout).click();
    cy.contains('Submit', timeout).click();
    cy.contains('Berhasil!', timeout).should('be.visible');
  });

  it('Delete Grafik', () => {
    cy.get('button[class="ant-dropdown-trigger AnalysisLineChart__DropDown-sc-1ue03a2-0 lpvECR Button__BaseButton-lb9z7q-0 kvyqRA"]', timeout).eq(5).click();
    cy.contains('Delete', timeout).click();
    cy.contains('Tidak', timeout).click();
    cy.get('button[class="ant-dropdown-trigger AnalysisLineChart__DropDown-sc-1ue03a2-0 lpvECR Button__BaseButton-lb9z7q-0 kvyqRA"]', timeout).eq(5).click();
    cy.contains('Delete', timeout).click();
    cy.get('.swal2-confirm', timeout).click();
    cy.contains('Berhasil!', timeout).should('be.visible');
  });

  it('Validasi Input', () => {
    cy.get(':nth-child(3) > .Button__BaseButton-lb9z7q-0', timeout).click(force);
    cy.contains('Submit', timeout).click();
    cy.contains('Title tidak boleh kosong', timeout).should('be.visible');
    cy.contains('Metric tidak boleh kosong', timeout).should('be.visible');
    cy.contains('Asset tidak boleh kosong', timeout).should('be.visible');
    cy.contains('Chart Type tidak boleh kosong', timeout).should('be.visible');
    cy.contains('Period tidak boleh kosong', timeout).should('be.visible');
    cy.contains('Interval tidak boleh kosong', timeout).should('be.visible');
  });

  describe('Download Data', () => {
    describe('Quality', () => {
      it('Download as JPG', () => {
        cy.get(':nth-child(2) > .AnalysisLineChart__Container-sc-1ue03a2-0 > .ant-row-middle > .ant-col-4 > .ant-row > :nth-child(2) > .ant-dropdown-trigger > svg > path', timeout).click();
        cy.contains('Unduh sebagai JPG', timeout).click(force);
      });

      it('Download as PDF', () => {
        cy.get(':nth-child(2) > .AnalysisLineChart__Container-sc-1ue03a2-0 > .ant-row-middle > .ant-col-4 > .ant-row > :nth-child(2) > .ant-dropdown-trigger > svg > path', timeout).click();
        cy.contains('Unduh sebagai PDF', timeout).click(force);
      });
    });

    describe('Availability', () => {
      it('Download as JPG', () => {
        cy.get(':nth-child(3) > .AnalysisLineChart__Container-sc-1ue03a2-0 > .ant-row-middle > .ant-col-4 > .ant-row > :nth-child(2) > .ant-dropdown-trigger > svg > path', timeout).click();
        cy.contains('Unduh sebagai JPG', timeout).click(force);
      });

      it('Download as PDF', () => {
        cy.get(':nth-child(3) > .AnalysisLineChart__Container-sc-1ue03a2-0 > .ant-row-middle > .ant-col-4 > .ant-row > :nth-child(2) > .ant-dropdown-trigger > svg > path', timeout).click();
        cy.contains('Unduh sebagai PDF', timeout).click(force);
      });
    });

    describe('Performance', () => {
      it('Download as JPG', () => {
        cy.get(':nth-child(4) > .AnalysisLineChart__Container-sc-1ue03a2-0 > .ant-row-middle > .ant-col-4 > .ant-row > :nth-child(2) > .ant-dropdown-trigger > svg > path', timeout).click();
        cy.contains('Unduh sebagai JPG', timeout).click(force);
      });

      it('Download as PDF', () => {
        cy.get(':nth-child(4) > .AnalysisLineChart__Container-sc-1ue03a2-0 > .ant-row-middle > .ant-col-4 > .ant-row > :nth-child(2) > .ant-dropdown-trigger > svg > path', timeout).click();
        cy.contains('Unduh sebagai PDF', timeout).click(force);
      });
    });

    describe('OEE', () => {
      it('Download as JPG', () => {
        cy.get(':nth-child(5) > .AnalysisLineChart__Container-sc-1ue03a2-0 > .ant-row-middle > .ant-col-4 > .ant-row > :nth-child(2) > .ant-dropdown-trigger > svg > path', timeout).click();
        cy.contains('Unduh sebagai JPG', timeout).click(force);
      });

      it('Download as PDF', () => {
        cy.get(':nth-child(5) > .AnalysisLineChart__Container-sc-1ue03a2-0 > .ant-row-middle > .ant-col-4 > .ant-row > :nth-child(2) > .ant-dropdown-trigger > svg > path', timeout).click();
        cy.contains('Unduh sebagai PDF', timeout).click(force);
      });
    });
  });
});
