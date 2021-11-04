/* eslint-disable */
/// <reference types="cypress" />

const timeout = { timeout: 60000 };
const force = { force: true };

describe('Heatmap', () => {
  before(() => {
    cy.login('engineering');
  });

  beforeEach(() => {
    cy.visit('/heatmap');
    cy.contains('HEAT MAP', timeout).should('be.visible');
  });

  it('OEE', () => {
    cy.get(':nth-child(2) > .ant-select > .ant-select-selector', timeout).click();
    cy.contains('Packaging', timeout).click();


    // Check date
    cy.get('div[style="display: flex;"]', timeout)
      .should('contain', 'Jan')
      .and('contain', '2')
      .and('contain', '3');

    // Check machine id
    cy.get('div[class="ant-col ant-col-md-4"]', timeout)
      .should('contain', 'Packaging 1', timeout)
      .and('contain', 'Packaging 2')
      .and('contain', 'Packaging 3');

    // Check data OEE
    cy.contains('72.72', timeout).should('be.visible');
    cy.contains('50.72', timeout).should('be.visible');
    cy.contains('33.44', timeout).should('be.visible');
    cy.contains('0', timeout).should('be.visible');
    cy.contains('25', timeout).should('be.visible');
    cy.contains('19', timeout).should('be.visible');
    cy.contains('88', timeout).should('be.visible');
    cy.contains('99.5', timeout).should('be.visible');
    cy.contains('44', timeout).should('be.visible');
  });

  it('Availability', () => {
    cy.contains('OEE', timeout).click();
    cy.contains('Availability', timeout).click();

    // Check date
    cy.get('div[style="display: flex;"]', timeout)
      .should('contain', 'Jan')
      .and('contain', '2')
      .and('contain', '3');

    // Check machine id
    cy.get('div[class="ant-col ant-col-md-4"]', timeout)
      .should('contain', 'Packaging 1', timeout)
      .and('contain', 'Packaging 2')
      .and('contain', 'Packaging 3');

    // Check data Availability
    cy.contains('76.69', timeout).should('be.visible');
    cy.contains('53.32', timeout).should('be.visible');
    cy.contains('23.54', timeout).should('be.visible');
    cy.contains('0', timeout).should('be.visible');
    cy.contains('99', timeout).should('be.visible');
    cy.contains('2.5', timeout).should('be.visible');
    cy.contains('0', timeout).should('be.visible');
    cy.contains('34', timeout).should('be.visible');
    cy.contains('11', timeout).should('be.visible');
  });

  it('Performance', () => {
    cy.contains('Availability', timeout).click();
    cy.contains('Performance', timeout).click();

    // Check date
    cy.get('div[style="display: flex;"]', timeout)
      .should('contain', 'Jan')
      .and('contain', '2')
      .and('contain', '3');

    // Check machine id
    cy.get('div[class="ant-col ant-col-md-4"]', timeout)
      .should('contain', 'Packaging 1', timeout)
      .and('contain', 'Packaging 2')
      .and('contain', 'Packaging 3');

    // Check data Performance
    cy.contains('98.56', timeout).should('be.visible');
    cy.contains('10.56', timeout).should('be.visible');
    cy.contains('98.56', timeout).should('be.visible');
    cy.contains('0', timeout).should('be.visible');
    cy.contains('50.5', timeout).should('be.visible');
    cy.contains('77', timeout).should('be.visible');
    cy.contains('23', timeout).should('be.visible');
    cy.contains('15', timeout).should('be.visible');
    cy.contains('15', timeout).should('be.visible');
  });

  it('Quality', () => {
    cy.contains('Performance', timeout).click();
    cy.contains('Quality', timeout).click();

    // Check date
    cy.get('div[style="display: flex;"]', timeout)
      .should('contain', 'Jan')
      .and('contain', '2')
      .and('contain', '3');

    // Check machine id
    cy.get('div[class="ant-col ant-col-md-4"]', timeout)
      .should('contain', 'Packaging 1', timeout)
      .and('contain', 'Packaging 2')
      .and('contain', 'Packaging 3');

    // Check data Quality
    cy.contains('96.21', timeout).should('be.visible');
    cy.contains('75.21', timeout).should('be.visible');
    cy.contains('96.21', timeout).should('be.visible');
    cy.contains('0', timeout).should('be.visible');
    cy.contains('12', timeout).should('be.visible');
    cy.contains('80', timeout).should('be.visible');
    cy.contains('50', timeout).should('be.visible');
    cy.contains('30', timeout).should('be.visible');
    cy.contains('73', timeout).should('be.visible');
  });

  describe('Download Data', () => {
    it('Download as JPG', () => {
      cy.get('.Filter__Wrapper-sc-1aif0us-0 > .ant-row-space-between > :nth-child(2) > .ant-row > :nth-child(2) > .ant-dropdown-trigger > svg > path', timeout).click();
      cy.contains('Unduh sebagai JPG', timeout).click(force);
    });

    it('Download as PDF', () => {
      cy.get('.Filter__Wrapper-sc-1aif0us-0 > .ant-row-space-between > :nth-child(2) > .ant-row > :nth-child(2) > .ant-dropdown-trigger > svg > path', timeout).click();
      cy.contains('Unduh sebagai PDF', timeout).click(force);
    });
  });

  describe('Sorting', () => {
    it('Descending', () => {
      cy.get(':nth-child(4) > .Button__BaseButton-lb9z7q-0', timeout).click()
      cy.get('[title="68.68 "] > [style="padding-top: 12.1622px;"]', timeout).contains('68.68');
    });

    it('Ascending', () => {
      cy.get(':nth-child(4) > .Button__BaseButton-lb9z7q-0', timeout).click()
      cy.get('[title="92.67 "] > [style="padding-top: 12.1622px;"]', timeout).contains('92.67');
    });
  });
});