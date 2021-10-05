/* eslint-disable */
/// <reference types="cypress" />

const timeout = { timeout: 60000 };
const force = { force: true };

describe('Trend', () => {
  before(() => {
    cy.login('engineering');
  });

  beforeEach(() => {
    cy.visit('/analysis');
  });

  it('Tambah Grafik', () => {
    cy.get(':nth-child(3) > .Button__StyledButton-lb9z7q-0', timeout).click({ force: true })
    cy.get('input[id="analysis_filter_metric"]', timeout).click();
    cy.wait(1000);
    cy.get('div[class="ant-select-item-option-content"]', timeout).contains('OEE').click();
    cy.get('input[id="analysis_filter_asset"]', timeout).click();
    cy.wait(1000);
    cy.get('span[title="Line 2"]', timeout).click();
    cy.get('input[id="analysis_filter_chart"]', timeout).click();
    cy.wait(1000);
    cy.get('div[class="ant-select-item-option-content"]', timeout).contains('Line Chart').click();
    cy.contains('30 Hari Terakhir', timeout).click();
    cy.contains('24 Jam', timeout).click();
    cy.contains('Submit', timeout).click();
    cy.contains('Berhasil!', timeout).should('be.visible');
  });

  it('Edit Grafik', () => {
    cy.get(':nth-child(2) > .ant-row-middle > .ant-col-4 > .ant-row > :nth-child(2) > .ant-dropdown-trigger', timeout).click();
    cy.get('li[class="ant-dropdown-menu-item"]', timeout).contains('Edit').click();
    cy.get('span[class="ant-select-selection-item"]', timeout).eq(0).click();
    cy.wait(1000);
    cy.get('div[class="ant-select-item-option-content"]', timeout).contains('OEE').click();
    cy.get('span[class="ant-select-selection-item"]', timeout).eq(1).click();
    cy.wait(1000);
    cy.get('span[title="Line 2"]', timeout).eq(1).click();
    cy.get('span[class="ant-select-selection-item"]', timeout).eq(2).click();
    cy.wait(1000);
    cy.get('div[class="ant-select-item-option-content"]', timeout).contains('Line Chart').click();
    cy.contains('30 Hari Terakhir', timeout).click();
    cy.contains('24 Jam', timeout).click();
    cy.contains('Submit', timeout).click();
  });

  it('Delete Grafik', () => {
    cy.get(':nth-child(2) > .ant-row-middle > .ant-col-4 > .ant-row > :nth-child(2) > .ant-dropdown-trigger', timeout).click();
    cy.get('li[class="ant-dropdown-menu-item"]', timeout).contains('Delete').click();
    cy.contains('Tidak', timeout).click();
    cy.get(':nth-child(2) > .ant-row-middle > .ant-col-4 > .ant-row > :nth-child(2) > .ant-dropdown-trigger', timeout).click();
    cy.get('li[class="ant-dropdown-menu-item"]', timeout).contains('Delete').click();
    cy.contains('Ya', timeout).click();
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
