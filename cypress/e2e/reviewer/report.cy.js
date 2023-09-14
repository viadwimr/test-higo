/// <reference types="Cypress" />

var timeout = { timeout: 60000 }

describe('Report', () => {
  before(() => {
    cy.login('reviewer');
    cy.get('[title="Report"] > .ant-menu-title-content > a', timeout).click();
  });
     
  it('Akan muncul halaman untuk men-generate report dari dashboard', () => {
    cy.get('.title', timeout).contains('REPORT');
    cy.get(':nth-child(1) > .ant-col-3 > .ant-row', timeout).contains('Device');
    cy.get(':nth-child(2) > .ant-col-3 > .ant-row', timeout).contains('Indicator');
    cy.get(':nth-child(3) > .ant-col-3 > .ant-row', timeout).contains('Period');
    cy.get(':nth-child(4) > .ant-col-3 > .ant-row', timeout).contains('Interval');
    cy.get(':nth-child(5) > .ant-col-3 > .ant-row', timeout).contains('Time');
    cy.get('#report_form_device', timeout).should('be.visible');
    cy.get('.css-1hwfws3', timeout).should('be.visible');
    cy.get('[data-testid="form-period"] > .ant-select-selector', timeout).should('be.visible');
    cy.get('[data-testid=form-interval] > .ant-select-selector', timeout).should('be.visible');
    cy.get('[data-testid=time-daily-report] > [data-testid=label]', timeout).should('be.visible');
    cy.get('[data-testid="time-hour-report"] > [data-testid="label"]', timeout).should('be.visible');
    cy.get('[data-testid=submit-btn-report]', timeout).should('be.visible');
  });

  it('Menu drop-down nama device yang ada', () => {
    cy.get('#report_form_device', timeout).click(timeout);
    cy.get('#report_form_device', timeout).type('app')
    cy.wait(1000);
    cy.get('[data-testid="select-APPLIKON MC#56"]', timeout).click();
  });

  it('Menu drop-down indikator yang ada', () => {
    cy.get('.css-1hwfws3', timeout).click();
    cy.contains('Temperature', timeout).click();
    cy.get('.css-1hwfws3', timeout).click();
  });

  it('Menu drop-down untuk jangka waktu yang ada', () => {
    cy.get('[data-testid="form-period"] > .ant-select-selector', timeout).click();
    cy.get('div[class="ant-select-item ant-select-item-option"]', timeout).eq(3).click();
  });

  it('Menu drop-down interval mulai dari Lihat Semua, 5 Menit hingga 60 Menit', () => {
    cy.get('[data-testid=form-interval] > .ant-select-selector', timeout).click();
    cy.contains('View All', timeout).should('be.visible');
    cy.contains('5 Minutes', timeout).should('be.visible');
    cy.contains('15 Minutes', timeout).should('be.visible');
    cy.contains('30 Minutes', timeout).should('be.visible');
    cy.contains('60 Minutes', timeout).should('be.visible');
    cy.contains('15 Minutes', timeout).click({force:true});
  });

  it('Daily satuan terkecil harian dan Hourly untuk satuan terkecil per-jam', () => {
    cy.get('[data-testid=time-daily-report] > [data-testid=label]', timeout).click();
    // hourly
  });

  // Tambahan
  it('Menu drop-down statistic', () => {
    cy.get('[data-testid="input-statistic"] > .ant-select-selector', timeout).click();
    cy.contains('Sum', timeout).should('be.visible');
    cy.contains('Average', timeout).should('be.visible');
    cy.wait(1000);
    cy.get('[title="Min"]', timeout).should('be.visible');
    cy.contains('Max', timeout).should('be.visible');
    cy.contains('Median', timeout).should('be.visible');
    cy.contains('First', timeout).should('be.visible');
    cy.contains('Last', timeout).should('be.visible');
    cy.contains('Spread', timeout).should('be.visible');
    // cy.contains('Mode', timeout).should('be.visible');
    cy.contains('Average', timeout).click({force:true});
  });

  it('Report tampil berupa tabel di bawah form', () => {
    cy.get('[data-testid=submit-btn-report]').click({force:true});
    cy.get('.ant-card-head-title', timeout).contains('Report APPLIKON MC#56', timeout).should('be.visible');
    cy.get('.ant-card-body', timeout).should('be.visible');
    cy.get('.ant-layout-content > :nth-child(3)', timeout).should('be.visible');
  });

  it.skip('Untuk file PDF berupa laporan dengan format file .pdf dan untuk CSV dengan format .csv', () => {
    //csv
    cy.get('[data-testid=download-report]', timeout).click();
    cy.get('[data-testid=download-csv-report] > .ant-dropdown-menu-title-content', timeout).click();
    cy.contains('Download Berhasil!', timeout).should('be.visible');
    // pdf
    cy.wait(3000);
    cy.get('[data-testid=download-report]', timeout).click();
    cy.get('[data-testid=download-pdf-report] > .ant-dropdown-menu-title-content', timeout).click();
    cy.contains('Download Berhasil!', timeout).should('be.visible');
  });

  it('Data Routine Check', () => {
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
    // check routine data   
    cy.task('getValue', { key: 'bearerToken' }).then((value) => {
      var today = new Date()
      today.setDate(today.getDate());
      var lastWeek = new Date();
      lastWeek.setDate(lastWeek.getDate() - 7);
      function formatDate(date){
        return [date.getFullYear(),('0'+(date.getMonth()+1)).slice(-2),('0'+date.getDate()).slice(-2)].join('-');
      }
      cy.request({
        url: `https://evomoapi.evomo.id/report?interval_data=15&indicator=temperatur&date_start=${formatDate(lastWeek)}&date_end=${formatDate(today)}&time_zone=Asia/Jakarta&in_csv=true&waktu=daily&statistic=SUM`,
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${value}`,
          'x-authenticated-scope': 'reviewer',
          'x-authenticated-userid': '6499219756ae08171d10f6da',
          'x-consumer-custom-id': '6481529216833b00104783e4',
        }
      }).then((response) => { 
        // Sum
        let value0Minutes = [":00:00,Temperature,0.00"]
        let value15Minutes = [":15:00,Temperature,0.00"]
        let value30Minutes = [":30:00,Temperature,0.00"]
        let value45Minutes = [":45:00,Temperature,0.00"]
        let responseString = response.body.toString();

        // temperatur
        value0Minutes.forEach(value0Minute => {
          if(responseString.includes(value0Minute)) {
            value15Minutes.forEach(value15Minute => {
              expect(responseString.includes(value15Minute)).to.be.false
            })
            value30Minutes.forEach(value30Minute => {
              expect(responseString.includes(value30Minute)).to.be.false
            })
            value45Minutes.forEach(value45Minute => {
              expect(responseString.includes(value45Minute)).to.be.false
            })
          } else {
            value15Minutes.forEach(value15Minute => {
              if(responseString.includes(value15Minute)) {
                value0Minutes.forEach(value0Minute => {
                  expect(responseString.includes(value0Minute)).to.be.false
                })
                value30Minutes.forEach(value30Minute => {
                  expect(responseString.includes(value30Minute)).to.be.false
                })
                value45Minutes.forEach(value45Minute => {
                  expect(responseString.includes(value45Minute)).to.be.false
                })
              } else {
                value30Minutes.forEach(value30Minute => {
                  if(responseString.includes(value30Minute)) {
                    value0Minutes.forEach(value0Minute => {
                      expect(responseString.includes(value0Minute)).to.be.false
                    })
                    value15Minutes.forEach(value15Minute => {
                      expect(responseString.includes(value15Minute)).to.be.false
                    })
                    value45Minutes.forEach(value45Minute => {
                      expect(responseString.includes(value45Minute)).to.be.false
                    })
                  } else {
                    value45Minutes.forEach(value45Minute => {
                      if(responseString.includes(value45Minute)) {
                        value0Minutes.forEach(value0Minute => {
                          expect(responseString.includes(value0Minute)).to.be.false
                        })
                        value30Minutes.forEach(value30Minute => {
                          expect(responseString.includes(value30Minute)).to.be.false
                        })
                        value15Minutes.forEach(value15Minute => {
                          expect(responseString.includes(value15Minute)).to.be.false
                        })
                      }
                    })
                  }
                })
              }
            })
          }
        })
      })
    })
  })

  describe('Generate Report', () => {
    it('Hourly Report', () => {
      cy.get('.title', timeout).contains('REPORT');
      cy.get(':nth-child(1) > .ant-col-3 > .ant-row', timeout).contains('Device');
      cy.get(':nth-child(2) > .ant-col-3 > .ant-row', timeout).contains('Indicator');
      cy.get(':nth-child(3) > .ant-col-3 > .ant-row', timeout).contains('Period');
      cy.get(':nth-child(4) > .ant-col-3 > .ant-row', timeout).contains('Interval');
      cy.get(':nth-child(5) > .ant-col-3 > .ant-row', timeout).contains('Statistic');
      cy.get(':nth-child(6) > .ant-col-3 > .ant-row', timeout).contains('Time');
      // hourly
      cy.get('[data-testid="time-hour-report"] > [data-testid="label"]', timeout).click();
      cy.wait(1000);
      cy.get('#report_form_start_time', timeout).click();
      cy.wait(1000);
      cy.get('.rc-time-picker-panel-input-wrap', timeout).type('08:00:00');
      cy.get('#report_form_end_time', timeout).click();
      cy.wait(1000);
      cy.get('.rc-time-picker-panel-input-wrap', timeout).type('09:00:00');
      cy.wait(1000);
      
      cy.get('[data-testid=submit-btn-report]').click({force:true});
      cy.wait(5000);
      cy.get('.ant-card-head-title', timeout).contains('Report APPLIKON MC#56', timeout).should('be.visible');
      cy.get('.ant-card-body', timeout).should('be.visible');
      cy.get('.ant-layout-content > :nth-child(3)', timeout).should('be.visible');
      // check result
      // cy.get('> :nth-child(3)', timeout).eq(1).contains('08:00:00');
      /*
      //csv
      cy.get('[data-testid=download-report]', timeout).click();
      cy.get('[data-testid=download-csv-report] > .ant-dropdown-menu-title-content', timeout).click();
      cy.contains('Download Berhasil!', timeout).should('be.visible');
      // pdf
      cy.wait(3000);
      cy.get('[data-testid=download-report]', timeout).click();
      cy.get('[data-testid=download-pdf-report] > .ant-dropdown-menu-title-content', timeout).click();
      cy.contains('Download Berhasil!', timeout).should('be.visible');
      */
    });

    it('Custom Date Report', () => {
      cy.get('.title', timeout).contains('REPORT');
      cy.get(':nth-child(1) > .ant-col-3 > .ant-row', timeout).contains('Device');
      cy.get(':nth-child(2) > .ant-col-3 > .ant-row', timeout).contains('Indicator');
      cy.get(':nth-child(3) > .ant-col-3 > .ant-row', timeout).contains('Period');
      cy.get(':nth-child(4) > .ant-col-3 > .ant-row', timeout).contains('Interval');
      cy.get(':nth-child(5) > .ant-col-3 > .ant-row', timeout).contains('Statistic');
      cy.get(':nth-child(6) > .ant-col-3 > .ant-row', timeout).contains('Time');
      // custom date
      cy.get('[data-testid="switch-period-btn"]', timeout).click();
      cy.wait(1000)
      cy.get('#report_form_period_by_date', timeout).click();
      cy.wait(1000)
      cy.get('#report_form_period_by_date', timeout).type('2023-07-27');
      cy.wait(1000)
      cy.get(':nth-child(3) > input', timeout).click();
      cy.wait(1000)
      cy.get(':nth-child(3) > input', timeout).type('2023-07-27{enter}');
      cy.wait(1000)
         
      cy.get('[data-testid=submit-btn-report]').click({force:true});
      cy.wait(5000);
      cy.get('.ant-card-head-title', timeout).contains('Report APPLIKON MC#56', timeout).should('be.visible');
      cy.get('.ant-card-body', timeout).should('be.visible');
      cy.get('.ant-layout-content > :nth-child(3)', timeout).should('be.visible');
      cy.contains('27-07-2023 08:00:00', timeout).should('be.visible');
      /*
      //csv
      cy.get('[data-testid=download-report]', timeout).click();
      cy.get('[data-testid=download-csv-report] > .ant-dropdown-menu-title-content', timeout).click();
      cy.contains('Download Berhasil!', timeout).should('be.visible');
      // pdf
      cy.wait(3000);
      cy.get('[data-testid=download-report]', timeout).click();
      cy.get('[data-testid=download-pdf-report] > .ant-dropdown-menu-title-content', timeout).click();
      cy.contains('Download Berhasil!', timeout).should('be.visible');
      */
    });

    it.skip('Report Terjadwal', () => {
      cy.get('[data-testid="save-report-btn"]', timeout).click();
      cy.get('[data-testid="schedule-name-form"]', timeout).type('automate test');
      cy.get('[data-testid="schedule-select-period"] > .ant-select-selector', timeout).click();
      cy.wait(1000);
      cy.get('[data-testid="schedule-select-period-0-form"]', timeout).click();
      // cy.contains('Hari ini', timeout).click();
      // cy.get('div[class="ant-select-item ant-select-item-option"]', timeout).eq(3).click();
      cy.wait(1000);
      cy.get('[data-testid="schedule-send-date-form"]', timeout).click();
      cy.wait(1000);
      cy.contains('Today', timeout).click();
      // cy.get('[data-testid="schedule-send-date-form"]', timeout).type('2023-05-08{enter}');
      cy.get('#scheduled_report_form_send_time', timeout).click();
      cy.wait(1000);
      cy.get('.rc-time-picker-panel-input', timeout).type('07:00:00{enter}');
      // cy.contains('Email', timeout).click();
      cy.get('[data-testid="schedule-submit-btn"]', timeout).click();
      cy.wait(1000);
      cy.get('[data-testid="schedule-type-send"] > :nth-child(1)', timeout).click();
      cy.get('[data-testid="schedule-input-email"]', timeout).type('qaevomotelkom@gmail.com');
      cy.wait(1000);
      cy.get('[data-testid="schedule-submit-btn"]', timeout).click();
      cy.contains('Berhasil', timeout).should('be.visible');
      cy.reload();
      cy.contains('automate test', timeout).should('be.visible');
      cy.get('.ant-table-row > :nth-child(6)', timeout).eq(0).click();
      cy.contains('Yakin hapus automate test ?', timeout).should('be.visible');
      cy.contains('Tidak', timeout).click();
      cy.get('.ant-table-row > :nth-child(6)', timeout).eq(0).click();
      cy.contains('Yakin hapus automate test ?', timeout).should('be.visible');
      cy.get('.swal2-confirm', timeout).click();
      cy.contains('Report berhasil dihapus.', timeout).should('be.visible');
      cy.wait(3000);
      cy.contains('automate test', timeout).should('not.exist');
    });
  })
});