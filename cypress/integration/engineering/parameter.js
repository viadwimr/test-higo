/* eslint-disable */
/// <reference types="cypress" />

const timeout = { timeout: 60000 };

describe('Parameter', () => {
  before(() => {
    cy.login('engineering');
  });

  beforeEach(() => {
    cy.visit('/parameter');
  });

  describe('Filter', () => {
    it('Default', () => {
      cy.get('div[id="rc-tabs-0-panel-realtime"]', timeout).should('exist');
      cy.contains('Realtime', timeout).should('be.visible');
      cy.get('[data-testid=sector] > .ant-select-selector > .ant-select-selection-item', timeout).should('exist');
      cy.get('[data-testid=device] > .ant-select-selector > .ant-select-selection-item', timeout).should('exist');
      cy.get('[data-testid=indikator] > .ant-select-selector > .ant-select-selection-item', timeout).should('exist');
      cy.get('[data-testid=status] > .ant-select-selector > .ant-select-selection-item', timeout).should('exist');
    });

    it('Filter Sektor', () => {
      cy.get('div[class="Devices__Wrapper-sc-17hn8ez-0 eDrstm"]', timeout).should('be.visible');
      cy.get('[data-testid=sector] > .ant-select-selector > .ant-select-selection-item', timeout).click();
      cy.get('div[class="ant-select-item-option-content"]', timeout).contains('Forming Baking').click();
    });

    it('Filter Device', () => {
      cy.get('div[class="Devices__Wrapper-sc-17hn8ez-0 eDrstm"]', timeout).should('be.visible');
      cy.get('[data-testid=device] > .ant-select-selector > .ant-select-selection-item', timeout).click();
      cy.get('div[class="ant-select-item-option-content"]', timeout).contains('Belt rotary_sped').click();
      cy.get('div[class="Devices__Wrapper-sc-17hn8ez-0 eDrstm"]', timeout).should('be.visible');
    });

    it('Filter Indikator', () => {
      cy.get('div[class="Devices__Wrapper-sc-17hn8ez-0 eDrstm"]', timeout).should('be.visible');
      cy.get('[data-testid=indikator] > .ant-select-selector > .ant-select-selection-item', timeout).click();
      cy.get('div[class="ant-select-item-option-content"]', timeout).contains('Arus Listrik (A)').click();
      cy.get('div[class="Devices__Wrapper-sc-17hn8ez-0 eDrstm"]', timeout).should('be.visible');
    });

    it('Filter Status', () => {
      cy.get('div[class="Devices__Wrapper-sc-17hn8ez-0 eDrstm"]', timeout).should('be.visible');
      cy.get('[data-testid=status] > .ant-select-selector > .ant-select-selection-item', timeout).click();
      cy.get('div[class="ant-select-item-option-content"]', timeout).contains('Waspada').click();
      cy.get('div[class="Devices__Wrapper-sc-17hn8ez-0 eDrstm"]', timeout).should('be.visible');
    });

  });

  it('Check semua lini', () => {
    cy.get('div[class="ParameterPage__Wrapper-sc-12o5t4h-0 ccmLAg"]', timeout).should('be.visible');

    // Param 1
    cy.get('a[href="/parameter/4_mixer_line_1_Production_Actual_Min"]', timeout).should('be.visible');
    cy.contains('Waktu Mixing Adonan', timeout).should('be.visible');
    cy.get('h2[class="MonitoringCard__Value-sc-1kjd4pd-3 iTAqMM"]', timeout).should('be.visible');
    cy.get('div[class="ant-row ant-row-center ant-row-middle"]', timeout).should('be.visible');

    // Param 2
    cy.get('a[href="/parameter/5_enrobe_line_1_Temp_Att_Vasc"]', timeout).should('be.visible');
    cy.contains('Tank Temperature', timeout).should('be.visible');
    cy.get('h2[class="MonitoringCard__Value-sc-1kjd4pd-3 iTAqMM"]', timeout).should('be.visible');
    cy.get('div[class="ant-row ant-row-center ant-row-middle"]', timeout).should('be.visible');
  });

  it('Check single lini', () => {
    cy.get('span[class="ant-select-selection-item"]', timeout).click();
    cy.get('div[class="ant-select-item-option-content"]', timeout).contains('Oven Baking').should('be.visible');
  });

  it('Search Parameter', () => {
    // Found data
    cy.get('.ant-input', timeout).type('Speed Agitator');
    cy.get('a[href="/parameter/4_mixer_line_1_Mixer_Speed_Actual"]', timeout).should('be.visible');
    cy.contains('Speed Agitator', timeout).should('be.visible');
    cy.get('h2[class="MonitoringCard__Value-sc-1kjd4pd-3 iTAqMM"]', timeout).should('be.visible');
    cy.get('div[class="ant-row ant-row-center ant-row-middle"]', timeout).should('be.visible');

    // Not found data
    cy.get('.ant-input', timeout).clear().type('Random');
    cy.contains('Tidak ada data!', timeout).should('be.visible');
    cy.get('.ant-input', timeout).clear();
    cy.get('div[class="ParameterPage__Wrapper-sc-12o5t4h-0 ccmLAg"]', timeout).should('be.visible');
  });
});


