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
    cy.get('input[id="line_machine"]', timeout).type('baking');
    cy.get(':nth-child(9) > .ant-select-tree-node-content-wrapper', timeout).click();
    cy.get('button[class="ant-btn ant-btn-default ant-btn-lg input date"]', timeout).click();
    cy.get('button[class="Picker__Option-sc-1xytywo-4 bzjWVz"]', timeout).eq(4).click({force:true});
    cy.contains('Per Hari', timeout).click();
    cy.get('input[id="interval"]', timeout).click();
    cy.contains('30 Menit', timeout).click();
    cy.contains('Kumulatif', timeout).click();
    cy.contains('Tambahkan Daftar Mesin dari Line / Lini yang dipilih', timeout).click();
    cy.contains('Generate', timeout).click();

    // Report
    cy.get('div[class="ant-table-content"]', timeout).should('be.visible');
    cy.contains('0 %', timeout).should('be.visible');
    cy.get('.ant-card-head > .ant-tabs > .ant-tabs-nav > .ant-tabs-nav-wrap > .ant-tabs-nav-list > .ant-tabs-tab', timeout)
      .contains('Baking');
    cy.get(':nth-child(1) > .oeeForm__StyledLabel-sc-1jaqo7i-0', timeout)
      .contains('OEE');
    cy.get(':nth-child(1) > .oeeForm__StyledLabel-sc-1jaqo7i-0', timeout)
      .contains('(07:00:00 - 06:59:59) - Per Hari - 30 Menit - Kumulatif');
    cy.get(':nth-child(1) > .ant-table-wrapper > .ant-spin-nested-loading > .ant-spin-container > [data-testid=table-report-oee] > .ant-table-container > .ant-table-content > table > .ant-table-tbody > :nth-child(1) > :nth-child(2)', timeout)
      .contains('Baking');
    cy.contains('Availability', timeout).should('be.visible');
    cy.contains('Performance', timeout).should('be.visible');
    cy.contains('Quality', timeout).should('be.visible');
    cy.contains('Utilitsasi', timeout).should('be.visible');
    cy.contains('TEEP', timeout).should('be.visible');
    cy.contains('Download', timeout).click({ force: true });
    cy.server().should((server) => {
      expect(server.status).to.eq(200);
    });

    // Shiftly
    cy.get('[data-testid=asset-picker] > .ant-select-selector', timeout).click();
    cy.contains('Baking', timeout).click();
    cy.get(':nth-child(9) > .ant-select-tree-node-content-wrapper', timeout).click({force:true});
    cy.get('button[class="ant-btn ant-btn-default ant-btn-lg input date"]', timeout).click();
    cy.get('button[class="Picker__Option-sc-1xytywo-4 bzjWVz"]', timeout).eq(4).click({force:true});
    cy.get('[data-testid="Per Shift-oee"]', timeout).click();
    cy.contains('Shift Pagi', timeout).should('be.visible');
    cy.contains('Shift Pagi Pendek', timeout).should('be.visible');
    cy.contains('Shift Siang', timeout).should('be.visible');
    cy.contains('Shift Siang Pendek', timeout).should('be.visible');
    cy.contains('Shift Malam', timeout).should('be.visible');
    cy.contains('Shift Malam Pendek', timeout).should('be.visible');
    cy.contains('Shift Sore Pendek', timeout).should('be.visible');
    cy.contains('Shift Pagi Pendek', timeout).should('be.visible');
    cy.contains('Semua Shift', timeout).click();
    cy.contains('Generate', timeout).click();
  });

  it('LOSSES', () => {
    cy.contains('LOSSES', timeout).click();
    cy.get('input[id="losses_type"]', timeout).click();
    cy.contains('Availability losses', timeout).click();
    cy.get(':nth-child(2) > [data-testid=asset-picker] > .ant-select-selector > .ant-select-selection-search > #line_machine', timeout)
      .type('baking');
    cy.get(':nth-child(7) > .ant-select-tree-node-content-wrapper', timeout).click();
    cy.get('button[class="ant-btn ant-btn-default ant-btn-lg input date"]', timeout).eq(1).click();
    cy.get('button[class="Picker__Option-sc-1xytywo-4 bzjWVz"]', timeout).eq(4).click({force:true});

    // cy.log('Per Hari');
    // cy.contains('Per Hari', timeout).click({force:true});
    // cy.contains('Generate', timeout).click({force:true});
    // cy.intercept('GET', '/datashifts').as('get');
    // cy.get('@get').should('have.property', 'status', 200);
  });

  it('SKU', () => {
    cy.contains('SKU', timeout).click();

    // Daily
    cy.get('input[id="asset"]', timeout).type('packaging');
    cy.contains('Packaging 1', timeout).click();
    cy.get('#rc-tabs-0-panel-sku > .styled__Container-sc-1d7y6lo-0 > .ant-form > :nth-child(2) > .CustomPopup__Container-tuxi8-0 > [data-testid=date-root]', timeout)
      .click();
    cy.get('#input_date_date', timeout).click();
    cy.get('[title="2022-02-01"]', timeout).eq(0).click();
    cy.get(':nth-child(3) > input', timeout).click();
    cy.get('[title="2022-02-08"]', timeout).eq(0).click();
    cy.get('.Picker__Button-sc-1xytywo-6', timeout).click();
    cy.contains('Per Hari', timeout).click({force:true});
    cy.get('[data-testid=submit-btn-sku]', timeout).eq(0).click({force:true});
    cy.contains('Download', timeout).should('be.visible');
    cy.server().should((server) => {
      expect(server.status).to.eq(200);
    });

    // Shiftly
    cy.get('[data-testid="Per Shift-sku"]', timeout).click({force:true})
    cy.contains('Shift Pagi', timeout).should('be.visible');
    cy.contains('Shift Pagi Pendek', timeout).should('be.visible');
    cy.contains('Shift Siang', timeout).should('be.visible');
    cy.contains('Shift Siang Pendek', timeout).should('be.visible');
    cy.contains('Shift Malam', timeout).should('be.visible');
    cy.contains('Shift Malam Pendek', timeout).should('be.visible');
    cy.contains('Shift Sore Pendek', timeout).should('be.visible');
    cy.contains('Shift Pagi Pendek', timeout).click();
    cy.get('[data-testid=submit-btn-sku]', timeout).eq(0).click({force:true});
    cy.contains('Download', timeout).should('be.visible');
    cy.server().should((server) => {
      expect(server.status).to.eq(200);
    });

    // Report
    cy.get('div[class="ant-table-content"]', timeout).should('be.visible');
    cy.get('.ant-card-head-title', timeout).contains('SKU - 01-02-2022 - 08-02-2022');
    cy.get('[data-row-key="2022-02-01 07:00:00 +0700"] > :nth-child(1)', timeout).contains('Packaging 1');
    cy.get('[data-row-key="2022-02-01 07:00:00 +0700"] > :nth-child(2)', timeout).contains('2022-02-01 07:00:00 +0700');
    cy.get('[data-row-key="2022-02-01 07:00:00 +0700"] > :nth-child(3)', timeout).contains('2022-02-01 11:59:59 +0700');
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
      cy.contains('Shift Pagi', timeout).should('be.visible');
      cy.contains('Shift Pagi Pendek', timeout).should('be.visible');
      cy.contains('Shift Siang', timeout).should('be.visible');
      cy.contains('Shift Siang Pendek', timeout).should('be.visible');
      cy.contains('Shift Malam', timeout).should('be.visible');
      cy.contains('Shift Malam Pendek', timeout).should('be.visible');
      cy.contains('Shift Sore Pendek', timeout).should('be.visible');
      cy.contains('Shift Pagi Pendek', timeout).click();
      cy.get(':nth-child(1) > .ant-radio > .ant-radio-inner', timeout).click({force:true});
      cy.get('[data-testid=submit-btn]', timeout).click();
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
    cy.get(':nth-child(4) > .container-action > .ant-row > .ant-col > .ant-form-item-control-input > .ant-form-item-control-input-content > .Button__BaseButton-lb9z7q-0', timeout)
      .click();
    cy.contains('tidak ada data report', timeout).should('be.visible');
    // cy.contains('Chat - 30 Hari terakhir', timeout).should('be.visible');
    // cy.contains('Sending Time', timeout).should('be.visible');
    // cy.contains('Chat Room Name', timeout).should('be.visible');
    // cy.contains('Sender Name', timeout).should('be.visible');
    // cy.contains('Message', timeout).should('be.visible');

    cy.log('Per Shift');
    cy.get('#chat_report_form > :nth-child(3) > .ant-row > :nth-child(2) > .Button__BaseButton-lb9z7q-0', timeout)
      .click({force:true});
    cy.get('.ant-radio-group > :nth-child(1) > :nth-child(2)', timeout).contains('Shift Pagi');
    cy.get('.ant-radio-group > :nth-child(2) > :nth-child(2)', timeout).contains('Shift Siang');
    cy.get('.ant-radio-group > :nth-child(3)', timeout).contains('Shift Malam');
    cy.get('.ant-radio-group > :nth-child(4) > :nth-child(2)', timeout).contains('Shift Malam Pendek');
    cy.get('.ant-radio-group > :nth-child(5) > :nth-child(2)', timeout).contains('Shift Pagi Pendek');
    cy.get('.ant-radio-group > :nth-child(6) > :nth-child(2)', timeout).contains('Shift Siang Pendek');
    cy.get('.ant-radio-group > :nth-child(7)', timeout).contains('Shift Sore Pendek');
    cy.get('.ant-radio-group > :nth-child(5) > :nth-child(2)', timeout).click();
    cy.get(':nth-child(5) > .container-action > .ant-row > .ant-col > .ant-form-item-control-input > .ant-form-item-control-input-content > .Button__BaseButton-lb9z7q-0', timeout)
      .click({force:true})
    cy.contains('tidak ada data report', timeout).should('be.visible');
    // cy.contains('Chat - 30 Hari terakhir', timeout).should('be.visible');
    // cy.contains('Sending Time', timeout).should('be.visible');
    // cy.contains('Chat Room Name', timeout).should('be.visible');
    // cy.contains('Sender Name', timeout).should('be.visible');
    // cy.contains('Message', timeout).should('be.visible');
  });
});





