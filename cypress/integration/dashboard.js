/// <reference types="Cypress" />

var timeout = { timeout: 60000 }

describe('Dashboard', () => {
  beforeEach(() => {
    cy.get('.active', timeout).click();
  });

  it('Check List Device', () => {
    cy.get('[href="/device/1_wiener_line_1_Arus_Agitator_Ball_1"] > .ant-card > .ant-card-body', {timeout: 200000}).should('exist');
    cy.contains('Arus Agitator Ball 1', timeout).should('be.visible');
    cy.contains('Temperatur', timeout).should('be.visible');
  });

  it('Check Kondisi Saat ini', () => {
    cy.get('#rc-tabs-0-tab-latest_condition', timeout).click();
    cy.get('.apexcharts-legend', {timeout: 200000}).should('exist');
  });
});