/* eslint-disable */
/// <reference types="cypress" />

const timeout = { timeout: 150000 };

describe('Dashboard', () => {
  before(() => {
    cy.login('direktur');
    cy.contains('Dashboard', timeout).should('be.visible');
  });

  describe('Line View', () => {
    it('Check machine is null', ()=> {
      cy.get('span[class="ant-dropdown-trigger ant-breadcrumb-overlay-link"]', timeout).click();
      cy.contains('Line 1 Test', timeout).click();
      cy.contains('Belum ada data mesin.', timeout).should('be.visible');
    });

    it('Check machine is found', () => {
      cy.login('direktur');
      cy.contains('Dashboard', timeout).should('be.visible');
      cy.contains('Line 1 Plant Line 1', timeout).should('be.visible')
      cy.get('div[class="ant-card ant-card-bordered"]', timeout).should('be.visible');

      // Check list mesin
      cy.should('contain', '2 Oven ima 1', timeout)
        .and('contain', 'Packaging 1')
        .and('contain', 'Packaging 2')
        .and('contain', 'Packaging 3')
        .and('contain', 'Packaging 4')
        .and('contain', 'Packaging 5')
        .and('contain', 'Packaging 6')
        .and('contain', 'Packaging 7')
        .and('contain', 'Packaging 8')
        .and('contain', 'Packaging 9')
        .and('contain', 'Packaging 10');

      cy.get('button[class="active"]', timeout).contains('DAILY').should('be.visible');
      cy.get('button[class="inactive"]', timeout).contains('SHIFTLY').should('be.visible');
    });

    it('Filter mesin (Descending)', () => {
      cy.get('span[class="ant-select-selection-item"]', timeout).click();
      cy.contains('Descending', timeout).click();

      cy.get('h4[data-testid="machine"]', timeout).eq(0).contains('Packaging 9').should('be.visible');
      cy.get('h4[data-testid="machine"]', timeout).eq(1).contains('Packaging 8').should('be.visible');
      cy.get('h4[data-testid="machine"]', timeout).eq(2).contains('Packaging 7').should('be.visible');
      cy.get('h4[data-testid="machine"]', timeout).eq(3).contains('Packaging 6').should('be.visible');
      cy.get('h4[data-testid="machine"]', timeout).eq(4).contains('Packaging 5').should('be.visible');
      cy.get('h4[data-testid="machine"]', timeout).eq(5).contains('Packaging 4').should('be.visible');
      cy.get('h4[data-testid="machine"]', timeout).eq(6).contains('Packaging 3').should('be.visible');
      cy.get('h4[data-testid="machine"]', timeout).eq(7).contains('Packaging 2').should('be.visible');
      cy.get('h4[data-testid="machine"]', timeout).eq(8).contains('Packaging 10').should('be.visible');
      cy.get('h4[data-testid="machine"]', timeout).eq(9).contains('Packaging 1').should('be.visible');
      cy.get('h4[data-testid="machine"]', timeout).eq(10).contains('2 Oven ima 1').should('be.visible');
    });

    it('Filter mesin (Ascending)', () => {
      cy.get('span[class="ant-select-selection-item"]', timeout).click();
      cy.contains('Ascending', timeout).click();

      cy.get('h4[data-testid="machine"]', timeout).eq(0).contains('2 Oven ima 1').should('be.visible');
      cy.get('h4[data-testid="machine"]', timeout).eq(1).contains('Packaging 1').should('be.visible');
      cy.get('h4[data-testid="machine"]', timeout).eq(2).contains('Packaging 10').should('be.visible');
      cy.get('h4[data-testid="machine"]', timeout).eq(3).contains('Packaging 2').should('be.visible');
      cy.get('h4[data-testid="machine"]', timeout).eq(4).contains('Packaging 3').should('be.visible');
      cy.get('h4[data-testid="machine"]', timeout).eq(5).contains('Packaging 4').should('be.visible');
      cy.get('h4[data-testid="machine"]', timeout).eq(6).contains('Packaging 5').should('be.visible');
      cy.get('h4[data-testid="machine"]', timeout).eq(7).contains('Packaging 6').should('be.visible');
      cy.get('h4[data-testid="machine"]', timeout).eq(8).contains('Packaging 7').should('be.visible');
      cy.get('h4[data-testid="machine"]', timeout).eq(9).contains('Packaging 8').should('be.visible');
      cy.get('h4[data-testid="machine"]', timeout).eq(10).contains('Packaging 9').should('be.visible');
    });

    describe('Search Machine', () => {
      afterEach(() => {
        cy.get('input[placeholder="Cari"]', timeout).clear();
      });

      it('Machine found', () => {
        cy.get('input[placeholder="Cari"]', timeout).type('packaging 1');
        cy.contains('Packaging 1', timeout).should('be.visible');
      });

      it('Machine not found', () => {
        cy.get('input[placeholder="Cari"]', timeout).type('test');
        cy.contains('Test', timeout).should('not.exist');
      });
    });
  });

  describe('Machine Detail', () => {
    beforeEach(() => {
      cy.login('direktur');
      cy.contains('Dashboard', timeout).should('be.visible');
      cy.contains('2 Oven ima 1', timeout).eq(0).click();
    });
    it('Show detail machine Oven', () => {
      // Check element
      cy.contains('Timeline', timeout).should('be.visible');
      cy.contains('OEE', timeout).should('be.visible');
      cy.contains('Availability', timeout).should('be.visible');
      cy.contains('Performance', timeout).should('be.visible');
      cy.contains('Quality', timeout).should('be.visible');
      cy.contains('Speed (pcs/m)', timeout).should('be.visible');

      cy.get('[style="border-radius: 4px; background-color: rgb(43, 43, 43);"] > .ant-card-body', timeout).should('be.visible');
      cy.get(':nth-child(2) > .ant-card-body', timeout).should('be.visible');
      cy.get(':nth-child(3) > .ant-card-body', timeout).should('be.visible');
    });

    it('Change interval', () => {
      cy.get('span[class="ant-select-selection-item"]', timeout).eq(0).click();
      cy.contains('15 Menit', timeout).click();

      // Check element
      cy.contains('Timeline', timeout).should('be.visible');
      cy.contains('OEE', timeout).should('be.visible');
      cy.contains('Availability', timeout).should('be.visible');
      cy.contains('Performance', timeout).should('be.visible');
      cy.contains('Quality', timeout).should('be.visible');
      cy.contains('Speed (pcs/m)', timeout).should('be.visible');

      cy.get('[style="border-radius: 4px; background-color: rgb(43, 43, 43);"] > .ant-card-body', timeout).should('be.visible');
      cy.get(':nth-child(2) > .ant-card-body', timeout).should('be.visible');
      cy.get(':nth-child(3) > .ant-card-body', timeout).should('be.visible');
    });

    it('Change Waktu', () => {
      cy.get(':nth-child(2) > .ant-row > .ant-col > .ant-select > .ant-select-selector > .ant-select-selection-item', timeout).click();
      cy.contains('1 Jam Terakhir', timeout).click();

      // Check element
      cy.contains('Timeline', timeout).should('be.visible');
      cy.contains('OEE', timeout).should('be.visible');
      cy.contains('Availability', timeout).should('be.visible');
      cy.contains('Performance', timeout).should('be.visible');
      cy.contains('Quality', timeout).should('be.visible');
      cy.contains('Speed (pcs/m)', timeout).should('be.visible');

      cy.get('[style="border-radius: 4px; background-color: rgb(43, 43, 43);"] > .ant-card-body', timeout).should('be.visible');
      cy.get(':nth-child(2) > .ant-card-body', timeout).should('be.visible');
      cy.get(':nth-child(3) > .ant-card-body', timeout).should('be.visible');
    });

    it('Change Relatif', () => {
      cy.contains('RELATIF', timeout).click();

      // Check element
      cy.contains('Timeline', timeout).should('be.visible');
      cy.contains('OEE', timeout).should('be.visible');
      cy.contains('Availability', timeout).should('be.visible');
      cy.contains('Performance', timeout).should('be.visible');
      cy.contains('Quality', timeout).should('be.visible');
      cy.contains('Speed (pcs/m)', timeout).should('be.visible');

      cy.get('[style="border-radius: 4px; background-color: rgb(43, 43, 43);"] > .ant-card-body', timeout).should('be.visible');
      cy.get(':nth-child(2) > .ant-card-body', timeout).should('be.visible');
      cy.get(':nth-child(3) > .ant-card-body', timeout).should('be.visible');
    });

    it('Change Kumulatif', () => {
      cy.contains('KUMULATIF', timeout).click();

      // Check element
      cy.contains('Timeline', timeout).should('be.visible');
      cy.contains('OEE', timeout).should('be.visible');
      cy.contains('Availability', timeout).should('be.visible');
      cy.contains('Performance', timeout).should('be.visible');
      cy.contains('Quality', timeout).should('be.visible');
      cy.contains('Speed (pcs/m)', timeout).should('be.visible');

      cy.get('[style="border-radius: 4px; background-color: rgb(43, 43, 43);"] > .ant-card-body', timeout).should('be.visible');
      cy.get(':nth-child(2) > .ant-card-body', timeout).should('be.visible');
      cy.get(':nth-child(3) > .ant-card-body', timeout).should('be.visible');
    });
  });
});