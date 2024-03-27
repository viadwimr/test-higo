/* eslint-disable */
/// <reference types="cypress" />

const timeout = { timeout: 60000 };
const force = { force: true };

describe('Data', () => {
  it.skip('Data Chart Detail Device Sensor', () => {
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

  it.skip('Data Chart Dashboard Sensor', () => {   
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

  it.skip('Data Report Sensor', () => {  
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
        url: `https://evomoapi.evomo.id/devices`,
        method: 'GET',
        headers: {    
          'Authorization': `Bearer ${value}`,
          'x-authenticated-scope': 'reviewer',
          'x-authenticated-userid': '6499219756ae08171d10f6da',
          'x-consumer-custom-id': '6481529216833b00104783e4',
        }
      }).then((response) => {  
        // get device id  
        const deviceCount = response.body.data.length
        const deviceIDall=[]
        var deviceLoop=0
        while (deviceLoop < deviceCount) {
          // expect(deviceID).to.be.equal(deviceID)
          var deviceID = response.body.data[deviceLoop].device_id
          deviceIDall.push(deviceID)
          // expect(deviceIDall).to.be.equal(deviceIDall)
          cy.task('setValue', { key: 'deviceIDall', value: deviceIDall })
          deviceLoop++
        }
      })
    })
    cy.wait(1000)

    cy.task('getValue', { key: 'bearerToken' }).then((value) => {
      var bearerToken = value
      var i=0
      cy.task('getValue', { key: 'deviceIDall' }).then((value) => {
        var deviceIDall = value
        var today = new Date()
        today.setDate(today.getDate());
        var lastWeek = new Date();
        lastWeek.setDate(lastWeek.getDate() - 7);
        function formatDate(date){
          return [date.getFullYear(),('0'+(date.getMonth()+1)).slice(-2),('0'+date.getDate()).slice(-2)].join('-');
        }
        while (i < deviceIDall.length) {
          cy.request({
            url: `https://evomoapi.evomo.id/report?device_ids=${deviceIDall[i]}&interval_data=15&indicator=kelembapan&date_start=2024-02-01&date_end=${formatDate(today)}&time_zone=Asia/Jakarta&in_csv=true&waktu=daily&statistic=SUM`,
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${bearerToken}`,
              'x-authenticated-scope': 'reviewer',
              'x-authenticated-userid': '6499219756ae08171d10f6da',
              'x-consumer-custom-id': '6481529216833b00104783e4',
            }
          }).then((response) => { 
            // Average
            // Sector Ancilliary
            // Weekly
            // Device 1 
            // let columns = ["DEVICE","SECTOR","TIME","SENSOR","VALUE","UNIT_VALUE"];
            let value0Minutes = [":00:00,Humidity,0.00"]
            let value15Minutes = [":15:00,Humidity,0.00"]
            let value30Minutes = [":30:00,Humidity,0.00"]
            let value45Minutes = [":45:00,Humidity,0.00"]
            let responseString = response.body.toString();

            // columns.forEach(column => {
            //   expect(responseString.includes(column)).to.be.true;
            // })
            // temperatur
            value0Minutes.forEach(value0Minute => {
              if(responseString.includes(value0Minute)) {
                value15Minutes.forEach(value15Minute => {
                  if(responseString.includes(value15Minute)) {
                    expect(deviceIDall[i]).to.be.equal(deviceIDall[i])
                    expect(i).to.be.equal(i)
                  }
                  // expect(responseString.includes(value15Minute)).to.be.false
                })
                value30Minutes.forEach(value30Minute => {
                  if(responseString.includes(value30Minute)) {
                    expect(deviceIDall[i]).to.be.equal(deviceIDall[i])
                    expect(i).to.be.equal(i)
                  }
                  // expect(responseString.includes(value30Minute)).to.be.false
                })
                value45Minutes.forEach(value45Minute => {
                  if(responseString.includes(value45Minute)) {
                    expect(deviceIDall[i]).to.be.equal(deviceIDall[i])
                    expect(i).to.be.equal(i)
                  }
                  // expect(responseString.includes(value45Minute)).to.be.false
                })
              } else {
                value15Minutes.forEach(value15Minute => {
                  if(responseString.includes(value15Minute)) {
                    value0Minutes.forEach(value0Minute => {
                      if(responseString.includes(value0Minute)) {
                        expect(deviceIDall[i]).to.be.equal(deviceIDall[i])
                        expect(i).to.be.equal(i)
                      }
                      // expect(responseString.includes(value0Minute)).to.be.false
                    })
                    value30Minutes.forEach(value30Minute => {
                      if(responseString.includes(value30Minute)) {
                        expect(deviceIDall[i]).to.be.equal(deviceIDall[i])
                        expect(i).to.be.equal(i)
                      }
                      // expect(responseString.includes(value30Minute)).to.be.false
                    })
                    value45Minutes.forEach(value45Minute => {
                      if(responseString.includes(value45Minute)) {
                        expect(deviceIDall[i]).to.be.equal(deviceIDall[i])
                        expect(i).to.be.equal(i)
                      }
                      // expect(responseString.includes(value45Minute)).to.be.false
                    })
                  } else {
                    value30Minutes.forEach(value30Minute => {
                      if(responseString.includes(value30Minute)) {
                        value0Minutes.forEach(value0Minute => {
                          if(responseString.includes(value0Minute)) {
                            expect(deviceIDall[i]).to.be.equal(deviceIDall[i])
                            expect(i).to.be.equal(i)
                          }
                          // expect(responseString.includes(value0Minute)).to.be.false
                        })
                        value15Minutes.forEach(value15Minute => {
                          if(responseString.includes(value15Minute)) {
                            expect(deviceIDall[i]).to.be.equal(deviceIDall[i])
                            expect(i).to.be.equal(i)
                          }
                          // expect(responseString.includes(value15Minute)).to.be.false
                        })
                        value45Minutes.forEach(value45Minute => {
                          if(responseString.includes(value45Minute)) {
                            expect(deviceIDall[i]).to.be.equal(deviceIDall[i])
                            expect(i).to.be.equal(i)
                          }
                          // expect(responseString.includes(value45Minute)).to.be.false
                        })
                      } else {
                        value45Minutes.forEach(value45Minute => {
                          if(responseString.includes(value45Minute)) {
                            value0Minutes.forEach(value0Minute => {
                              if(responseString.includes(value0Minute)) {
                                expect(deviceIDall[i]).to.be.equal(deviceIDall[i])
                                expect(i).to.be.equal(i)
                              }
                              // expect(responseString.includes(value0Minute)).to.be.false
                            })
                            value30Minutes.forEach(value30Minute => {
                              if(responseString.includes(value30Minute)) {
                                expect(deviceIDall[i]).to.be.equal(deviceIDall[i])
                                expect(i).to.be.equal(i)
                              }
                              // expect(responseString.includes(value30Minute)).to.be.false
                            })
                            value15Minutes.forEach(value15Minute => {
                              if(responseString.includes(value15Minute)) {
                                expect(deviceIDall[i]).to.be.equal(deviceIDall[i])
                                expect(i).to.be.equal(i)
                              }
                              // expect(responseString.includes(value15Minute)).to.be.false
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
          i++
        }
      })
    })
  })

  it('Data Trend Sensor', () => {  
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
        url: `https://evomoapi.evomo.id/devices`,
        method: 'GET',
        headers: {    
          'Authorization': `Bearer ${value}`,
          'x-authenticated-scope': 'reviewer',
          'x-authenticated-userid': '6499219756ae08171d10f6da',
          'x-consumer-custom-id': '6481529216833b00104783e4',
        }
      }).then((response) => {  
        // get device id  
        const deviceCount = response.body.data.length
        const deviceIDall=[]
        var deviceLoop=0
        while (deviceLoop < deviceCount) {
          // expect(deviceID).to.be.equal(deviceID)
          var deviceID = response.body.data[deviceLoop].device_id
          deviceIDall.push(deviceID)
          // expect(deviceIDall).to.be.equal(deviceIDall)
          cy.task('setValue', { key: 'deviceIDall', value: deviceIDall })
          deviceLoop++
        }
      })
    })
    cy.wait(1000)

    cy.task('getValue', { key: 'bearerToken' }).then((value) => {
      var bearerToken = value
      var i=0
      cy.task('getValue', { key: 'deviceIDall' }).then((value) => {
        var deviceIDall = value
        var deviceZeroAll=[]
        var today = new Date()
        today.setDate(today.getDate());
        var lastWeek = new Date();
        lastWeek.setDate(lastWeek.getDate() - 7);
        function formatDate(date){
          return [date.getFullYear(),('0'+(date.getMonth()+1)).slice(-2),('0'+date.getDate()).slice(-2)].join('-');
        }
        while (i < deviceIDall.length) {
          cy.request({
            url: `https://evomoapi.evomo.id/analysis/ems/linechart?seq=0&metric=usage&asset_ids=${deviceIDall[i]}&asset_type=device&indicator=kelembapan&chart_type=linechart&source=ems&statistic=sum&start_date=2024-02-01&end_date=${formatDate(today)}&interval=15m&period=pick&timezone=Asia/Jakarta&tags=&is_share=false`,
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${bearerToken}`,
              'x-authenticated-scope': 'reviewer',
              'x-authenticated-userid': '6499219756ae08171d10f6da',
              'x-consumer-custom-id': '6481529216833b00104783e4',
            }
          }).then((response) => { 
            // humidity
            var assetsCount = response.body.data.assets.length
            var assetsLoop=0
            var deviceZero=0
            // while(assetsLoop<assetsCount) {
              var deviceName = response.body.data.assets[assetsLoop].asset_name
              var valueCount = response.body.data.assets[assetsLoop].data.length
              var valueLoop=0
              while(valueLoop<valueCount-1) {
                var deviceValue = response.body.data.assets[assetsLoop].data[valueLoop].value
                var deviceTime = response.body.data.assets[assetsLoop].data[valueLoop].time
                if(deviceValue>100) { // || deviceValue>100
                  // expect(deviceTime).to.be.equal(deviceTime)
                  // expect(deviceValue).to.be.equal(deviceValue)
                  deviceZero++
                }
                valueLoop++
              }
            //   assetsLoop++
            // }
            if(deviceZero!=0) {
              expect(deviceName).to.be.equal(deviceName)
              deviceZeroAll.push(deviceName)
            }
            cy.log(deviceZeroAll)
            var j=0
            while(j<deviceZeroAll.length) {
              cy.log(deviceZeroAll[j])
              j++
            }
          })
          i++
        }
      })
    })
  })
})
