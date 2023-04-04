/// <reference types="Cypress" />

var timeout = { timeout: 5000 }
const d = new Date();

describe('Dashboard', () => {
  before(() => {
    cy.login('admin');
  });
  
  describe('Data Daily', () => {
    it('Device Level', () => {
      cy.visit('/');
      cy.wait(3000);
      /*
      cy.get('body').find('[data-row-key="daya_hour"] > :nth-child(2) > div')
        .invoke('text').then((text) => {
          const valueEnergyDevice = parseFloat(text.substring(0, text.length - 4).replace(',', '.'))
          const unitEnergyDevice = text.substring(text.length-3, text.length)
          if (unitEnergyDevice == 'GWh') {
            var valueEnergyDevice_Wh = valueEnergyDevice * 1000000000
          } else if (unitEnergyDevice == 'MWh') {
            var valueEnergyDevice_Wh = valueEnergyDevice * 1000000
          } else if (unitEnergyDevice == 'kWh') {
            var valueEnergyDevice_Wh = valueEnergyDevice * 1000
          } else if (unitEnergyDevice == 'Wh') {
            var valueEnergyDevice_Wh = valueEnergyDevice
          }
          //var valueEnergyDeviceTotal = valueEnergyDeviceTotal + valueEnergyDevice_Wh
          expect(valueEnergyDevice_Wh).to.be.at.least(-1)
        })
      */
        
      cy.get('ol > li', timeout).click();
      cy.wait(7000);
      // Device Frequency
      var numberDevice=6
      var valueEnergyDeviceTotal=0
      while (numberDevice <= 26 + 6) {
        // Filter Asset
        cy.get(`:nth-child(${numberDevice}) > .ant-tree-node-content-wrapper`, timeout).click();
        cy.wait(1000);
        // cy.get(".ant-select-selector").realHover('mouse')
        //cy.get('.ant-select-selector', timeout).click();
        // Data Energy
        cy.get('body').find('[data-row-key="daya_hour"] > :nth-child(3)')
        .invoke('text').then((text) => {
          const textIndex = text.length - text.indexOf(" ")
          if (textIndex == 4) {
            var valueEnergyDevice = parseFloat(text.substring(0, text.length - 4).replace(',', '.'))
          } else if (textIndex == 3) {
            var valueEnergyDevice = parseFloat(text.substring(0, text.length - 3).replace(',', '.'))
          }
          const unitEnergyDevice = text.substring(text.length-3, text.length)
          if (unitEnergyDevice == 'GWh') {
            var valueEnergyDevice_Wh = valueEnergyDevice * 1000000000
          } else if (unitEnergyDevice == 'MWh') {
            var valueEnergyDevice_Wh = valueEnergyDevice * 1000000
          } else if (unitEnergyDevice == 'kWh') {
            var valueEnergyDevice_Wh = valueEnergyDevice * 1000
          } else {
            var valueEnergyDevice_Wh = valueEnergyDevice
          }
          valueEnergyDeviceTotal = valueEnergyDeviceTotal + valueEnergyDevice_Wh
          expect(valueEnergyDeviceTotal).to.be.at.least(-1)
        })
        numberDevice++
      }

      // Filter Asset (Mesin Produksi Gedung 1)
      cy.get(`:nth-child(5) > .ant-tree-node-content-wrapper`, timeout).click();
      cy.wait(3000);
      // Data Energy
      cy.get('body').find('[data-row-key="daya_hour"] > :nth-child(3)')
      .invoke('text').then((text) => {
        const textIndex = text.length - text.indexOf(" ")
        if (textIndex == 4) {
          var valueEnergyMP1 = parseFloat(text.substring(0, text.length - 4).replace(',', '.'))
        } else if (textIndex == 3) {
          var valueEnergyMP1 = parseFloat(text.substring(0, text.length - 3).replace(',', '.'))
        }
        const unitEnergyMP1 = text.substring(text.length-3, text.length)
        if (unitEnergyMP1 == 'GWh') {
          var valueEnergyMP1_Wh = valueEnergyMP1 * 1000000000
        } else if (unitEnergyMP1 == 'MWh') {
          var valueEnergyMP1_Wh = valueEnergyMP1 * 1000000
        } else if (unitEnergyMP1 == 'kWh') {
          var valueEnergyMP1_Wh = valueEnergyMP1 * 1000
        } else if (unitEnergyMP1 == 'Wh') {
          var valueEnergyMP1_Wh = valueEnergyMP1
        }
        valueEnergyMP1 = valueEnergyMP1_Wh
        expect(valueEnergyDeviceTotal).to.be.within(valueEnergyMP1-10000,valueEnergyMP1+10000)
        //expect(valueEnergyMP1).to.be.equal(valueEnergyDeviceTotal)
      })
      
    });

    it('Asset Level', () => {
      cy.visit('/');
      cy.wait(3000);
      cy.get('ol > li', timeout).click();
      cy.wait(1000);
      // Asset: Fasilitas Gedung 1
      cy.get(`:nth-child(4) > .ant-tree-node-content-wrapper`, timeout).click();
      cy.wait(3000);
      // Data Energy
      cy.get('body').find('[data-row-key="daya_hour"] > :nth-child(3)')
      .invoke('text').then((text) => {
        const textIndex = text.length - text.indexOf(" ")
        if (textIndex == 4) {
          var valueEnergyF1 = parseFloat(text.substring(0, text.length - 4).replace(',', '.'))
        } else if (textIndex == 3) {
          var valueEnergyF1 = parseFloat(text.substring(0, text.length - 3).replace(',', '.'))
        }
        // expect(valueEnergyF1).to.be.at.least(-1)
        // expect(valueEnergyF1_Wh).to.be.at.least(-1)
        const unitEnergyF1 = text.substring(text.length-3, text.length)
        //expect(unitEnergyF1).to.be.at.least(-1)
        if (unitEnergyF1 == 'GWh') {
          var valueEnergyF1_Wh = valueEnergyF1 * 1000000000
        } else if (unitEnergyF1 == 'MWh') {
          var valueEnergyF1_Wh = valueEnergyF1 * 1000000
        } else if (unitEnergyF1 == 'kWh') {
          var valueEnergyF1_Wh = valueEnergyF1 * 1000
        } else if (unitEnergyF1 == 'Wh') {
          var valueEnergyF1_Wh = valueEnergyF1
        } else if (unitEnergyF1 == ' Wh') {
          var valueEnergyF1_Wh = valueEnergyF1
        }
 
        valueEnergyF1 = valueEnergyF1_Wh
        expect(valueEnergyF1).to.be.at.least(-1)
        cy.task('setValue', { key: 'valueEnergyF1', value: valueEnergyF1 })
      })
      // Asset: Mesin Produksi Gedung 1
      cy.get(`:nth-child(5) > .ant-tree-node-content-wrapper`, timeout).click();
      cy.wait(3000);
      // Data Energy
      cy.get('body').find('[data-row-key="daya_hour"] > :nth-child(3)')
      .invoke('text').then((text) => {
        const textIndex = text.length - text.indexOf(" ")
        if (textIndex == 4) {
          var valueEnergyMP1 = parseFloat(text.substring(0, text.length - 4).replace(',', '.'))
        } else if (textIndex == 3) {
          var valueEnergyMP1 = parseFloat(text.substring(0, text.length - 3).replace(',', '.'))
        }
        const unitEnergyMP1 = text.substring(text.length-3, text.length)
        if (unitEnergyMP1 == 'GWh') {
          var valueEnergyMP1_Wh = valueEnergyMP1 * 1000000000
        } else if (unitEnergyMP1 == 'MWh') {
          var valueEnergyMP1_Wh = valueEnergyMP1 * 1000000
        } else if (unitEnergyMP1 == 'kWh') {
          var valueEnergyMP1_Wh = valueEnergyMP1 * 1000
        } else if (unitEnergyMP1 == 'Wh') {
          var valueEnergyMP1_Wh = valueEnergyMP1
        }
        valueEnergyMP1 = valueEnergyMP1_Wh
        expect(valueEnergyMP1).to.be.at.least(-1)
        cy.task('setValue', { key: 'valueEnergyMP1', value: valueEnergyMP1 })
      })

      // Bulding: Gedung 1
      cy.get(`:nth-child(3) > .ant-tree-node-content-wrapper`, timeout).click();
      cy.wait(10000);
      // Data Energy
      cy.get('body').find('[style="width: 100%;"] > .ant-card-body > [data-testid="data-chart"] > .DetailChart__TableWrapper-fb3pmn-0 > [style="width: 60%;"] > .ant-spin-nested-loading > .ant-spin-container > [data-testid="table"] > .ant-table-container > .ant-table-content > table > .ant-table-tbody > [data-row-key="daya_hour"] > :nth-child(3)')
      .invoke('text').then((text) => {
        const textIndex = text.length - text.indexOf(" ")
        if (textIndex == 4) {
          var valueEnergyG1 = parseFloat(text.substring(0, text.length - 4).replace(',', '.'))
        } else if (textIndex == 3) {
          var valueEnergyG1 = parseFloat(text.substring(0, text.length - 3).replace(',', '.'))
        }
        const unitEnergyG1 = text.substring(text.length-3, text.length)
        if (unitEnergyG1 == 'GWh') {
          var valueEnergyG1_Wh = valueEnergyG1 * 1000000000
        } else if (unitEnergyG1 == 'MWh') {
          var valueEnergyG1_Wh = valueEnergyG1 * 1000000
        } else if (unitEnergyG1 == 'kWh') {
          var valueEnergyG1_Wh = valueEnergyG1 * 1000
        } else if (unitEnergyG1 == 'Wh') {
          var valueEnergyG1_Wh = valueEnergyG1
        }
        valueEnergyG1 = valueEnergyG1_Wh
        expect(valueEnergyG1).to.be.at.least(-1)

        // Akumulasi Asset
        cy.task('getValue', { key: 'valueEnergyMP1' }).then((value) => {
          var valueEnergyMP1 = value
          cy.task('getValue', { key: 'valueEnergyF1' }).then((value) => {
            var valueEnergyF1 = value
            var assetEnergyTotal = valueEnergyMP1 + valueEnergyF1
            expect(assetEnergyTotal).to.be.within(valueEnergyG1-10000,valueEnergyG1+10000)
          })
        })
      })
    });

    it('Building Level', () => {
      cy.visit('/');
      cy.wait(3000);
      cy.get('ol > li', timeout).click();
      cy.wait(1000);
      // Building: Gedung 1
      cy.get(`:nth-child(3) > .ant-tree-node-content-wrapper`, timeout).click();
      cy.wait(3000);
      // Data Energy
      cy.get('body').find('[style="width: 100%;"] > .ant-card-body > [data-testid="data-chart"] > .DetailChart__TableWrapper-fb3pmn-0 > [style="width: 60%;"] > .ant-spin-nested-loading > .ant-spin-container > [data-testid="table"] > .ant-table-container > .ant-table-content > table > .ant-table-tbody > [data-row-key="daya_hour"] > :nth-child(3)')
      .invoke('text').then((text) => {
        const textIndex = text.length - text.indexOf(" ")
        if (textIndex == 4) {
          var valueEnergyG1 = parseFloat(text.substring(0, text.length - 4).replace(',', '.'))
        } else if (textIndex == 3) {
          var valueEnergyG1 = parseFloat(text.substring(0, text.length - 3).replace(',', '.'))
        }
        // expect(valueEnergyF1).to.be.at.least(-1)
        // expect(valueEnergyF1_Wh).to.be.at.least(-1)
        const unitEnergyG1 = text.substring(text.length-3, text.length)
        //expect(unitEnergyF1).to.be.at.least(-1)
        if (unitEnergyG1 == 'GWh') {
          var valueEnergyG1_Wh = valueEnergyG1 * 1000000000
        } else if (unitEnergyG1 == 'MWh') {
          var valueEnergyG1_Wh = valueEnergyG1 * 1000000
        } else if (unitEnergyG1 == 'kWh') {
          var valueEnergyG1_Wh = valueEnergyG1 * 1000
        } else if (unitEnergyG1 == 'Wh') {
          var valueEnergyG1_Wh = valueEnergyG1
        } else if (unitEnergyG1 == ' Wh') {
          var valueEnergyG1_Wh = valueEnergyG1
        }
 
        valueEnergyG1 = valueEnergyG1_Wh
        expect(valueEnergyG1).to.be.at.least(-1)
        cy.task('setValue', { key: 'valueEnergyG1', value: valueEnergyG1 })
      })
      // Building: Gedung 2
      cy.get(`:nth-child(33) > .ant-tree-node-content-wrapper`, timeout).click();
      cy.wait(3000);
      // Data Energy
      cy.get('body').find('[style="width: 100%;"] > .ant-card-body > [data-testid="data-chart"] > .DetailChart__TableWrapper-fb3pmn-0 > [style="width: 60%;"] > .ant-spin-nested-loading > .ant-spin-container > [data-testid="table"] > .ant-table-container > .ant-table-content > table > .ant-table-tbody > [data-row-key="daya_hour"] > :nth-child(3)')
      .invoke('text').then((text) => {
        const textIndex = text.length - text.indexOf(" ")
        if (textIndex == 4) {
          var valueEnergyG2 = parseFloat(text.substring(0, text.length - 4).replace(',', '.'))
        } else if (textIndex == 3) {
          var valueEnergyG2 = parseFloat(text.substring(0, text.length - 3).replace(',', '.'))
        }
        const unitEnergyG2 = text.substring(text.length-3, text.length)
        if (unitEnergyG2 == 'GWh') {
          var valueEnergyG2_Wh = valueEnergyG2 * 1000000000
        } else if (unitEnergyG2 == 'MWh') {
          var valueEnergyG2_Wh = valueEnergyG2 * 1000000
        } else if (unitEnergyG2 == 'kWh') {
          var valueEnergyG2_Wh = valueEnergyG2 * 1000
        } else if (unitEnergyG2 == 'Wh') {
          var valueEnergyG2_Wh = valueEnergyG2
        } else if (unitEnergyG2 == ' Wh') {
          var valueEnergyG2_Wh = valueEnergyG2
        }
        valueEnergyG2 = valueEnergyG2_Wh
        expect(valueEnergyG2).to.be.at.least(-1)
        cy.task('setValue', { key: 'valueEnergyG2', value: valueEnergyG2 })
      })

      // Building: Gedung 3
      cy.get(`:nth-child(36) > .ant-tree-node-content-wrapper`, timeout).click();
      cy.wait(3000);
      // Data Energy
      cy.get('body').find('[style="width: 100%;"] > .ant-card-body > [data-testid="data-chart"] > .DetailChart__TableWrapper-fb3pmn-0 > [style="width: 60%;"] > .ant-spin-nested-loading > .ant-spin-container > [data-testid="table"] > .ant-table-container > .ant-table-content > table > .ant-table-tbody > [data-row-key="daya_hour"] > :nth-child(3)')
      .invoke('text').then((text) => {
        const textIndex = text.length - text.indexOf(" ")
        if (textIndex == 4) {
          var valueEnergyG3 = parseFloat(text.substring(0, text.length - 4).replace(',', '.'))
        } else if (textIndex == 3) {
          var valueEnergyG3 = parseFloat(text.substring(0, text.length - 3).replace(',', '.'))
        }
        const unitEnergyG3 = text.substring(text.length-3, text.length)
        if (unitEnergyG3 == 'GWh') {
          var valueEnergyG3_Wh = valueEnergyG3 * 1000000000
        } else if (unitEnergyG3 == 'MWh') {
          var valueEnergyG3_Wh = valueEnergyG3 * 1000000
        } else if (unitEnergyG3 == 'kWh') {
          var valueEnergyG3_Wh = valueEnergyG3 * 1000
        } else if (unitEnergyG3 == 'Wh') {
          var valueEnergyG3_Wh = valueEnergyG3
        } else if (unitEnergyG3 == ' Wh') {
          var valueEnergyG3_Wh = valueEnergyG3
        }
        valueEnergyG3 = valueEnergyG3_Wh
        expect(valueEnergyG3).to.be.at.least(-1)
        cy.task('setValue', { key: 'valueEnergyG3', value: valueEnergyG3 })
      })

      // Plant: DMIA 1
      cy.get(`:nth-child(2) > .ant-tree-node-content-wrapper`, timeout).click();
      cy.wait(10000);
      // Data Energy
      cy.get('body').find('[style="width: 100%;"] > .ant-card-body > [data-testid="data-chart"] > .DetailChart__TableWrapper-fb3pmn-0 > [style="width: 60%;"] > .ant-spin-nested-loading > .ant-spin-container > [data-testid="table"] > .ant-table-container > .ant-table-content > table > .ant-table-tbody > [data-row-key="daya_hour"] > :nth-child(3)')
      .invoke('text').then((text) => {
        const textIndex = text.length - text.indexOf(" ")
        if (textIndex == 4) {
          var valueEnergyD1 = parseFloat(text.substring(0, text.length - 4).replace(',', '.'))
        } else if (textIndex == 3) {
          var valueEnergyD1 = parseFloat(text.substring(0, text.length - 3).replace(',', '.'))
        }
        const unitEnergyD1 = text.substring(text.length-3, text.length)
        if (unitEnergyD1 == 'GWh') {
          var valueEnergyD1_Wh = valueEnergyD1 * 1000000000
        } else if (unitEnergyD1 == 'MWh') {
          var valueEnergyD1_Wh = valueEnergyD1 * 1000000
        } else if (unitEnergyD1 == 'kWh') {
          var valueEnergyD1_Wh = valueEnergyD1 * 1000
        } else if (unitEnergyD1 == 'Wh') {
          var valueEnergyD1_Wh = valueEnergyD1
        } else if (unitEnergyD1 == ' Wh') {
          var valueEnergyD1_Wh = valueEnergyD1
        }
        valueEnergyD1 = valueEnergyD1_Wh
        expect(valueEnergyD1).to.be.at.least(-1)

        // Akumulasi Building
        cy.task('getValue', { key: 'valueEnergyG1' }).then((value) => {
          var valueEnergyG1 = value
          cy.task('getValue', { key: 'valueEnergyG2' }).then((value) => {
            var valueEnergyG2 = value
            cy.task('getValue', { key: 'valueEnergyG3' }).then((value) => {
              var valueEnergyG3 = value
              var buildingEnergyTotal = valueEnergyG1 + valueEnergyG2 + valueEnergyG3
              expect(buildingEnergyTotal).to.be.within(valueEnergyD1-10000,valueEnergyD1+10000)
            })
          })
        })
      })
    });

    it('Plant Level', () => {
      cy.visit('/');
      cy.wait(3000);
      cy.get('ol > li', timeout).click();
      cy.wait(1000);
      // Plant: DMIA 1
      cy.get(`:nth-child(2) > .ant-tree-node-content-wrapper`, timeout).click();
      cy.wait(3000);
      // Data Energy
      cy.get('body').find('[style="width: 100%;"] > .ant-card-body > [data-testid="data-chart"] > .DetailChart__TableWrapper-fb3pmn-0 > [style="width: 60%;"] > .ant-spin-nested-loading > .ant-spin-container > [data-testid="table"] > .ant-table-container > .ant-table-content > table > .ant-table-tbody > [data-row-key="daya_hour"] > :nth-child(3)')
      .invoke('text').then((text) => {
        const textIndex = text.length - text.indexOf(" ")
        if (textIndex == 4) {
          var valueEnergyD1 = parseFloat(text.substring(0, text.length - 4).replace(',', '.'))
        } else if (textIndex == 3) {
          var valueEnergyD1 = parseFloat(text.substring(0, text.length - 3).replace(',', '.'))
        }
        // expect(valueEnergyF1).to.be.at.least(-1)
        // expect(valueEnergyF1_Wh).to.be.at.least(-1)
        const unitEnergyD1 = text.substring(text.length-3, text.length)
        //expect(unitEnergyF1).to.be.at.least(-1)
        if (unitEnergyD1 == 'GWh') {
          var valueEnergyD1_Wh = valueEnergyD1 * 1000000000
        } else if (unitEnergyD1 == 'MWh') {
          var valueEnergyD1_Wh = valueEnergyD1 * 1000000
        } else if (unitEnergyD1 == 'kWh') {
          var valueEnergyD1_Wh = valueEnergyD1 * 1000
        } else if (unitEnergyD1 == 'Wh') {
          var valueEnergyD1_Wh = valueEnergyD1
        } else if (unitEnergyD1 == ' Wh') {
          var valueEnergyD1_Wh = valueEnergyD1
        }
 
        valueEnergyD1 = valueEnergyD1_Wh
        expect(valueEnergyD1).to.be.at.least(-1)
        cy.task('setValue', { key: 'valueEnergyD1', value: valueEnergyD1 })
      })
      //  Plant: DMIA 2
      cy.get(`:nth-child(40) > .ant-tree-node-content-wrapper`, timeout).click();
      cy.wait(3000);
      // Data Energy
      cy.get('body').find('[style="width: 100%;"] > .ant-card-body > [data-testid="data-chart"] > .DetailChart__TableWrapper-fb3pmn-0 > [style="width: 60%;"] > .ant-spin-nested-loading > .ant-spin-container > [data-testid="table"] > .ant-table-container > .ant-table-content > table > .ant-table-tbody > [data-row-key="daya_hour"] > :nth-child(3)')
      .invoke('text').then((text) => {
        const textIndex = text.length - text.indexOf(" ")
        if (textIndex == 4) {
          var valueEnergyD2 = parseFloat(text.substring(0, text.length - 4).replace(',', '.'))
        } else if (textIndex == 3) {
          var valueEnergyD2 = parseFloat(text.substring(0, text.length - 3).replace(',', '.'))
        }
        const unitEnergyD2 = text.substring(text.length-3, text.length)
        if (unitEnergyD2 == 'GWh') {
          var valueEnergyD2_Wh = valueEnergyD2 * 1000000000
        } else if (unitEnergyD2 == 'MWh') {
          var valueEnergyD2_Wh = valueEnergyD2 * 1000000
        } else if (unitEnergyD2 == 'kWh') {
          var valueEnergyD2_Wh = valueEnergyD2 * 1000
        } else if (unitEnergyD2 == 'Wh') {
          var valueEnergyD2_Wh = valueEnergyD2
        } else if (unitEnergyD2 == ' Wh') {
          var valueEnergyD2_Wh = valueEnergyD2
        }
        valueEnergyD2 = valueEnergyD2_Wh
        expect(valueEnergyD2).to.be.at.least(-1)
        cy.task('setValue', { key: 'valueEnergyD2', value: valueEnergyD2 })
      })

      // Main: DMIA
      cy.get(`:nth-child(1) > .ant-tree-node-content-wrapper`, timeout).click();
      cy.wait(10000);
      // Data Energy
      cy.get('body').find('[style="width: 100%;"] > .ant-card-body > [data-testid="data-chart"] > .DetailChart__TableWrapper-fb3pmn-0 > [style="width: 60%;"] > .ant-spin-nested-loading > .ant-spin-container > [data-testid="table"] > .ant-table-container > .ant-table-content > table > .ant-table-tbody > [data-row-key="daya_hour"] > :nth-child(3)')
      .invoke('text').then((text) => {
        const textIndex = text.length - text.indexOf(" ")
        if (textIndex == 4) {
          var valueEnergyDMIA = parseFloat(text.substring(0, text.length - 4).replace(',', '.'))
        } else if (textIndex == 3) {
          var valueEnergyDMIA = parseFloat(text.substring(0, text.length - 3).replace(',', '.'))
        }
        const unitEnergyDMIA = text.substring(text.length-3, text.length)
        if (unitEnergyDMIA == 'GWh') {
          var valueEnergyDMIA_Wh = valueEnergyDMIA * 1000000000
        } else if (unitEnergyDMIA == 'MWh') {
          var valueEnergyDMIA_Wh = valueEnergyDMIA * 1000000
        } else if (unitEnergyDMIA == 'kWh') {
          var valueEnergyDMIA_Wh = valueEnergyDMIA * 1000
        } else if (unitEnergyDMIA == 'Wh') {
          var valueEnergyDMIA_Wh = valueEnergyDMIA
        } else if (unitEnergyDMIA == ' Wh') {
          var valueEnergyDMIA_Wh = valueEnergyDMIA
        }
        valueEnergyDMIA = valueEnergyDMIA_Wh
        expect(valueEnergyDMIA).to.be.at.least(-1)

        // Akumulasi Asset
        cy.task('getValue', { key: 'valueEnergyD1' }).then((value) => {
          var valueEnergyD1 = value
          cy.task('getValue', { key: 'valueEnergyD2' }).then((value) => {
            var valueEnergyD2 = value
            var plantEnergyTotal = valueEnergyD1 + valueEnergyD2
            expect(plantEnergyTotal).to.be.within(valueEnergyDMIA-10000,valueEnergyDMIA+10000)
          })
        })
      })
    });
  });
});