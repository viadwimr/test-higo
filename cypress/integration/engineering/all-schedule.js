/* eslint-disable */
/// <reference types="cypress" />

const timeout = { timeout: 60000 };
const force = { force: true };

describe('All Schedule', () => {
  before(() => {
    cy.login('engineering');
  });

  beforeEach(() => {
    cy.visit('/all-schedule');
    cy.contains('ALL SCHEDULE', timeout).should('be.visible');
  });

  it('Default', () => {
    // Check Interval
    cy.get('tbody > :nth-child(1) > .t-label', timeout).contains('07:00');
    cy.get(':nth-child(2) > .t-label', timeout).contains('08:00');
    cy.get(':nth-child(3) > .t-label', timeout).contains('09:00');
    cy.get(':nth-child(4) > .t-label', timeout).contains('10:00');
    cy.get(':nth-child(5) > .t-label', timeout).contains('11:00');

    // Check Machine
    cy.get('thead > tr > :nth-child(2)', timeout).contains('Packaging 1');
    cy.get('thead > tr > :nth-child(3)', timeout).contains('Packaging 2');
    cy.get('thead > tr > :nth-child(4)', timeout).contains('Baking');

    // Check Date
    // const todaysDate = Cypress.moment().format('DD MM YYYY')
    // cy.get('[data-testid=show-date]', timeout).contains(todaysDate);
  });

  it('Filtered by Asset', () => {
    cy.get('[data-testid=asset-selector] > .ant-select-selector > .ant-select-selection-item', timeout).click();
    cy.wait(5000);
    cy.get(':nth-child(9) > .ant-select-tree-node-content-wrapper', timeout).click();
    cy.get('thead > tr > :nth-child(2)', timeout).contains('Packaging 1');
    cy.get('thead > tr > :nth-child(3)', timeout).contains('Packaging 2');
  });
 
  it('Filtered by Interval', () => {
    cy.get('[data-testid=interval-selector] > .ant-select-selector', timeout).click();
    cy.get('[title="8 Jam"]', timeout).click();
    cy.get('tbody > :nth-child(1) > .t-label', timeout).contains('07:00');
    cy.get(':nth-child(2) > .t-label', timeout).contains('15:00');
    cy.get(':nth-child(3) > .t-label', timeout).contains('23:00');
  });

  it('Filtered by Date', () => {
    cy.get('[data-testid=prev-date-btn]', timeout).click();
    cy.get('[data-testid=next-date-btn]', timeout).click();
  })

  it('Filter Asset', () => {
    cy.get('[data-testid=asset-selector] > .ant-select-selector > .ant-select-selection-item', timeout)
      .click();
    cy.get('.ant-select-tree-treenode-selected > .ant-select-tree-node-content-wrapper', timeout)
      .contains('Production Line 1');
    cy.get(':nth-child(2) > .ant-select-tree-node-content-wrapper', timeout)
      .contains('Ball Mill');
    cy.get(':nth-child(3) > .ant-select-tree-node-content-wrapper', timeout)
      .contains('Enrobing');
    cy.get(':nth-child(4) > .ant-select-tree-node-content-wrapper', timeout)
      .contains('Forming Baking');
    cy.get(':nth-child(5) > .ant-select-tree-node-content-wrapper', timeout)
      .contains('Forming 1');
    cy.get(':nth-child(6) > .ant-select-tree-node-content-wrapper', timeout)
      .contains('Mixer');
    cy.get(':nth-child(7) > .ant-select-tree-node-content-wrapper', timeout)
      .contains('Oven Baking');
    cy.get(':nth-child(8) > .ant-select-tree-node-content-wrapper', timeout)
      .contains('Baking');
  });

  it('Filter Interval', () => {
    cy.get('[data-testid=interval-selector] > .ant-select-selector', timeout).click();
    //cy.contains('12 Jam', timeout).contains('not.be.visible');
    cy.get('[title="8 Jam"]', timeout).contains('8 Jam');
    cy.get('[title="4 Jam"]', timeout).contains('4 Jam');
    cy.get('[title="2 Jam"]', timeout).contains('2 Jam');
    cy.get('[title="1 Jam"]', timeout).contains('1 Jam');
  });
});