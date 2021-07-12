/* eslint-disable */
/// <reference types="cypress" />

const timeout = { timeout: 60000 };
const ipData = '34.87.144.83:3009';

describe('Runtime', () => {
  before(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.mockUserAdmin();
    cy.login('admin');
    cy.get('[title="Runtime"] > a', timeout).click();
  });

  beforeEach(() => {
    Cypress.Cookies.preserveOnce('secret');
  });

  describe('Check List Runtime', () => {
    it('Data is null', () => {
      cy.intercept(`${ipData}/planned_running_time`, { fixture: '/data/planned_running_time.json' }).as('planned_running_time');
      cy.contains('tidak ada data', timeout).should('be.visible');
      cy.get('[title="Heat Map"] > a', timeout).click();
    });

    it('Data > 1', () => {
      cy.get('[title="Runtime"] > a', timeout).click();
      cy.contains('SETTING RUNTIME', timeout).should('be.visible');
      cy.contains('Tambah', timeout).should('be.visible');
      cy.contains('Upload', timeout).should('be.visible');
      cy.get('input[placeholder="Cari Nama Mesin"]', timeout).should('be.visible');
      cy.get('tr[class="ant-table-row ant-table-row-level-0"]', timeout).eq(0).should('be.visible');
      cy.get('tr[class="ant-table-row ant-table-row-level-0"]', timeout).eq(1).should('be.visible');
      cy.get('tr[class="ant-table-row ant-table-row-level-0"]', timeout).eq(2).should('be.visible');
    });
  });

  describe('CRUD Data Runtime', () => {
    it('Tambah Runtime', () => {
      cy.contains('Tambah', timeout).click();
      cy.get('input[id="nama_po"]', timeout).type(`Test Runtime ${Math.floor(Math.random() * 100)}`);
      cy.get('input[id="machine"]', timeout).click();
      cy.contains('Packaging 3', timeout).click();
      cy.get('input[id="sku"]', timeout).click();
      cy.get('div[class="ant-select-item-option-content"]', timeout).contains('MACO20MR', timeout).click();
      cy.get('input[id="operator"]', timeout).click();
      cy.contains('Machine Packaging A3', timeout).click();

      cy.get('input[id="start_date"]', timeout).click();
      cy.contains('Today', timeout).click();
      cy.get('input[id="end_date"]', timeout).click();
      cy.get('td[title="2021-05-28"]', timeout).eq(1).click();
      cy.get('#shift > :nth-child(1) > :nth-child(2)', timeout).click();
      cy.contains('Submit', timeout).click();
      cy.contains('Ok', timeout).click();
    });

    it('Edit Runtime', () => {
      cy.get('button[class="ant-btn ant-btn-link ant-dropdown-trigger"]', timeout).eq(3).click();
      cy.contains('Edit', timeout).click(); 
      cy.get('input[id="nama_po"]', timeout).clear().type('Test Runtime 123');
      cy.contains('Submit', timeout).click();
      cy.contains('Updated!', timeout).should('be.visible');
    });

    it('Check Data after edit', () => {
      cy.contains('Test Runtime 123', timeout).should('be.visible');
    });

    it('Search data runtime', () => {
      cy.get('input[placeholder="Cari Nama Mesin"]', timeout).type('2 oven ima 1');
      cy.get('td[class="ant-table-cell"]', timeout).contains('2 Oven ima 1').should('be.visible');
      cy.get('input[placeholder="Cari Nama Mesin"]', timeout).clear();
    });

    it('Delete data', () => {
      cy.get('button[class="ant-btn ant-btn-link ant-dropdown-trigger"]', timeout).eq(3).click();
      cy.contains('Hapus', timeout).click();
      cy.contains('Tidak', timeout).click();
      cy.get('button[class="ant-btn ant-btn-link ant-dropdown-trigger"]', timeout).eq(3).click();
      cy.contains('Hapus', timeout).click();
      cy.contains('Ya', timeout).click();
      cy.contains('Deleted!', timeout).should('be.visible');
    });
  });
});
