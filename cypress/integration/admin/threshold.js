/* eslint-disable */
/// <reference types="cypress" />

const timeout = { timeout: 60000 };
const url = 'https://api.jeager.io';

describe('Threshold', () => {
  before(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.mockUserAdmin();
    cy.login('admin');
    cy.get('[title="Threshold"] > a', timeout).click();
  });

  describe('Check List Threshold', () => {
    it.only('Data Threshold Name is null', () => {
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
});
