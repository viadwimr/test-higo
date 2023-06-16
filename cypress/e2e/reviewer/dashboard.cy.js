/// <reference types="Cypress" />

var timeout = { timeout: 10000 }
const d = new Date();

describe('Dashboard', () => {
  before(() => {
    cy.login('reviewer');
  });
  
  describe('Melihat halaman utama Dashboard (Realtime)', () => {
    it('Device', () => {
      cy.get('[data-testid="button-sector-filter"]', timeout).click();
      cy.wait(1000);
      cy.contains('Semua Sector', timeout).click();
      cy.wait(1000);
      cy.contains('Semua Device', timeout).click();
      cy.wait(1000);
      cy.contains('Terapkan', timeout).click();
      cy.wait(5000);
      cy.get('#rc-tabs-0-panel-realtime').find('.ant-card-body').then((graphic) => {
        var graphicCount = Cypress.$(graphic).length;
        expect(graphicCount).to.be.equal(369)
      })
      cy.get(':nth-child(2) > .ant-row > :nth-child(3)', timeout).click();
      cy.wait(1000);
      cy.contains('Semua Sector', timeout).click();
      cy.wait(1000);
      cy.contains('Semua Device', timeout).click();
      cy.wait(1000);
      cy.contains('Terapkan', timeout).click();
      cy.wait(5000);
      cy.contains('Arus Agitator Ball 2', timeout).should('be.visible');
      const d = new Date()
      var month = d.getMonth()+1
      var monthLength = month.toString().length
      if (monthLength == 1) {
        month = `0${month}`
      }
      var year = d.getFullYear().toString()
      const today = `${d.getDate()}/${month}/${year.slice(2,4)} - ${d.getHours()}`
      cy.contains(`Last Update`, timeout).should('be.visible');
      cy.contains(`${today}`, timeout).should('be.visible');
      cy.contains('Temperatur', timeout).should('be.visible');
      cy.contains('Kelembaban', timeout).should('be.visible');
      cy.contains('%', timeout).should('be.visible');
      cy.contains('℃', timeout).should('be.visible');
    });

    it('Detail Device', () => {
      cy.get(':nth-child(1) > .ant-card > .ant-card-body', timeout).click();
      cy.wait(5000)
      cy.contains(`Nama Device`, timeout).should('be.visible');
      cy.contains(`Sektor`, timeout).should('be.visible');
      cy.contains(`Lokasi`, timeout).should('be.visible');
      cy.contains('Temperatur', timeout).should('be.visible');
      cy.contains('Kelembaban', timeout).should('be.visible');
      cy.contains('%', timeout).should('be.visible');
      cy.contains('℃', timeout).should('be.visible');
      cy.contains('Tertinggi', timeout).should('be.visible');
      cy.contains('Terendah', timeout).should('be.visible');
      cy.get('#download-Temperatur > [style="margin-left: -10px; margin-right: -10px;"] > .ant-col-md-21', timeout)
        .should('be.visible');
      cy.get('#download-Voltage > [style="margin-left: -10px; margin-right: -10px;"] > .ant-col-md-21 > [style="min-height: 236px;"]', timeout)
        .should('be.visible');
    })
  })

  describe('Melihat halaman utama Dashboard (Overview)', () => {
    it('Sektor', () => {
      cy.contains('Dashboard', timeout).click();
      cy.get('[data-node-key="overview"]', timeout).click();
      cy.wait(5000);
      cy.get('[style="padding-left: 12px; padding-right: 12px; flex: 1 1 auto;"] > .ant-card > .ant-card-body', timeout)
        .should('be.visible');
      cy.get('.apexcharts-legend', timeout).contains('Arus Agitator Ball 2');
      cy.get('[data-testid="sector"] > .ant-select-selector > .ant-select-selection-item', timeout).click();
      cy.wait(1000);
      cy.get('[data-testid="indicator"] > .ant-select-selector > .ant-select-selection-item', timeout).click();
      cy.wait(1000);
      cy.get('[data-testid="interval"] > .ant-select-selector', timeout).click();
      cy.wait(1000);
      // cy.contains('Kelembaban', timeout).should('be.visible');
      // cy.contains('%', timeout).should('be.visible');
      // cy.contains('℃', timeout).should('be.visible');
    });

    it('Indikator', () => {
      cy.get('[data-node-key="overview"]', timeout).click();
      cy.wait(5000);
      cy.get('[style="padding-left: 12px; padding-right: 12px; flex: 1 1 auto;"] > .ant-card > .ant-card-body', timeout)
        .should('be.visible');
      cy.get('.apexcharts-legend', timeout).contains('Arus Agitator Ball 2');
      cy.get('[data-testid="sector"] > .ant-select-selector > .ant-select-selection-item', timeout).click();
      cy.wait(1000);
      cy.get('[data-testid="indicator"] > .ant-select-selector > .ant-select-selection-item', timeout).click();
      cy.wait(1000);
      cy.get('[data-testid="interval"] > .ant-select-selector', timeout).click();
      cy.wait(1000);
      // cy.contains('Kelembaban', timeout).should('be.visible');
      // cy.contains('%', timeout).should('be.visible');
      // cy.contains('℃', timeout).should('be.visible');
    })
  })

  describe('Melihat halaman utama Dashboard (Analysis)', () => {
    it('Usage', () => {
      cy.get('[data-node-key="analysis"]', timeout).click();
      cy.wait(5000);
      // cy.get('[data-testid="nodata"] > :nth-child(1) > :nth-child(1)', timeout).should('not.exist')
      cy.contains('no Route matched with those values', timeout).should('not.exist');
    });
  })
});