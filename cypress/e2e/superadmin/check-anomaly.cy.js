/// <reference types="Cypress" />

const timeout = { timeout: 6000 };
const force = { force: true };
const d = new Date();

describe('Usage Pelanggan', () => {
  before(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
  });

  beforeEach(() => {
    cy.visit('/');
    cy.get('#username', timeout).type('admin');
    cy.get('#password', timeout).type('jastir-762!')
    cy.get('.v-card__actions > .v-btn', timeout).click();
    cy.wait(3000);
  });

  it('Detect anomaly', () => {
    cy.get(':nth-child(10) > .v-list-item__content', timeout).click();
    const thisDate = new Date();
    const thisMonth = thisDate.getMonth();
    var monthLoop=1
    while(monthLoop<=thisMonth+1) {
      cy.wait(3000);
      cy.get('.v-data-footer__select > .v-input > .v-input__control > .v-input__slot > .v-select__slot', timeout).click();
      cy.contains('All', timeout).click();
      cy.wait(5000)
      cy.get('.about > :nth-child(1) > :nth-child(1) > :nth-child(2)').find(':nth-child(6)').then((usageRow) => {
        var usageRowCount = Cypress.$(usageRow).length-4
        var usageRowLoop=1
        while(usageRowLoop<=usageRowCount) {
          cy.get('body').find(`tbody > :nth-child(${usageRowLoop}) > :nth-child(6)`).invoke('text').then((text) => {
            var usageValue = parseInt(text.replace(',',''))
            expect(usageValue).to.be.at.least(0)
          })
          // cy.wait(10)
          usageRowLoop++
        }
      })

      if(11 + thisMonth - monthLoop>=11) {
        cy.get('.vjsf-property-bulan > .v-input > .v-input__control', timeout).click();
        cy.wait(1000);
        cy.get('.v-list-item__content > .v-list-item__title', timeout).eq(11 + thisMonth - monthLoop).click();
      }
      monthLoop++;
    }
  })

  it('List anomaly', () => {
    cy.get(':nth-child(10) > .v-list-item__content', timeout).click();
    const thisDate = new Date();
    const thisMonth = thisDate.getMonth();
    let monthLoop = 0;
    const listAnomalyValue = [];
    cy.task('setValue', { key: 'listAnomalyValue', value: listAnomalyValue })
    const listAnomalyDeviceName = [];
    cy.task('setValue', { key: 'listAnomalyDeviceName', value: listAnomalyDeviceName })
    const listAnomalyDate = [];
    cy.task('setValue', { key: 'listAnomalyDate', value: listAnomalyDate })
    
    while(monthLoop <= thisMonth+1) {
      cy.wait(3000);
      cy.get('.v-data-footer__select > .v-input > .v-input__control > .v-input__slot > .v-select__slot', timeout).click();
      cy.wait(1000);
      cy.get('.v-list-item__content > .v-list-item__title', timeout).eq(10).click();
      cy.wait(5000);
      
      cy.get('.about > :nth-child(1) > :nth-child(1) > :nth-child(2)').find(':nth-child(6)').then((usageRow) => {
        const usageRowCount = Cypress.$(usageRow).length - 4;
        for (let usageRowLoop = 1; usageRowLoop <= usageRowCount; usageRowLoop++) {
          cy.get(`tbody > :nth-child(${usageRowLoop}) > :nth-child(6)`).invoke('text').then((text) => {
            const usageValue = parseInt(text.replace(',', ''));
            if (usageValue < 0) {
              listAnomalyValue.push(usageValue);
              cy.task('setValue', { key: 'listAnomalyValue', value: listAnomalyValue })
              cy.get(`tbody > :nth-child(${usageRowLoop}) > :nth-child(1)`).invoke('text').then((text) => {
                listAnomalyDeviceName.push(text);
                cy.task('setValue', { key: 'listAnomalyDeviceName', value: listAnomalyDeviceName })
              });
              cy.get(`tbody > :nth-child(${usageRowLoop}) > :nth-child(3)`).invoke('text').then((text) => {
                listAnomalyDate.push(text);
                cy.task('setValue', { key: 'listAnomalyDate', value: listAnomalyDate })
              });
            }
          });
        }
      });
      
      if(11 + thisMonth - monthLoop>=11) {
        cy.get('.vjsf-property-bulan > .v-input > .v-input__control', timeout).click();
        cy.wait(1000);
        cy.get('.v-list-item__content > .v-list-item__title', timeout).eq(11 + thisMonth - monthLoop).click();
      }
      monthLoop++;
    }
    cy.task('getValue', { key: 'listAnomalyDeviceName' }).then((listAnomalyDeviceName) => {
      cy.task('getValue', { key: 'listAnomalyValue' }).then((listAnomalyValue) => {
        cy.task('getValue', { key: 'listAnomalyDate' }).then((listAnomalyDate) => {
          var i=0;
          while(i<listAnomalyDate.length) {
            cy.log(`${listAnomalyDeviceName[i]} tgl ${listAnomalyDate[i]}: ${listAnomalyValue[i]}`);
            i++
          }     
        })
      })
    })

    cy.task('getValue', { key: 'listAnomalyDeviceName' }).then((listAnomalyDeviceName) => {
      expect(listAnomalyDeviceName.length).to.be.equal(0);
    })
  });
  
})