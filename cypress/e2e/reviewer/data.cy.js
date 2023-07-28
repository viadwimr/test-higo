/* eslint-disable */
/// <reference types="cypress" />

const timeout = { timeout: 60000 };
const force = { force: true };

describe('Data', () => {
  it('Data Chart Detail Device Sensor', () => {
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
        expect(dataCount1).to.equal(12)
        var i=0
        while (i < dataCount1) {
          var dataValue1 = response.body.data[0].sensor[0].data[i].value
          expect(dataValue1).to.not.equal(0)
          i++
        }
        // temperatur
        const dataCount2 = response.body.data[0].sensor[1].data.length
        expect(dataCount2).to.equal(2)
        var i=0
        while (i < dataCount2) {
          var dataValue2 = response.body.data[0].sensor[1].data[i].value
          expect(dataValue2).to.not.equal(0)
          i++
        }
      })
    })
  })

  it('Data Chart Dashboard Sensor', () => {   
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
  })
})
