/* eslint-disable */
/// <reference types="cypress" />

const timeout = { timeout: 60000 };
const url = 'https://api.jeager.io';

describe('Issues', () => {
  before(() => {
    cy.mockUserAdmin();
    cy.mockResponse();
    cy.login('admin');
    cy.intercept(`${url}/issues?start_date=*&end_date=*`, { fixture: '/issues/issues.json' }).as('issues');
    cy.get('[title="Issues"] > a', timeout).click();
    cy.intercept(`${url}/issues?start_date=*&end_date=*`, { fixture: '/issues/issues.json' }).as('issues');
  });

  beforeEach(() => {
    cy.mockUserAdmin();
    cy.mockResponse();
  });

  it('Data > 1', () => {
    // Check data
    cy.contains('Quality_Loss', timeout).should('be.visible');
    cy.contains('Threshold', timeout).should('be.visible');
    cy.contains('Downtime', timeout).should('be.visible');

    // Check element
    cy.contains('Reason Belum Terisi', timeout).should('be.visible');
    cy.contains('Isu', timeout).should('be.visible');
    cy.contains('Asset', timeout).should('be.visible');
    cy.contains('Status', timeout).should('be.visible');
    cy.contains('Tanggal', timeout).should('be.visible');
    cy.get('li[class="ant-pagination-item ant-pagination-item-1 ant-pagination-item-active"]', timeout).should('be.visible');
  });

  it('Data null', () => {
    cy.mockUserAdmin();
    cy.mockResponse();
    cy.login('admin');
    cy.get('[title="Issues"] > a', timeout).click();
    cy.intercept(`${url}/issues?start_date=*&end_date=*`, { fixture: '/issues/issues-null.json' }).as('issues');
    cy.contains('No Data', timeout).should('be.visible');
  });

  describe('Filter Data', () => {
    before(() => {
      cy.mockUserAdmin();
      cy.mockResponse();
      cy.login('admin');
      cy.get('[title="Issues"] > a', timeout).click();
      cy.intercept(`${url}/issues?start_date=*&end_date=*`, { fixture: '/issues/issues.json' }).as('issues');
    });

    describe('Sorting by Isu', () => {
      it('Ascending', () => {
        cy.get('span[class="ant-table-column-sorter-inner"]', timeout).eq(0).click();
        cy.get('tr[class="ant-table-row ant-table-row-level-0"]', timeout).eq(0).contains('Downtime').should('be.visible');
        cy.get('tr[class="ant-table-row ant-table-row-level-0"]', timeout).eq(1).contains('Quality_Loss').should('be.visible');
        cy.get('tr[class="ant-table-row ant-table-row-level-0"]', timeout).eq(2).contains('Threshold').should('be.visible');
      });

      it('Descending', () => {
        cy.get('span[class="ant-table-column-sorter-inner"]', timeout).eq(0).click();
        cy.get('tr[class="ant-table-row ant-table-row-level-0"]', timeout).eq(0).contains('Threshold').should('be.visible');
        cy.get('tr[class="ant-table-row ant-table-row-level-0"]', timeout).eq(1).contains('Quality_Loss').should('be.visible');
        cy.get('tr[class="ant-table-row ant-table-row-level-0"]', timeout).eq(2).contains('Downtime').should('be.visible');
      });

      it('Cancel Sorting', () => {
        cy.get('span[class="ant-table-column-sorter-inner"]', timeout).eq(0).click();
        cy.get('tr[class="ant-table-row ant-table-row-level-0"]', timeout).eq(0).contains('Quality_Loss').should('be.visible');
        cy.get('tr[class="ant-table-row ant-table-row-level-0"]', timeout).eq(1).contains('Threshold').should('be.visible');
        cy.get('tr[class="ant-table-row ant-table-row-level-0"]', timeout).eq(2).contains('Downtime').should('be.visible');
      });
    });

    describe('Filter by Isu', () => {
      it('Filter isu Quality Loss', () => {
        cy.get('span[class="anticon anticon-filter"]', timeout).eq(0).click();
        cy.get('.ant-dropdown-menu > :nth-child(1) > :nth-child(2)', timeout).click();
        cy.contains('OK', timeout).click();
        cy.get('tr[class="ant-table-row ant-table-row-level-0"]', timeout).eq(0).contains('Quality_Loss').should('be.visible');
      });
      
      it('Filter isu Threshold', () => {
        cy.get('span[class="anticon anticon-filter"]', timeout).eq(0).click();
        cy.get('.ant-dropdown-menu > :nth-child(1) > :nth-child(2)', timeout).click();
        cy.get('.ant-dropdown-menu > :nth-child(2) > :nth-child(2)', timeout).click();
        cy.contains('OK', timeout).click();
        cy.get('tr[class="ant-table-row ant-table-row-level-0"]', timeout).eq(0).contains('Threshold').should('be.visible');
      });

      it('Filter isu Downtime', () => {
        cy.get('span[class="anticon anticon-filter"]', timeout).eq(0).click();
        cy.get('.ant-dropdown-menu > :nth-child(2) > :nth-child(2)', timeout).click();
        cy.get('.ant-dropdown-menu > :nth-child(3) > :nth-child(2)', timeout).click();
        cy.contains('OK', timeout).click();
        cy.get('tr[class="ant-table-row ant-table-row-level-0"]', timeout).eq(0).contains('Downtime').should('be.visible');
      });

      it('Filter all isu', () => {
        cy.get('span[class="anticon anticon-filter"]', timeout).eq(0).click();
        cy.get('.ant-dropdown-menu > :nth-child(1) > :nth-child(2)', timeout).click();
        cy.get('.ant-dropdown-menu > :nth-child(2) > :nth-child(2)', timeout).click();
        cy.contains('OK', timeout).click();
        cy.get('tr[class="ant-table-row ant-table-row-level-0"]', timeout).eq(0).contains('Quality_Loss').should('be.visible');
        cy.get('tr[class="ant-table-row ant-table-row-level-0"]', timeout).eq(1).contains('Threshold').should('be.visible');
        cy.get('tr[class="ant-table-row ant-table-row-level-0"]', timeout).eq(2).contains('Downtime').should('be.visible');
      });

      it('Reset', () => {
        cy.get('span[class="anticon anticon-filter"]', timeout).eq(0).click();
        cy.contains('Reset', timeout).click();
        cy.get('tr[class="ant-table-row ant-table-row-level-0"]', timeout).eq(0).contains('Quality_Loss').should('be.visible');
        cy.get('tr[class="ant-table-row ant-table-row-level-0"]', timeout).eq(1).contains('Threshold').should('be.visible');
        cy.get('tr[class="ant-table-row ant-table-row-level-0"]', timeout).eq(2).contains('Downtime').should('be.visible');
      });
    });

    describe('Sorting by Asset', () => {
      it('Ascending', () => {
        cy.get('span[class="ant-table-column-sorter-inner"]', timeout).eq(1).click();
        cy.get('tr[class="ant-table-row ant-table-row-level-0"]', timeout).eq(0).contains('Packaging 1').should('be.visible');
        cy.get('tr[class="ant-table-row ant-table-row-level-0"]', timeout).eq(1).contains('Packaging 2').should('be.visible');
        cy.get('tr[class="ant-table-row ant-table-row-level-0"]', timeout).eq(2).contains('Packaging 3').should('be.visible');
      });

      it('Descending', () => {
        cy.get('span[class="ant-table-column-sorter-inner"]', timeout).eq(1).click();
        cy.get('tr[class="ant-table-row ant-table-row-level-0"]', timeout).eq(0).contains('Packaging 3').should('be.visible');
        cy.get('tr[class="ant-table-row ant-table-row-level-0"]', timeout).eq(1).contains('Packaging 2').should('be.visible');
        cy.get('tr[class="ant-table-row ant-table-row-level-0"]', timeout).eq(2).contains('Packaging 1').should('be.visible');
      });

      it('Cancel Sorting', () => {
        cy.get('span[class="ant-table-column-sorter-inner"]', timeout).eq(1).click();
        cy.get('tr[class="ant-table-row ant-table-row-level-0"]', timeout).eq(0).contains('Packaging 2').should('be.visible');
        cy.get('tr[class="ant-table-row ant-table-row-level-0"]', timeout).eq(1).contains('Packaging 1').should('be.visible');
        cy.get('tr[class="ant-table-row ant-table-row-level-0"]', timeout).eq(2).contains('Packaging 3').should('be.visible');
      });
    });

    describe('Sorting by Status', () => {
      it('Ascending', () => {
        cy.get('span[class="ant-table-column-sorter-inner"]', timeout).eq(2).click();
        cy.get('tr[class="ant-table-row ant-table-row-level-0"]', timeout).eq(0).contains('-100 pcs').should('be.visible');
        cy.get('tr[class="ant-table-row ant-table-row-level-0"]', timeout).eq(1).contains('Danger').should('be.visible');
        cy.get('tr[class="ant-table-row ant-table-row-level-0"]', timeout).eq(2).contains('Warning').should('be.visible');
      });

      it('Descending', () => {
        cy.get('span[class="ant-table-column-sorter-inner"]', timeout).eq(2).click();
        cy.get('tr[class="ant-table-row ant-table-row-level-0"]', timeout).eq(0).contains('Warning').should('be.visible');
        cy.get('tr[class="ant-table-row ant-table-row-level-0"]', timeout).eq(1).contains('Danger').should('be.visible');
        cy.get('tr[class="ant-table-row ant-table-row-level-0"]', timeout).eq(2).contains('-100 pcs').should('be.visible');
      });

      it('Cancel Sorting', () => {
        cy.get('span[class="ant-table-column-sorter-inner"]', timeout).eq(2).click();
        cy.get('tr[class="ant-table-row ant-table-row-level-0"]', timeout).eq(0).contains('-100 pcs').should('be.visible');
        cy.get('tr[class="ant-table-row ant-table-row-level-0"]', timeout).eq(1).contains('Warning').should('be.visible');
        cy.get('tr[class="ant-table-row ant-table-row-level-0"]', timeout).eq(2).contains('Danger').should('be.visible');
      });
    });

    describe('Sorting by Tanggal', () => {
      it('Ascending', () => {
        cy.get('span[class="ant-table-column-sorter-inner"]', timeout).eq(3).click();
        cy.get('tr[class="ant-table-row ant-table-row-level-0"]', timeout).eq(0).contains('21/04/21 - 20:52:46').should('be.visible');
        cy.get('tr[class="ant-table-row ant-table-row-level-0"]', timeout).eq(1).contains('22/04/21 - 20:52:46').should('be.visible');
        cy.get('tr[class="ant-table-row ant-table-row-level-0"]', timeout).eq(2).contains('23/04/21 - 20:52:46').should('be.visible');
      });

      it('Descending', () => {
        cy.get('span[class="ant-table-column-sorter-inner"]', timeout).eq(3).click();
        cy.get('tr[class="ant-table-row ant-table-row-level-0"]', timeout).eq(0).contains('23/04/21 - 20:52:46').should('be.visible');
        cy.get('tr[class="ant-table-row ant-table-row-level-0"]', timeout).eq(1).contains('22/04/21 - 20:52:46').should('be.visible');
        cy.get('tr[class="ant-table-row ant-table-row-level-0"]', timeout).eq(2).contains('21/04/21 - 20:52:46').should('be.visible');
      });

      it('Cancel Sorting', () => {
        cy.get('span[class="ant-table-column-sorter-inner"]', timeout).eq(3).click();
        cy.get('tr[class="ant-table-row ant-table-row-level-0"]', timeout).eq(0).contains('21/04/21 - 20:52:46').should('be.visible');
        cy.get('tr[class="ant-table-row ant-table-row-level-0"]', timeout).eq(1).contains('22/04/21 - 20:52:46').should('be.visible');
        cy.get('tr[class="ant-table-row ant-table-row-level-0"]', timeout).eq(2).contains('23/04/21 - 20:52:46').should('be.visible');
      });
    });
  });

  describe('Action', () => {
    it('Tandai dibaca', () => {
      cy.get('path[fill-rule="evenodd"]', timeout).eq(1).click();
      cy.get('.read > .menu > span', timeout).click();
      cy.intercept(`${url}/issue`, { fixture: '/issues/issues-success.json' }).as('issues');
      cy.intercept(`${url}/issues?start_date=*&end_date=*`, { fixture: '/issues/issues-read.json' }).as('issues');
      cy.get('tr[class="ant-table-row ant-table-row-level-0"]', timeout).eq(1).children('div[class="blue-dot"]').should('not.exist');
    });
    
    it('Hapus', () => {
      cy.get('path[fill-rule="evenodd"]', timeout).eq(1).click();
      cy.get('.delete > .menu > span', timeout).click();
      cy.contains('Ya', timeout).click();
      cy.intercept(`${url}/issue`, { fixture: '/issues/issues-success.json' }).as('issues');
      cy.intercept(`${url}/issues?start_date=*&end_date=*`, { fixture: '/issues/issues-delete.json' }).as('issues');
    });
  });
});
