/// <reference types="Cypress" />

var timeout = { timeout: 60000 }

describe('Threshold', () => {
  beforeEach(() => {
    cy.visit('/setting-threshold');
    cy.get(':nth-child(1) > label', timeout).click();
    cy.get(':nth-child(2) > .ant-row > .ant-col-23 > form > .ThresholdPage__RadioWrapper-sc-3zdoyo-5 > label', timeout).click();
  });

  it('Add threshold', () => {
    cy.get('[data-testid=btn-add-threshold]', timeout).click();
    cy.get('[data-testid=input-name-new-threshold]', timeout).type('Test Threshold');
    cy.get('[data-testid=new-threshold-input-min]', timeout).type('200');
    cy.get('[data-testid=new-threshold-input-max]', timeout).type('600');
    cy.get('.ant-btn-primary', timeout).click();
    cy.contains('Berhasil disimpan', timeout).should('be.visible');
    cy.get('[data-testid="Test Threshold-input-min"]', timeout).should('have.value', '200');
    cy.get('[data-testid="Test Threshold-input-max"]', timeout).should('have.value', '600');
  });

  it('Update threshold (Success)', () => {
    cy.get('[data-testid=more-menu-threshold] > svg', timeout).click();
    cy.get('[data-testid=additional-edit-threshold]', timeout).click();
    cy.get('[data-testid=new-threshold-input-min]', timeout).clear().type('250');
    cy.get('[data-testid=new-threshold-input-max]', timeout).clear().type('650');
    cy.get('.ant-btn-primary', timeout).click();
    cy.contains('Berhasil disimpan', timeout).should('be.visible');
    cy.get('[data-testid="Test Threshold-input-min"]', timeout).should('have.value', '250');
    cy.get('[data-testid="Test Threshold-input-max"]', timeout).should('have.value', '650');
  });

  it('Update threshold (Failed)', () => {
    cy.get('[data-testid=more-menu-threshold] > svg', timeout).click();
    cy.get('[data-testid=additional-edit-threshold]', timeout).click();
    cy.get('[data-testid=new-threshold-input-min]', timeout).clear().type('400');
    cy.get('[data-testid=new-threshold-input-max]', timeout).clear().type('300');
    cy.contains('Max value must be greater than Min', timeout).should('be.visible');

    cy.get('[data-testid=new-threshold-input-min]', timeout).clear().type('400');
    cy.get('[data-testid=new-threshold-input-max]', timeout).clear().type('600');
    cy.get('.ant-btn-primary', timeout).click();
    cy.contains('additional lower limit value must be less than lower limit and additional upper limit value must be more than upper limit', timeout).should('be.visible');
  });

  it('Delete Threshold', () => {
    cy.get('[data-testid=more-menu-threshold] > svg', timeout).click();
    cy.get('[data-testid=additional-delete-threshold]', timeout).click();
    cy.get('.swal2-confirm', timeout).click();
    cy.contains('Berhasil disimpan', timeout).should('be.visible');
    cy.get('[data-testid="Test Threshold-input-min"]', timeout).should('not.exist');
  });
});