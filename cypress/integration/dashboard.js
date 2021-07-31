/// <reference types="Cypress" />

var timeout = { timeout: 60000 }

describe('Dashboard', () => {
  beforeEach(() => {
    cy.get('.active', timeout).click();
  });

  it('Check List Device', () => {
    cy.get('div[id="rc-tabs-2-panel-devices"]', timeout).should('exist');
    cy.contains('Arus Agitator Ball 1', timeout).should('be.visible');
    cy.contains('Temperatur', timeout).should('be.visible');
  });
});