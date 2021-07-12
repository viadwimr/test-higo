// / <reference types="Cypress" />

const timeout = { timeout: 60000 };

describe('Dashboard', () => {
  before(() => {
    cy.login('admin');
  });

  it('Line View', () => {
    cy.get(
      '.ant-row > :nth-child(1) > .ant-select > .ant-select-selector > .ant-select-selection-item',
      timeout,
    ).click();
    cy.get('div[class="ant-select-item-option-content"]')
      .contains('Line View', timeout)
      .click();
    cy.get('span[class="ant-select-selection-item"]')
      .contains('Line View', timeout)
      .should('be.visible');
    cy.get('div[class="ant-select-selector"]', timeout)
      .eq(1)
      .click();
    cy.get('div[class="ant-select-item-option-content"]')
      .contains('PL-101', timeout)
      .click();
    cy.contains('Total OEE', timeout).should('be.visible');
    cy.contains('Availability', timeout).should('be.visible');
    cy.contains('Performance', timeout).should('be.visible');
    cy.contains('Quality', timeout).should('be.visible');

    // Machine
    cy.get('div[class="ant-table ant-table-fixed-header"]', timeout).should(
      'be.visible',
    );
    cy.get('button[class="ant-btn"]', timeout)
      .eq(1)
      .click();
    cy.get('div[class="ant-card ant-card-bordered"]', timeout).should(
      'be.visible',
    );
    cy.get('button[class="ant-btn"]', timeout)
      .eq(0)
      .click();
    cy.get('div[class="ant-table ant-table-fixed-header"]', timeout).should(
      'be.visible',
    );
  });

  it('Machine View', () => {
    cy.get(
      '.ant-row > :nth-child(1) > .ant-select > .ant-select-selector > .ant-select-selection-item',
      timeout,
    ).click();
    cy.get('div[class="ant-select-item-option-content"]')
      .contains('Machine View', timeout)
      .click();
    cy.get('div[class="ant-select-selector"]', timeout)
      .eq(1)
      .click();
    cy.get('div[class="ant-select-item-option-content"]')
      .contains('7 Pack Line 2 Packaging 2', timeout)
      .click({ force: true });
    cy.contains('Total OEE', timeout).should('be.visible');
    cy.contains('Availability', timeout).should('be.visible');
    cy.contains('Performance', timeout).should('be.visible');
    cy.contains('Quality', timeout).should('be.visible');
  });
});
