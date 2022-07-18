/// <reference types="cypress" />
const timeout = { timeout: 60000 };
const force = { force: true };

describe('Dashboard', () => {
  before(() => {
    cy.login('operator');
  });

  beforeEach(() => {
    cy.visit('/');
  });

  describe('Home', () => {
    it('Select Product', () => {
      cy.get(':nth-child(1) > .ant-row > .ant-col > .ant-card > .ant-card-body', timeout)
        .click();
      cy.contains('Success', timeout).should('be.visible');
    });

    it('Sorting Product', () => {
      cy.get(':nth-child(3) > .ant-row > :nth-child(1) > .ant-card > .ant-card-body', timeout)
        .contains('Gery 30 gr');
      cy.get(':nth-child(2) > .ant-card > .ant-card-body', timeout).contains('JGRJU 20 Vino Nut');
      cy.get(':nth-child(3) > .ant-card > .ant-card-body', timeout).contains('JGRLS 4');
      cy.get(':nth-child(4) > .ant-card > .ant-card-body', timeout).contains('JGRLS 8 Abadi');
    });

    it('Ganti Runtime', () => {
      cy.get('div[class="ant-card ant-card-bordered product-card"]').eq(1).click();
      cy.get('.alert-label').contains('Ingin Mengubah SKU?').should('be.visible');
      cy.get('.alert-label-default').contains('Mengganti Runtime akan menyimpan Runtime yang sedang berjalan.').should('be.visible');
    });
  });

  describe('Dashboard', () => {
    beforeEach(() => {
      cy.visit('/');
      cy.get(':nth-child(1) > .ant-row > .ant-col > .ant-card > .ant-card-body', timeout)
        .click();
    });

    describe('Manual Downtime', () => {
      it('Validasi Input', () => {
        cy.wait(5000);
        cy.contains('Tambah Downtime', timeout).click({ force: true });
        cy.get('[data-testid=submit-manual-downtime]', timeout).click();
        cy.get(':nth-child(3) > .ant-col > .ant-form-item-explain > div', timeout)
          .contains('Reason Category is required!');
        cy.get('[style="margin-bottom: 15px; row-gap: 0px;"] > .ant-col > .ant-form-item-explain > .ant-form-item-explain-error', timeout)
          .contains('Reason is required!');
      });

      it('Input Waktu yang Sama', () => {
        cy.get(':nth-child(1) > .ant-row > .ant-col > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-picker', timeout)
          .click();
        cy.wait(3000);
        cy.get(':nth-child(1) > :nth-child(1) > .ant-picker-time-panel-cell-inner', timeout)
          .click();
        cy.get(':nth-child(2) > :nth-child(1) > .ant-picker-time-panel-cell-inner', timeout)
          .click();
        cy.get('.ant-picker-ok > .ant-btn', timeout).click();
        cy.get(':nth-child(2) > .ant-row > .ant-col > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-picker', timeout)
          .click();
        cy.get(':nth-child(1) > :nth-child(1) > .ant-picker-time-panel-cell-inner', timeout)
          .eq(1).click();
        cy.get(':nth-child(2) > :nth-child(1) > .ant-picker-time-panel-cell-inner', timeout)
          .eq(1).click();
        cy.get('.ant-picker-ok > .ant-btn', timeout).eq(1).click();
        cy.get('[data-testid=select-reason-category] > .ant-select-selector', timeout)
          .click();
        cy.get('[title="Start-up loss & other downtime"] > .ant-select-item-option-content', timeout)
          .click();
        cy.wait(1000);
        cy.get('[data-testid=select-reason] > .ant-select-selector > .ant-select-selection-item', timeout).type('ga');
        cy.contains('gas', timeout).click({ force: true });
        cy.get('[data-testid=submit-manual-downtime]', timeout).click();
        cy.contains('Please check your parameter', timeout).should('be.visible');
      });

      it('Input Jadwal yang Bersamaan', () => {
        cy.wait(3000);
        cy.contains('Tambah Downtime', timeout).click({ force: true });
        cy.get(':nth-child(1) > .ant-row > .ant-col > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-picker', timeout)
          .click();
        cy.get(':nth-child(1) > :nth-child(1) > .ant-picker-time-panel-cell-inner', timeout)
          .click();
        cy.get(':nth-child(2) > :nth-child(1) > .ant-picker-time-panel-cell-inner', timeout)
          .click();
        cy.get('.ant-picker-ok > .ant-btn', timeout).click();
        cy.get(':nth-child(2) > .ant-row > .ant-col > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-picker', timeout)
          .click();
        cy.get(':nth-child(1) > :nth-child(2 ) > .ant-picker-time-panel-cell-inner', timeout)
          .eq(1).click();
        cy.get(':nth-child(2) > :nth-child(1) > .ant-picker-time-panel-cell-inner', timeout)
          .eq(1).click();
        cy.get('.ant-picker-ok > .ant-btn', timeout).eq(1).click();
        cy.get('[data-testid=select-reason-category] > .ant-select-selector', timeout)
          .click();
        cy.get('[title="Start-up loss & other downtime"] > .ant-select-item-option-content', timeout)
          .click();
        cy.wait(1000);
        cy.get('[data-testid=select-reason] > .ant-select-selector > .ant-select-selection-item', timeout).type('ga');
        cy.contains('gas', timeout).click({ force: true });
        cy.get('[data-testid=submit-manual-downtime]', timeout).click();
        cy.contains('occupied for this machine', timeout).should('be.visible');
      });

      it('Create', () => {
        cy.wait(3000);
        cy.contains('Tambah Downtime', timeout).click({ force: true });
        cy.get(':nth-child(1) > .ant-row > .ant-col > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-picker', timeout)
          .click();
        cy.get(':nth-child(1) > :nth-child(1) > .ant-picker-time-panel-cell-inner', timeout)
          .click();
        cy.get(':nth-child(2) > :nth-child(1) > .ant-picker-time-panel-cell-inner', timeout)
          .click();
        cy.get('.ant-picker-ok > .ant-btn', timeout).click();
        cy.get(':nth-child(2) > .ant-row > .ant-col > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-picker', timeout)
          .click();
        cy.get(':nth-child(1) > :nth-child(1) > .ant-picker-time-panel-cell-inner', timeout)
          .eq(1).click();
        cy.get(':nth-child(2) > :nth-child(2) > .ant-picker-time-panel-cell-inner', timeout)
          .eq(1).click();
        cy.get('.ant-picker-ok > .ant-btn', timeout).eq(1).click();
        cy.get('[data-testid=select-reason-category] > .ant-select-selector', timeout)
          .click();
        cy.get('[title="Start-up loss & other downtime"] > .ant-select-item-option-content', timeout)
          .click();
        cy.wait(1000);
        cy.get('[data-testid=select-reason] > .ant-select-selector > .ant-select-selection-item', timeout).type('ga');
        cy.contains('gas', timeout).click({ force: true });
        cy.get('[data-testid=submit-manual-downtime]', timeout).click();
        cy.contains('Success', timeout).should('be.visible');
      });

      it('Edit Reason', () => {
        cy.get(':nth-child(1) > [style="margin-left: -4px; margin-right: -4px; row-gap: 8px;"] > .ant-col-24 > .ant-card > .ant-card-body', timeout).click();
        cy.get('.indiana-scroll-container > :nth-child(1) > .ant-card-body', timeout).click();
        cy.get('#input_reason_reason', timeout).click();
        cy.get('div[class="ant-select-item-option-content"]', timeout).contains('air pressure drop', timeout).click();
        cy.get('#input_reason_note', timeout).type('Testing');
        cy.get('.ant-form-item-control-input-content > .ant-btn', timeout).click();
      });
    });

    describe('OEE APQ TEEP Utility', () => {
      it('Tampilan', () => {
        cy.get(':nth-child(1) > .ant-row > .ant-col > .ant-progress', timeout).contains('TEEP');
        cy.get(':nth-child(2) > .ant-row > .ant-col > .ant-progress', timeout).contains('UTILITY');
        cy.get('.ant-card-body > .ant-row-space-between', timeout)
          .contains('OEE');
        cy.get(':nth-child(5) > .ant-row > .ant-col > .ant-progress', timeout).contains('AVA');
        cy.get(':nth-child(6) > .ant-row > .ant-col > .ant-progress', timeout).contains('PER');
        cy.get(':nth-child(7) > .ant-row > .ant-col > .ant-progress', timeout).contains('QUA');
      });
      it('Shows bar chart', () => {
        cy.get('.dashboardhmi-layout__hmiview > .ant-card > .ant-card-body').should('be.visible');
        cy.get('[style="background-color: rgb(130, 130, 130); position: absolute; padding: 0px 75px; width: 100%; height: 100%; display: flex; justify-content: space-between; border-bottom-left-radius: 4px; border-bottom-right-radius: 4px;"]', timeout)
          .should('be.visible');
      });
    });

    describe('Machine', () => {
      it('Nilai machine', () => {
        cy.get(':nth-child(1) > .ant-row > .ant-col > .ant-progress').should('exist');
        cy.get(':nth-child(2) > .ant-row > .ant-col > .ant-progress').should('exist');
        cy.get(':nth-child(3) > .ant-row > .ant-col > .ant-progress').should('exist');
        cy.get(':nth-child(5) > .ant-row > .ant-col > .ant-progress').should('exist');
        cy.get(':nth-child(6) > .ant-row > .ant-col > .ant-progress').should('exist');
      });
    });

    describe('SKU', () => {
      it('Nilai SKU', () => {
        cy.get('.ant-space > :nth-child(5) > div').contains('300 pcs/m');
        cy.get('.ant-space > :nth-child(7) > div').contains('0.2 s/pcs');
      });

      it('Tambah Quantity', () => {
        cy.get(':nth-child(5) > .ant-dropdown-trigger').click();
        cy.contains('Tambah Quantity').click();
        cy.get('#reject_total').type('1');
        cy.get('#product_total').type('1');
        cy.get('[data-testid=submit-manual-downtime]').click();
        cy.contains('Success').should('be.visible');
      });

      it('Tambah Reason', () => {
        cy.get('.indiana-scroll-container > :nth-child(1) > .ant-card-body').click();
        cy.get('#input_reason_reason').click();
        cy.get('div[class="ant-select-item-option-content"]').contains('air pressure drop').click();
        cy.get('#input_reason_note').type('Test'); 
        cy.get('.ant-form-item-control-input-content > .ant-btn').click();
        // cy.contains('Success').should('be.visible');
      });
    });

    describe('Issue', () => {
      beforeEach(() => {
        cy.visit('/');
      });

      it('List Issue', () => {
        cy.get(':nth-child(1) > [style="margin-left: -4px; margin-right: -4px; row-gap: 8px;"] > .ant-col-24 > .ant-card > .ant-card-body', timeout).click();
        cy.get(':nth-child(5) > .ant-btn > span', timeout).click();
        cy.get('tr[class="ant-table-row ant-table-row-level-0"]', timeout).should('be.visible');
      });

      it('Sorting by tanggal', () => {
        cy.get(':nth-child(1) > [style="margin-left: -4px; margin-right: -4px; row-gap: 8px;"] > .ant-col-24 > .ant-card > .ant-card-body', timeout).click();
        cy.get(':nth-child(5) > .ant-btn > span', timeout).click();
        cy.get('tr[class="ant-table-row ant-table-row-level-0"]', timeout).should('be.visible');
        cy.get(':nth-child(6) > .ant-table-column-sorters', timeout).click();
      });

      it('Sorting by asset', () => {
        cy.get(':nth-child(1) > [style="margin-left: -4px; margin-right: -4px; row-gap: 8px;"] > .ant-col-24 > .ant-card > .ant-card-body', timeout).click();
        cy.get(':nth-child(5) > .ant-btn > span', timeout).click();
        cy.get('tr[class="ant-table-row ant-table-row-level-0"]', timeout).should('be.visible');
        cy.get(':nth-child(2) > .ant-table-column-sorters', timeout).click();
      });

      it('Ganti SKU', () => {
        cy.get(':nth-child(1) > [style="margin-left: -4px; margin-right: -4px; row-gap: 8px;"] > .ant-col-24 > .ant-card > .ant-card-body', timeout).click();
        cy.get(':nth-child(3) > div > .ant-btn', timeout).click();
        cy.get('div[class="ant-card ant-card-bordered product-card--selected"]', timeout).click();
        cy.get(':nth-child(3) > div > .ant-btn > span', timeout).should('exist');
      });

    });
  });
});
