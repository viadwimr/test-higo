/// <reference types="Cypress" />

var timeout = { timeout: 10000 }
const d = new Date();

describe('Dashboard', () => {
  before(() => {
    cy.login('reviewer');
  });
  
  describe('Melihat halaman utama Dashboard (Realtime)', () => {
    it('Device', () => {
      cy.get('li > .ant-dropdown-trigger', timeout).click();
      // cy.get('[data-testid="button-sector-filter"]', timeout).click();
      cy.wait(1000);
      cy.contains('All Sector', timeout).click();
      // cy.wait(1000);
      // cy.contains('Semua Device', timeout).click();
      // cy.wait(1000);
      // cy.contains('Terapkan', timeout).click();
      cy.wait(5000);
      cy.get('#rc-tabs-0-panel-realtime').find('.sector-card').then((graphic) => {
        var graphicCount = Cypress.$(graphic).length;
        expect(graphicCount).to.be.equal(9)
      })
      cy.get(':nth-child(3) > .sector-card > .RealtimeTab__SectorName-sc-1arz2ej-0 > div', timeout).click();
      cy.wait(1000);
      cy.get('#rc-tabs-0-panel-realtime').find('.ant-card > .ant-card-body').then((graphic) => {
        var graphicCount = Cypress.$(graphic).length;
        expect(graphicCount).to.be.equal(10)
      })
      // cy.get('.ant-card > .ant-card-body', timeout).click();
      // cy.get(':nth-child(2) > .ant-row > :nth-child(3)', timeout).click();
      // cy.wait(1000);
      // cy.contains('Semua Sector', timeout).click();
      // cy.wait(1000);
      // cy.contains('Semua Device', timeout).click();
      // cy.wait(1000);
      // cy.contains('Terapkan', timeout).click();
      // cy.wait(5000);
      cy.contains('CEMS ROOM', timeout).should('be.visible');
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
      // cy.contains('Temperatur', timeout).should('be.visible');
      // cy.contains('Temperatur', timeout).should('be.visible');
      cy.contains('%', timeout).should('be.visible');
      cy.contains('℃', timeout).should('be.visible');
    });

    it('Detail Device', () => {
      cy.get(':nth-child(10) > .ant-card > .ant-card-body', timeout).click();
      cy.wait(5000)
      cy.get("body").then((body) => {
        if (body.find(`[data-testid="reload-error"]`).length > 0) {
          cy.get('[data-testid="reload-error"]', timeout).click();
          cy.wait(5000);
        }
      })
      cy.contains(`Device Name`, timeout).should('be.visible');
      cy.contains(`Sector`, timeout).should('be.visible');
      cy.contains(`Location`, timeout).should('be.visible');
      cy.contains('Temperature', timeout).should('be.visible');
      cy.contains('Humidity', timeout).should('be.visible');
      cy.contains('Battery', timeout).should('be.visible');
      cy.contains('℃', timeout).should('be.visible');
      cy.contains('%', timeout).should('be.visible');
      cy.contains('Highest', timeout).should('be.visible');
      cy.contains('Lowest', timeout).should('be.visible');
      cy.get('#download-Temperature > [style="margin-left: -10px; margin-right: -10px;"] > .ant-col-md-21', timeout)
      .should('be.visible');
      cy.get('#download-Humidity > [style="margin-left: -10px; margin-right: -10px;"] > .ant-col-md-21', timeout)
      .should('be.visible');
      cy.get('#download-Battery > [style="margin-left: -10px; margin-right: -10px;"] > .ant-col-md-21', timeout)
      .should('be.visible');
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
      cy.request({
        url: 'https://evomoapi.evomo.id/login',
        method: 'POST',
        body: {
          password:	'password',
          username:	'reviewer-ibr',
        },
      }).then((response) => {
        var bearerToken = response.body.data.access_token
        return cy.task('setValue', { key: 'bearerToken', value: bearerToken })
      })
      
      cy.task('getValue', { key: 'bearerToken' }).then((value) => {
        cy.request({
          url: 'https://evomoapi.evomo.id/sensors/sensor_data?latest=false&device_id=24E124136D057050&timezone=Asia/Jakarta&interval_data=5&statistic=MEAN&stream_time_limit_in_hour=1',
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${value}`,
            'x-authenticated-scope': 'reviewer',
            'x-authenticated-userid': '6499219756ae08171d10f6da',
            'x-consumer-custom-id': '6481529216833b00104783e4',
          }
        }).then((response) => {  
          // kelembapan       
          const dataCount1 = response.body.data[0].sensor[0].data.length
          var i=0
          while (i < dataCount1) {
            var dataValue1 = response.body.data[0].sensor[0].data[i].value
            expect(dataValue1).to.not.equal(0)
            i++
          }
          expect(dataCount1).to.equal(12)
          // temperatur
          const dataCount2 = response.body.data[0].sensor[1].data.length
          var i=0
          while (i < dataCount2) {
            var dataValue2 = response.body.data[0].sensor[1].data[i].value
            expect(dataValue2).to.not.equal(0)
            i++
          }
          expect(dataCount2).to.equal(12)
        })
      })
    })

    it('Alert', () => {
      cy.visit('/');
      cy.wait(3000);
      cy.get('li > .ant-dropdown-trigger', timeout).click();
      cy.wait(1000);
      cy.get(':nth-child(7) > .ant-tree-node-content-wrapper > .ant-tree-title', timeout).click();
      cy.wait(5000);
      // to close dropdown sector list
      cy.get(':nth-child(5) > .Devices__SummaryCard-amwub4-2', timeout).click();
      cy.wait(1000);
      cy.get('.alert_toggle', timeout).click();
      // cy.get('[data-testid="button-sector-filter"]', timeout).click();
      cy.wait(1000);
      cy.get('[data-testid="date-root"]', timeout).click();
      cy.wait(1000);
      cy.contains('All Time', timeout).click();
      cy.wait(5000);
      cy.contains(`Date`, timeout).should('be.visible');
      cy.contains(`Time`, timeout).should('be.visible');
      cy.contains('Sector', timeout).should('be.visible');
      cy.contains('Device', timeout).should('be.visible');
      cy.contains('Indicator', timeout).should('be.visible');
      cy.contains('Avg value', timeout).should('be.visible');
      cy.contains('26-07-2023', timeout).should('be.visible');
      cy.contains('01:56:03 - 17:26:02', timeout).should('be.visible');
      cy.contains('ANCILLIARY', timeout).should('be.visible');
      cy.contains('DCS WSA', timeout).should('be.visible');
      cy.contains('Temperature', timeout).should('be.visible');
      cy.contains('28,24 ℃', timeout).should('be.visible');
    });
  })

  describe('Melihat halaman utama Dashboard (Chart Dashboard)', () => {
    it('Chart', () => {
      cy.get('[data-node-key="chart_dashboard"]', timeout).click();
      cy.wait(5000);
      cy.get('canvas', timeout)
        .should('be.visible');
      // cy.contains('Temperature', timeout).should('be.visible');
      cy.get('#rc-tabs-0-panel-chart_dashboard > .ant-row-space-between > :nth-child(2) > .ant-row > :nth-child(2) > [data-testid="input-statistic"] > .ant-select-selector', timeout).click();
      cy.wait(1000);
      cy.get('#rc-tabs-0-panel-chart_dashboard > .ant-row-space-between > :nth-child(2) > .ant-row > :nth-child(1) > [data-testid="indikator"] > .ant-select-selector > .ant-select-selection-item', timeout).click();
      cy.wait(1000);
      cy.get('#rc-tabs-0-panel-chart_dashboard > .ant-row-space-between > :nth-child(2) > .ant-row > :nth-child(3) > .CustomPopup__Container-sc-183k7je-0 > [data-testid="date-root"]', timeout).click();
      cy.wait(1000);
      // cy.contains('Temperatur', timeout).should('be.visible');
      // cy.contains('%', timeout).should('be.visible');
      // cy.contains('℃', timeout).should('be.visible');
      cy.task('getValue', { key: 'bearerToken' }).then((value) => {
        cy.request({
          url: 'https://evomoapi.evomo.id/sensors/sensor_data?sector_id=64815377b482d800014c0e1a&timezone=Asia/Jakarta&latest=false&interval_data=0&statistic=MEAN&date_start=2023-07-20T07:26:01.690Z&date_end=2023-07-27T09:03:40.621Z',
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${value}`,
            'x-authenticated-scope': 'reviewer',
            'x-authenticated-userid': '6499219756ae08171d10f6da',
            'x-consumer-custom-id': '6481529216833b00104783e4',
          }
        }).then((response) => { 
          // Average
          // Sector Ancilliary
          // Weekly
          // Device 1 
          // kelembapan       
          const dataCount11 = response.body.data[0].sensor[0].data.length
          var i=0
          while (i < dataCount11) {
            var dataValue11 = response.body.data[0].sensor[0].data[i].value
            expect(dataValue11).to.not.equal(0)
            i++
          }
          expect(dataCount11).to.equal(1)
          // temperatur
          const dataCount12 = response.body.data[0].sensor[1].data.length
          var i=0
          while (i < dataCount12) {
            var dataValue12 = response.body.data[0].sensor[1].data[i].value
            expect(dataValue12).to.not.equal(0)
            i++
          }
          expect(dataCount12).to.equal(1)
          // Device 2
          // kelembapan       
          const dataCount21 = response.body.data[1].sensor[0].data.length
          var i=0
          while (i < dataCount21) {
            var dataValue21 = response.body.data[1].sensor[0].data[i].value
            expect(dataValue21).to.not.equal(0)
            i++
          }
          expect(dataCount21).to.equal(1)
          // temperatur
          const dataCount22 = response.body.data[1].sensor[1].data.length
          var i=0
          while (i < dataCount22) {
            var dataValue22 = response.body.data[1].sensor[1].data[i].value
            expect(dataValue22).to.not.equal(0)
            i++
          }
          expect(dataCount22).to.equal(1)
        })
      })
    });
  })
});