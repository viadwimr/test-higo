/* eslint-disable */
/// <reference types="cypress" />

const timeout = { timeout: 60000 };

describe('Parameter', () => {
  before(() => {
    cy.mockUserAdmin();
    cy.mockResponse();
    cy.login('engineering');
  });

  it('Check semua lini', () => {
    cy.get('[title="Parameter"] > a', timeout).click();
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


