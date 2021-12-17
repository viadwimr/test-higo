/* eslint-disable */
/// <reference types="cypress" />

const timeout = { timeout: 60000 };
const force = { force: true };

describe('Losses', () => {
  before(() => {
    cy.login('direktur');
  }); 

  beforeEach(() => {
    cy.visit('/losses');
  });

  it('Utility Loss', () => {
    cy.contains('Utility Loss', timeout).should('be.visible');
    cy.get(':nth-child(1) > :nth-child(2) > .block--grey', timeout).should('be.visible');
  });

  it('Loading Loss', () => {
    cy.contains('Loading Loss', timeout).should('be.visible');
    cy.get(':nth-child(2) > :nth-child(2) > .block--grey', timeout).should('be.visible');
  });

  it('Availability Loss', () => {
    cy.contains('Availability Loss', timeout).should('be.visible');
    cy.get(':nth-child(3) > :nth-child(2) > .block--grey', timeout).should('be.visible');
  });

  it('Performance Loss', () => {
    cy.contains('Performance Loss', timeout).should('be.visible');
    cy.get(':nth-child(4) > :nth-child(2) > .block--grey', timeout).should('be.visible');
    cy.get(':nth-child(4) > :nth-child(2) > .flex-block > .block--red', timeout).should('be.visible');
  });

  it('Quality Loss', () => {
    cy.contains('Quality Loss', timeout).should('be.visible');
    cy.get(':nth-child(5) > :nth-child(2) > .block--grey', timeout).should('be.visible');
    cy.get(':nth-child(5) > :nth-child(2) > .flex-block > .block--red', timeout).should('be.visible');
  });

  it('Effective Time', () => {
    cy.contains('Effective Time', timeout).should('be.visible');
    cy.get('tbody > :nth-child(6) > :nth-child(2)', timeout).should('be.visible');
  });

  it('Validasi Output', () => {
    cy.get('.ant-select-selection-item', timeout).click();
    cy.contains('Ball Mill', timeout).click();
    cy.contains('Machine category with id: MC-01 is not found or have no machines', timeout).should('be.visible');
  });

  it('Download', () => {
    cy.get('[data-testid=btn-download] > svg > path', timeout).click();
    cy.contains('Unduh sebagai JPG', timeout).should('be.visible');
    cy.contains('Unduh sebagai PDF', timeout).should('be.visible');
  });
});
