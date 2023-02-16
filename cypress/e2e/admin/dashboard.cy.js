/// <reference types="Cypress" />

var timeout = { timeout: 5000 }
const d = new Date();

describe('Dashboard', () => {
  before(() => {
    cy.login('admin');
  });
  
  describe('Melihat halaman utama Dashboard Energy Monitoring (Sector View)', () => {
    it('Menampilkan tabel Akumulasi Energi DMIA seperti informasi target, aktual dan evaluasinya per indikator yaitu Energi dan Index', () => {
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
    });

    it('Menampilkan grafik bar Energi (dalam satuan kWh) dan Index (satuan %) DMIA yaitu Aktual Energi, Target Energi, Aktual Energi Berjalan, Aktual Index, Target Index, dan Target Energi per bulannya dalam setahun serta terdapat bar nilai average di ujung kanan grafik.', () => {
      // graphic
      cy.get('canvas', timeout).eq(0).should('be.visible');
      // close
      cy.get('[style="width: 100%;"] > .ant-card-body > [style="display: flex; justify-content: space-between;"] > .ant-btn', timeout)
        .click();
      cy.wait(3000);
      cy.get('body').find('canvas').then((graphic) => {
        var graphicCount = Cypress.$(graphic).length;
        expect(graphicCount).to.be.equal(3)
      })
      // open
      cy.get('[style="width: 100%;"] > .ant-card-body > div > .ant-btn', timeout).click();
      cy.wait(3000);
      cy.get('body').find('canvas').then((graphic) => {
        var graphicCount = Cypress.$(graphic).length;
        expect(graphicCount).to.be.equal(4)
      })
    });

    it('Menampilkan Akumulasi Energi Per Gedung yaitu Gedung 1, Gedung 2, dan Gedung 3. Dan setiap gedung terdapat informasi Terakhir Diperbarui dan grafik bar Energi (dalam satuan kWh) dan Index (satuan %) per bulannya dalam setahun serta terdapat bar nilai average di ujung kanan grafik.', () => {
      cy.get('[style="margin-top: 2rem;"]', timeout).contains('Akumulasi Energi Per Gedung')
      // Gedung 1
      cy.get(':nth-child(1) > .ant-card-body > [style=""] > [style="display: flex; justify-content: space-between;"] > h4', timeout)
        .contains('Gedung 1')
      cy.get(':nth-child(1) > .ant-card-body > [style=""] > [style="display: flex; justify-content: space-between;"] > p', timeout)
        .contains('Terakhir Diperbarui : 24/12/20 -10:05')
      cy.get('canvas', timeout).eq(1).should('be.visible')
      // Gedung 2
      cy.get(':nth-child(2) > .ant-card-body > [style=""] > [style="display: flex; justify-content: space-between;"] > h4', timeout)
      .contains('Gedung 2')
      cy.get(':nth-child(2) > .ant-card-body > [style=""] > [style="display: flex; justify-content: space-between;"] > p', timeout)
        .contains('Terakhir Diperbarui : 24/12/20 -10:05')
      cy.get('canvas', timeout).eq(2).should('be.visible')
      // Gedung 3
      cy.get(':nth-child(3) > .ant-card-body > [style=""] > [style="display: flex; justify-content: space-between;"] > h4', timeout)
        .contains('Gedung 3')
      cy.get(':nth-child(3) > .ant-card-body > [style=""] > [style="display: flex; justify-content: space-between;"] > p', timeout)
        .contains('Terakhir Diperbarui : 24/12/20 -10:05')
      cy.get('canvas', timeout).eq(3).should('be.visible')
      // check for the other gedung
      cy.get(':nth-child(4) > .ant-card-body > [style=""] > [style="display: flex; justify-content: space-between;"] > h4', timeout)
      .should('not.exist')
      cy.get(':nth-child(4) > .ant-card-body > [style=""] > [style="display: flex; justify-content: space-between;"] > p', timeout)
        .should('not.exist')
      cy.get('canvas', timeout).eq(4).should('not.exist')
    });
  });

  describe('Melihat halaman utama Dashboard Energy Monitoring (Gedung View)', () => {   
    it('Menampilkan tabel Akumulasi Energi Gedung 1 seperti informasi target, aktual dan evaluasinya per indikator yaitu Energi dan Index', () => {
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
    });

    it('Menampilkan grafik bar Energi (dalam satuan kWh) dan Index (satuan %) Gedung 1 yaitu Aktual Energi, Target Energi, Aktual Energi Berjalan, Aktual Index, Target Index, dan Target Energi per bulannya dalam setahun serta terdapat bar nilai average di ujung kanan grafik.', () => {
      // graphic
      cy.get('canvas', timeout).eq(0).should('be.visible');
      // close
      cy.get('[style="width: 100%;"] > .ant-card-body > [style="display: flex; justify-content: space-between;"] > .ant-btn', timeout)
        .click();
      cy.wait(3000);
      cy.get('body').find('canvas').then((graphic) => {
        var graphicCount = Cypress.$(graphic).length;
        expect(graphicCount).to.be.equal(3)
      })
      // open
      cy.get('[style="width: 100%;"] > .ant-card-body > div > .ant-btn', timeout).click();
      cy.wait(3000);
      cy.get('body').find('canvas').then((graphic) => {
        var graphicCount = Cypress.$(graphic).length;
        expect(graphicCount).to.be.equal(4)
      })
    });

    it('Menampilkan tabel Akumulasi Energi Trafo 1 (1000 kVa - 210 Volt) atau Trafo 2 (800 Kva - 380 Volt) sesuai card yang dipilih seperti informasi target, aktual dan evaluasinya per indikator yaitu Energi dan Index', () => {
      // card device 1
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

      // card device 2
      cy.get(':nth-child(1) > [style="padding: 10px;"]', timeout).contains('Trafo 1 (1000 kVa - 210 Volt)')
      cy.get('[style="display: flex; gap: 20px;"] > :nth-child(2) > div', timeout).contains('Trafo 2 (800 Kva - 380 Volt)')
      cy.get('[style="display: flex; gap: 20px;"] > :nth-child(2) > div', timeout).click();
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
    });

    it('Menampilkan grafik bar Energi (dalam satuan kWh) dan Index (satuan %) Trafo 1 (1000 kVa - 210 Volt) atau Trafo 2 (800 Kva - 380 Volt) sesuai card yang dipilih yaitu Aktual Energi, Target Energi, Aktual Energi Berjalan, Aktual Index, Target Index, dan Target Energi per bulannya dalam setahun serta terdapat bar nilai average di ujung kanan grafik.', () => {
      // card device 1
      cy.get(':nth-child(1) > [style="padding: 10px;"]', timeout).contains('Trafo 1 (1000 kVa - 210 Volt)')
      cy.get('[style="display: flex; gap: 20px;"] > :nth-child(2) > div', timeout).contains('Trafo 2 (800 Kva - 380 Volt)')
      cy.get(':nth-child(1) > [style="padding: 10px;"]', timeout).click();
      // graphic
      cy.get('canvas', timeout).eq(1).should('be.visible');
      // close
      cy.get('[style="width: 100%; margin-top: 20px;"] > .ant-card-body > [style="display: flex; justify-content: space-between;"] > .ant-btn', timeout)
        .click();
      cy.wait(3000);
      cy.get('body').find('canvas').then((graphic) => {
        var graphicCount = Cypress.$(graphic).length;
        expect(graphicCount).to.be.equal(3)
      })
      // open
      cy.get('[style="width: 100%; margin-top: 20px;"] > .ant-card-body > div > .ant-btn', timeout).click();
      cy.wait(3000);
      cy.get('body').find('canvas').then((graphic) => {
        var graphicCount = Cypress.$(graphic).length;
        expect(graphicCount).to.be.equal(4)
      })

      // card device 2
      cy.get(':nth-child(1) > [style="padding: 10px;"]', timeout).contains('Trafo 1 (1000 kVa - 210 Volt)')
      cy.get('[style="display: flex; gap: 20px;"] > :nth-child(2) > div', timeout).contains('Trafo 2 (800 Kva - 380 Volt)')
      cy.get('[style="display: flex; gap: 20px;"] > :nth-child(2) > div', timeout).click();
      // graphic
      cy.get('canvas', timeout).eq(1).should('be.visible');
      // close
      cy.get('[style="width: 100%; margin-top: 20px;"] > .ant-card-body > [style="display: flex; justify-content: space-between;"] > .ant-btn', timeout)
        .click();
      cy.wait(3000);
      cy.get('body').find('canvas').then((graphic) => {
        var graphicCount = Cypress.$(graphic).length;
        expect(graphicCount).to.be.equal(3)
      })
      // open
      cy.get('[style="width: 100%; margin-top: 20px;"] > .ant-card-body > div > .ant-btn', timeout).click();
      cy.wait(3000);
      cy.get('body').find('canvas').then((graphic) => {
        var graphicCount = Cypress.$(graphic).length;
        expect(graphicCount).to.be.equal(4)
      })
    });

    it('Menampilkan Akumulasi Energi Per Trafo yaitu Trafo 1 (1000 kVa - 210 Volt) dan Trafo 2 (800 Kva - 380 Volt). Dan setiap trafo terdapat informasi Terakhir Diperbarui dan grafik bar Energi (dalam satuan kWh) dan Index (satuan %) per bulannya dalam setahun serta terdapat bar nilai average di ujung kanan grafik.', () => {
      // bug: Per Gedung or Per Trafo
      // cy.get('[style="margin-top: 2rem;"]', timeout).contains('Akumulasi Energi Per Gedung')
      // Trafo 1
      cy.get(':nth-child(1) > .ant-card-body > [style=""] > [style="display: flex; justify-content: space-between;"] > h4', timeout)
        .contains('Trafo 1 (1000 kVa - 210 Volt)')
      cy.get(':nth-child(1) > .ant-card-body > [style=""] > [style="display: flex; justify-content: space-between;"] > p', timeout)
        .contains('Terakhir Diperbarui : 24/12/20 -10:05')
      cy.get('canvas', timeout).eq(2).should('be.visible')
      // Trafo 2
      cy.get(':nth-child(2) > .ant-card-body > [style=""] > [style="display: flex; justify-content: space-between;"] > h4', timeout)
      .contains('Trafo 2 (800 Kva - 380 Volt)')
      cy.get(':nth-child(2) > .ant-card-body > [style=""] > [style="display: flex; justify-content: space-between;"] > p', timeout)
        .contains('Terakhir Diperbarui : 24/12/20 -10:05')
      cy.get('canvas', timeout).eq(3).should('be.visible')
      // check for the other trafo
      cy.get(':nth-child(3) > .ant-card-body > [style=""] > [style="display: flex; justify-content: space-between;"] > h4', timeout)
      .should('not.exist')
      cy.get(':nth-child(3) > .ant-card-body > [style=""] > [style="display: flex; justify-content: space-between;"] > p', timeout)
        .should('not.exist')
      cy.get('canvas', timeout).eq(4).should('not.exist')
    });
  });

  describe('Melihat halaman utama Dashboard Energy Monitoring (Trafo View)', () => {
    it('Menampilkan tabel Akumulasi Energi Trafo 1 (1000 kVa - 210 Volt) seperti informasi target, aktual dan evaluasinya per indikator yaitu Energi dan Index', () => {
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
    });

    it('Menampilkan grafik bar Energi (dalam satuan kWh) dan Index (satuan %) Trafo 1 (1000 kVa - 210 Volt) yaitu Aktual Energi, Target Energi, Aktual Energi Berjalan, Aktual Index, Target Index, dan Target Energi per bulannya dalam setahun serta terdapat bar nilai average di ujung kanan grafik.', () => {
      // graphic
      cy.get('canvas', timeout).eq(0).should('be.visible');
      // close
      cy.get('[style="width: 100%;"] > .ant-card-body > [style="display: flex; justify-content: space-between;"] > .ant-btn', timeout)
        .click();
      cy.wait(3000);
      cy.get('body').find('canvas').then((graphic) => {
        var graphicCount = Cypress.$(graphic).length;
        expect(graphicCount).to.be.equal(2)
      })
      // open
      cy.get('[style="width: 100%;"] > .ant-card-body > div > .ant-btn', timeout).click();
      cy.wait(3000);
      cy.get('body').find('canvas').then((graphic) => {
        var graphicCount = Cypress.$(graphic).length;
        expect(graphicCount).to.be.equal(3)
      })
    });
    
    it('Menampilkan Akumulasi Energi Per Mesin Produksi yaitu P/W GS-34 Line 4 dan/atau P/W GS-34 Line-6 sesuai filter yang dipilih. Dan setiap mesin produksi terdapat informasi Terakhir Diperbarui dan grafik bar Energi (dalam satuan kWh) dan Index (satuan %) per bulannya dalam setahun serta terdapat bar nilai average di ujung kanan grafik.', () => {
      // bug: Bukan Akumulasi Mesin Produksi
      cy.get('[style="margin-top: 2rem;"]', timeout).contains('Mesin Produksi')
      // Mesin 1
      cy.get(':nth-child(1) > .ant-card-body > [style=""] > [style="display: flex; justify-content: space-between;"] > h4', timeout)
        .contains('P/W GS-34 Line 4')
      cy.get(':nth-child(1) > .ant-card-body > [style=""] > [style="display: flex; justify-content: space-between;"] > p', timeout)
        .contains('Terakhir Diperbarui : 24/12/20 -10:05')
      cy.get('canvas', timeout).eq(1).should('be.visible')
      // Mesin 2
      cy.get(':nth-child(2) > .ant-card-body > [style=""] > [style="display: flex; justify-content: space-between;"] > h4', timeout)
        .contains('P/W GS-34 Line-6')
      cy.get(':nth-child(2) > .ant-card-body > [style=""] > [style="display: flex; justify-content: space-between;"] > p', timeout)
        .contains('Terakhir Diperbarui : 24/12/20 -10:05')
      cy.get('canvas', timeout).eq(2).should('be.visible')
      // Mesin 3
      cy.get(':nth-child(3) > .ant-card-body > [style=""] > [style="display: flex; justify-content: space-between;"] > h4', timeout)
        .should('not.exist')
      cy.get(':nth-child(3) > .ant-card-body > [style=""] > [style="display: flex; justify-content: space-between;"] > p', timeout)
        .should('not.exist')
      cy.get('canvas', timeout).eq(4).should('not.exist')
      // Filter Lainnya
      cy.get('[data-testid="button-sector-filter"]', timeout).click();
      cy.wait(1000);
      cy.get('[data-testid="list-device-0"]', timeout).click();
      cy.get('[data-testid="ok-filter"]', timeout).click();
      cy.wait(3000);
      cy.get('.ant-layout-content').contains('P/W GS-34 Line 4', timeout).should('be.visible');
      cy.get('.ant-layout-content').contains('P/W GS-34 Line-6', timeout).should('not.exist');
      cy.get('body').find('canvas').then((graphic) => {
        var graphicCount = Cypress.$(graphic).length;
        expect(graphicCount).to.be.equal(1)
      })
      // reset
      cy.get('[data-testid="button-sector-filter"]', timeout).click();
      cy.wait(1000);
      cy.get('[data-testid="reset-filter"]', timeout).click();
      cy.wait(3000);
      cy.get('[data-testid="button-sector-filter"]', timeout).click();
      cy.get('.ant-layout-content').contains('P/W GS-34 Line 4', timeout).should('be.visible');
      cy.get('.ant-layout-content').contains('P/W GS-34 Line-6', timeout).should('be.visible');
      cy.get('body').find('canvas').then((graphic) => {
        var graphicCount = Cypress.$(graphic).length;
        expect(graphicCount).to.be.equal(2)
      })
    });
  });

  describe('Melihat halaman utama Dashboard Energy Monitoring (Mesin Produksi View)', () => {
    it('Menampilkan tabel Akumulasi Energi P/W GS-34 Line 4 seperti informasi target, aktual dan evaluasinya per indikator yaitu Energi dan Index', () => {
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
    });

    it('Menampilkan grafik bar Energi (dalam satuan kWh) dan Index (satuan %) P/W GS-34 Line 4 yaitu Aktual Energi, Target Energi, Aktual Energi Berjalan, Aktual Index, Target Index, dan Target Energi per bulannya dalam setahun serta terdapat bar nilai average di ujung kanan grafik.', () => {
      // graphic
      cy.get('canvas', timeout).should('be.visible');
      // close
      cy.get('[style="width: 100%;"] > .ant-card-body > [style="display: flex; justify-content: space-between;"] > .ant-btn', timeout)
        .click();
      cy.wait(1000);
      cy.get('canvas', timeout).should('not.exist');
      // open
      cy.get('[style="width: 100%;"] > .ant-card-body > div > .ant-btn', timeout).click();
      cy.wait(3000);
      cy.get('body').find('canvas').then((graphic) => {
        var graphicCount = Cypress.$(graphic).length;
        expect(graphicCount).to.be.equal(1)
      })
    });
  });
});