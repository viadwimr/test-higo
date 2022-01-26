/* eslint-disable */
/// <reference types="cypress" />

const timeout = { timeout: 60000 };
const ipData = '34.87.144.83:3009';

describe('Shift', () => {
  before(() => {
    cy.login('engineering');
  });

  beforeEach(() => {
    cy.visit('/shift');
  });

  describe('CRU Data Shift', () => {
    it('Tambah Shift', () => {
      cy.contains('Tambah', timeout).click();
      cy.get('#product_form_shift_name', timeout).type('Test Shift');
      cy.get(':nth-child(1) > .ant-row > .ant-col > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-picker', timeout)
        .click();
      cy.wait(1000);
      cy.get(':nth-child(1) > :nth-child(4) > .ant-picker-time-panel-cell-inner', timeout)
        .click();
      cy.get(':nth-child(2) > :nth-child(1) > .ant-picker-time-panel-cell-inner', timeout)
        .click();
      cy.get('.ant-btn', timeout).click();
      cy.get(':nth-child(3) > .ant-row > .ant-col > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-picker', timeout)
        .click();
      cy.get(':nth-child(1) > :nth-child(7) > .ant-picker-time-panel-cell-inner', timeout).eq(1)
        .click();
      cy.get(':nth-child(2) > :nth-child(7) > .ant-picker-time-panel-cell-inner', timeout).eq(1)
        .click();
      cy.get('.ant-picker-ok > .ant-btn', timeout).eq(1)
        .click();
      cy.get('.ant-select-selector', timeout).click();
      cy.get('.ant-select-item-option-active', timeout).click();
      cy.get('[label="Selasa"] > .ant-select-item-option-content', timeout).click();
      cy.get('[label="Kamis"] > .ant-select-item-option-content', timeout).click();
      cy.get('.ant-select-selector', timeout).click();
      cy.contains('Submit', timeout).click();
      cy.contains('Success!', timeout).should('be.visible');
    });

    it('Read Data with Search', () => {
      cy.wait(5000);
      cy.get('.ant-input', timeout).type('Test Shift');
      cy.contains('Test Shift', timeout).should('be.visible');
      cy.get('tr[class="ant-table-row ant-table-row-level-0"]', timeout).eq(0).contains('Test Shift 2');
      cy.get('tr[class="ant-table-row ant-table-row-level-0"]', timeout).eq(0).contains('04:00');
      cy.get('tr[class="ant-table-row ant-table-row-level-0"]', timeout).eq(0).contains('09:02');
    });

    it('Edit Shift', () => {
      cy.get(':nth-child(5) > .ant-dropdown-trigger', timeout).eq(9).click();
      cy.contains('Edit', timeout).click();
      cy.get('#product_form_shift_name', timeout).clear().type('Test Shift 1');
      cy.get(':nth-child(1) > .ant-row > .ant-col > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-picker', timeout)
        .click();
      cy.wait(1000);
      cy.get(':nth-child(1) > :nth-child(5) > .ant-picker-time-panel-cell-inner', timeout)
        .click();
      cy.get(':nth-child(2) > :nth-child(1) > .ant-picker-time-panel-cell-inner', timeout)
        .click();
      cy.get('.ant-btn', timeout).click();
      cy.get(':nth-child(3) > .ant-row > .ant-col > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-picker', timeout)
        .click();
      cy.get(':nth-child(1) > :nth-child(10) > .ant-picker-time-panel-cell-inner', timeout).eq(1)
        .click();
      cy.get(':nth-child(2) > :nth-child(3) > .ant-picker-time-panel-cell-inner', timeout).eq(1)
        .click();
      cy.get('.ant-picker-ok > .ant-btn', timeout).eq(1)
        .click();
      cy.get(':nth-child(2) > .ant-select-selection-item > .ant-select-selection-item-remove > .anticon > svg', timeout)
        .click();
      cy.contains('Submit', timeout).click();
      cy.contains('Success!', timeout).should('be.visible');
    });
  });
  
  describe('Sorting', () => {
    describe('Kolom Nama Shift', () => {
      it('Ascending', () => {
        cy.get(':nth-child(1) > .ant-table-column-sorters-with-tooltip > .ant-table-column-sorters > .ant-table-column-sorter > .ant-table-column-sorter-inner > .anticon-caret-down > svg', timeout)
          .click();
        cy.get('tr[class="ant-table-row ant-table-row-level-0"]', timeout).eq(2).contains('Shift Jumat Pagi');
      });

      it('Descending', () => {
        cy.get(':nth-child(1) > .ant-table-column-sorters-with-tooltip > .ant-table-column-sorters > .ant-table-column-sorter > .ant-table-column-sorter-inner > .anticon-caret-down > svg', timeout).click();
        cy.get(':nth-child(1) > .ant-table-column-sorters-with-tooltip > .ant-table-column-sorters > .ant-table-column-sorter > .ant-table-column-sorter-inner > .anticon-caret-down > svg', timeout).click();
        cy.get('tr[class="ant-table-row ant-table-row-level-0"]', timeout).eq(0).contains('Test Shift 2');
      });
    });

    describe('Kolom Waktu Mulai', () => {
      it('Ascending', () => {
        cy.get(':nth-child(2) > .ant-table-column-sorters-with-tooltip > .ant-table-column-sorters > .ant-table-column-sorter > .ant-table-column-sorter-inner > .anticon-caret-down > svg', timeout).click();
        cy.get('tr[class="ant-table-row ant-table-row-level-0"]', timeout).eq(0).contains('02:02');
      });

      it('Descending', () => {
        cy.get(':nth-child(2) > .ant-table-column-sorters-with-tooltip > .ant-table-column-sorters > .ant-table-column-sorter > .ant-table-column-sorter-inner > .anticon-caret-down > svg', timeout).click();
        cy.get(':nth-child(2) > .ant-table-column-sorters-with-tooltip > .ant-table-column-sorters > .ant-table-column-sorter > .ant-table-column-sorter-inner > .anticon-caret-down > svg', timeout).click();
        cy.get('tr[class="ant-table-row ant-table-row-level-0"]', timeout).eq(0).contains('22:00');
      });
    });

    describe('Kolom Waktu Selesai', () => {
      it('Ascending', () => {
        cy.get(':nth-child(3) > .ant-table-column-sorters-with-tooltip > .ant-table-column-sorters > .ant-table-column-sorter > .ant-table-column-sorter-inner > .anticon-caret-down > svg', timeout).click();
        cy.get('tr[class="ant-table-row ant-table-row-level-0"]', timeout).eq(0).contains('03:05');
      });

      it('Descending', () => {
        cy.get(':nth-child(3) > .ant-table-column-sorters-with-tooltip > .ant-table-column-sorters > .ant-table-column-sorter > .ant-table-column-sorter-inner > .anticon-caret-down > svg', timeout).click();
        cy.get(':nth-child(3) > .ant-table-column-sorters-with-tooltip > .ant-table-column-sorters > .ant-table-column-sorter > .ant-table-column-sorter-inner > .anticon-caret-down > svg', timeout).click();
        cy.get('tr[class="ant-table-row ant-table-row-level-0"]', timeout).eq(0).contains('21:08');
      });
    });
  });
});
