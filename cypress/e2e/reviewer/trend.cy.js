/* eslint-disable */
/// <reference types="cypress" />

const timeout = { timeout: 6000 };
const force = { force: true };
const d = new Date();

describe('Trend', () => {
  before(() => {
    cy.login('reviewer');
  });

  beforeEach(() => {
    cy.visit('/');
    cy.get('.ant-menu-submenu-title', timeout).click();
    cy.contains('Trend', timeout).click();
    cy.wait(5000);
  });

  it.skip('Tambah Grafik Trend (filter period)', () => {
    cy.wait(3000)
    // cy.get('body').find('canvas').then((graphic) => {
    //   var graphicCount = Cypress.$(graphic).length;
    //   expect(graphicCount).to.be.equal(1)
    // })
    // cy.wait(2000)
    cy.get('.Button__BaseButton-sc-1hmbtsr-0', timeout).click(force);
    cy.get('[data-testid=input-title]', timeout).type('Testing');
    cy.get('#trend_metric', timeout).click();
    cy.wait(2000);
    cy.get('div[class="ant-select-item-option-content"]', timeout).contains('Usage').click();
    cy.wait(2000);
    cy.contains('Pilih asset', timeout).click(force);
    cy.wait(2000);
    cy.get('[title="Paragon Device 2 - Kemas Primer Semsol"]', timeout).click();
    cy.wait(2000);
    cy.get('#trend_chart_type', timeout).click();
    cy.wait(2000);
    cy.contains('Line Chart', timeout).click();
    cy.wait(2000);
    cy.get('[data-testid=period-7]', timeout).click();
    cy.get('[data-testid=interval-6h]', timeout).click();
    cy.get('[data-testid="input-indicator"] > .ant-select-selector', timeout).click();
    cy.wait(1000);
    cy.contains('Temperatur', timeout).click();
    cy.wait(1000);
    cy.get('[data-testid="input-statistic"] > .ant-select-selector', timeout).click();
    cy.wait(1000);
    cy.contains('Average', timeout).click();
    cy.contains('Submit', timeout).click();
    cy.contains('Berhasil!', timeout).should('be.visible');

    // Cek Data
    cy.wait(10000);
    cy.contains('Testing', timeout).should('be.visible');
    cy.contains('7 Hari Terakhir', timeout).should('be.visible');
    cy.get('body').find('canvas').then((graphic) => {
      var graphicCount = Cypress.$(graphic).length;
      expect(graphicCount).to.be.equal(1)
    })
      
    // cy.get('[width="1198"] > .apexcharts-legend', timeout).eq(4).contains('Netstal');

    // var formatDate = d.getDate();
    // var formatDateBefore = d.getDate()-7;
    // var formatMonth = '/' + (d.getMonth()+1);
    // var formatYear = '/' + d.getFullYear()
    // cy.get('.ant-layout-content > :nth-child(5)', timeout).contains(formatDate + formatMonth + formatYear, timeout).should('be.visible');
    // cy.get('.ant-layout-content > :nth-child(5)', timeout).contains(formatDateBefore + formatMonth + formatYear, timeout).should('be.visible');
  });

  it.skip('Tambah Grafik Trend (filter tanggal)', () => {
    cy.wait(2000)
    cy.get('.Button__BaseButton-sc-1hmbtsr-0', timeout).eq(2).click(force);
    cy.get('[data-testid=input-title]', timeout).type('Testing 2');
    cy.get('#trend_metric', timeout).click();
    cy.wait(2000);
    cy.get('div[class="ant-select-item-option-content"]', timeout).contains('Usage').click();
    cy.wait(2000);
    cy.contains('Pilih asset', timeout).click(force);
    cy.wait(2000);
    cy.get('[title="Paragon Device 2 - Kemas Primer Semsol"]', timeout).click();
    cy.wait(2000);
    cy.get('#trend_chart_type', timeout).click();
    cy.wait(2000);
    cy.contains('Line Chart', timeout).click();
    cy.wait(2000);
    cy.get('[data-testid=period-pick]', timeout).click();
    cy.get('.ant-picker-input-active > input', timeout).click();

    if(d.getFullYear()!=2023) {
      var minusYear = d.getFullYear()-2023;
      var i = 0;
      while (i < minusYear) {
        cy.get(':nth-child(1) > .ant-picker-date-panel > .ant-picker-header > .ant-picker-header-super-prev-btn', timeout)
          .click();
        i++;
      }
    }
    if(d.getMonth() + 1 != 3) {
      if(d.getMonth() + 1 > 3) {
        var minusMonth = d.getMonth() + 1 - 3;
        var j = 0;
        while (j < minusMonth) {
          cy.get(':nth-child(1) > .ant-picker-date-panel > .ant-picker-header > .ant-picker-header-prev-btn', timeout)
            .click();
          j++;
        }
      } else {
        var plusMonth = 3 - (d.getMonth() + 1);
        var j = 0;
        while (j < plusMonth) {
          cy.get(':nth-child(2) > .ant-picker-date-panel > .ant-picker-header > .ant-picker-header-next-btn', timeout)
            .click();
          j++;
        }
      }
    }

    cy.get('[title="2023-03-05"]', timeout).click();
    cy.wait(2000);
    cy.get(':nth-child(3) > input', timeout).click(force);

    if(d.getFullYear()!=2023) {
      var minusYear = d.getFullYear()-2023;
      var i = 0;
      while (i < minusYear) {
        cy.get(':nth-child(1) > .ant-picker-date-panel > .ant-picker-header > .ant-picker-header-super-prev-btn', timeout)
          .click();
        i++;
      }
    }
    if(d.getMonth() + 1 != 3) {
      if(d.getMonth() + 1 > 3) {
        var minusMonth = d.getMonth() + 1 - 3;
        var j = 0;
        while (j < minusMonth) {
          cy.get(':nth-child(1) > .ant-picker-date-panel > .ant-picker-header > .ant-picker-header-prev-btn', timeout)
            .click();
          j++;
        }
      } else {
        var plusMonth = 3 - (d.getMonth() + 1);
        var j = 0;
        while (j < plusMonth) {
          cy.get(':nth-child(2) > .ant-picker-date-panel > .ant-picker-header > .ant-picker-header-next-btn', timeout)
            .click();
          j++;
        }
      }
    }

    cy.get('[title="2023-03-08"]', timeout).click();
    cy.wait(3000);
    cy.get('[data-testid=interval-1h]', timeout).click();
    cy.get('[data-testid="input-indicator"] > .ant-select-selector', timeout).click();
    cy.wait(1000);
    cy.contains('Temperatur', timeout).click();
    cy.wait(1000);
    cy.get('[data-testid="input-statistic"] > .ant-select-selector', timeout).click();
    cy.wait(1000);
    cy.contains('Average', timeout).click();
    cy.contains('Submit', timeout).click();
    cy.contains('Berhasil!', timeout).should('be.visible');

    // Cek Data
    cy.wait(10000);
    cy.contains('Testing 2', timeout).should('be.visible');
    cy.contains('5/3/2023 - 8/3/2023', timeout).should('be.visible');
    cy.get('body').find('canvas').then((graphic) => {
      var graphicCount = Cypress.$(graphic).length;
      expect(graphicCount).to.be.equal(2)
    })
    // cy.get('[width="1198"] > .apexcharts-legend', timeout).eq(5).contains('Line 7');
  });

  it.skip('Edit Grafik', () => {
    cy.get('.ant-row-space-between > :nth-child(2) > .ant-dropdown-trigger', timeout)
      .click();
    cy.contains('Edit', timeout).click();
    cy.get('[style="display: flex; flex-wrap: wrap; border: 1px dashed rgb(212, 212, 212); margin-bottom: 16px; padding: 5px 3px;"] > div > svg', timeout)
      .click();
    cy.contains('Pilih asset', timeout).click(force);
    cy.wait(2000);
    cy.get('[title="Paragon Device 3 - Kemas Primer Powder"]', timeout).click();
    cy.wait(2000);
    cy.contains('Submit', timeout).click();
    cy.contains('Berhasil!', timeout).should('be.visible');

    // Cek Data
    cy.wait(10000);
    cy.contains('Testing', timeout).should('be.visible');
    cy.contains('7 Hari Terakhir', timeout).should('be.visible');
    // cy.get('[width="1198"] > .apexcharts-legend', timeout).eq(4).contains('Line 2');
  });

  it.skip('Delete Grafik', () => {
    cy.get('.ant-row-space-between > :nth-child(2) > .ant-dropdown-trigger', timeout)
      .click();
    cy.contains('Delete', timeout).click();
    cy.get('.swal2-confirm', timeout).click();
    cy.contains('Berhasil!', timeout).should('be.visible');
    cy.get('.ant-row-space-between > :nth-child(2) > .ant-dropdown-trigger', timeout)
      .click();
    cy.contains('Delete', timeout).click();
    cy.get('.swal2-confirm', timeout).click();
    cy.contains('Berhasil!', timeout).should('be.visible');

    // Cek Data
    cy.wait(10000);
    cy.contains('Testing', timeout).should('not.exist');
    // cy.get('body').find('canvas').then((graphic) => {
    //   var graphicCount = Cypress.$(graphic).length;
    //   expect(graphicCount).to.be.equal(1)
    // })
  });

  it('Data Usage', () => {
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
      var today = new Date()
      today.setDate(today.getDate());
      var lastWeek = new Date();
      lastWeek.setDate(lastWeek.getDate() - 7);
      function formatDate(date){
        return [date.getFullYear(),('0'+(date.getMonth()+1)).slice(-2),('0'+date.getDate()).slice(-2)].join('-');
      }
      cy.request({
          url: `https://evomoapi.evomo.id/analysis/ems/linechart?metric=usage&asset_ids=24E124136D056833,24E124136D056871,24E124136D056365&indicator=temperatur&chart_type=linechart&statistic=min&start_date=${formatDate(lastWeek)}&end_date=${formatDate(today)}&interval=1h&period=7&timezone=Asia/Jakarta`,
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${value}`,
            'x-authenticated-scope': 'reviewer',
            'x-authenticated-userid': '6499219756ae08171d10f6da',
            'x-consumer-custom-id': '6481529216833b00104783e4',
          }
        }).then((response) => {         
          expect(response.body.data.metric).to.deep.equal("usage")
          expect(response.body.data.assets[0].asset_name).to.deep.equal("CRYSTALIZER NEW BUILDING")
          expect(response.body.data.assets[1].asset_name).to.deep.equal("SUBSTATION-10")
          expect(response.body.data.assets[2].asset_name).to.deep.equal("DCS WSA")
          expect(response.body.data.assets[0].chart_type).to.deep.equal("linechart")
          expect(response.body.data.assets.length).to.equal(3)
          expect(response.body.data.date_times[0]).to.deep.equal(`${formatDate(lastWeek)} 07:00:00`)
          expect(response.body.data.date_times[1]).to.deep.equal(`${formatDate(lastWeek)} 08:00:00`)
          expect(response.body.data.unit).to.deep.equal("℃")

          // temperatur
          // device 1
          const deviceCount = response.body.data.assets.length
          var j=0
          while (j < deviceCount) {
            const dataCount = response.body.data.assets[j].data.length
            expect(dataCount).to.be.greaterThan(167)
            var i=0
            while (i < dataCount) {
              var dataValue = response.body.data.assets[j].data[i].value
              expect(dataValue).to.be.greaterThan(0)
              i++
            }
            j++
          }
      })
    })
  });
});
