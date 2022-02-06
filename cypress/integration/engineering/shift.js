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

  describe('CRUD Data Shift', () => {
    it('Create Shift', () => {
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
      cy.get('tr[class="ant-table-row ant-table-row-level-0"]', timeout).eq(0).contains('Test Shift');
      cy.get('tr[class="ant-table-row ant-table-row-level-0"]', timeout).eq(0).contains('03:00');
      cy.get('tr[class="ant-table-row ant-table-row-level-0"]', timeout).eq(0).contains('06:06');
      cy.get('.ant-table-row > :nth-child(4)', timeout).eq(0).contains('Senin, Selasa, Kamis');
    });

    it('Edit Shift', () => {
      cy.get(':nth-child(5) > .ant-dropdown-trigger', timeout).eq(7).click();
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
    
    it('Read Data', () => {
      cy.wait(5000);
      cy.get('tr[class="ant-table-row ant-table-row-level-0"]', timeout).eq(7).contains('Test Shift 1');
      cy.get('tr[class="ant-table-row ant-table-row-level-0"]', timeout).eq(7).contains('04:00');
      cy.get('tr[class="ant-table-row ant-table-row-level-0"]', timeout).eq(7).contains('09:02');
      cy.get('.ant-table-row > :nth-child(4)', timeout).eq(7).contains('Senin, Kamis');
    });

    it('Delete Shift', () => {
      cy.get(':nth-child(5) > .ant-dropdown-trigger', timeout).eq(7).click();
      cy.contains('Delete', timeout).click();
      cy.contains('Tidak', timeout).click();
      cy.get(':nth-child(5) > .ant-dropdown-trigger', timeout).eq(7).click();
      cy.contains('Delete', timeout).click();
      cy.get('.swal2-confirm', timeout).click();
      cy.contains('Success!', timeout).should('not.exist');
    });
  });
  
  describe('Sorting', () => {
    describe('Kolom Nama Shift', () => {
      it('Ascending', () => {
        cy.get(':nth-child(1) > .ant-table-column-sorters-with-tooltip > .ant-table-column-sorters > .ant-table-column-sorter > .ant-table-column-sorter-inner > .anticon-caret-down > svg', timeout)
          .click();
        cy.get('tr[class="ant-table-row ant-table-row-level-0"]', timeout).eq(0).contains('Shift Malam');
        cy.get('tr[class="ant-table-row ant-table-row-level-0"]', timeout).eq(1).contains('Shift Malam Pendek');
        cy.get('tr[class="ant-table-row ant-table-row-level-0"]', timeout).eq(2).contains('Shift Pagi');
      });

      it('Descending', () => {
        cy.get(':nth-child(1) > .ant-table-column-sorters-with-tooltip > .ant-table-column-sorters > .ant-table-column-sorter > .ant-table-column-sorter-inner > .anticon-caret-down > svg', timeout).click();
        cy.get(':nth-child(1) > .ant-table-column-sorters-with-tooltip > .ant-table-column-sorters > .ant-table-column-sorter > .ant-table-column-sorter-inner > .anticon-caret-down > svg', timeout).click();
        cy.get('tr[class="ant-table-row ant-table-row-level-0"]', timeout).eq(0).contains('Shift Sore Pendek');
        cy.get('tr[class="ant-table-row ant-table-row-level-0"]', timeout).eq(1).contains('Shift Siang Pendek');
        cy.get('tr[class="ant-table-row ant-table-row-level-0"]', timeout).eq(2).contains('Shift Siang');
      });
    });

    describe('Kolom Waktu Mulai', () => {
      it('Ascending', () => {
        cy.get(':nth-child(2) > .ant-table-column-sorters-with-tooltip > .ant-table-column-sorters > .ant-table-column-sorter > .ant-table-column-sorter-inner > .anticon-caret-down > svg', timeout).click();
        cy.get('tr[class="ant-table-row ant-table-row-level-0"]', timeout).eq(0).contains('00:00');
        cy.get('tr[class="ant-table-row ant-table-row-level-0"]', timeout).eq(1).contains('07:00');
        cy.get('tr[class="ant-table-row ant-table-row-level-0"]', timeout).eq(2).contains('07:00');
      });

      it('Descending', () => {
        cy.get(':nth-child(2) > .ant-table-column-sorters-with-tooltip > .ant-table-column-sorters > .ant-table-column-sorter > .ant-table-column-sorter-inner > .anticon-caret-down > svg', timeout).click();
        cy.get(':nth-child(2) > .ant-table-column-sorters-with-tooltip > .ant-table-column-sorters > .ant-table-column-sorter > .ant-table-column-sorter-inner > .anticon-caret-down > svg', timeout).click();
        cy.get('tr[class="ant-table-row ant-table-row-level-0"]', timeout).eq(0).contains('23:00');
        cy.get('tr[class="ant-table-row ant-table-row-level-0"]', timeout).eq(1).contains('18:00');
        cy.get('tr[class="ant-table-row ant-table-row-level-0"]', timeout).eq(2).contains('15:00');
      });
    });

    describe('Kolom Waktu Selesai', () => {
      it('Ascending', () => {
        cy.get(':nth-child(3) > .ant-table-column-sorters-with-tooltip > .ant-table-column-sorters > .ant-table-column-sorter > .ant-table-column-sorter-inner > .anticon-caret-down > svg', timeout).click();
        cy.get('tr[class="ant-table-row ant-table-row-level-0"]', timeout).eq(0).contains('06:59');
        cy.get('tr[class="ant-table-row ant-table-row-level-0"]', timeout).eq(1).contains('06:59');
        cy.get('tr[class="ant-table-row ant-table-row-level-0"]', timeout).eq(2).contains('11:59');
      });

      it('Descending', () => {
        cy.get(':nth-child(3) > .ant-table-column-sorters-with-tooltip > .ant-table-column-sorters > .ant-table-column-sorter > .ant-table-column-sorter-inner > .anticon-caret-down > svg', timeout).click();
        cy.get(':nth-child(3) > .ant-table-column-sorters-with-tooltip > .ant-table-column-sorters > .ant-table-column-sorter > .ant-table-column-sorter-inner > .anticon-caret-down > svg', timeout).click();
        cy.get('tr[class="ant-table-row ant-table-row-level-0"]', timeout).eq(0).contains('23:59');
        cy.get('tr[class="ant-table-row ant-table-row-level-0"]', timeout).eq(1).contains('22:59');
        cy.get('tr[class="ant-table-row ant-table-row-level-0"]', timeout).eq(2).contains('17:59');
      });
    });
  });
});
