/* eslint-disable */
/// <reference types="cypress" />

const timeout = { timeout: 60000 };

describe('Report', () => {
  before(() => {
    cy.mockUserDirektur();
    cy.login('direktur');
    cy.get('[title="Report"] > a', timeout).click();
  });

  it('CHECK TAB REPORT', () => {
    cy.contains('OEE', timeout).should('be.visible');
    cy.contains('DOWNTIME', timeout).should('be.visible');
    cy.contains('SKU', timeout).should('be.visible');
    cy.contains('SPEED', timeout).should('be.visible');
    cy.contains('CHAT', timeout).should('be.visible');
    cy.contains('PARAMETER', timeout).should('be.visible');
  });

  it('OEE', () => {
    // Daily
    cy.get('input[id="oee_report_form_line_machine"]', timeout).click();
    cy.contains('Packaging 1', timeout).click();

    cy.get('input[id="oee_report_form_start_date"]', timeout).click();
    cy.get('button[class="ant-picker-month-btn"]', timeout).click();
    cy.contains('Mar', timeout).click();
    cy.get('td[title="2021-03-01"]', timeout).click();
    cy.get('input[id="oee_report_form_end_date"]', timeout).click();
    cy.get('button[class="ant-picker-month-btn"]', timeout).eq(1).click();
    cy.get('div[class="ant-picker-cell-inner"]', timeout).contains('Mar').click();
    cy.get('td[title="2021-03-29"]', timeout).eq(1).click();
    cy.contains('Daily', timeout).click();
    cy.contains('Generate', timeout).click();

    // Report
    cy.contains('OEE History', timeout).should('be.visible');
    cy.get('path[class="ant-progress-circle-trail"]', timeout).should('be.visible');
    cy.contains('37.11 %', timeout).should('be.visible');
    cy.get('div[class="param"]', timeout).should('be.visible');
    cy.get('path[class="ant-progress-circle-path"]', timeout).should('be.visible');
    cy.contains('AVAILABILITY', timeout).should('be.visible');
    cy.contains('PERFORMANCE', timeout).should('be.visible');
    cy.contains('QUALITY', timeout).should('be.visible');
    cy.contains('REALISASI', timeout).should('be.visible');
    cy.contains('TARGET', timeout).should('be.visible');
    cy.contains('Download', timeout).should('be.visible');
    cy.server().should((server) => {
      expect(server.status).to.eq(200);
    });

    // Shiftly
    cy.get('input[id="oee_report_form_line_machine"]', timeout).click();
    cy.contains('Packaging 1', timeout).click();

    cy.get('input[id="oee_report_form_start_date"]', timeout).click();
    cy.get('button[class="ant-picker-month-btn"]', timeout).click();
    cy.contains('Mar', timeout).click();
    cy.get('td[title="2021-03-01"]', timeout).click();
    cy.get('input[id="oee_report_form_end_date"]', timeout).click();
    cy.get('button[class="ant-picker-month-btn"]', timeout).eq(1).click();
    cy.get('div[class="ant-picker-cell-inner"]', timeout).contains('Mar').click();
    cy.get('td[title="2021-03-29"]', timeout).eq(1).click();

    cy.contains('Shiftly', timeout).click();
    cy.contains('Semua Shift', timeout).click();
    cy.contains('Generate', timeout).click();

    // Report
    cy.contains('OEE History', timeout).should('be.visible');
    cy.get('path[class="ant-progress-circle-trail"]', timeout).should('be.visible');
    cy.contains('45.37 %', timeout).should('be.visible');
    cy.get('div[class="param"]', timeout).should('be.visible');
    cy.get('path[class="ant-progress-circle-path"]', timeout).should('be.visible');
    cy.contains('AVAILABILITY', timeout).should('be.visible');
    cy.contains('PERFORMANCE', timeout).should('be.visible');
    cy.contains('QUALITY', timeout).should('be.visible');
    cy.contains('REALISASI', timeout).should('be.visible');
    cy.contains('TARGET', timeout).should('be.visible');
    cy.contains('Download', timeout).should('be.visible');
    cy.server().should((server) => {
      expect(server.status).to.eq(200);
    });
  });

  it('DOWNTIME', () => {
    cy.contains('DOWNTIME', timeout).click();

    // Daily
    cy.get('input[id="downtime_report_form_line_machine"]', timeout).click();
    cy.contains('Packaging 1', timeout).click();

    cy.get('#downtime_report_form_start_date', timeout).click();
    cy.get('button[class="ant-picker-month-btn"]', timeout).click();
    cy.contains('Mar', timeout).click();
    cy.get('td[title="2021-03-01"]', timeout).click();
    cy.get('#downtime_report_form_end_date', timeout).click();
    cy.get('button[class="ant-picker-month-btn"]', timeout).eq(1).click();
    cy.get('div[class="ant-picker-cell-inner"]', timeout).contains('Mar').click();
    cy.get('td[title="2021-03-29"]', timeout).eq(1).click();
    cy.contains('Daily', timeout).click();
    cy.contains('Generate', timeout).click();

    // Report
    cy.contains('Machine Name', { timeout: 150000 }).should('be.visible');
    cy.contains('Losses Group', { timeout: 150000 }).should('be.visible');
    cy.contains('Losses Name', { timeout: 1500000 }).should('be.visible');
    cy.contains('Start Time', { timeout: 1500000 }).should('be.visible');
    cy.contains('End Time', { timeout: 150000 }).should('be.visible');
    cy.contains('Duration', { timeout: 150000 }).should('be.visible');
    cy.server().should((server) => {
      expect(server.status).to.eq(200);
    });

    // Shiftly
    cy.get('#rc-tabs-1-tab-oee', timeout).click();
    cy.contains('DOWNTIME', timeout).click();
    cy.get('#downtime_report_form_line_machine', timeout).click();
    cy.get('span[class="ant-select-tree-title"]', timeout).contains('Packaging 1').click();

    cy.get('#downtime_report_form_start_date', timeout).click();
    cy.get('button[class="ant-picker-month-btn"]', timeout).click();
    cy.contains('Mar', timeout).click();
    cy.get('td[title="2021-03-01"]', timeout).click();
    cy.get('#downtime_report_form_end_date', timeout).click();
    cy.get('button[class="ant-picker-month-btn"]', timeout).eq(1).click();
    cy.get('div[class="ant-picker-cell-inner"]', timeout).contains('Mar').click();
    cy.get('td[title="2021-03-29"]', timeout).eq(1).click();

    cy.contains('Shiftly', timeout).click();
    cy.contains('Semua Shift', timeout).click();
    cy.contains('Generate', timeout).click();

    // Report
    cy.contains('Machine Name', { timeout: 150000 }).should('be.visible');
    cy.contains('Losses Group', { timeout: 150000 }).should('be.visible');
    cy.contains('Losses Name', { timeout: 1500000 }).should('be.visible');
    cy.contains('Start Time', { timeout: 1500000 }).should('be.visible');
    cy.contains('End Time', { timeout: 150000 }).should('be.visible');
    cy.contains('Duration', { timeout: 150000 }).should('be.visible');
    cy.server().should((server) => {
      expect(server.status).to.eq(200);
    });
  });

  it('SKU', () => {
    cy.contains('SKU', timeout).click();

    // Daily
    cy.get('input[id="runtime_form_line_machine"]', timeout).click();
    cy.contains('Packaging 1', timeout).click();

    cy.get('input[id="runtime_form_start_date"]', timeout).click();
    cy.get('button[class="ant-picker-month-btn"]', timeout).click();
    cy.contains('Mar', timeout).click();
    cy.get('td[title="2021-03-01"]', timeout).click();
    cy.get('input[id="runtime_form_end_date"]', timeout).click();
    cy.get('button[class="ant-picker-month-btn"]', timeout).eq(1).click();
    cy.get('div[class="ant-picker-cell-inner"]', timeout).contains('Mar').click();
    cy.get('td[title="2021-03-29"]', timeout).eq(1).click();

    cy.contains('Daily', timeout).click();
    cy.contains('Download', timeout).should('be.visible');
    cy.server().should((server) => {
      expect(server.status).to.eq(200);
    });

    // Shiftly
    cy.get('span[class="ant-select-selection-item"]', timeout).click();
    cy.contains('Packaging 1', timeout).click();

    cy.get('input[id="runtime_form_start_date"]', timeout).click();
    cy.get('button[class="ant-picker-month-btn"]', timeout).eq(0).click();
    cy.contains('Mar', timeout).click();
    cy.get('td[title="2021-03-01"]', timeout).eq(0).click();
    cy.get('input[id="runtime_form_end_date"]', timeout).click();
    cy.get('button[class="ant-picker-month-btn"]', timeout).eq(1).click();
    cy.get('div[class="ant-picker-cell-inner"]', timeout).contains('Mar').click();
    cy.get('td[title="2021-03-29"]', timeout).eq(1).click();

    cy.contains('Daily', timeout).click();
    cy.contains('Download', timeout).should('be.visible');
    cy.server().should((server) => {
      expect(server.status).to.eq(200);
    });
  });

  it('SPEED', () => {
    cy.contains('SPEED', timeout).click();

    // Daily
    cy.get('.ant-select-selection-item', timeout).click();
    cy.contains('Packaging 1', timeout).click();

    cy.get('#speed_form_start_date', timeout).click();
    cy.get('button[class="ant-picker-month-btn"]', timeout).eq(0).click();
    cy.contains('Mar', timeout).click();
    cy.get('td[title="2021-03-01"]', timeout).eq(0).click();
    cy.get('#speed_form_end_date', timeout).click();
    cy.get('button[class="ant-picker-month-btn"]', timeout).eq(1).click();
    cy.get('div[class="ant-picker-cell-inner"]', timeout).contains('Mar').click();
    cy.get('td[title="2021-03-29"]', timeout).eq(1).click();

    cy.contains('Daily', timeout).click();
    cy.contains('Download', timeout).should('be.visible');
    cy.server().should((server) => {
      expect(server.status).to.eq(200);
    });
  });

  it('CHAT', () => {
    cy.mockUserDirektur();
    cy.login('direktur');
    cy.get('[title="Report"] > a', timeout).click();
    cy.contains('CHAT', timeout).click();
    cy.get('input[id="chat_report_form_room_id"]', timeout).click();
    cy.contains('Public', timeout).click();

    cy.get('input[id="chat_report_form_start_date"]', timeout).click();
    cy.get('button[class="ant-picker-month-btn"]', timeout).eq(0).click();
    cy.contains('Mar', timeout).click();
    cy.get('td[title="2021-03-01"]', timeout).eq(0).click();
    cy.contains('Ok', timeout).click();
    cy.get('input[id="chat_report_form_end_date"]', timeout).click();
    cy.get('button[class="ant-picker-month-btn"]', timeout).eq(1).click();
    cy.get('div[class="ant-picker-cell-inner"]', timeout).contains('Mar').click();
    cy.get('td[title="2021-03-29"]', timeout).eq(1).click();
    cy.get('li[class="ant-picker-ok"]', timeout).eq(1).click();
    cy.contains('Generate', timeout).click();

    // Report
    cy.contains('tidak ada data report chat', timeout).should('be.visible');
    cy.server().should((server) => {
      expect(server.status).to.eq(200);
    });
  });

  it('PARAMETER', () => {
    cy.mockResponse();
    cy.contains('PARAMETER', timeout).click();
    cy.get('input[id="parameter_device_id"]', timeout).click();
    cy.contains('Suhu Aktual Zona 1', timeout).click();

    cy.get('input[placeHolder="Start Date"]', timeout).click();
    cy.get('button[class="ant-picker-month-btn"]', timeout).eq(0).click();
    cy.contains('Mar', timeout).click();
    cy.get('td[title="2021-03-01"]', timeout).eq(0).click();
    cy.get('input[placeHolder="Start Date"]', timeout).click();
    cy.get('button[class="ant-picker-month-btn"]', timeout).eq(1).click();
    cy.get('div[class="ant-picker-cell-inner"]', timeout).contains('Mar').click();
    cy.get('td[title="2021-03-29"]', timeout).eq(0).click();
    cy.get('div[class="ant-picker-cell-inner"]').contains('29').click();

    cy.contains('Daily', timeout).click();
    cy.contains('Generate', timeout).should('be.visible');
  });
});
