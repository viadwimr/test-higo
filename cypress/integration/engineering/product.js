/* eslint-disable */
/// <reference types="cypress" />

const timeout = { timeout: 60000 };
const ipData = '34.87.144.83:3009';

describe('Product', () => {
  before(() => {
    cy.login('engineering');
  });

  beforeEach(() => {
    cy.visit('/product');
  });

  describe('CRUD Data Products', () => {
    it('Tambah Product', () => {
      cy.contains('Tambah', timeout).click();
      cy.get('input[placeholder="Masukkan Nama SKU"]', timeout).type(`Test Product ${Math.floor(Math.random() * 100)}`);
      cy.get('input[placeholder="Masukkan speed."]', timeout).type('1000');
      cy.get('input[placeholder="Masukkan Seri Produk"]', timeout).type('123')
      cy.get('#product_form_production_line', timeout).click();
      cy.get('div[class="ant-select-item-option-content"]', timeout).contains('Line 2').click();
      cy.get('input[id="product_form_machine_category_id"]',timeout).click();
      cy.get('div[class="ant-select-item-option-content"]', timeout).contains('Packaging').click();
      cy.get('textarea[placeholder="Masukkan Deskripsi Produk"]', timeout).type('Test Production');
      cy.contains('Submit', timeout).click();
      cy.contains('Berhasil!', timeout).should('be.visible');
    });

    it('Search Data', () => {
      cy.wait(5000);
      cy.get('input[placeholder="Cari"]', timeout).type('Test Product');
      cy.contains('Test Production', timeout).should('be.visible');
    });

    it('Edit Product', () => {
      cy.get('.ant-dropdown-trigger > path', timeout).eq(0).click();
      cy.contains('Edit', timeout).click();
      cy.get('input[placeholder="Masukkan speed."]', timeout).clear().type('2000');
      cy.get('input[placeholder="Masukkan Seri Produk"]', timeout).clear().type('321');
      cy.get('textarea[placeholder="Masukkan Deskripsi Produk"]', timeout).clear().type('Test Edit Description');
      cy.contains('Submit', timeout).click();
      cy.contains('Berhasil!', timeout).should('be.visible');
    });

    it('Delete Product', () => {
      cy.wait(5000);
      cy.get('input[placeholder="Cari"]', timeout).type('Test Product');
      cy.get('.ant-dropdown-trigger > path', timeout).eq(0).click();
      cy.contains('Delete', timeout).click();
      cy.contains('Ya', timeout).click();
      cy.contains('Berhasil!', timeout).should('be.visible');
    });
  });

  describe('Sorting', () => {
    describe('Kolom Nama SKU', () => {
      it('Ascending', () => {
        cy.get(':nth-child(1) > .ant-table-column-sorters-with-tooltip > .ant-table-column-sorters > .ant-table-column-sorter > .ant-table-column-sorter-inner > .anticon-caret-down > svg', timeout).click();
        cy.get('tr[class="ant-table-row ant-table-row-level-0"]', timeout).eq(0).contains('1');
      });

      it('Descending', () => {
        cy.get(':nth-child(1) > .ant-table-column-sorters-with-tooltip > .ant-table-column-sorters > .ant-table-column-sorter > .ant-table-column-sorter-inner > .anticon-caret-down > svg', timeout).click();
        cy.get(':nth-child(1) > .ant-table-column-sorters-with-tooltip > .ant-table-column-sorters > .ant-table-column-sorter > .ant-table-column-sorter-inner > .anticon-caret-down > svg', timeout).click();
        cy.get('tr[class="ant-table-row ant-table-row-level-0"]', timeout).eq(0).contains('Ujicoba');
      });
    });

    describe('Kolom Cycle Time', () => {
      it('Ascending', () => {
        cy.get(':nth-child(2) > .ant-table-column-sorters-with-tooltip > .ant-table-column-sorters > .ant-table-column-sorter > .ant-table-column-sorter-inner > .anticon-caret-down > svg', timeout).click();
        cy.get('tr[class="ant-table-row ant-table-row-level-0"]', timeout).eq(0).contains('0 s / pcs');
      });

      it('Descending', () => {
        cy.get(':nth-child(2) > .ant-table-column-sorters-with-tooltip > .ant-table-column-sorters > .ant-table-column-sorter > .ant-table-column-sorter-inner > .anticon-caret-down > svg', timeout).click();
        cy.get(':nth-child(2) > .ant-table-column-sorters-with-tooltip > .ant-table-column-sorters > .ant-table-column-sorter > .ant-table-column-sorter-inner > .anticon-caret-down > svg', timeout).click();
        cy.get('tr[class="ant-table-row ant-table-row-level-0"]', timeout).eq(0).should('exist');
      });
    });

    describe('Kolom Speed', () => {
      it('Ascending', () => {
        cy.get(':nth-child(3) > .ant-table-column-sorters-with-tooltip > .ant-table-column-sorters > .ant-table-column-sorter > .ant-table-column-sorter-inner > .anticon-caret-down > svg', timeout).click();
        cy.get('tr[class="ant-table-row ant-table-row-level-0"]', timeout).eq(0).contains('0 pcs / m');
      });

      it('Descending', () => {
        cy.get(':nth-child(3) > .ant-table-column-sorters-with-tooltip > .ant-table-column-sorters > .ant-table-column-sorter > .ant-table-column-sorter-inner > .anticon-caret-down > svg', timeout).click();
        cy.get(':nth-child(3) > .ant-table-column-sorters-with-tooltip > .ant-table-column-sorters > .ant-table-column-sorter > .ant-table-column-sorter-inner > .anticon-caret-down > svg', timeout).click();
        cy.get('tr[class="ant-table-row ant-table-row-level-0"]', timeout).eq(0).should('exist');
      });
    });

    describe('Kolom Seri', () => {
      it('Ascending', () => {
        cy.get(':nth-child(4) > .ant-table-column-sorters-with-tooltip > .ant-table-column-sorters > .ant-table-column-sorter > .ant-table-column-sorter-inner > .anticon-caret-down > svg', timeout).click();
      });

      it('Descending', () => {
        cy.get(':nth-child(4) > .ant-table-column-sorters-with-tooltip > .ant-table-column-sorters > .ant-table-column-sorter > .ant-table-column-sorter-inner > .anticon-caret-down > svg', timeout).click();
        cy.get(':nth-child(4) > .ant-table-column-sorters-with-tooltip > .ant-table-column-sorters > .ant-table-column-sorter > .ant-table-column-sorter-inner > .anticon-caret-down > svg', timeout).click();
        cy.get('tr[class="ant-table-row ant-table-row-level-0"]', timeout).eq(0).should('exist')
      });
    });

    describe('Kolom Line', () => {
      it('Ascending', () => {
        cy.get(':nth-child(5) > .ant-table-column-sorters-with-tooltip > .ant-table-column-sorters > .ant-table-column-sorter > .ant-table-column-sorter-inner > .anticon-caret-down > svg', timeout).click();
        cy.get('tr[class="ant-table-row ant-table-row-level-0"]', timeout).eq(0).contains('Production Line 1');
      });

      it('Descending', () => {
        cy.get(':nth-child(5) > .ant-table-column-sorters-with-tooltip > .ant-table-column-sorters > .ant-table-column-sorter > .ant-table-column-sorter-inner > .anticon-caret-down > svg', timeout).click();
        cy.get(':nth-child(5) > .ant-table-column-sorters-with-tooltip > .ant-table-column-sorters > .ant-table-column-sorter > .ant-table-column-sorter-inner > .anticon-caret-down > svg', timeout).click();
        cy.get('tr[class="ant-table-row ant-table-row-level-0"]', timeout).eq(0).contains('Production Line 2');
      });
    });

    describe('Kolom Lini', () => {
      it('Ascending', () => {
        cy.get(':nth-child(6) > .ant-table-column-sorters-with-tooltip > .ant-table-column-sorters > .ant-table-column-sorter > .ant-table-column-sorter-inner > .anticon-caret-down > svg', timeout).click();
        cy.get('tr[class="ant-table-row ant-table-row-level-0"]', timeout).eq(0).should('be.visible');
      });

      it('Descending', () => {
        cy.get(':nth-child(6) > .ant-table-column-sorters-with-tooltip > .ant-table-column-sorters > .ant-table-column-sorter > .ant-table-column-sorter-inner > .anticon-caret-down > svg', timeout).click();
        cy.get(':nth-child(6) > .ant-table-column-sorters-with-tooltip > .ant-table-column-sorters > .ant-table-column-sorter > .ant-table-column-sorter-inner > .anticon-caret-down > svg', timeout).click();
        cy.get('tr[class="ant-table-row ant-table-row-level-0"]', timeout).eq(0).should('be.visible');
      });
    });

    describe('Kolom Deskripsi', () => {
      it('Ascending', () => {
        cy.get(':nth-child(7) > .ant-table-column-sorters-with-tooltip > .ant-table-column-sorters > .ant-table-column-sorter > .ant-table-column-sorter-inner > .anticon-caret-down > svg', timeout).click();
      });

      it('Descending', () => {
        cy.get(':nth-child(7) > .ant-table-column-sorters-with-tooltip > .ant-table-column-sorters > .ant-table-column-sorter > .ant-table-column-sorter-inner > .anticon-caret-down > svg', timeout).click();
        cy.get(':nth-child(7) > .ant-table-column-sorters-with-tooltip > .ant-table-column-sorters > .ant-table-column-sorter > .ant-table-column-sorter-inner > .anticon-caret-down > svg', timeout).click();
        cy.get('tr[class="ant-table-row ant-table-row-level-0"]', timeout).eq(0).should('be.visible');
      });
    });

  });
});
