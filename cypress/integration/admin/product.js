/* eslint-disable */
/// <reference types="cypress" />

const timeout = { timeout: 60000 };
const ipData = '34.87.144.83:3009';

describe('Product', () => {
  before(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.mockUserAdmin();
    cy.login('admin');
    cy.get('[title="Product"] > a', timeout).click();
  });

  beforeEach(() => {
    Cypress.Cookies.preserveOnce('secret');
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
});
