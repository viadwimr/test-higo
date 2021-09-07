/// <reference types="Cypress" />

var timeout = { timeout: 60000 }

describe('Dashboard', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  describe('Realtime', () => {
    it('Check List Device', () => {
      cy.get('[href="/device/1_wiener_line_1_Arus_Agitator_Ball_1"] > .ant-card > .ant-card-body', { timeout: 200000 }).should('exist');
      cy.contains('Arus Agitator Ball 1', timeout).should('be.visible');
      cy.contains('Temperatur', timeout).should('be.visible');
    });

    it('Check Kondisi Saat ini', () => {
      cy.get('#rc-tabs-0-tab-latest_condition', timeout).click();
      cy.get('.apexcharts-legend', { timeout: 200000 }).should('exist');
    });
  });

  describe('Overview', () => {
    it('Filter indikator online', () => {
      cy.get('#rc-tabs-0-tab-overview', timeout).click();
      cy.wait(3000);
      cy.get('[data-testid=sector] > .ant-select-selector > .ant-select-selection-item', timeout).click();
      cy.contains('Oven Baking', timeout).click();
      cy.wait(3000);
      cy.get('[data-testid=indicator] > .ant-select-selector > .ant-select-selection-item', timeout).click();
      cy.wait(3000);
      cy.contains('Temperatur', timeout).click();
      cy.contains('Suhu Aktual Zona 1', timeout).should('be.visible');
      cy.contains('Suhu Aktual Zona 2', timeout).should('be.visible');
      cy.contains('Suhu Aktual Zona 3', timeout).should('be.visible');
      cy.contains('Suhu Aktual Zona 4', timeout).should('be.visible');
      cy.contains('Suhu Aktual Zona 5', timeout).should('be.visible');
      cy.contains('Suhu Aktual Zona P', timeout).should('be.visible');
      cy.contains('suhu set zona 1', timeout).should('be.visible');
      cy.contains('wiremesh temperature', timeout).should('be.visible');
    });

    it('Filter Indikator Sebagian Online', () => {
      cy.get('#rc-tabs-0-tab-realtime', timeout).click();
      cy.wait(3000);
      cy.get(':nth-child(3) > .ant-select > .ant-select-selector > .ant-select-selection-item', timeout).click();
      cy.contains('Arus Listrik', timeout).click();
      cy.get('div[class="ant-card-body"]', timeout).should('be.visible');
    });

    it('List Filter', () => {
      cy.get('#rc-tabs-0-tab-overview', timeout).click();
      cy.wait(15000);
      cy.get('[data-testid=indicator] > .ant-select-selector > .ant-select-selection-item', timeout).click();
      cy.contains('Arus Listrik', timeout).should('be.visible');
      cy.get('div[class="ant-select-item ant-select-item-option"]', timeout).contains('Daya', timeout).should('be.visible');
      cy.get('div[class="ant-select-item ant-select-item-option"]', timeout).contains('Frequency').should('be.visible');
      cy.get('div[class="ant-select-item ant-select-item-option"]', timeout).contains('Intensitas Cahaya', timeout).should('be.visible');
      cy.get('div[class="ant-select-item ant-select-item-option"]', timeout).contains('Kecepatan Angin', timeout).should('be.visible');
      cy.get('div[class="ant-select-item ant-select-item-option"]', timeout).contains('Kekebalan', timeout).should('be.visible');
      cy.get('div[class="ant-select-item ant-select-item-option"]', timeout).contains('Kelembaban', timeout).should('be.visible');
      cy.get('div[class="ant-select-item ant-select-item-option"]', timeout).contains('Liquid Level', timeout).should('be.visible');
    });
  });
});