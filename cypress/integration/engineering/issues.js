/* eslint-disable */
/// <reference types="cypress" />

const timeout = { timeout: 5000 };
const url = 'https://api.jeager.io';

describe('Issues', () => {
  before(() => {
    cy.login('engineering');
  });

  beforeEach(() => {
    cy.visit('/issues');
  });

  describe('Filter Data', () => {
    describe('Sorting by Isu', () => {
      it('Ascending', () => {
        cy.get('span[class="ant-table-column-sorter-inner"]', timeout).eq(0).click();
        cy.get('tr[class="ant-table-row ant-table-row-level-0"]', timeout).eq(0).should('exist');
        cy.get('tr[class="ant-table-row ant-table-row-level-0"]', timeout).eq(1).should('exist');
        cy.get('tr[class="ant-table-row ant-table-row-level-0"]', timeout).eq(2).should('exist');
      });

      it('Descending', () => {
        cy.get('span[class="ant-table-column-sorter-inner"]', timeout).eq(0).click();
        cy.get('tr[class="ant-table-row ant-table-row-level-0"]', timeout).eq(0).should('exist');
        cy.get('tr[class="ant-table-row ant-table-row-level-0"]', timeout).eq(1).should('exist');
        cy.get('tr[class="ant-table-row ant-table-row-level-0"]', timeout).eq(2).should('exist');
      });

      it('Cancel Sorting', () => {
        cy.get('span[class="ant-table-column-sorter-inner"]', timeout).eq(0).click();
        cy.get('tr[class="ant-table-row ant-table-row-level-0"]', timeout).eq(0).should('exist');
        cy.get('tr[class="ant-table-row ant-table-row-level-0"]', timeout).eq(1).should('exist');
        cy.get('tr[class="ant-table-row ant-table-row-level-0"]', timeout).eq(2).should('exist');
      });
    });

    describe('Filter by Isu', () => {
      it('Filter isu Quality Loss', () => {
        cy.get('span[class="anticon anticon-filter"]', timeout).eq(0).click();
        cy.get('.ant-dropdown-menu > :nth-child(1) > :nth-child(2)', timeout).click();
        cy.contains('OK', timeout).click();
        cy.get('tr[class="ant-table-row ant-table-row-level-0"]', timeout).eq(0).contains('Quality_Loss').should('be.visible');
      });
      
      it.skip('Filter isu Threshold', () => {
        cy.get('span[class="anticon anticon-filter"]', timeout).eq(0).click();
        cy.get('.ant-dropdown-menu > :nth-child(1) > :nth-child(2)', timeout).click();
        cy.get('.ant-dropdown-menu > :nth-child(2) > :nth-child(2)', timeout).click();
        cy.contains('OK', timeout).click();
        cy.get('tr[class="ant-table-row ant-table-row-level-0"]', timeout).eq(0).contains('Threshold').should('be.visible');
      });

      it.skip('Filter isu Downtime', () => {
        cy.get('span[class="anticon anticon-filter"]', timeout).eq(0).click();
        cy.get('.ant-dropdown-menu > :nth-child(2) > :nth-child(2)', timeout).click();
        cy.get('.ant-dropdown-menu > :nth-child(3) > :nth-child(2)', timeout).click();
        cy.contains('OK', timeout).click();
        cy.get('tr[class="ant-table-row ant-table-row-level-0"]', timeout).eq(0).contains('Downtime').should('be.visible');
      });

      it('Filter all isu', () => {
        cy.get('span[class="anticon anticon-filter"]', timeout).eq(0).click();
        cy.get('.ant-dropdown-menu > :nth-child(1) > :nth-child(2)', timeout).click();
        cy.contains('OK', timeout).click();
        cy.get('tr[class="ant-table-row ant-table-row-level-0"]', timeout).eq(0).should('exist');
        cy.get('tr[class="ant-table-row ant-table-row-level-0"]', timeout).eq(1).should('exist');
        cy.get('tr[class="ant-table-row ant-table-row-level-0"]', timeout).eq(2).should('exist');
      });

      it('Reset', () => {
        cy.get('span[class="anticon anticon-filter"]', timeout).eq(0).click();
        cy.get('.ant-dropdown-menu > :nth-child(1) > :nth-child(2)', timeout).click();
        cy.contains('OK', timeout).click();
        cy.get('span[class="anticon anticon-filter"]', timeout).eq(0).click();
        cy.contains('Reset', timeout).click();
        cy.get('tr[class="ant-table-row ant-table-row-level-0"]', timeout).eq(0).should('exist');
        cy.get('tr[class="ant-table-row ant-table-row-level-0"]', timeout).eq(1).should('exist');
        cy.get('tr[class="ant-table-row ant-table-row-level-0"]', timeout).eq(2).should('exist');
      });
    });

    describe('Sorting by Asset', () => {
      it('Ascending', () => {
        cy.get('span[class="ant-table-column-sorter-inner"]', timeout).eq(1).click();
        cy.get('tr[class="ant-table-row ant-table-row-level-0"]', timeout).eq(0).should('exist');
        cy.get('tr[class="ant-table-row ant-table-row-level-0"]', timeout).eq(1).should('exist');
        cy.get('tr[class="ant-table-row ant-table-row-level-0"]', timeout).eq(2).should('exist');
      });

      it('Descending', () => {
        cy.get('span[class="ant-table-column-sorter-inner"]', timeout).eq(1).click();
        cy.get('tr[class="ant-table-row ant-table-row-level-0"]', timeout).eq(0).should('exist');
        cy.get('tr[class="ant-table-row ant-table-row-level-0"]', timeout).eq(1).should('exist');
        cy.get('tr[class="ant-table-row ant-table-row-level-0"]', timeout).eq(2).should('exist');
      });

      it('Cancel Sorting', () => {
        cy.get('span[class="ant-table-column-sorter-inner"]', timeout).eq(1).click();
        cy.get('tr[class="ant-table-row ant-table-row-level-0"]', timeout).eq(0).should('exist');
        cy.get('tr[class="ant-table-row ant-table-row-level-0"]', timeout).eq(1).should('exist');
        cy.get('tr[class="ant-table-row ant-table-row-level-0"]', timeout).eq(2).should('exist');
      });
    });

    describe('Sorting by Status', () => {
      it('Ascending', () => {
        cy.get('span[class="ant-table-column-sorter-inner"]', timeout).eq(2).click();
        cy.get('tr[class="ant-table-row ant-table-row-level-0"]', timeout).eq(0).should('exist');
        cy.get('tr[class="ant-table-row ant-table-row-level-0"]', timeout).eq(1).should('exist');
        cy.get('tr[class="ant-table-row ant-table-row-level-0"]', timeout).eq(2).should('exist');
      });

      it('Descending', () => {
        cy.get('span[class="ant-table-column-sorter-inner"]', timeout).eq(2).click();
        cy.get('tr[class="ant-table-row ant-table-row-level-0"]', timeout).eq(0).should('exist');
        cy.get('tr[class="ant-table-row ant-table-row-level-0"]', timeout).eq(1).should('exist');
        cy.get('tr[class="ant-table-row ant-table-row-level-0"]', timeout).eq(2).should('exist');
      });

      it('Cancel Sorting', () => {
        cy.get('span[class="ant-table-column-sorter-inner"]', timeout).eq(2).click();
        cy.get('tr[class="ant-table-row ant-table-row-level-0"]', timeout).eq(0).should('exist');
        cy.get('tr[class="ant-table-row ant-table-row-level-0"]', timeout).eq(1).should('exist');
        cy.get('tr[class="ant-table-row ant-table-row-level-0"]', timeout).eq(2).should('exist');
      });
    });

    describe('Sorting by Tanggal', () => {
      it('Ascending', () => {
        cy.get('tr[class="ant-table-row ant-table-row-level-0"]', timeout).eq(0).should('exist');
        cy.get('tr[class="ant-table-row ant-table-row-level-0"]', timeout).eq(1).should('exist');
        cy.get('tr[class="ant-table-row ant-table-row-level-0"]', timeout).eq(2).should('exist');
      });

      it('Descending', () => {
        cy.get('tr[class="ant-table-row ant-table-row-level-0"]', timeout).eq(0).should('exist');
        cy.get('tr[class="ant-table-row ant-table-row-level-0"]', timeout).eq(1).should('exist');
        cy.get('tr[class="ant-table-row ant-table-row-level-0"]', timeout).eq(2).should('exist');
      });

      it('Cancel Sorting', () => {
        cy.get('tr[class="ant-table-row ant-table-row-level-0"]', timeout).eq(0).should('exist');
        cy.get('tr[class="ant-table-row ant-table-row-level-0"]', timeout).eq(1).should('exist');
        cy.get('tr[class="ant-table-row ant-table-row-level-0"]', timeout).eq(2).should('exist');
      });
    });
  });

  describe('Action', () => {
    it('Tandai dibaca', () => {
      cy.get('path[fill-rule="evenodd"]', timeout).eq(5).click();
      cy.get('.read > .menu > span', timeout).click();
      cy.get('tr[class="ant-table-row ant-table-row-level-0"]', timeout).eq(2).children('div[class="blue-dot"]').should('not.exist');
    });
    
    it('Hapus', () => {
      cy.get('path[fill-rule="evenodd"]', timeout).eq(1).click();
      cy.get('.delete > .menu > span', timeout).click();
      cy.contains('Ya', timeout).click();
    });
  });
});
