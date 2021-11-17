/* eslint-disable */
/// <reference types="cypress" />

const timeout = { timeout: 60000 };
const url = 'https://api.jeager.io';

describe('Threshold', () => {
  before(() => {
    // cy.login('engineering');
  });

  beforeEach(() => {
    cy.visit('/setting-threshold');
  });

  describe('Check List Threshold', () => {
    it('Data Threshold Name is null', () => {
      cy.get('[title="Heat Map"] > a', timeout).click();
      cy.intercept(`${url}/ems-test/devices`, { fixture: '/ems-test/devices-null.json' }).as('devices-null');
      cy.get('[title="Threshold"] > a', timeout).click();
      cy.contains('Anda belum memiliki Reason Group', timeout).should('be.visible');
    });

    it('Data > 1', () => {
      cy.get('[title="Heat Map"] > a', timeout).click();
      cy.get('[title="Threshold"] > a', timeout).click();
      cy.contains('THRESHOLD', timeout).should('be.visible');
    });
  });

  describe('Filter Line', () => {
    it('Production Line 2', () => {
      cy.get('.ant-select-selection-item', timeout).click();
      cy.contains('Production Line 2', timeout).click();
      cy.contains('1. ac Produksi Aktual Per Detik', timeout).should('be.visible');
      cy.contains('4. Agromon', timeout).should('be.visible');
      cy.contains('9. Arus Agitator Ball 2', timeout).should('be.visible');
    });

    it('Production Line 1', () => {
      cy.get('.ant-select-selection-item', timeout).click();
      cy.contains('Production Line 1', timeout).click();
      cy.contains('1. ac Produksi Aktual Per Detik', timeout).should('be.visible');
      cy.contains('4. Agromon', timeout).should('be.visible');
      cy.contains('9. Arus Agitator Ball 2', timeout).should('be.visible');
    });

  });

  describe('Search', () => {
    it('Not Found data', () => {
      cy.get('.ant-input-affix-wrapper', timeout).type('Random');
      cy.get('.ant-col-23 > form', timeout).contains('Random').should('not.exist');
    });

    it('Found Data', () => {
      cy.get('.ant-input-affix-wrapper', timeout).type('Baking Time');
      cy.get('.ant-col-23 > form', timeout).contains('1. Baking Time').should('be.visible');
    });
  });
});
