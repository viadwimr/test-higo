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
      var d = new Date();
      var date = d.getDate();
      var dateLength = date.toString().length
      if (dateLength == 1) {
        date = `0${date}`
      }
      var month = d.getMonth()+1
      var monthLength = month.toString().length
      if (monthLength == 1) {
        month = `0${month}`
      }
      var year = d.getFullYear().toString()
      var hour = d.getHours();
      var hourLength = hour.toString().length
      if (hourLength == 1) {
        hour = `0${hour}`
      }
      const today = `${date}/${month}/${year.slice(2,4)} - ${hour}`
      cy.contains(`Last Update`, timeout).should('be.visible');
      cy.contains(`${today}`, timeout).should('be.visible');
      cy.contains('Temperatur', timeout).should('be.visible');
      cy.contains('Kelembaban', timeout).should('be.visible');
      cy.contains('%', timeout).should('be.visible');
      cy.contains('℃', timeout).should('be.visible');
    });

    it('Detail Device', () => {
      cy.get(':nth-child(10) > .ant-card > .ant-card-body', timeout).click();
      cy.wait(5000)
      cy.get("body").then((body) => {
        if (body.find(`[data-testid="reload-error"]`).length > 0) {
          cy.get('[data-testid="reload-error"]', timeout).click();
        }
      })
      cy.wait(5000);
      cy.contains(`Nama Device`, timeout).should('be.visible');
      cy.contains(`Sektor`, timeout).should('be.visible');
      cy.contains(`Lokasi`, timeout).should('be.visible');
      cy.contains('Kecepatan Angin', timeout).should('be.visible');
      cy.contains('m/s', timeout).should('be.visible');
      cy.contains('Tertinggi', timeout).should('be.visible');
      cy.contains('Terendah', timeout).should('be.visible');
      //filter statistic
      cy.get('.ant-select-selector', timeout).click();
      cy.wait(1000);
      cy.contains('Max', timeout).click();
      cy.wait(5000);
      cy.get('body').find(`.ant-col-md-3 > :nth-child(2)`).invoke('text').then((text) => {
        const highestMaxValue1 = text
        cy.task('setValue', { key: 'highestMaxValue1', value: highestMaxValue1 })
        cy.get('body').find(`.ant-col-md-3 > :nth-child(5)`).invoke('text').then((text) => {
          const lowestMaxValue1 = text
          expect(lowestMaxValue1).to.be.not.equal(highestMaxValue1)
          cy.task('setValue', { key: 'lowestMaxValue1', value: lowestMaxValue1 })
        })
      })
      cy.get('body').find(`.ant-col-md-3 > :nth-child(3)`).invoke('text').then((text) => {
        cy.get('body').find(`.ant-col-md-3 > :nth-child(6)`).invoke('text').then((text) => {
          const lowestMaxValueDate2 = text
        })
      })
      cy.get('.ant-select-selector', timeout).click();
      cy.wait(1000);
      cy.contains('Min', timeout).click();
      cy.wait(5000);
      cy.get('body').find(`.ant-col-md-3 > :nth-child(2)`).invoke('text').then((text) => {
        const highestMinValue1 = text
        cy.get('body').find(`.ant-col-md-3 > :nth-child(5)`).invoke('text').then((text) => {
          const lowestMinValue1 = text
          expect(lowestMinValue1).to.be.not.equal(highestMinValue1)
          // Max vs Min Lowest 1
          cy.task('getValue', { key: 'lowestMaxValue1' }).then((value) => {
            expect(value).to.be.not.equal(lowestMinValue1)
          })
        })
        // Max vs Min Highest 1
        cy.task('getValue', { key: 'highestMaxValue1' }).then((value) => {
          expect(value).to.be.not.equal(highestMinValue1)
        })
      })
      cy.get('body').find(`.ant-col-md-3 > :nth-child(3)`).invoke('text').then((text) => {
        const highestMinValueDate2 = text
        cy.get('body').find(`.ant-col-md-3 > :nth-child(6)`).invoke('text').then((text) => {
          const lowestMinValueDate2 = text
          expect(lowestMinValueDate2).to.be.not.equal(highestMinValueDate2)
        })
      })
      cy.get('#download-Kecepatan Angin > [style="margin-left: -10px; margin-right: -10px;"] > .ant-col-md-21', timeout)
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