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

  describe('Check List Products', () => {
    it('Data is null', () => {
      cy.intercept(`${ipData}/products`, { fixture: '/data/products.json' }).as('products');
      cy.contains('Anda belum menambahkan produk', timeout).should('be.visible');
      cy.get('[title="Heat Map"] > a', timeout).click();
    });

    it('Data > 1', () => {
      cy.get('[title="Product"] > a', timeout).click();
      cy.contains('Nama SKU', timeout).should('be.visible');
    });
  });

  describe('CRUD Data Products', () => {
    it('Tambah Product', () => {
      cy.contains('Tambah', timeout).click();
      cy.get('input[placeholder="Masukkan Nama SKU"]', timeout).type('Test Product 006');
      cy.get('input[placeholder="Masukkan speed."]', timeout).type('1000');
      cy.get('input[placeholder="Masukkan Seri Produk"]', timeout).type('123')
      cy.get('#product_form_production_line', timeout).click();
      cy.get('div[class="ant-select-item-option-content"]', timeout).contains('Line 2').click();
      cy.get('input[id="product_form_machine_category_id"]',timeout).click();
      cy.get('div[class="ant-select-item-option-content"]', timeout).contains('Mixer').click();
      cy.get('textarea[placeholder="Masukkan Deskripsi Produk"]', timeout).type('Test Production');
      cy.contains('Submit', timeout).click();
      cy.contains('Berhasil!', timeout).should('be.visible');
    });

    it('Search Data', () => {
      cy.wait(5000);
      cy.get('input[placeholder="Cari"]', timeout).type('Test Product 006');
      cy.contains('Test Product 006', timeout).should('be.visible');
    });

    it('Edit Product', () => {
      cy.get('.ant-dropdown-trigger > path', timeout).click();
      cy.contains('Edit', timeout).click();
      cy.get('input[placeholder="Masukkan speed."]', timeout).clear().type('2000');
      cy.get('input[placeholder="Masukkan Seri Produk"]', timeout).clear().type('321');
      cy.get('textarea[placeholder="Masukkan Deskripsi Produk"]', timeout).clear().type('Test Edit Description');
      cy.contains('Submit', timeout).click();
      cy.contains('Berhasil!', timeout).should('be.visible');
    });

    it('Delete Product', () => {
      cy.wait(5000);
      cy.get('input[placeholder="Cari"]', timeout).type('Test Product 006');
      cy.contains('Test Product 006', timeout).should('be.visible');
      cy.get('.ant-dropdown-trigger > path', timeout).click();
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
        cy.get('tr[class="ant-table-row ant-table-row-level-0"]', timeout).eq(0).contains('0.00 s / pcs');
      });

      it('Descending', () => {
        cy.get(':nth-child(2) > .ant-table-column-sorters-with-tooltip > .ant-table-column-sorters > .ant-table-column-sorter > .ant-table-column-sorter-inner > .anticon-caret-down > svg', timeout).click();
        cy.get(':nth-child(2) > .ant-table-column-sorters-with-tooltip > .ant-table-column-sorters > .ant-table-column-sorter > .ant-table-column-sorter-inner > .anticon-caret-down > svg', timeout).click();
        cy.get('tr[class="ant-table-row ant-table-row-level-0"]', timeout).eq(0).contains('10.00 s / pcs');
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
        cy.get('tr[class="ant-table-row ant-table-row-level-0"]', timeout).eq(0).contains('29 rpm');
      });
    });

    describe('Kolom Seri', () => {
      it('Ascending', () => {
        cy.get(':nth-child(4) > .ant-table-column-sorters-with-tooltip > .ant-table-column-sorters > .ant-table-column-sorter > .ant-table-column-sorter-inner > .anticon-caret-down > svg', timeout).click();
        cy.get('tr[class="ant-table-row ant-table-row-level-0"]', timeout).eq(0).contains('0 pcs / m');
      });

      it('Descending', () => {
        cy.get(':nth-child(4) > .ant-table-column-sorters-with-tooltip > .ant-table-column-sorters > .ant-table-column-sorter > .ant-table-column-sorter-inner > .anticon-caret-down > svg', timeout).click();
        cy.get(':nth-child(4) > .ant-table-column-sorters-with-tooltip > .ant-table-column-sorters > .ant-table-column-sorter > .ant-table-column-sorter-inner > .anticon-caret-down > svg', timeout).click();
        cy.get('tr[class="ant-table-row ant-table-row-level-0"]', timeout).eq(0).contains('Tes Seri');
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
        cy.get('tr[class="ant-table-row ant-table-row-level-0"]', timeout).eq(0).contains('Forming Baking');
      });

      it('Descending', () => {
        cy.get(':nth-child(6) > .ant-table-column-sorters-with-tooltip > .ant-table-column-sorters > .ant-table-column-sorter > .ant-table-column-sorter-inner > .anticon-caret-down > svg', timeout).click();
        cy.get(':nth-child(6) > .ant-table-column-sorters-with-tooltip > .ant-table-column-sorters > .ant-table-column-sorter > .ant-table-column-sorter-inner > .anticon-caret-down > svg', timeout).click();
        cy.get('tr[class="ant-table-row ant-table-row-level-0"]', timeout).eq(0).contains('Packaging');
      });
    });

    describe('Kolom Lini', () => {
      it('Ascending', () => {
        cy.get(':nth-child(7) > .ant-table-column-sorters-with-tooltip > .ant-table-column-sorters > .ant-table-column-sorter > .ant-table-column-sorter-inner > .anticon-caret-down > svg', timeout).click();
      });

      it('Descending', () => {
        cy.get(':nth-child(7) > .ant-table-column-sorters-with-tooltip > .ant-table-column-sorters > .ant-table-column-sorter > .ant-table-column-sorter-inner > .anticon-caret-down > svg', timeout).click();
        cy.get(':nth-child(7) > .ant-table-column-sorters-with-tooltip > .ant-table-column-sorters > .ant-table-column-sorter > .ant-table-column-sorter-inner > .anticon-caret-down > svg', timeout).click();
        cy.get('tr[class="ant-table-row ant-table-row-level-0"]', timeout).eq(0).contains('Wajah');
      });
    });

  });
});
