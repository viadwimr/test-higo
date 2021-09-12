/// <reference types="Cypress" />

var timeout = { timeout: 60000 }

describe('Device', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get('[title="Device"] > .ant-menu-title-content > a', timeout).click();
  });

  it('Check list device', () => {

  });

  it('Filter sektor', () => {
    cy.wait(3000);
    cy.get('[data-testid=select-sector] > .ant-select-selector > .ant-select-selection-item', timeout).click();
    cy.contains('Enrober', timeout).click();
  });
});