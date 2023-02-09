/// <reference types="Cypress" />

var timeout = { timeout: 5000 }
const d = new Date();

describe('Dashboard', () => {
  before(() => {
    cy.login('admin');
  });
  
  describe('Semua Sektor', () => {
    it('Card Semua Sektor', () => {
      cy.visit('/');
      cy.wait(3000);
      cy.get('ol > li', timeout).click();
      cy.wait(1000);
      cy.contains('DMIA', timeout).click();
      cy.wait(3000);
      // table
      cy.get('[style="width: 100%;"] > .ant-card-body', timeout).should('be.visible');
      cy.get('[style="width: 100%;"] > .ant-card-body > [style="display: flex; justify-content: space-between;"] > h3', timeout)
      .contains('Akumulasi Energi DMIA');
      cy.get('[style="width: 100%;"] > .ant-card-body > .ant-table-wrapper > .ant-spin-nested-loading > .ant-spin-container > .ant-table > .ant-table-container > .ant-table-content > table > .ant-table-thead > tr > :nth-child(1)', timeout)
      .contains('February 2023')
      cy.get('[style="width: 100%;"] > .ant-card-body > .ant-table-wrapper > .ant-spin-nested-loading > .ant-spin-container > .ant-table > .ant-table-container > .ant-table-content > table > .ant-table-thead > tr > :nth-child(2)', timeout)
      .contains('Target')
      cy.get('[style="width: 100%;"] > .ant-card-body > .ant-table-wrapper > .ant-spin-nested-loading > .ant-spin-container > .ant-table > .ant-table-container > .ant-table-content > table > .ant-table-thead > tr > :nth-child(3)', timeout)
      .contains('Aktual')
      cy.get('[style="width: 100%;"] > .ant-card-body > .ant-table-wrapper > .ant-spin-nested-loading > .ant-spin-container > .ant-table > .ant-table-container > .ant-table-content > table > .ant-table-thead > tr > :nth-child(4)', timeout)
      .contains('Evaluasi')
      cy.get('[style="width: 100%;"] > .ant-card-body > .ant-table-wrapper > .ant-spin-nested-loading > .ant-spin-container > .ant-table > .ant-table-container > .ant-table-content > table > .ant-table-tbody > [data-row-key="daya_hour"] > :nth-child(1)', timeout)
      .contains('Energi')
      cy.get('[style="width: 100%;"] > .ant-card-body > .ant-table-wrapper > .ant-spin-nested-loading > .ant-spin-container > .ant-table > .ant-table-container > .ant-table-content > table > .ant-table-tbody > [data-row-key="index"] > :nth-child(1)', timeout)
      .contains('Index')
      // graphic
      cy.get('canvas', timeout).eq(0).should('be.visible');
      // close
      cy.get('[style="width: 100%;"] > .ant-card-body > [style="display: flex; justify-content: space-between;"] > .ant-btn', timeout)
        .click();
      cy.wait(1000);
      cy.get('body').find('canvas').then((graphic) => {
        var graphicCount = Cypress.$(graphic).length;
        expect(graphicCount).to.be.equal(3)
      })
      // open
      cy.get('[style="width: 100%;"] > .ant-card-body > div > .ant-btn', timeout).click();
      cy.wait(1000);
      cy.get('body').find('canvas').then((graphic) => {
        var graphicCount = Cypress.$(graphic).length;
        expect(graphicCount).to.be.equal(4)
      })
    });
    
    describe('Card Per Gedung', () => {
      it('Gedung 1', () => {
        cy.get('[style="margin-top: 2rem;"]', timeout).contains('Akumulasi Energi Per Gedung')
        cy.get(':nth-child(1) > .ant-card-body > [style=""] > [style="display: flex; justify-content: space-between;"] > h4', timeout)
          .contains('Gedung 1')
        cy.get(':nth-child(1) > .ant-card-body > [style=""] > [style="display: flex; justify-content: space-between;"] > p', timeout)
          .contains('Terakhir Diperbarui : 24/12/20 -10:05')
        cy.get('canvas', timeout).eq(1).should('be.visible')
      });

      it('Gedung 2', () => {
        cy.get(':nth-child(2) > .ant-card-body > [style=""] > [style="display: flex; justify-content: space-between;"] > h4', timeout)
          .contains('Gedung 2')
        cy.get(':nth-child(2) > .ant-card-body > [style=""] > [style="display: flex; justify-content: space-between;"] > p', timeout)
          .contains('Terakhir Diperbarui : 24/12/20 -10:05')
        cy.get('canvas', timeout).eq(2).should('be.visible')
      });

      it('Gedung 3', () => {
        cy.get(':nth-child(3) > .ant-card-body > [style=""] > [style="display: flex; justify-content: space-between;"] > h4', timeout)
          .contains('Gedung 3')
        cy.get(':nth-child(3) > .ant-card-body > [style=""] > [style="display: flex; justify-content: space-between;"] > p', timeout)
          .contains('Terakhir Diperbarui : 24/12/20 -10:05')
        cy.get('canvas', timeout).eq(3).should('be.visible')
      });

      it('Gedung Lain', () => {
        cy.get(':nth-child(4) > .ant-card-body > [style=""] > [style="display: flex; justify-content: space-between;"] > h4', timeout)
          .should('not.exist')
        cy.get(':nth-child(4) > .ant-card-body > [style=""] > [style="display: flex; justify-content: space-between;"] > p', timeout)
          .should('not.exist')
        cy.get('canvas', timeout).eq(4).should('not.exist')
      });
    });
  });

  describe('Sektor Gedung', () => {   
    it('Card Semua Gedung', () => {
      // cy.visit('/');
      // cy.wait(3000);
      cy.get('ol > li', timeout).click();
      cy.wait(1000);
      cy.get(':nth-child(2) > .ant-tree-node-content-wrapper > .ant-tree-title', timeout).click();
      cy.wait(3000);
      // table
      cy.get('[style="width: 100%;"] > .ant-card-body', timeout).should('be.visible');
      cy.get('[style="width: 100%;"] > .ant-card-body > [style="display: flex; justify-content: space-between;"] > h3', timeout)
      .contains('Akumulasi Energi Gedung 1');
      cy.get('[style="width: 100%;"] > .ant-card-body > .ant-table-wrapper > .ant-spin-nested-loading > .ant-spin-container > .ant-table > .ant-table-container > .ant-table-content > table > .ant-table-thead > tr > :nth-child(1)', timeout)
      .contains('February 2023')
      cy.get('[style="width: 100%;"] > .ant-card-body > .ant-table-wrapper > .ant-spin-nested-loading > .ant-spin-container > .ant-table > .ant-table-container > .ant-table-content > table > .ant-table-thead > tr > :nth-child(2)', timeout)
      .contains('Target')
      cy.get('[style="width: 100%;"] > .ant-card-body > .ant-table-wrapper > .ant-spin-nested-loading > .ant-spin-container > .ant-table > .ant-table-container > .ant-table-content > table > .ant-table-thead > tr > :nth-child(3)', timeout)
      .contains('Aktual')
      cy.get('[style="width: 100%;"] > .ant-card-body > .ant-table-wrapper > .ant-spin-nested-loading > .ant-spin-container > .ant-table > .ant-table-container > .ant-table-content > table > .ant-table-thead > tr > :nth-child(4)', timeout)
      .contains('Evaluasi')
      cy.get('[style="width: 100%;"] > .ant-card-body > .ant-table-wrapper > .ant-spin-nested-loading > .ant-spin-container > .ant-table > .ant-table-container > .ant-table-content > table > .ant-table-tbody > [data-row-key="daya_hour"] > :nth-child(1)', timeout)
      .contains('Energi')
      cy.get('[style="width: 100%;"] > .ant-card-body > .ant-table-wrapper > .ant-spin-nested-loading > .ant-spin-container > .ant-table > .ant-table-container > .ant-table-content > table > .ant-table-tbody > [data-row-key="index"] > :nth-child(1)', timeout)
      .contains('Index')
      // graphic
      cy.get('canvas', timeout).eq(0).should('be.visible');
      // close
      cy.get('[style="width: 100%;"] > .ant-card-body > [style="display: flex; justify-content: space-between;"] > .ant-btn', timeout)
        .click();
      cy.wait(1000);
      cy.get('body').find('canvas').then((graphic) => {
        var graphicCount = Cypress.$(graphic).length;
        expect(graphicCount).to.be.equal(3)
      })
      // open
      cy.get('[style="width: 100%;"] > .ant-card-body > div > .ant-btn', timeout).click();
      cy.wait(1000);
      cy.get('body').find('canvas').then((graphic) => {
        var graphicCount = Cypress.$(graphic).length;
        expect(graphicCount).to.be.equal(4)
      })
    });

    it('Card Semua Device', () => {
      // card device
      cy.get(':nth-child(1) > [style="padding: 10px;"]', timeout).contains('Trafo 1 (1000 kVa - 210 Volt)')
      cy.get('[style="display: flex; gap: 20px;"] > :nth-child(2) > div', timeout).contains('Trafo 2 (800 Kva - 380 Volt)')
      // table
      cy.get('[style="width: 100%; margin-top: 20px;"] > .ant-card-body', timeout).should('be.visible');
      cy.get('[style="width: 100%; margin-top: 20px;"] > .ant-card-body > [style="display: flex; justify-content: space-between;"] > h3', timeout)
      .contains('Akumulasi Energi Trafo');
      cy.get('[style="width: 100%; margin-top: 20px;"] > .ant-card-body > .ant-table-wrapper > .ant-spin-nested-loading > .ant-spin-container > .ant-table > .ant-table-container > .ant-table-content > table > .ant-table-thead > tr > :nth-child(1)', timeout)
      .contains('February 2023')
      cy.get('[style="width: 100%; margin-top: 20px;"] > .ant-card-body > .ant-table-wrapper > .ant-spin-nested-loading > .ant-spin-container > .ant-table > .ant-table-container > .ant-table-content > table > .ant-table-thead > tr > :nth-child(2)', timeout)
      .contains('Target')
      cy.get('[style="width: 100%; margin-top: 20px;"] > .ant-card-body > .ant-table-wrapper > .ant-spin-nested-loading > .ant-spin-container > .ant-table > .ant-table-container > .ant-table-content > table > .ant-table-thead > tr > :nth-child(3)', timeout)
      .contains('Aktual')
      cy.get('[style="width: 100%; margin-top: 20px;"] > .ant-card-body > .ant-table-wrapper > .ant-spin-nested-loading > .ant-spin-container > .ant-table > .ant-table-container > .ant-table-content > table > .ant-table-thead > tr > :nth-child(4)', timeout)
      .contains('Evaluasi')
      cy.get('[style="width: 100%; margin-top: 20px;"] > .ant-card-body > .ant-table-wrapper > .ant-spin-nested-loading > .ant-spin-container > .ant-table > .ant-table-container > .ant-table-content > table > .ant-table-tbody > [data-row-key="daya_hour"] > :nth-child(1)', timeout)
      .contains('Energi')
      cy.get('[style="width: 100%; margin-top: 20px;"] > .ant-card-body > .ant-table-wrapper > .ant-spin-nested-loading > .ant-spin-container > .ant-table > .ant-table-container > .ant-table-content > table > .ant-table-tbody > [data-row-key="index"] > :nth-child(1)', timeout)
      .contains('Index')
      // graphic
      cy.get('canvas', timeout).eq(1).should('be.visible');
      // close
      cy.get('[style="width: 100%; margin-top: 20px;"] > .ant-card-body > [style="display: flex; justify-content: space-between;"] > .ant-btn', timeout)
        .click();
      cy.wait(1000);
      cy.get('body').find('canvas').then((graphic) => {
        var graphicCount = Cypress.$(graphic).length;
        expect(graphicCount).to.be.equal(3)
      })
      // open
      cy.get('[style="width: 100%; margin-top: 20px;"] > .ant-card-body > div > .ant-btn', timeout).click();
      cy.wait(1000);
      cy.get('body').find('canvas').then((graphic) => {
        var graphicCount = Cypress.$(graphic).length;
        expect(graphicCount).to.be.equal(4)
      })
    });
    
    describe('Card Per Device', () => {
      it('Device 1', () => {
        // Per Gedung or Per Device
        // cy.get('[style="margin-top: 2rem;"]', timeout).contains('Akumulasi Energi Per Gedung')
        cy.get(':nth-child(1) > .ant-card-body > [style=""] > [style="display: flex; justify-content: space-between;"] > h4', timeout)
          .contains('Trafo 1 (1000 kVa - 210 Volt)')
        cy.get(':nth-child(1) > .ant-card-body > [style=""] > [style="display: flex; justify-content: space-between;"] > p', timeout)
          .contains('Terakhir Diperbarui : 24/12/20 -10:05')
        cy.get('canvas', timeout).eq(2).should('be.visible')
      });

      it('Device 2', () => {
        cy.get(':nth-child(2) > .ant-card-body > [style=""] > [style="display: flex; justify-content: space-between;"] > h4', timeout)
          .contains('Trafo 2 (800 Kva - 380 Volt)')
        cy.get(':nth-child(2) > .ant-card-body > [style=""] > [style="display: flex; justify-content: space-between;"] > p', timeout)
          .contains('Terakhir Diperbarui : 24/12/20 -10:05')
        cy.get('canvas', timeout).eq(3).should('be.visible')
      });

      it('Device Lain', () => {
        cy.get(':nth-child(3) > .ant-card-body > [style=""] > [style="display: flex; justify-content: space-between;"] > h4', timeout)
          .should('not.exist')
        cy.get(':nth-child(3) > .ant-card-body > [style=""] > [style="display: flex; justify-content: space-between;"] > p', timeout)
          .should('not.exist')
        cy.get('canvas', timeout).eq(4).should('not.exist')
      });
    });
  });

  describe('Device Trafo', () => {
    it('Card Semua Mesin', () => {
      cy.get('ol > li', timeout).click();
      cy.wait(1000);
      cy.get(':nth-child(3) > .ant-tree-node-content-wrapper > .ant-tree-title', timeout).click();
      cy.wait(3000);
      // table
      cy.get('[style="width: 100%;"] > .ant-card-body', timeout).should('be.visible');
      cy.get('[style="width: 100%;"] > .ant-card-body > [style="display: flex; justify-content: space-between;"] > h3', timeout)
      .contains('Akumulasi Energi Trafo 1 (1000 kVa - 210 Volt)');
      cy.get('[style="width: 100%;"] > .ant-card-body > .ant-table-wrapper > .ant-spin-nested-loading > .ant-spin-container > .ant-table > .ant-table-container > .ant-table-content > table > .ant-table-thead > tr > :nth-child(1)', timeout)
      .contains('February 2023')
      cy.get('[style="width: 100%;"] > .ant-card-body > .ant-table-wrapper > .ant-spin-nested-loading > .ant-spin-container > .ant-table > .ant-table-container > .ant-table-content > table > .ant-table-thead > tr > :nth-child(2)', timeout)
      .contains('Target')
      cy.get('[style="width: 100%;"] > .ant-card-body > .ant-table-wrapper > .ant-spin-nested-loading > .ant-spin-container > .ant-table > .ant-table-container > .ant-table-content > table > .ant-table-thead > tr > :nth-child(3)', timeout)
      .contains('Aktual')
      cy.get('[style="width: 100%;"] > .ant-card-body > .ant-table-wrapper > .ant-spin-nested-loading > .ant-spin-container > .ant-table > .ant-table-container > .ant-table-content > table > .ant-table-thead > tr > :nth-child(4)', timeout)
      .contains('Evaluasi')
      cy.get('[style="width: 100%;"] > .ant-card-body > .ant-table-wrapper > .ant-spin-nested-loading > .ant-spin-container > .ant-table > .ant-table-container > .ant-table-content > table > .ant-table-tbody > [data-row-key="daya_hour"] > :nth-child(1)', timeout)
      .contains('Energi')
      cy.get('[style="width: 100%;"] > .ant-card-body > .ant-table-wrapper > .ant-spin-nested-loading > .ant-spin-container > .ant-table > .ant-table-container > .ant-table-content > table > .ant-table-tbody > [data-row-key="index"] > :nth-child(1)', timeout)
      .contains('Index')
      // graphic
      cy.get('canvas', timeout).eq(0).should('be.visible');
      // close
      cy.get('[style="width: 100%;"] > .ant-card-body > [style="display: flex; justify-content: space-between;"] > .ant-btn', timeout)
        .click();
      cy.wait(1000);
      cy.get('body').find('canvas').then((graphic) => {
        var graphicCount = Cypress.$(graphic).length;
        expect(graphicCount).to.be.equal(2)
      })
      // open
      cy.get('[style="width: 100%;"] > .ant-card-body > div > .ant-btn', timeout).click();
      cy.wait(1000);
      cy.get('body').find('canvas').then((graphic) => {
        var graphicCount = Cypress.$(graphic).length;
        expect(graphicCount).to.be.equal(3)
      })
    });
    
    describe('Card Per Mesin', () => {
      it('Mesin 1', () => {
        // Bukan Akumulasi Mesin Produksi
        cy.get('[style="margin-top: 2rem;"]', timeout).contains('Mesin Produksi')
        cy.get(':nth-child(1) > .ant-card-body > [style=""] > [style="display: flex; justify-content: space-between;"] > h4', timeout)
          .contains('P/W GS-34 Line 4')
        cy.get(':nth-child(1) > .ant-card-body > [style=""] > [style="display: flex; justify-content: space-between;"] > p', timeout)
          .contains('Terakhir Diperbarui : 24/12/20 -10:05')
        cy.get('canvas', timeout).eq(1).should('be.visible')
      });

      it('Mesin 2', () => {
        cy.get(':nth-child(2) > .ant-card-body > [style=""] > [style="display: flex; justify-content: space-between;"] > h4', timeout)
          .contains('P/W GS-34 Line-6')
        cy.get(':nth-child(2) > .ant-card-body > [style=""] > [style="display: flex; justify-content: space-between;"] > p', timeout)
          .contains('Terakhir Diperbarui : 24/12/20 -10:05')
        cy.get('canvas', timeout).eq(2).should('be.visible')
      });

      it('Mesin Lain', () => {
        cy.get(':nth-child(3) > .ant-card-body > [style=""] > [style="display: flex; justify-content: space-between;"] > h4', timeout)
          .should('not.exist')
        cy.get(':nth-child(3) > .ant-card-body > [style=""] > [style="display: flex; justify-content: space-between;"] > p', timeout)
          .should('not.exist')
        cy.get('canvas', timeout).eq(4).should('not.exist')
      });
    });

    describe('Filter Lainnya', () => {
      it('Search Mesin', () => {
        cy.get('[data-testid="button-sector-filter"]', timeout).click();
        cy.wait(1000);
        cy.get('.ant-input-affix-wrapper', timeout).clear().type('6');
        cy.get('[data-testid="list-device-0"] > label', timeout).contains('P/W GS-34 Line-6');
        cy.get('.SectorFilter__ContainerList-sc-1c2owcv-2', timeout).contains('P/W GS-34 Line 4')
          .should('not.exist');
        // reset
        cy.get('.ant-input-affix-wrapper', timeout).clear();
        cy.get('.SectorFilter__ContainerList-sc-1c2owcv-2', timeout).contains('P/W GS-34 Line 4')
        cy.get('.SectorFilter__ContainerList-sc-1c2owcv-2', timeout).contains('P/W GS-34 Line-6')
      });

      it('Filter Mesin', () => {
        cy.get('[data-testid="list-device-0"]', timeout).click();
        cy.get('[data-testid="ok-filter"]', timeout).click();
        cy.wait(1000);
        cy.contains('P/W GS-34 Line 4', timeout).should('be.visible');
        cy.contains('P/W GS-34 Line-6', timeout).should('not.be.visible');
        cy.get('body').find('canvas').then((graphic) => {
          var graphicCount = Cypress.$(graphic).length;
          expect(graphicCount).to.be.equal(1)
        })
        // reset
        cy.get('[data-testid="button-sector-filter"]', timeout).click();
        cy.wait(1000);
        cy.get('[data-testid="reset-filter"]', timeout).click();
        cy.wait(1000);
        cy.get('[data-testid="button-sector-filter"]', timeout).click();
        cy.contains('P/W GS-34 Line 4', timeout).should('be.visible');
        cy.contains('P/W GS-34 Line-6', timeout).should('be.visible');
        cy.get('body').find('canvas').then((graphic) => {
          var graphicCount = Cypress.$(graphic).length;
          expect(graphicCount).to.be.equal(2)
        })
      })
    });
  });

  describe('Mesin Produksi', () => {
    it('Card Mesin Produksi', () => {
      cy.get('ol > li', timeout).click();
      cy.wait(1000);
      cy.get(':nth-child(4) > .ant-tree-node-content-wrapper > .ant-tree-title', timeout).click();
      cy.wait(3000);
      // table
      cy.get('[style="width: 100%;"] > .ant-card-body', timeout).should('be.visible');
      cy.get('[style="width: 100%;"] > .ant-card-body > [style="display: flex; justify-content: space-between;"] > h3', timeout)
      .contains('Akumulasi Energi P/W GS-34 Line 4');
      cy.get('[style="width: 100%;"] > .ant-card-body > .ant-table-wrapper > .ant-spin-nested-loading > .ant-spin-container > .ant-table > .ant-table-container > .ant-table-content > table > .ant-table-thead > tr > :nth-child(1)', timeout)
      .contains('February 2023')
      cy.get('[style="width: 100%;"] > .ant-card-body > .ant-table-wrapper > .ant-spin-nested-loading > .ant-spin-container > .ant-table > .ant-table-container > .ant-table-content > table > .ant-table-thead > tr > :nth-child(2)', timeout)
      .contains('Target')
      cy.get('[style="width: 100%;"] > .ant-card-body > .ant-table-wrapper > .ant-spin-nested-loading > .ant-spin-container > .ant-table > .ant-table-container > .ant-table-content > table > .ant-table-thead > tr > :nth-child(3)', timeout)
      .contains('Aktual')
      cy.get('[style="width: 100%;"] > .ant-card-body > .ant-table-wrapper > .ant-spin-nested-loading > .ant-spin-container > .ant-table > .ant-table-container > .ant-table-content > table > .ant-table-thead > tr > :nth-child(4)', timeout)
      .contains('Evaluasi')
      cy.get('[style="width: 100%;"] > .ant-card-body > .ant-table-wrapper > .ant-spin-nested-loading > .ant-spin-container > .ant-table > .ant-table-container > .ant-table-content > table > .ant-table-tbody > [data-row-key="daya_hour"] > :nth-child(1)', timeout)
      .contains('Energi')
      cy.get('[style="width: 100%;"] > .ant-card-body > .ant-table-wrapper > .ant-spin-nested-loading > .ant-spin-container > .ant-table > .ant-table-container > .ant-table-content > table > .ant-table-tbody > [data-row-key="index"] > :nth-child(1)', timeout)
      .contains('Index')
      // graphic
      cy.get('canvas', timeout).should('be.visible');
      // close
      cy.get('[style="width: 100%;"] > .ant-card-body > [style="display: flex; justify-content: space-between;"] > .ant-btn', timeout)
        .click();
      cy.wait(1000);
      cy.get('canvas', timeout).should('not.exist');
      // open
      cy.get('[style="width: 100%;"] > .ant-card-body > div > .ant-btn', timeout).click();
      cy.wait(1000);
      cy.get('body').find('canvas').then((graphic) => {
        var graphicCount = Cypress.$(graphic).length;
        expect(graphicCount).to.be.equal(1)
      })
    });
  });
});