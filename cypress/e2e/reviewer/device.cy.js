/// <reference types="Cypress" />

var timeout = { timeout: 50000 }

describe('Device', () => {
  before(() => {
    cy.login('reviewer');
    cy.get('[title="Device"] > .ant-menu-title-content > a', timeout).click();
  });
  /*
  describe('Tambah Sektor', () => {
    it('Menampilkan halaman Device yang menampilkan kotak nama masing-masing sensor, filter sektor dan tombol Atur Sektor', () => {
      cy.get('.title', timeout).contains('DEVICE');
      cy.get('[data-testid=select-sector] > .ant-select-selector > .ant-select-selection-item', timeout).should('be.visible');
      cy.get('[data-testid="atur-sector-button"]', timeout).should('be.visible');
      cy.get(':nth-child(2) > a > .sector-card', timeout).should('be.visible');
      cy.get('#rc-tabs-0-panel-condition_monitoring', timeout).should('be.visible');
      cy.get(':nth-child(2) > a > .sector-card', timeout).should('be.visible');
      // cy.get(':nth-child(3) > a > .sector-card', timeout).should('not.exist');
      cy.get('.ant-layout-content > :nth-child(1)', timeout).should('be.visible');
      // cy.get('.AnomaliWrapper__Container-sc-1qw2y45-0', timeout).should('be.visible')
    });

    it('Menampilkan tabel sektor yang berisi Nama Sektor dan Deskripsi', () => {
      cy.get('[data-testid="atur-sector-button"]', timeout).click();
      cy.get('.ant-table-thead > tr > :nth-child(1)', timeout).contains('Nama Sektor');
      cy.get('.ant-table-thead > tr > :nth-child(2)', timeout).contains('Deskripsi');
      cy.get('[data-row-key="63a3c03b263b2a86f1084953"] > :nth-child(1)', timeout).contains('DMIA');
      //cy.get('.yWXyo', timeout).contains('Tambah Sektor');
    })

    it.skip('Menampilkan pengisian tambah sektor pada kolom Nama Sektor dan Deskripsi', () => {
      cy.get('.yWXyo', timeout).click();
      cy.get('[data-testid="sector_name"]', timeout).should('be.visible');
      cy.get('[data-testid="sector_description"]', timeout).should('be.visible');
      cy.get('[data-row-key="new_item"] > [style="text-align: center;"] > .ant-row > :nth-child(1)', timeout)
        .should('be.visible');
    })

    it.skip('Muncul notifikasi berhasil dan sektor tersimpan', () => {
      cy.get('[data-testid="sector_name"]', timeout).clear().type('test');
      cy.get('[data-testid="sector_description"]', timeout).clear().type('uji coba');
      cy.get('[data-testid="confirm-batal"]', timeout).click();
      cy.contains('Tambah Sektor', timeout).click();
      cy.get('[data-testid="sector_name"]', timeout).clear().type('test lagi');
      cy.get('[data-testid="sector_description"]', timeout).clear().type('uji coba lagi');
      cy.contains('Nama Sektor tidak boleh kosong').should('not.exist');
      cy.contains('Deskripsi tidak boleh kosong').should('not.exist');
      cy.get('[data-row-key="new_item"] > [style="text-align: center;"] > .ant-row > :nth-child(1)', timeout)
        .click();
      cy.contains('Berhasil', timeout).should('be.visible');
      cy.wait(3000);
      // check data
      cy.get('[data-testid="atur-sector-button"]', timeout).click();
      cy.wait(1000);
      cy.get('.ant-table-container', timeout).contains('DMIA').should('be.visible');
      cy.get('.ant-table-container', timeout).contains('test lagi').should('be.visible');
      cy.get('.ant-table-container', timeout).contains('uji coba lagi').should('be.visible');
    })
  });

  describe('Edit Sektor', () => {
    it('Menampilkan tabel sektor yang berisi Nama Sektor dan Deskripsi', () => {
      cy.get('.ant-table-thead > tr > :nth-child(1)', timeout).contains('Nama Sektor');
      cy.get('.ant-table-thead > tr > :nth-child(2)', timeout).contains('Deskripsi');
      cy.get('[data-row-key="63a3c03b263b2a86f1084953"] > :nth-child(1)', timeout).contains('DMIA');
      //cy.get('.yWXyo', timeout).contains('Tambah Sektor');
    })

    it('Menampilkan pengisian edit sektor pada kolom Nama Sektor dan Deskripsi', () => {     
      cy.get('[data-testid="edit-button"]', timeout).eq(1).click();
      cy.get('[data-testid="sector_name"]', timeout).clear().type('test edit');
      cy.get('[data-testid="sector_description"]', timeout).clear().type('uji coba edit');
      cy.get('[data-testid="confirm-simpan"]', timeout).click();
    })

    it('Muncul notifikasi berhasil dan edit sektor tersimpan', () => {
      cy.contains('Berhasil', timeout).should('be.visible');
      cy.wait(3000);
      // check after update
      cy.get('[data-testid="atur-sector-button"]', timeout).click();
      cy.wait(1000);
      cy.get('.ant-table-container', timeout).contains('Gedung 1').should('be.visible');
      cy.get('.ant-table-container', timeout).contains('test edit').should('be.visible');
      cy.get('.ant-table-container', timeout).contains('uji coba edit').should('be.visible');
      cy.get('.ant-table-container', timeout).contains('test lagi').should('not.exist');
      cy.get('.ant-table-container', timeout).contains('uji coba lagi').should('not.exist');
      // close
      cy.get('.ant-modal-close-x', timeout).click();
    })
  });

  describe.skip('Hapus Sektor', () => {
    it('Menampilkan tabel sektor yang berisi Nama Sektor dan Deskripsi', () => {
      cy.get('[data-testid="atur-sector-button"]', timeout).click();
      cy.get('.ant-table-thead > tr > :nth-child(1)', timeout).contains('Nama Sektor');
      cy.get('.ant-table-thead > tr > :nth-child(2)', timeout).contains('Deskripsi');
      cy.get('[data-row-key="63a3c03b263b2a86f1084953"] > :nth-child(1)', timeout).contains('DMIA');
      cy.get('.yWXyo', timeout).contains('Tambah Sektor');
    })

    it('Menampilkan konfirmasi hapus', () => {
      cy.get('[data-testid="hapus-button"]', timeout).eq(1).click();
      cy.contains('Ya, Hapus', timeout).click();
    })

    it('Muncul notifikasi berhasil dan sektor terhapus', () => {
      cy.contains('Berhasil', timeout).should('be.visible');
      cy.wait(3000);
      // check after update
      cy.contains('test edit', timeout).should('not.exist');
    });
  });
  */
  describe('Informasi Device', () => {
    it('Menampilkan nama Sektor, nama Device, dan Lokasi', () => {
      cy.get(':nth-child(2) > a > .sector-card', timeout).should('be.visible');
      // cy.get('#rc-tabs-0-panel-condition_monitoring', timeout).should('be.visible');
      cy.get(':nth-child(2) > a > .sector-card', timeout).should('be.visible');
      // cy.get(':nth-child(3) > a > .sector-card', timeout).should('not.exist');
      cy.get('#rc-tabs-1-panel-condition_monitoring').find('.sector-card').then((graphic) => {
        var graphicCount = Cypress.$(graphic).length;
        expect(graphicCount).to.be.equal(64)
      })
      cy.contains('AERATOR', timeout).should('be.visible');
      cy.contains('Good', timeout).should('be.visible');

      // Detail Device
      cy.get(':nth-child(3) > a > .sector-card', timeout).click();
      cy.wait(5000);
      cy.get("body").then((body) => {
        if (body.find(`[data-testid="reload-error"]`).length > 0) {
          cy.get('[data-testid="reload-error"]', timeout).click();
          cy.wait(5000)
        }
      })
      // cy.get('.ant-layout-content > :nth-child(3)', timeout).should('be.visible');
      cy.get('.AnomaliWrapper__Container-sc-1qw2y45-0', timeout).should('be.visible')
      cy.get(':nth-child(1) > .ant-row > :nth-child(1) > h5', timeout).contains('Device Name');
      cy.get(':nth-child(2) > [style="margin-left: -8px; margin-right: -8px;"] > :nth-child(1) > h5', timeout).contains('Sector');
      cy.get(':nth-child(3) > .ant-row > :nth-child(1) > h5', timeout).contains('Location');
      cy.get('[style="margin-left: -12px; margin-right: -12px; margin-top: 24px;"] > :nth-child(1) > .ant-row > :nth-child(2) > h5', timeout).contains('APPLIKON MC#7');
      cy.get('[style="margin-left: -8px; margin-right: -8px;"] > :nth-child(2) > .ant-row > .ant-col > div', timeout).contains('SPINNING MC#7');
      // device
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
    });

    it('Menampilkan dropdown filter interval berisi kolom Pilih Interval untuk custom interval dan untuk existing interval mulai dari 5, 15, 30 hingga 60 Menit.', () => {
      cy.get(':nth-child(2) > .ant-form-item > .ant-row > .ant-col > .ant-form-item-control-input > .ant-form-item-control-input-content > .CustomPopup__Container-sc-183k7je-0 > [data-testid="date-root"]', timeout).click();
      // custom interval
      cy.get('.ant-input-number-input', timeout).type('4');
      cy.get('[style="display: flex; gap: 0.5rem; justify-content: space-between;"] > .Button__BaseButton-sc-1hmbtsr-0', timeout).click();
      // check data
      cy.wait(1000);
      cy.get('body').find(`.ant-col-md-3 > :nth-child(2)`).invoke('text').then((text) => {
        const highestValue = text
        cy.get('body').find(`.ant-col-md-3 > :nth-child(5)`).invoke('text').then((text) => {
          const lowestValue = text
          expect(lowestValue).to.be.not.equal(highestValue)
        })
      })
      cy.get('body').find(`.ant-col-md-3 > :nth-child(3)`).invoke('text').then((text) => {
        const highestValueDate = text
        cy.get('body').find(`.ant-col-md-3 > :nth-child(6)`).invoke('text').then((text) => {
          const lowestValueDate = text
          expect(lowestValueDate).to.be.not.equal(highestValueDate)
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

      // existing interval
      cy.get(':nth-child(2) > .ant-form-item > .ant-row > .ant-col > .ant-form-item-control-input > .ant-form-item-control-input-content > .CustomPopup__Container-sc-183k7je-0 > [data-testid="date-root"]', timeout).click();
      // 30 menit
      cy.get('.Picker__IntervalPopUp-x5059d-6 > :nth-child(5)', timeout).click();
      cy.wait(1000);
      cy.get('body').find(`.ant-col-md-3 > :nth-child(2)`).invoke('text').then((text) => {
        const highestValue = text
        cy.get('body').find(`.ant-col-md-3 > :nth-child(5)`).invoke('text').then((text) => {
          const lowestValue = text
          expect(lowestValue).to.be.not.equal(highestValue)
        })
      })
      cy.get('body').find(`.ant-col-md-3 > :nth-child(3)`).invoke('text').then((text) => {
        const highestValueDate = text
        cy.get('body').find(`.ant-col-md-3 > :nth-child(6)`).invoke('text').then((text) => {
          const lowestValueDate = text
          expect(lowestValueDate).to.be.not.equal(highestValueDate)
        })
      })
      cy.task('getValue', { key: 'bearerToken' }).then((value) => {
        cy.request({
          url: 'https://evomoapi.evomo.id/sensors/sensor_data?latest=false&device_id=24E124136D057050&timezone=Asia/Jakarta&interval_data=30&statistic=MEAN&stream_time_limit_in_hour=1',
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
          expect(dataCount1).to.equal(2)
          // temperatur
          const dataCount2 = response.body.data[0].sensor[1].data.length
          var i=0
          while (i < dataCount2) {
            var dataValue2 = response.body.data[0].sensor[1].data[i].value
            expect(dataValue2).to.not.equal(0)
            i++
          }
          expect(dataCount2).to.equal(2)
        })
      })
    });

    it('Menampilkan nilai saat ini, grafik garis, nilai Highest, dan nilai Lowest untuk indikator Temperature, Humidity, dan Battery sesuai dengan filter interval yang dipilih', () => {
      cy.wait(1000);
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
      cy.task('getValue', { key: 'bearerToken' }).then((value) => {
        cy.request({
          url: 'https://evomoapi.evomo.id/sensors/sensor_data?latest=false&device_id=24E124136D057050&timezone=Asia/Jakarta&interval_data=4&statistic=MEAN&stream_time_limit_in_hour=1',
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
          expect(dataCount1).to.equal(20)
          // temperatur
          const dataCount2 = response.body.data[0].sensor[1].data.length
          var i=0
          while (i < dataCount2) {
            var dataValue2 = response.body.data[0].sensor[1].data[i].value
            expect(dataValue2).to.not.equal(0)
            i++
          }
          expect(dataCount2).to.equal(20)
        })
      })
    });

    it('Menampilkan dropdown filter waktu berisi kolom Tanggal Mulai dan Tanggal Selesai untuk Pilih Tanggal (custom waktu) dan Pilih Durasi mulai dari 1 Jam, 24 Jam, 2 Hari, 7 Hari, 14 Hari hingga 30 Hari Terakhir untuk existing waktunya', () => {
      cy.get(':nth-child(4) > .ant-form-item > .ant-row > .ant-col > .ant-form-item-control-input > .ant-form-item-control-input-content > .CustomPopup__Container-sc-183k7je-0 > [data-testid="date-root"]', timeout).click();
      // custom date
      cy.get(':nth-child(1) > .ant-form-item > .ant-row > .ant-col > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-picker', timeout)
        .type('2023-07-20 00:00:00')
      cy.get('.ant-picker-ok > .ant-btn', timeout).eq(0).click();
      cy.get(':nth-child(2) > .ant-form-item > .ant-row > .ant-col > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-picker', timeout)
        .type('2023-07-20 23:59:59')
      cy.get('.ant-picker-ok > .ant-btn', timeout).eq(1).click();
      cy.get('.ant-form-item-control-input-content > .Button__BaseButton-sc-1hmbtsr-0', timeout).click();
      // cy.contains('OK', timeout).click();
      // check data
      cy.wait(3000);
      cy.get('body').find(`.ant-col-md-3 > :nth-child(2)`).invoke('text').then((text) => {
        const highestValue = text
        cy.get('body').find(`.ant-col-md-3 > :nth-child(5)`).invoke('text').then((text) => {
          const lowestValue = text
          expect(lowestValue).to.be.not.equal(highestValue)
        })
      })
      cy.get('body').find(`.ant-col-md-3 > :nth-child(3)`).invoke('text').then((text) => {
        const highestValueDate = text
        cy.get('body').find(`.ant-col-md-3 > :nth-child(6)`).invoke('text').then((text) => {
          const lowestValueDate = text
          expect(lowestValueDate).to.be.not.equal(highestValueDate)
        })
      })
      cy.task('getValue', { key: 'bearerToken' }).then((value) => {
        cy.request({
          url: 'https://evomoapi.evomo.id/sensors/sensor_data?latest=false&device_id=24E124136D057050&timezone=Asia/Jakarta&interval_data=60&statistic=MEAN&date_start=2023-07-19T17:00:00.000Z&date_end=2023-07-20T16:59:59.000Z',
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
          expect(dataCount1).to.equal(24)
          // temperatur
          const dataCount2 = response.body.data[0].sensor[1].data.length
          var i=0
          while (i < dataCount2) {
            var dataValue2 = response.body.data[0].sensor[1].data[i].value
            expect(dataValue2).to.not.equal(0)
            i++
          }
          expect(dataCount2).to.equal(24)
        })
      })
      // existing date
      cy.get(':nth-child(4) > .ant-form-item > .ant-row > .ant-col > .ant-form-item-control-input > .ant-form-item-control-input-content > .CustomPopup__Container-sc-183k7je-0 > [data-testid="date-root"]', timeout).click();
      cy.contains('Last 7 Days', timeout).click();
      cy.get('body').find(`.ant-col-md-3 > :nth-child(2)`).invoke('text').then((text) => {
        const highestValue = text
        cy.get('body').find(`.ant-col-md-3 > :nth-child(5)`).invoke('text').then((text) => {
          const lowestValue = text
          expect(lowestValue).to.be.not.equal(highestValue)
        })
      })
      cy.get('body').find(`.ant-col-md-3 > :nth-child(3)`).invoke('text').then((text) => {
        const highestValueDate = text
        cy.get('body').find(`.ant-col-md-3 > :nth-child(6)`).invoke('text').then((text) => {
          const lowestValueDate = text
          expect(lowestValueDate).to.be.not.equal(highestValueDate)
        })
      })
      cy.task('getValue', { key: 'bearerToken' }).then((value) => {
        cy.request({
          url: 'https://evomoapi.evomo.id/sensors/sensor_data?latest=false&device_id=24E124136D057050&timezone=Asia/Jakarta&interval_data=360&statistic=MEAN&stream_time_limit_in_hour=168',
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
          expect(dataCount1).to.equal(28)
          // temperatur
          const dataCount2 = response.body.data[0].sensor[1].data.length
          var i=0
          while (i < dataCount2) {
            var dataValue2 = response.body.data[0].sensor[1].data[i].value
            expect(dataValue2).to.not.equal(0)
            i++
          }
          expect(dataCount2).to.equal(28)
        })
      })
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
      // last 30 days
      cy.task('getValue', { key: 'bearerToken' }).then((value) => {
        cy.request({
          url: 'https://evomoapi.evomo.id/sensors/sensor_data?latest=false&device_id=24E124136D057050&timezone=Asia/Jakarta&interval_data=1440&statistic=MEAN&stream_time_limit_in_hour=720',
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
          expect(dataCount1).to.equal(30)
          // temperatur
          const dataCount2 = response.body.data[0].sensor[1].data.length
          var i=0
          while (i < dataCount2) {
            var dataValue2 = response.body.data[0].sensor[1].data[i].value
            expect(dataValue2).to.not.equal(0)
            i++
          }
          expect(dataCount2).to.equal(30)
        })
      })
    });
  });
  
  describe.skip('Edit Device', () => {
    beforeEach(() => {
      cy.visit('/')
      cy.get('[title="Device"] > .ant-menu-title-content > a', timeout).click();
    });  
    
    it('Menampilkan form pengisian untuk edit device seperti Nama Device, Sektor dan Lokasi serta tombol Tambah Detail Device', () => {
      cy.wait(7000);
      cy.get('[data-testid=select-sector] > .ant-select-selector > .ant-select-selection-item', timeout).click({force:true});
      cy.wait(1000);
      cy.contains('Gedung 1', timeout).click();
      cy.wait(3000);
      // cy.get(':nth-child(2) > a > .sector-card', timeout).click();
      cy.contains('ac Produksi Recipe Per Detik', timeout).click()
      cy.wait(3000);
      cy.get('[style="margin-left: -5px; margin-right: -5px;"] > :nth-child(1) > .Button__BaseButton-sc-1hmbtsr-0', timeout).click({multiple:true});
      cy.get('[data-testid=input-device_name]', timeout).clear().type('ac Produksi Recipe Per Detik-edit');
      // cy.get('[data-testid=select-sector] > .ant-select-selector', timeout).click();
      // cy.contains('test edit', timeout).click();
      cy.get('[data-testid=input-location]', timeout).clear().type('auto test');
      cy.get('.ant-row-end > .ant-col > .Button__BaseButton-sc-1hmbtsr-0').click({force:true});
      cy.contains('Berhasil', timeout).should('be.visible');
    });

    it('Menampilkan notifikasi berhasil dan data edit device berhasil disimpan', () => {
      cy.wait(7000);
      cy.get('[data-testid=select-sector] > .ant-select-selector > .ant-select-selection-item', timeout).click({force:true});
      cy.wait(1000);
      cy.contains('Gedung 1', timeout).click();
      cy.wait(3000);
      // cy.get(':nth-child(2) > a > .sector-card', timeout).click();
      cy.contains('ac Produksi Recipe Per Detik', timeout).click()
      cy.wait(3000);
      cy.get('[style="margin-left: -5px; margin-right: -5px;"] > :nth-child(1) > .Button__BaseButton-sc-1hmbtsr-0', timeout).click({multiple:true});
      // check data
      cy.get('[data-testid=input-device_name]', timeout).should('have.value', 'ac Produksi Recipe Per Detik-edit');
      //cy.get('[data-testid=select-sector] > .ant-select-selector', timeout).should('have.contain', 'test edit');
      cy.get('[data-testid=input-location]', timeout).should('have.value', 'auto test');
    });
  })

  describe.skip('Tambah Detail Device', () => {
    before(() => {
      cy.visit('/')
      cy.get('[title="Device"] > .ant-menu-title-content > a', timeout).click();
    }); 

    it('Menampilkan form pengisian Tambah Detail Device yang berisi Label dan Informasi', () => {
      cy.wait(7000);
      cy.get('[data-testid=select-sector] > .ant-select-selector > .ant-select-selection-item', timeout).click({force:true});
      cy.wait(1000);
      cy.contains('Gedung 1', timeout).click();
      cy.wait(3000);
      // cy.get(':nth-child(2) > a > .sector-card', timeout).click();
      cy.contains('ac Produksi Recipe Per Detik', timeout).click()
      cy.wait(3000);
      cy.get('[style="margin-left: -5px; margin-right: -5px;"] > :nth-child(1) > .Button__BaseButton-sc-1hmbtsr-0', timeout).click({multiple:true});
      cy.get('[style="margin-bottom: 198px;"] > .ant-btn', timeout).click();
      cy.get('[data-testid=input-new-label]', timeout).clear().type('test');
      cy.get('[data-testid=input-new-info]', timeout).clear().type('auto');
      cy.get('[style="display: flex; width: 100%; justify-content: flex-end;"] > .Button__BaseButton-sc-1hmbtsr-0').click();
      cy.get('[style="margin-bottom: 198px;"] > .ant-btn', timeout).click();
      cy.get('[data-testid=input-new-label]', timeout).clear().type('test 2');
      cy.get('[data-testid=input-new-info]', timeout).clear().type('auto 2');
      cy.get('[style="display: flex; width: 100%; justify-content: flex-end;"] > .Button__BaseButton-sc-1hmbtsr-0').click();
    });

    it('Informasi detail device yang ditambahkan telah tercatat pada form Edit Device', () => {
      // cy.wait(7000);
      // cy.get('[data-testid=select-sector] > .ant-select-selector > .ant-select-selection-item', timeout).click({force:true});
      // cy.wait(1000);
      // cy.contains('Gedung 1', timeout).click();
      // cy.wait(1000);
      // cy.get(':nth-child(2) > a > .sector-card', timeout).click();
      // cy.contains('ac Produksi Recipe Per Detik', timeout).click()
      // cy.wait(3000);
      // cy.get('[style="margin-left: -5px; margin-right: -5px;"] > :nth-child(1) > .Button__BaseButton-sc-1hmbtsr-0', timeout).click({multiple:true});
      // cy.get('[style="margin-bottom: 198px;"] > .ant-btn', timeout).click();
      cy.get(':nth-child(8) > .ant-form-item > .ant-row > .ant-col > .ant-form-item-control-input > .ant-form-item-control-input-content > [data-testid="input-additional_info"]', timeout)
        .should('have.value','auto');
      cy.get(':nth-child(10) > .ant-form-item > .ant-row > .ant-col > .ant-form-item-control-input > .ant-form-item-control-input-content > [data-testid="input-additional_info"]', timeout)
        .should('have.value','auto 2');
      cy.get('.ant-row-end > .ant-col > .Button__BaseButton-sc-1hmbtsr-0').click({force:true});
    });

    it('Menampilkan notifikasi berhasil dan data baru detail device berhasil disimpan', () => {
      cy.contains('Berhasil', timeout).should('be.visible');
      // cy.wait(7000);
      // cy.get('[data-testid=select-sector] > .ant-select-selector > .ant-select-selection-item', timeout).click({force:true});
      // cy.contains('Gedung 1', timeout).click();
      // cy.wait(1000);
      // cy.get(':nth-child(2) > a > .sector-card', timeout).click();
      // cy.contains('ac Produksi Recipe Per Detik', timeout).click()
      cy.wait(3000);
      // cy.get('[style="margin-left: -5px; margin-right: -5px;"] > :nth-child(1) > .Button__BaseButton-sc-1hmbtsr-0', timeout).click({multiple:true});
      // cy.get('[style="margin-bottom: 198px;"] > .ant-btn', timeout).click();
      cy.get('[style="margin-left: -5px; margin-right: -5px;"] > :nth-child(1) > .Button__BaseButton-sc-1hmbtsr-0', timeout).click({multiple:true});
      cy.get('[data-testid=input-device_name]', timeout).should('have.value', 'ac Produksi Recipe Per Detik-edit');
      // bug: belum update level sector
      // cy.get('[data-testid=select-sector] > .ant-select-selector', timeout).should('have.contain', 'Gedung 1');
      cy.get('[data-testid=input-location]', timeout).should('have.value', 'auto test');
      cy.get(':nth-child(8) > .ant-form-item > .ant-row > .ant-col > .ant-form-item-control-input > .ant-form-item-control-input-content > [data-testid="input-additional_info"]', timeout)
        .should('have.value','auto');
      cy.get(':nth-child(10) > .ant-form-item > .ant-row > .ant-col > .ant-form-item-control-input > .ant-form-item-control-input-content > [data-testid="input-additional_info"]', timeout)
        .should('have.value','auto 2');
    });
  })

  describe.skip('Hapus Detail Device', () => {
    beforeEach(() => {
      cy.visit('/')
      cy.get('[title="Device"] > .ant-menu-title-content > a', timeout).click();
    });

    it('Informasi detail device sudah tidak tercatat pada form Edit Device', () => {
      cy.wait(3000);
      cy.get('[data-testid=select-sector] > .ant-select-selector > .ant-select-selection-item', timeout).click({force:true});
      cy.wait(1000);
      cy.contains('Gedung 1', timeout).click();
      cy.wait(3000);
      // cy.get(':nth-child(2) > a > .sector-card', timeout).click();
      cy.contains('ac Produksi Recipe Per Detik', timeout).click()
      cy.wait(3000)
      cy.get('[style="margin-left: -5px; margin-right: -5px;"] > :nth-child(1) > .Button__BaseButton-sc-1hmbtsr-0', timeout).click({multiple:true});
      cy.get(':nth-child(8) > [style="height: 40px; display: flex; align-items: center;"]', timeout).click();
      cy.contains('Hapus').click({force:true});
      cy.get(':nth-child(8) > [style="height: 40px; display: flex; align-items: center;"]', timeout).click();
      cy.contains('Hapus').click({force:true});
      // check data
      // cy.get('[style="margin-left: -5px; margin-right: -5px;"] > :nth-child(1) > .Button__BaseButton-sc-1hmbtsr-0', timeout).click({multiple:true});
      cy.get('[data-testid=input-device_name]', timeout).should('have.value', 'ac Produksi Recipe Per Detik-edit');
      // bug: belum update level sector
      // cy.get('[data-testid=select-sector] > .ant-select-selector', timeout).should('have.contain', 'Gedung 1');
      cy.get('[data-testid=input-location]', timeout).should('have.value', 'auto test');
      cy.get(':nth-child(8) > .ant-form-item > .ant-row > .ant-col > .ant-form-item-control-input > .ant-form-item-control-input-content > [data-testid="input-additional_info"]', timeout)
        .should('not.exist');
      cy.get(':nth-child(10) > .ant-form-item > .ant-row > .ant-col > .ant-form-item-control-input > .ant-form-item-control-input-content > [data-testid="input-additional_info"]', timeout)
        .should('not.exist');
      cy.get('.ant-row-end > .ant-col > .Button__BaseButton-sc-1hmbtsr-0').click({force:true});
      cy.contains('Berhasil', timeout).should('be.visible');
      // back to prev data
      cy.wait(3000);
      cy.get('[style="margin-left: -5px; margin-right: -5px;"] > :nth-child(1) > .Button__BaseButton-sc-1hmbtsr-0', timeout).click();
      cy.get('[data-testid=input-device_name]', timeout).clear().type('ac Produksi Recipe Per Detik');
      cy.get('[data-testid=input-location]', timeout).clear().type('0');
      cy.get('.ant-row-end > .ant-col > .Button__BaseButton-sc-1hmbtsr-0').click({force:true});
    });

    it('Menampilkan notifikasi berhasil dan data detail device berhasil dihapus', () => {
      cy.wait(3000);
      cy.get('[data-testid=select-sector] > .ant-select-selector > .ant-select-selection-item', timeout).click({force:true});
      cy.wait(1000);
      cy.contains('Gedung 1', timeout).click();
      cy.wait(3000);
      // cy.get(':nth-child(2) > a > .sector-card', timeout).click();
      cy.contains('ac Produksi Recipe Per Detik', timeout).click()
      cy.get('[style="margin-left: -5px; margin-right: -5px;"] > :nth-child(1) > .Button__BaseButton-sc-1hmbtsr-0', timeout).click({multiple:true});
      // check data
      cy.get('[data-testid=input-device_name]', timeout).should('have.value', 'ac Produksi Recipe Per Detik');
      // bug: belum update level sector
      // cy.get('[data-testid=select-sector] > .ant-select-selector', timeout).should('have.contain', 'Gedung 1');
      cy.get('[data-testid=input-location]', timeout).should('have.value', '0');
      cy.get(':nth-child(8) > .ant-form-item > .ant-row > .ant-col > .ant-form-item-control-input > .ant-form-item-control-input-content > [data-testid="input-additional_info"]', timeout)
        .should('not.exist');
      cy.get(':nth-child(10) > .ant-form-item > .ant-row > .ant-col > .ant-form-item-control-input > .ant-form-item-control-input-content > [data-testid="input-additional_info"]', timeout)
        .should('not.exist');
      cy.get('.ant-modal-close-x > .anticon > svg').click();
    });
  });
  /*
  describe('Edit Kalibrasi', () => {
    it('Menampilkan form pengisian Edit Kalibrasi yang berisi Nilai Kalibrasi dan informasi Terakhir Diubah', () => {
      cy.wait(3000);
      // cy.get('[data-testid=select-sector] > .ant-select-selector > .ant-select-selection-item', timeout).click({force:true});
      // cy.contains('Gedung 1', timeout).click();
      // cy.get(':nth-child(2) > a > .sector-card', timeout).click();
      // cy.contains('ac Produksi Recipe Per Detik', timeout).click()
      cy.get(':nth-child(2) > .ant-row > :nth-child(2) > .ant-dropdown-trigger', timeout).click({force:true});
      cy.contains('Edit Kalibrasi', timeout).click({force:true});
      cy.get('.DetailCondition__InputNum-z5ehht-1', timeout).clear().type('44').should('have.value', '44');
      cy.get('.ant-row-end > .Button__BaseButton-sc-1hmbtsr-0', timeout).click({force:true});
      cy.contains('Berhasil', timeout).should('be.visible')
    });

    it('Menampilkan notifikasi berhasil dan data edit kalibrasi berhasil disimpan', () => {
      cy.wait(3000);
      // cy.get('[data-testid=select-sector] > .ant-select-selector > .ant-select-selection-item', timeout).click({force:true});
      // cy.contains('Gedung 1', timeout).click();
      // cy.get(':nth-child(2) > a > .sector-card', timeout).click();
      // cy.contains('ac Produksi Recipe Per Detik', timeout).click()
      cy.get(':nth-child(2) > .ant-row > :nth-child(2) > .ant-dropdown-trigger', timeout).click({force:true});
      cy.contains('Edit Kalibrasi', timeout).click({force:true});
      cy.get('.DetailCondition__InputNum-z5ehht-1', timeout).should('have.value', '44');
      var today = new Date();
      var dd = String(today.getDate()).padStart(2, '0');
      var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
      var yyyy = today.getFullYear();
      today = dd + '/' + mm + '/' + yyyy;
      cy.get('p', timeout).should('have.contain', 'Terakhir Diubah: ' + today);
      cy.get('.ant-modal-close-x').click();
    });
  });
  */
  /*
  describe('Export Chart', () => {
    beforeEach(() => {
      cy.visit('/device')
      cy.wait(3000);
      cy.get('[data-testid=select-sector] > .ant-select-selector > .ant-select-selection-item', timeout).click({force:true});
      cy.contains('Gedung 1', timeout).click();
      cy.wait(3000);
      // cy.get(':nth-child(2) > a > .sector-card', timeout).click();
      cy.contains('ac Produksi Recipe Per Detik', timeout).click()
      cy.wait(3000);
      cy.get(':nth-child(2) > .ant-row > :nth-child(2) > .ant-dropdown-trigger > svg', timeout).click();
    });

    it('Export JPG', () => {
      cy.contains('Unduh sebagai JPG', timeout).click({force:true});
      cy.server().should((server) => {
        expect(server.status).to.eq(200);
      });  
    });
    
    it('Export PDF', () => {
      cy.contains('Unduh sebagai PDF', timeout).click({force:true});
      cy.server().should((server) => {
        expect(server.status).to.eq(200);
      });  
    });
  });
  */
  /*
    describe('Anomali Reason', () => {
      it('Read and Update', () => {
        cy.wait(3000);
        cy.get('[data-testid=select-sector] > .ant-select-selector > .ant-select-selection-item', timeout).click({force:true});
        cy.contains('Mixer', timeout).click();
        cy.get(':nth-child(4) > a > .sector-card', timeout).click();
        cy.get(':nth-child(4) > .ant-card-body > .reason-card__container--warning > .reason-card__title--warning', timeout)
          .contains('Sensor Lingkungan 1 - Arus Listrik').should('be.visible');
        cy.get(':nth-child(4) > .ant-card-body > .reason-card__container--warning > :nth-child(2)', timeout)
          .should('be.visible');
        cy.get(':nth-child(4) > .ant-card-body > .reason-card__container--warning > :nth-child(3)', timeout)
          .should('be.visible');
        cy.get(':nth-child(3) > .ant-card-body > .reason-card__container--warning', timeout)
          .click();
        cy.get('#input_reason_reason', timeout).clear().type('auto tes aab 2');
        cy.contains('Submit', timeout).click();
        cy.contains('Data berhasil diperbaharui', timeout).should('be.visible');
        cy.get(':nth-child(3) > .ant-card-body > .reason-card__container--warning', timeout)
          .click();
        cy.get(':nth-child(2) > .input-reason-form__row__field', timeout)
          .should('have.contain', 'Sensor Lingkungan 1 - Arus Listrik');
        cy.get('[style="margin-left: -12px; margin-right: -12px;"] > :nth-child(1) > .input-reason-form__row > .input-reason-form__row__field', timeout)
          .should('be.visible');
        cy.get(':nth-child(2) > .input-reason-form__row > .input-reason-form__row__field', timeout)
          .should('be.visible');
        cy.get('#input_reason_reason', timeout).should('have.value', 'auto tes aab 2');
        cy.get('.ant-modal-close-x', timeout).click();
        cy.get(':nth-child(3) > .ant-card-body > .reason-card__container--warning', timeout)
          .click();
        cy.get('#input_reason_reason', timeout).clear();
        cy.contains('Submit', timeout).click();
        cy.get('.ant-form-item-explain-error', timeout).contains('Keterangan harus diisi');
        cy.get('#input_reason_reason', timeout).type('test');
        cy.contains('Submit', timeout).click();
        cy.contains('Data berhasil diperbaharui', timeout).should('be.visible');
        cy.get(':nth-child(3) > .ant-card-body > .reason-card__container--warning', timeout)
          .click();
        cy.get('#input_reason_reason', timeout).should('have.value', 'test');
        cy.get('.ant-modal-close-x', timeout).click();
      });
    });
  */
});