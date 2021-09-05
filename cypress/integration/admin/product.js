/* eslint-disable */
/// <reference types="cypress" />

const timeout = { timeout: 60000 };
const ipData = '34.87.144.83:3009';

describe('Product', () => {
  before(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.login('admin');
    cy.wait(3000);
  });

  beforeEach(() => {
    cy.visit('/product');
  });

  describe('Check List Products', () => {
    it('Data > 1', () => {
      cy.get('[title="Product"] > a', timeout).click();
      cy.contains('Nama SKU', timeout).should('be.visible');
    });
  });

  describe('CRUD Data Products', () => {
    it('Tambah Product Already Exist', () => {
      cy.contains('Tambah', timeout).click();
      cy.get('input[placeholder="Masukkan Nama SKU"]', timeout).type('Test Product 006');
      cy.get('input[placeholder="Masukkan speed."]', timeout).type('1000');
      cy.get('input[placeholder="Masukkan Seri Produk"]', timeout).type('123')
      cy.get('#product_form_production_line', timeout).click();
      cy.get('div[class="ant-select-item-option-content"]', timeout).contains('Line 2').click();
      cy.get('input[id="product_form_machine_category_id"]',timeout).click();
      cy.get('div[class="ant-select-item-option-content"]', timeout).contains('Test Lini').click();
      cy.get('textarea[placeholder="Masukkan Deskripsi Produk"]', timeout).type('Test Production');
      cy.contains('Submit', timeout).click();
      cy.contains('product is already exists', timeout).should('be.visible');
    });

    it('Tambah Product Success', () => {
      cy.contains('Tambah', timeout).click();
      cy.get('input[placeholder="Masukkan Nama SKU"]', timeout).type(`Test Product ${Math.floor(Math.random()*1000)}`);
      cy.get('input[placeholder="Masukkan speed."]', timeout).type('1000');
      cy.get('input[placeholder="Masukkan Seri Produk"]', timeout).type('123')
      cy.get('#product_form_production_line', timeout).click();
      cy.get('div[class="ant-select-item-option-content"]', timeout).contains('Line 2').click();
      cy.get('input[id="product_form_machine_category_id"]',timeout).click();
      cy.get('div[class="ant-select-item-option-content"]', timeout).contains('Test Lini').click();
      cy.get('textarea[placeholder="Masukkan Deskripsi Produk"]', timeout).type('Test Production');
      cy.contains('Submit', timeout).click();
      cy.contains('Berhasil!', timeout).should('be.visible');
    });

    it('Search Data', () => {
      cy.get('input[placeholder="Cari"]', timeout).type('Forming Baking 2');
      cy.contains('Forming Baking 2', timeout).should('be.visible');
    });

    it('Edit Product', () => {
      cy.get('input[placeholder="Cari"]', timeout).type('PRODUCT321');
      cy.get('.ant-dropdown-trigger > path', timeout).click();
      cy.contains('Edit', timeout).click();
      cy.get('input[placeholder="Masukkan speed."]', timeout).clear().type('2000');
      cy.get('input[placeholder="Masukkan Seri Produk"]', timeout).clear().type('321');
      cy.get('textarea[placeholder="Masukkan Deskripsi Produk"]', timeout).clear().type('Test Edit Description');
      cy.contains('Submit', timeout).click();
      cy.contains('Berhasil!', timeout).should('be.visible');
    });

    it('Delete Product', () => {
      cy.get('input[placeholder="Cari"]', timeout).type('PRODUCT321');
      cy.get('.ant-dropdown-trigger > path', timeout).click();
      cy.contains('Delete', timeout).click();
      cy.contains('Ya', timeout).click();
      cy.contains('Berhasil!', timeout).should('be.visible');
    });
  });
});
