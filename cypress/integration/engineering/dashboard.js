// / <reference types="Cypress" />
const timeout = { timeout: 60000 };
const force = { force: true };

describe('Dashboard', () => {
  before(() => {
    cy.login('engineering');
  });

  beforeEach(() => {
    cy.visit('/');
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

  describe('Download Data Dashboard', () => {
    it('Download as JPG', () => {
      cy.get('#download-highlight > .ant-row > :nth-child(2) > .ant-dropdown-trigger > svg > path', timeout).click();
      cy.contains('Unduh sebagai JPG', timeout).click(force);
    });

    it('Download as PDF', () => {
      cy.get('#download-highlight > .ant-row > :nth-child(2) > .ant-dropdown-trigger > svg > path', timeout).click();
      cy.contains('Unduh sebagai PDF', timeout).click(force);
    });
  });

  describe('Download Data Detail Device', () => {
    beforeEach(() => {
      cy.get('div[class="MachineCard__Container-sc-1euorj5-2 XRTEE"]', timeout).eq(0).click();
    });

    describe('Timeline', () => {
      it('Download as JPG', () => {
        cy.get('.ant-col-2 > .ant-dropdown-trigger > svg > path', timeout).click();
        cy.contains('Unduh sebagai JPG', timeout).click(force);
      });

      it('Download as PDF', () => {
        cy.get('.ant-col-2 > .ant-dropdown-trigger > svg > path', timeout).click();
        cy.contains('Unduh sebagai PDF', timeout).click(force);
      });
    });

    describe('OEE', () => {
      it('Download as JPG', () => {
        cy.get(':nth-child(2) > .ant-row-space-between > [data-testid=right] > .ant-row > .ant-col > .ant-dropdown-trigger > svg > path', timeout).click();
        cy.contains('Unduh sebagai JPG', timeout).click(force);
      });

      it('Download as PDF', () => {
        cy.get(':nth-child(2) > .ant-row-space-between > [data-testid=right] > .ant-row > .ant-col > .ant-dropdown-trigger > svg > path', timeout).click();
        cy.contains('Unduh sebagai PDF', timeout).click(force);
      });
    });

    describe('Availability', () => {
      it('Download as JPG', () => {
        cy.get(':nth-child(3) > .ant-row-space-between > [data-testid=right] > .ant-row > .ant-col > .ant-dropdown-trigger > svg', timeout).click()
        cy.contains('Unduh sebagai JPG', timeout).click(force);
      });

      it('Download as PDF', () => {
        cy.get(':nth-child(3) > .ant-row-space-between > [data-testid=right] > .ant-row > .ant-col > .ant-dropdown-trigger > svg', timeout).click();
        cy.contains('Unduh sebagai PDF', timeout).click(force);
      });
    });

    describe('Performance', () => {
      it('Download as JPG', () => {
        cy.get(':nth-child(4) > .ant-row-space-between > [data-testid=right] > .ant-row > .ant-col > .ant-dropdown-trigger > svg', timeout).click()
        cy.contains('Unduh sebagai JPG', timeout).click(force);
      });

      it('Download as PDF', () => {
        cy.get(':nth-child(4) > .ant-row-space-between > [data-testid=right] > .ant-row > .ant-col > .ant-dropdown-trigger > svg', timeout).click();
        cy.contains('Unduh sebagai PDF', timeout).click(force);
      });
    });

    describe('Quality', () => {
      it('Download as JPG', () => {
        cy.get(':nth-child(5) > .ant-row-space-between > [data-testid=right] > .ant-row > .ant-col > .ant-dropdown-trigger > svg', timeout).click()
        cy.contains('Unduh sebagai JPG', timeout).click(force);
      });

      it('Download as PDF', () => {
        cy.get(':nth-child(5) > .ant-row-space-between > [data-testid=right] > .ant-row > .ant-col > .ant-dropdown-trigger > svg', timeout).click();
        cy.contains('Unduh sebagai PDF', timeout).click(force);
      });
    });

    describe('Speed', () => {
      it('Download as JPG', () => {
        cy.get(':nth-child(6) > .ant-row-space-between > [data-testid=right] > .ant-row > .ant-col > .ant-dropdown-trigger > svg', timeout).click()
        cy.contains('Unduh sebagai JPG', timeout).click(force);
      });

      it('Download as PDF', () => {
        cy.get(':nth-child(6) > .ant-row-space-between > [data-testid=right] > .ant-row > .ant-col > .ant-dropdown-trigger > svg', timeout).click();
        cy.contains('Unduh sebagai PDF', timeout).click(force);
      });
    });
  });
});
