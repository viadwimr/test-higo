/* eslint-disable */
/// <reference types="cypress" />

const timeout = { timeout: 60000 };
const force = { force: true };

describe('Pareto', () => {
  before(() => {
    cy.login('engineering');
  });

  beforeEach(() => {
    cy.visit('/pareto');
  });

  it('View by durasi', () => {
    cy.get('button[value="durasi"]', timeout).click();
    cy.contains('durasi', timeout).should('be.visible');
  });

  it('View by frekuensi', () => {
    cy.get('button[value="frekuensi"]', timeout).click();
    cy.contains('frekuensi', timeout).should('be.visible');
  });

  it('>1 data reason', () => {
    // Reason Name
    cy.contains('Reason 1', timeout).should('be.visible');
    cy.contains('Reason 2', timeout).should('be.visible');
    cy.contains('Reason 3', timeout).should('be.visible');

    // Reason Group
    cy.contains('Reason Group 1', timeout).should('be.visible');
    cy.contains('Reason Group 2', timeout).should('be.visible');

    // Durasi
    cy.contains('7h 59m 59s', timeout).should('be.visible');
    cy.contains('20m 41s', timeout).should('be.visible');
    cy.contains('29m', timeout).should('be.visible');

    // Waktu Mulai
    cy.contains('31/03/21 - 23:00:00', timeout).should('be.visible');
    cy.contains('26/03/21 - 07:00:01', timeout).should('be.visible');
    cy.contains('27/03/21 - 09:00:01', timeout).should('be.visible');

    // Waktu Selesai
    cy.contains('01/04/21 - 06:59:59', timeout).should('be.visible');
    cy.contains('26/03/21 - 07:20:42', timeout).should('be.visible');
    cy.contains('27/03/21 - 11:20:42', timeout).should('be.visible');
  });

  it('1 data reason', () => {
    cy.intercept('34.87.144.83:3009/production_lines/pareto/downtime', {
      fixture: '/production_lines/downtime-1.json',
    }).as('downtime');
    cy.get('[title="Parameter"] > a', timeout).click();
    cy.get('[title="Pareto"] > a', timeout).click();

    cy.contains('Reason 1', timeout).should('be.visible');
    cy.contains('Reason Group 1', timeout).should('be.visible');
    cy.contains('7h 59m 59s', timeout).should('be.visible');
    cy.contains('31/03/21 - 23:00:00', timeout).should('be.visible');
    cy.contains('01/04/21 - 06:59:59', timeout).should('be.visible');
  });

  it('Null data reason', () => {
    cy.intercept('34.87.144.83:3009/production_lines/pareto/downtime', {
      fixture: '/production_lines/downtime-null.json',
    }).as('downtime');
    cy.get('[title="Parameter"] > a', timeout).click();
    cy.get('[title="Pareto"] > a', timeout).click();

    cy.contains('Tidak ada data Downtime', timeout).should('be.visible');
  });

  describe('Filter Table', () => {
    before(() => {
      cy.intercept('34.87.144.83:3009/production_lines/pareto/downtime', {
        fixture: '/production_lines/downtime>1.json',
      }).as('downtime');
      cy.get('[title="Parameter"] > a', timeout).click();
      cy.get('[title="Pareto"] > a', timeout).click();
    });

    describe('Sorting by Reason', () => {
      it('Ascending', () => {
        cy.get('span[class="ant-table-column-sorter-inner"]', timeout)
          .eq(0)
          .click();
        cy.get('tr[data-row-key="0"]', timeout)
          .contains('Reason 1')
          .should('be.visible');
        cy.get('tr[data-row-key="1"]', timeout)
          .contains('Reason 2')
          .should('be.visible');
        cy.get('tr[data-row-key="2"]', timeout)
          .contains('Reason 3')
          .should('be.visible');
      });

      it('Descending', () => {
        cy.get('span[class="ant-table-column-sorter-inner"]', timeout)
          .eq(0)
          .click();
        cy.get('tr[data-row-key="2"]', timeout)
          .contains('Reason 3')
          .should('be.visible');
        cy.get('tr[data-row-key="1"]', timeout)
          .contains('Reason 2')
          .should('be.visible');
        cy.get('tr[data-row-key="0"]', timeout)
          .contains('Reason 1')
          .should('be.visible');
      });

      it('Cancel sort', () => {
        cy.get('span[class="ant-table-column-sorter-inner"]', timeout)
          .eq(0)
          .click();
        cy.get('tr[data-row-key="0"]', timeout)
          .contains('Reason 1')
          .should('be.visible');
        cy.get('tr[data-row-key="1"]', timeout)
          .contains('Reason 2')
          .should('be.visible');
        cy.get('tr[data-row-key="2"]', timeout)
          .contains('Reason 3')
          .should('be.visible');
      });
    });

    describe('Filter by Reason Group', () => {
      it('Filter by Reason Group 1', () => {
        cy.get('span[class="ant-table-filter-trigger-container"]', timeout)
          .eq(0)
          .click();
        cy.get('.ant-dropdown-menu > :nth-child(1) > :nth-child(2)').click({
          force: true,
        });
        cy.contains('OK', timeout).click();
        cy.get('tr[data-row-key="1]').should('not.exist');
        cy.get('tr[data-row-key="2]').should('not.exist');
        cy.get('tr[data-row-key="0"]', timeout)
          .children()
          .should('contain', 'Reason 1', timeout)
          .and('contain', 'Reason Group 1')
          .and('contain', 'Packaging 1')
          .and('contain', 'Packaging')
          .and('contain', '7h 59m 59s')
          .and('contain', '31/03/21 - 23:00:00')
          .and('contain', '01/04/21 - 06:59:59');
      });

      it('Filter by Reason Group 2', () => {
        cy.get('span[class="ant-table-filter-trigger-container"]', timeout)
          .eq(0)
          .click();
        cy.contains('Reset', timeout).click();
        cy.get('span[class="ant-table-filter-trigger-container"]', timeout)
          .eq(0)
          .click();
        cy.get('.ant-dropdown-menu > :nth-child(2) > :nth-child(2)').click({
          force: true,
        });
        cy.contains('OK', timeout).click({ force: true });
        cy.get('tr[data-row-key="0"]').should('not.exist');
        cy.get('tr[data-row-key="1"]', timeout)
          .children()
          .should('contain', 'Reason 2', timeout)
          .and('contain', 'Reason Group 2')
          .and('contain', 'Packaging 2')
          .and('contain', 'Packaging')
          .and('contain', '20m 41s')
          .and('contain', '26/03/21 - 07:00:01')
          .and('contain', '26/03/21 - 07:20:42');

        cy.get('tr[data-row-key="2"]', timeout)
          .children()
          .should('contain', 'Reason 3', timeout)
          .and('contain', 'Reason Group 2')
          .and('contain', 'Packaging 2')
          .and('contain', 'Packaging')
          .and('contain', '29m')
          .and('contain', '27/03/21 - 09:00:01')
          .and('contain', '27/03/21 - 11:20:42');
      });

      it('Reset Filter', () => {
        cy.get('span[class="ant-table-filter-trigger-container"]', timeout)
          .eq(0)
          .click();
        cy.contains('Reset', timeout).click();

        cy.get('tr[data-row-key="0"]', timeout)
          .children()
          .should('contain', 'Reason 1', timeout)
          .and('contain', 'Reason Group 1')
          .and('contain', 'Packaging 1')
          .and('contain', 'Packaging')
          .and('contain', '7h 59m 59s')
          .and('contain', '31/03/21 - 23:00:00')
          .and('contain', '01/04/21 - 06:59:59');

        cy.get('tr[data-row-key="1"]', timeout)
          .children()
          .should('contain', 'Reason 2', timeout)
          .and('contain', 'Reason Group 2')
          .and('contain', 'Packaging 2')
          .and('contain', 'Packaging')
          .and('contain', '20m 41s')
          .and('contain', '26/03/21 - 07:00:01')
          .and('contain', '26/03/21 - 07:20:42');

        cy.get('tr[data-row-key="2"]', timeout)
          .children()
          .should('contain', 'Reason 3', timeout)
          .and('contain', 'Reason Group 2')
          .and('contain', 'Packaging 2')
          .and('contain', 'Packaging')
          .and('contain', '29m')
          .and('contain', '27/03/21 - 09:00:01')
          .and('contain', '27/03/21 - 11:20:42');
      });
    });

    describe('Filter by Mesin', () => {
      it('Filter by Packaging 1', () => {
        cy.get('span[class="ant-table-filter-trigger-container"]', timeout)
          .eq(1)
          .click();
        cy.get('li[class="ant-dropdown-menu-item"]', timeout)
          .contains('Packaging 1')
          .click();
        cy.contains('OK', timeout).click({ force: true });
        cy.get('tr[data-row-key="1]').should('not.exist');
        cy.get('tr[data-row-key="2]').should('not.exist');
        cy.get('tr[data-row-key="0"]', timeout)
          .children()
          .should('contain', 'Reason 1', timeout)
          .and('contain', 'Reason Group 1')
          .and('contain', 'Packaging 1')
          .and('contain', 'Packaging')
          .and('contain', '7h 59m 59s')
          .and('contain', '31/03/21 - 23:00:00')
          .and('contain', '01/04/21 - 06:59:59');
      });

      it('Filter by Packaging 2', () => {
        cy.get('span[class="ant-table-filter-trigger-container"]', timeout)
          .eq(1)
          .click();
        cy.get('button[class="ant-btn ant-btn-link ant-btn-sm"]', timeout)
          .eq(1)
          .click();
        cy.get('span[class="ant-table-filter-trigger-container"]', timeout)
          .eq(1)
          .click();
        cy.get('li[class="ant-dropdown-menu-item"]', timeout)
          .contains('Packaging 2')
          .click({ force: true });
        cy.contains('OK', timeout).click({ force: true });
        cy.get('tr[data-row-key="0"]').should('not.exist');
        cy.get('tr[data-row-key="1"]', timeout)
          .children()
          .should('contain', 'Reason 2', timeout)
          .and('contain', 'Reason Group 2')
          .and('contain', 'Packaging 2')
          .and('contain', 'Packaging')
          .and('contain', '20m 41s')
          .and('contain', '26/03/21 - 07:00:01')
          .and('contain', '26/03/21 - 07:20:42');

        cy.get('tr[data-row-key="2"]', timeout)
          .children()
          .should('contain', 'Reason 3', timeout)
          .and('contain', 'Reason Group 2')
          .and('contain', 'Packaging 2')
          .and('contain', 'Packaging')
          .and('contain', '29m')
          .and('contain', '27/03/21 - 09:00:01')
          .and('contain', '27/03/21 - 11:20:42');
      });

      it('Reset Filter', () => {
        cy.get('span[class="ant-table-filter-trigger-container"]', timeout)
          .eq(1)
          .click();
        cy.get('button[class="ant-btn ant-btn-link ant-btn-sm"]', timeout)
          .eq(1)
          .click();
        cy.get('tr[data-row-key="0"]', timeout)
          .children()
          .should('contain', 'Reason 1', timeout)
          .and('contain', 'Reason Group 1')
          .and('contain', 'Packaging 1')
          .and('contain', 'Packaging')
          .and('contain', '7h 59m 59s')
          .and('contain', '31/03/21 - 23:00:00')
          .and('contain', '01/04/21 - 06:59:59');

        cy.get('tr[data-row-key="1"]', timeout)
          .children()
          .should('contain', 'Reason 2', timeout)
          .and('contain', 'Reason Group 2')
          .and('contain', 'Packaging 2')
          .and('contain', 'Packaging')
          .and('contain', '20m 41s')
          .and('contain', '26/03/21 - 07:00:01')
          .and('contain', '26/03/21 - 07:20:42');

        cy.get('tr[data-row-key="2"]', timeout)
          .children()
          .should('contain', 'Reason 3', timeout)
          .and('contain', 'Reason Group 2')
          .and('contain', 'Packaging 2')
          .and('contain', 'Packaging')
          .and('contain', '29m')
          .and('contain', '27/03/21 - 09:00:01')
          .and('contain', '27/03/21 - 11:20:42');
      });
    });

    describe('Sorting by Durasi', () => {
      it('Ascending', () => {
        cy.get('span[class="ant-table-column-sorter-inner"]', timeout)
          .eq(1)
          .click();
        cy.get('tr[data-row-key="1"]', timeout)
          .contains('20m 41s')
          .should('be.visible');
        cy.get('tr[data-row-key="2"]', timeout)
          .contains('29m')
          .should('be.visible');
        cy.get('tr[data-row-key="0"]', timeout)
          .contains('7h 59m 59s')
          .should('be.visible');
      });

      it('Descending', () => {
        cy.get('span[class="ant-table-column-sorter-inner"]', timeout)
          .eq(1)
          .click();
        cy.get('tr[data-row-key="0"]', timeout)
          .contains('7h 59m 59s')
          .should('be.visible');
        cy.get('tr[data-row-key="2"]', timeout)
          .contains('29m')
          .should('be.visible');
        cy.get('tr[data-row-key="1"]', timeout)
          .contains('20m 41s')
          .should('be.visible');
      });

      it('Cancel Sort', () => {
        cy.get('span[class="ant-table-column-sorter-inner"]', timeout)
          .eq(1)
          .click();
        cy.get('tr[data-row-key="0"]', timeout)
          .contains('7h 59m 59s')
          .should('be.visible');
        cy.get('tr[data-row-key="1"]', timeout)
          .contains('20m 41s')
          .should('be.visible');
        cy.get('tr[data-row-key="2"]', timeout)
          .contains('29m')
          .should('be.visible');
      });
    });

    describe('Sorting by Waktu Mulai', () => {
      it('Ascending', () => {
        cy.get('span[class="ant-table-column-sorter-inner"]', timeout)
          .eq(2)
          .click();
        cy.get('tr[data-row-key="1"]', timeout)
          .contains('26/03/21 - 07:00:01')
          .should('be.visible');
        cy.get('tr[data-row-key="2"]', timeout)
          .contains('27/03/21 - 09:00:01')
          .should('be.visible');
        cy.get('tr[data-row-key="0"]', timeout)
          .contains('31/03/21 - 23:00:00')
          .should('be.visible');
      });

      it('Descending', () => {
        cy.get('span[class="ant-table-column-sorter-inner"]', timeout)
          .eq(2)
          .click();
        cy.get('tr[data-row-key="0"]', timeout)
          .contains('31/03/21 - 23:00:00')
          .should('be.visible');
        cy.get('tr[data-row-key="2"]', timeout)
          .contains('27/03/21 - 09:00:01')
          .should('be.visible');
        cy.get('tr[data-row-key="1"]', timeout)
          .contains('26/03/21 - 07:00:01')
          .should('be.visible');
      });

      it('Cancel Sort', () => {
        cy.get('span[class="ant-table-column-sorter-inner"]', timeout)
          .eq(2)
          .click();
        cy.get('tr[data-row-key="0"]', timeout)
          .contains('31/03/21 - 23:00:00')
          .should('be.visible');
        cy.get('tr[data-row-key="1"]', timeout)
          .contains('26/03/21 - 07:00:01')
          .should('be.visible');
        cy.get('tr[data-row-key="2"]', timeout)
          .contains('27/03/21 - 09:00:01')
          .should('be.visible');
      });
    });

    describe('Sorting by Waktu Selesai', () => {
      it('Ascending', () => {
        cy.get('span[class="ant-table-column-sorter-inner"]', timeout)
          .eq(3)
          .click();
        cy.get('tr[data-row-key="1"]', timeout)
          .contains('26/03/21 - 07:20:42')
          .should('be.visible');
        cy.get('tr[data-row-key="2"]', timeout)
          .contains('27/03/21 - 11:20:42')
          .should('be.visible');
        cy.get('tr[data-row-key="0"]', timeout)
          .contains('01/04/21 - 06:59:59')
          .should('be.visible');
      });

      it('Descending', () => {
        cy.get('span[class="ant-table-column-sorter-inner"]', timeout)
          .eq(3)
          .click();
        cy.get('tr[data-row-key="0"]', timeout)
          .contains('01/04/21 - 06:59:59')
          .should('be.visible');
        cy.get('tr[data-row-key="2"]', timeout)
          .contains('27/03/21 - 11:20:42')
          .should('be.visible');
        cy.get('tr[data-row-key="1"]', timeout)
          .contains('26/03/21 - 07:20:42')
          .should('be.visible');
      });

      it('Cancel Sort', () => {
        cy.get(
          'span[class="anticon anticon-caret-up ant-table-column-sorter-up"]',
          timeout,
        )
          .eq(3)
          .click();
        cy.get('tr[data-row-key="0"]', timeout)
          .contains('01/04/21 - 06:59:59')
          .should('be.visible');
        cy.get('tr[data-row-key="1"]', timeout)
          .contains('26/03/21 - 07:20:42')
          .should('be.visible');
        cy.get('tr[data-row-key="2"]', timeout)
          .contains('27/03/21 - 11:20:42')
          .should('be.visible');
      });
    });
  });

  describe('Filter Date', () => {
    it('Filter by Days', () => {
      cy.intercept('34.87.144.83:3009/production_lines/pareto/downtime', {
        fixture: '/production_lines/downtime-null.json',
      }).as('downtime');

      // Hari ini
      cy.get(
        'div[class="CustomPopup__Container-tuxi8-0 kVMyTz"]',
        timeout,
      ).click();
      cy.contains('Hari ini', timeout).click();
      cy.contains('Tidak ada data Downtime', timeout).should('be.visible');

      // 7 Hari terakhir
      cy.get(
        'div[class="CustomPopup__Container-tuxi8-0 kVMyTz"]',
        timeout,
      ).click();
      cy.contains('7 hari terakhir', timeout).click();
      cy.contains('Tidak ada data Downtime', timeout).should('be.visible');
    });

    it('Filter by Date', () => {
      cy.intercept(
        'http://34.87.144.83:3009/production_lines/pareto/downtime?start_date=2021-03-01&end_date=2021-03-31&production_line_id=PL-101&timezone=Asia/Jakarta',
        {
          fixture: '/production_lines/downtime>1.json',
        },
      ).as('downtime');

      cy.get('button[class="button"]', timeout)
        .contains('7 hari terakhir', timeout)
        .click();
      cy.get('input[placeholder="Tanggal Mulai"]', timeout).click();
      cy.get('button[class="ant-picker-month-btn"]', timeout)
        .eq(0)
        .click();
      cy.contains('Mar', timeout).click();
      cy.get('td[title="2021-03-01"]', timeout).click();
      cy.get('td[title="2021-03-31"]', timeout)
        .eq(0)
        .click();
      cy.contains('OK', timeout).click();
      cy.contains('01-03-2021 - 31-03-2021', timeout).should('be.visible');
      cy.contains('Total Downtime', timeout).should('be.visible');
      cy.contains('Total Durasi Downtime', timeout).should('be.visible');
      cy.contains('frekuensi', timeout).should('be.visible');
      cy.contains('persentase', timeout).should('be.visible');
    });
  });

  describe('Download Data', () => {
    it('Download as JPG', () => {
      cy.get(':nth-child(3) > .ant-dropdown-trigger > svg', timeout).click();
      cy.contains('Unduh sebagai JPG', timeout).click(force);
    });

    it('Download as PDF', () => {
      cy.get(':nth-child(3) > .ant-dropdown-trigger > svg', timeout).click();
      cy.contains('Unduh sebagai PDF', timeout).click(force);
    });
  });
});
