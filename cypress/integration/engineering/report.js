/* eslint-disable */
/// <reference types="cypress" />

const timeout = { timeout: 60000 };
const force = { force : true };

describe('Report', () => {
  before(() => {
    cy.login('engineering');
  });

  beforeEach(() => {
    cy.visit('/report');
  });

  it('CHECK TAB REPORT', () => {
    cy.contains('OEE', timeout).should('be.visible');
    cy.contains('LOSSES', timeout).should('be.visible');
    cy.contains('SKU', timeout).should('be.visible');
    cy.contains('CHAT', timeout).should('be.visible');
    cy.contains('PARAMETER', timeout).should('be.visible');
  });

  it('OEE', () => {
    // Kumulatif
    cy.get('input[id="line_machine"]', timeout).click();
    cy.contains('Forming 1', timeout).click();
    cy.get('button[class="ant-btn ant-btn-default ant-btn-lg input date"]', timeout).click();
    cy.get('button[class="Picker__Option-sc-1xytywo-4 bzjWVz"]', timeout).eq(4).click();
    cy.contains('Per Hari', timeout).click();
    cy.get('input[id="interval"]', timeout).click();
    cy.contains('30 Menit', timeout).click();
    cy.contains('Kumulatif', timeout).click();
    cy.contains('Tambahkan Daftar Mesin dari Line / Lini yang dipilih', timeout).click();
    cy.contains('Generate', timeout).click();

    // Report
    cy.get('div[class="ant-table-content"]', timeout).should('be.visible');
    cy.get('path[class="ant-progress-circle-trail"]', timeout).should('be.visible');
    cy.contains('37.11 %', timeout).should('be.visible');
    cy.get('div[class="param"]', timeout).should('be.visible');
    cy.get('path[class="ant-progress-circle-path"]', timeout).should('be.visible');
    cy.contains('AVAILABILITY', timeout).should('be.visible');
    cy.contains('PERFORMANCE', timeout).should('be.visible');
    cy.contains('QUALITY', timeout).should('be.visible');
    cy.contains('REALISASI', timeout).should('be.visible');
    cy.contains('TARGET', timeout).should('be.visible');
    cy.contains('Download', timeout).click({ force: true });
    cy.server().should((server) => {
      expect(server.status).to.eq(200);
    });

    // // Shiftly
    // cy.get('input[id="oee_report_form_line_machine"]', timeout).click();
    // cy.contains('Packaging 1', timeout).click();
    // cy.get('input[id="oee_report_form_start_date"]', timeout).click();
    // cy.get('td[title="2021-03-01"]', timeout).click();
    // cy.get('input[id="oee_report_form_end_date"]', timeout).click();
    // cy.get('td[title="2021-03-29"]', timeout).eq(1).click();
    // cy.contains('Shiftly', timeout).click();
    // cy.contains('Semua Shift', timeout).click();
    // cy.contains('Generate', timeout).click();

    // // Report
    // cy.contains('OEE History', timeout).should('be.visible');
    // cy.get('path[class="ant-progress-circle-trail"]', timeout).should('be.visible');
    // cy.contains('45.37 %', timeout).should('be.visible');
    // cy.get('div[class="param"]', timeout).should('be.visible');
    // cy.get('path[class="ant-progress-circle-path"]', timeout).should('be.visible');
    // cy.contains('AVAILABILITY', timeout).should('be.visible');
    // cy.contains('PERFORMANCE', timeout).should('be.visible');
    // cy.contains('QUALITY', timeout).should('be.visible');
    // cy.contains('REALISASI', timeout).should('be.visible');
    // cy.contains('TARGET', timeout).should('be.visible');
    // cy.contains('Download', timeout).click({ force: true });
    // cy.server().should((server) => {
    //   expect(server.status).to.eq(200);
    // });
  });

  it('LOSSES', () => {
    cy.contains('LOSSES', timeout).click();

    cy.get('input[id="losses_type"]', timeout).click();
    cy.contains('Availability losses', timeout).click();
    cy.get('input[id="line_machine"]', timeout).click();
    cy.contains('Forming 1', timeout).click();

    cy.get('button[class="ant-btn ant-btn-default ant-btn-lg input date"]', timeout).click();
    cy.get('button[class="Picker__Option-sc-1xytywo-4 bzjWVz"]', timeout).eq(4).click();

    cy.log('Per Hari');
    cy.contains('Per Hari', timeout).click();
    cy.contains('Genrate', timeout).click();
    cy.intercept('GET', '/shift').as('get');
    cy.get('@get').should('have.property', 'status', 200);

    cy.log('Per Shift');
    cy.contains('Per Shift', timeout).click();
    cy.contains('Semua Shift', timeout).click();
    cy.contains('Genrate', timeout).click();
    cy.intercept('GET', '/shift').as('get');
    cy.get('@get').should('have.property', 'status', 200);
  });

  it('SKU', () => {
    cy.contains('SKU', timeout).click();

    // Daily
    cy.get('input[id="asset"]', timeout).click();
    cy.contains('Availability losses', timeout).click();
    cy.get('input[id="runtime_form_start_date"]', timeout).click();
    cy.get('td[title="2021-03-01"]', timeout).eq(0).click();
    cy.get('input[id="runtime_form_end_date"]', timeout).click();
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
    cy.get('td[title="2021-03-01"]', timeout).eq(0).click();
    cy.get('input[id="runtime_form_end_date"]', timeout).click();
    cy.get('td[title="2021-03-29"]', timeout).eq(1).click();
    cy.contains('Daily', timeout).click();
    cy.contains('Download', timeout).should('be.visible');
    cy.server().should((server) => {
      expect(server.status).to.eq(200);
    });
  });

  describe('PARAMETER', () => {
    beforeEach(() => {
      cy.contains('PARAMETER', timeout).click();
    });

    it('Daily', () => {
      // Daily
      cy.get('input[id="parameter_device_id"]', timeout).click();
      cy.contains('Arus Agitator Ball 1', timeout).click();
      cy.get('#parameter > :nth-child(2) > .CustomPopup__Container-tuxi8-0 > [data-testid=date-root]', timeout).click();
      cy.get('[data-testid=Kemarin] > div', timeout).click(force);
      cy.get('[data-testid=submit-btn]', timeout).click();
      cy.contains('Download', timeout).should('be.visible');
      cy.server().should((server) => {
        expect(server.status).to.eq(200);
      });
      cy.get('.ant-card-body', timeout).should('be.visible');
    });

    it('Shiftly', () => {
      // Shiftly
      cy.get('input[id="parameter_device_id"]', timeout).click();
      cy.contains('Arus Agitator Ball 1', timeout).click();
      cy.get('#parameter > :nth-child(2) > .CustomPopup__Container-tuxi8-0 > [data-testid=date-root]', timeout).click();
      cy.get('[data-testid=Kemarin] > div', timeout).click(force);
      cy.get('[data-testid="Per Shift"]', timeout).click();
      cy.get('[data-testid=shift-1]', timeout).click();
      cy.get('[data-testid=submit-btn]', timeout).click();
      cy.contains('Download', timeout).should('be.visible');
      cy.server().should((server) => {
        expect(server.status).to.eq(200);
      });
      cy.get('.ant-card-body', timeout).should('be.visible');
    });

    it('Per Jam', () => {
      // Perjam
      cy.get('input[id="parameter_device_id"]', timeout).click();
      cy.contains('Arus Agitator Ball 1', timeout).click();
      cy.get('#parameter > :nth-child(2) > .CustomPopup__Container-tuxi8-0 > [data-testid=date-root]', timeout).click();
      cy.get('[data-testid=Kemarin] > div', timeout).click(force);
      cy.get('[data-testid="Per Jam"]', timeout).click();
      cy.get('#parameter_hour', timeout).click();
      cy.get('div[class="ant-picker-time-panel-cell-inner"]', timeout).eq(0).click();
      cy.contains('Ok', timeout).click();
      cy.get('.ant-picker-input-active > input', timeout).click();
      cy.get('div[class="ant-picker-time-panel-cell-inner"]', timeout).eq(0).click();
      cy.contains('Ok', timeout).click();
      cy.get('[data-testid=submit-btn]', timeout).click();
      cy.contains('Download', timeout).should('be.visible');
      cy.server().should((server) => {
        expect(server.status).to.eq(200);
      });
      cy.get('.ant-card-body', timeout).should('be.visible');
    }); 
  });

  it('CHAT', () => {
    cy.contains('CHAT', timeout).click();
    cy.get('input[id="chat_report_form_room_id"]', timeout).click();
    cy.contains('Public', timeout).click();
    cy.get('#chat_report_form > :nth-child(2) > .CustomPopup__Container-tuxi8-0 > [data-testid=date-root]', timeout).click();
    cy.get('button[class="Picker__Option-sc-1xytywo-4 bzjWVz"]', timeout).eq(5).click({ force: true });

    cy.log('Per Hari');
    cy.contains('Per Hari', timeout).click({ force: true });
    cy.contains('Generate', timeout).click();
    cy.contains('Chat - 30 Hari terakhir', timeout).should('be.visible');
    cy.contains('Sending Time', timeout).should('be.visible');
    cy.contains('Chat Room Name', timeout).should('be.visible');
    cy.contains('Sender Name', timeout).should('be.visible');
    cy.contains('Message', timeout).should('be.visible');

    cy.log('Per Shift');
    cy.contains('Per Shift', timeout).click();
    cy.contains('Semua Shift', timeout).click();
    cy.contains('Generate', timeout).click();
    cy.contains('Chat - 30 Hari terakhir', timeout).should('be.visible');
    cy.contains('Sending Time', timeout).should('be.visible');
    cy.contains('Chat Room Name', timeout).should('be.visible');
    cy.contains('Sender Name', timeout).should('be.visible');
    cy.contains('Message', timeout).should('be.visible');
  });
});





