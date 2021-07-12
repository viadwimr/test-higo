/* eslint-disable */
/// <reference types="cypress" />

const timeout = { timeout: 60000 };
const ipData = '34.87.144.83:3009';

describe('Trend', () => {
  before(() => {
    cy.mockUserAdmin();
    cy.mockResponse();
    cy.login('admin');
    cy.get('[title="Trend"] > a', timeout).click();
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
});
