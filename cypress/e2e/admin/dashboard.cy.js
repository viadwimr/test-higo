/// <reference types="Cypress" />

var timeout = { timeout: 5000 }
const d = new Date();

describe('Dashboard', () => {
  before(() => {
    cy.login('admin');
  });
  
  describe('Melihat halaman utama Dashboard Energy Monitoring (Main View)', () => {
    it('Menampilkan tabel Akumulasi Energi DMIA seperti informasi target, aktual dan evaluasinya per indikator yaitu Energi dan Index', () => {
      cy.visit('/');
      cy.wait(3000);
      cy.get('ol > li', timeout).click();
      cy.wait(1000);
      cy.get(':nth-child(1) > .ant-tree-node-content-wrapper', timeout).click();
      cy.wait(3000);
      // table
      cy.get('[style="width: 100%;"] > .ant-card-body', timeout).should('be.visible');
      cy.get('[style="width: 100%;"] > .ant-card-body > [style="display: flex; justify-content: space-between;"] > h3', timeout)
      .contains('Akumulasi Energi DMIA');
      cy.get('[style="width: 100%;"] > .ant-card-body > .ant-table-wrapper > .ant-spin-nested-loading > .ant-spin-container > .ant-table > .ant-table-container > .ant-table-content > table > .ant-table-thead > tr > :nth-child(1)', timeout)
      .contains('March 2023')
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

    it('Menampilkan grafik bar Energi dan grafik line Index DMIA yaitu Aktual Energi, Target Energi, Aktual Energi Berjalan, Aktual Index, Target Index, dan Target Energi Mendatang per bulannya dalam setahun serta terdapat grafik nilai average di ujung kanan grafik.', () => {
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

    it('Menampilkan Akumulasi Energi Per Plant yaitu DMIA 1, DMIA 2, dan DMIA 3. Dan setiap plant terdapat grafik bar Energi dan grafik line Index per bulannya dalam setahun serta terdapat grafik nilai average di ujung kanan grafik.', () => {
      cy.get('[style="margin-top: 2rem;"]', timeout).contains('Akumulasi Energi Per Plant')
      // DMIA 1
      cy.get(':nth-child(1) > .ant-card-body > [style=""] > [style="display: flex; justify-content: space-between;"] > h4', timeout)
        .contains('DMIA 1')
      // cy.get(':nth-child(1) > .ant-card-body > [style=""] > [style="display: flex; justify-content: space-between;"] > p', timeout)
      //   .contains('Terakhir Diperbarui : 24/12/20 -10:05')
      cy.get('canvas', timeout).eq(1).should('be.visible')
      // DMIA 2
      cy.get(':nth-child(2) > .ant-card-body > [style=""] > [style="display: flex; justify-content: space-between;"] > h4', timeout)
        .contains('DMIA 2')
      // cy.get(':nth-child(2) > .ant-card-body > [style=""] > [style="display: flex; justify-content: space-between;"] > p', timeout)
      //   .contains('Terakhir Diperbarui : 24/12/20 -10:05')
      cy.get('canvas', timeout).eq(2).should('be.visible')
      // DMIA 3
      cy.get(':nth-child(3) > .ant-card-body > [style=""] > [style="display: flex; justify-content: space-between;"] > h4', timeout)
        .contains('DMIA 3')
      // cy.get(':nth-child(3) > .ant-card-body > [style=""] > [style="display: flex; justify-content: space-between;"] > p', timeout)
      //   .contains('Terakhir Diperbarui : 24/12/20 -10:05')
      cy.get('canvas', timeout).eq(3).should('be.visible')
      // check for the other gedung
      cy.get(':nth-child(4) > .ant-card-body > [style=""] > [style="display: flex; justify-content: space-between;"] > h4', timeout)
      .should('not.exist')
      cy.get(':nth-child(4) > .ant-card-body > [style=""] > [style="display: flex; justify-content: space-between;"] > p', timeout)
        .should('not.exist')
      cy.get('canvas', timeout).eq(4).should('not.exist')
    });
  });

  describe('Melihat halaman utama Dashboard Energy Monitoring (Plant View)', () => {   
    it('Menampilkan tabel Akumulasi Energi DMIA 1 seperti informasi target, aktual dan evaluasinya per indikator yaitu Energi dan Index', () => {
      cy.visit('/');
      cy.wait(3000);
      cy.get('ol > li', timeout).click();
      cy.wait(1000);
      cy.get(':nth-child(2) > .ant-tree-node-content-wrapper', timeout).click();
      cy.wait(3000);
      // table
      cy.get('[style="width: 100%;"] > .ant-card-body', timeout).should('be.visible');
      cy.get('[style="width: 100%;"] > .ant-card-body > [style="display: flex; justify-content: space-between;"] > h3', timeout)
      .contains('Akumulasi Energi DMIA');
      cy.get('[style="width: 100%;"] > .ant-card-body > .ant-table-wrapper > .ant-spin-nested-loading > .ant-spin-container > .ant-table > .ant-table-container > .ant-table-content > table > .ant-table-thead > tr > :nth-child(1)', timeout)
      .contains('March 2023')
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

    it('Menampilkan grafik bar Energi dan grafik line Index DMIA 1 yaitu Aktual Energi, Target Energi, Aktual Energi Berjalan, Aktual Index, Target Index, dan Target Energi Mendatang per bulannya dalam setahun serta terdapat grafik nilai average di ujung kanan grafik', () => {
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

    it('Menampilkan Akumulasi Energi Per Building yaitu Gedung 1, Gedung 2, dan Gedung 3. Dan setiap gedung terdapat grafik bar Energi dan grafik line Index per bulannya dalam setahun serta terdapat grafik nilai average di ujung kanan grafik.', () => {
      cy.get('[style="margin-top: 2rem;"]', timeout).contains('Akumulasi Energi Per Building')
      // Gedung 1
      cy.get(':nth-child(1) > .ant-card-body > [style=""] > [style="display: flex; justify-content: space-between;"] > h4', timeout)
        .contains('Gedung 1')
      // cy.get(':nth-child(1) > .ant-card-body > [style=""] > [style="display: flex; justify-content: space-between;"] > p', timeout)
      //   .contains('Terakhir Diperbarui : 24/12/20 -10:05')
      cy.get('canvas', timeout).eq(1).should('be.visible')
      // Gedung 2
      cy.get(':nth-child(2) > .ant-card-body > [style=""] > [style="display: flex; justify-content: space-between;"] > h4', timeout)
      .contains('Gedung 2')
      // cy.get(':nth-child(2) > .ant-card-body > [style=""] > [style="display: flex; justify-content: space-between;"] > p', timeout)
      //   .contains('Terakhir Diperbarui : 24/12/20 -10:05')
      cy.get('canvas', timeout).eq(2).should('be.visible')
      // Gedung 3
      cy.get(':nth-child(3) > .ant-card-body > [style=""] > [style="display: flex; justify-content: space-between;"] > h4', timeout)
        .contains('Gedung 3')
      // cy.get(':nth-child(3) > .ant-card-body > [style=""] > [style="display: flex; justify-content: space-between;"] > p', timeout)
      //   .contains('Terakhir Diperbarui : 24/12/20 -10:05')
      cy.get('canvas', timeout).eq(3).should('be.visible')
      // check for the other gedung
      cy.get(':nth-child(4) > .ant-card-body > [style=""] > [style="display: flex; justify-content: space-between;"] > h4', timeout)
      .should('not.exist')
      cy.get(':nth-child(4) > .ant-card-body > [style=""] > [style="display: flex; justify-content: space-between;"] > p', timeout)
        .should('not.exist')
      cy.get('canvas', timeout).eq(4).should('not.exist')
    });
  });

  describe('Melihat halaman utama Dashboard Energy Monitoring (Building View)', () => {   
    it('Menampilkan tabel Akumulasi Energi Gedung 1 seperti informasi target, aktual dan evaluasinya per indikator yaitu Energi dan Index', () => {
      cy.reload();
      cy.wait(3000);
      cy.get('ol > li', timeout).click();
      cy.wait(1000);
      cy.get(':nth-child(3) > .ant-tree-node-content-wrapper > .ant-tree-title', timeout).click();
      cy.wait(3000);
      // table
      cy.get('[style="width: 100%;"] > .ant-card-body', timeout).should('be.visible');
      cy.get('[style="width: 100%;"] > .ant-card-body > [style="display: flex; justify-content: space-between;"] > h3', timeout)
      .contains('Akumulasi Energi Gedung 1');
      cy.get('[style="width: 100%;"] > .ant-card-body > .ant-table-wrapper > .ant-spin-nested-loading > .ant-spin-container > .ant-table > .ant-table-container > .ant-table-content > table > .ant-table-thead > tr > :nth-child(1)', timeout)
      .contains('March 2023')
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

    it('Menampilkan grafik bar Energi dan grafik line Index Gedung 1 yaitu Aktual Energi, Target Energi, Aktual Energi Berjalan, Aktual Index, Target Index, dan Target Energi Mendatang per bulannya dalam setahun serta terdapat grafik nilai average di ujung kanan grafik.', () => {
      // graphic
      cy.get('canvas', timeout).eq(0).should('be.visible');
      // close
      cy.get('[style="width: 100%;"] > .ant-card-body > [style="display: flex; justify-content: space-between;"] > .ant-btn', timeout)
        .click();
      cy.wait(3000);
      cy.get('body').find('canvas').then((graphic) => {
        var graphicCount = Cypress.$(graphic).length;
        expect(graphicCount).to.be.equal(1)
      })
      // open
      cy.get('[style="width: 100%;"] > .ant-card-body > div > .ant-btn', timeout).click();
      cy.wait(3000);
      cy.get('body').find('canvas').then((graphic) => {
        var graphicCount = Cypress.$(graphic).length;
        expect(graphicCount).to.be.equal(2)
      })
      // Mesin Produksi Card
      // cy.get('[style="display: flex; gap: 20px;"] > :nth-child(2)', timeout).click();
    });

    it('Menampilkan tabel Akumulasi Energi Per Item yaitu Fasilitas atau Mesin Produksi sesuai card yang dipilih seperti informasi target, aktual dan evaluasinya per indikator yaitu Energi dan Index', () => {
      // card device 1
      cy.get(':nth-child(1) > [style="padding: 10px;"]', timeout).contains('Fasilitas')
      cy.get('[style="display: flex; gap: 20px;"] > :nth-child(2) > div', timeout).contains('Mesin Produksi')
      // table
      cy.get('[style="width: 100%; margin-top: 20px;"] > .ant-card-body', timeout).should('be.visible');
      cy.get('[style="width: 100%; margin-top: 20px;"] > .ant-card-body > [style="display: flex; justify-content: space-between;"] > h3', timeout)
      .contains('Akumulasi Energi Item');
      cy.get('[style="width: 100%; margin-top: 20px;"] > .ant-card-body > .ant-table-wrapper > .ant-spin-nested-loading > .ant-spin-container > .ant-table > .ant-table-container > .ant-table-content > table > .ant-table-thead > tr > :nth-child(1)', timeout)
      .contains('March 2023')
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
      cy.get(':nth-child(1) > [style="padding: 10px;"]', timeout).contains('Fasilitas')
      cy.get('[style="display: flex; gap: 20px;"] > :nth-child(2) > div', timeout).contains('Mesin Produksi')
      cy.get('[style="display: flex; gap: 20px;"] > :nth-child(2) > div', timeout).click();
      // table
      cy.get('[style="width: 100%; margin-top: 20px;"] > .ant-card-body', timeout).should('be.visible');
      cy.get('[style="width: 100%; margin-top: 20px;"] > .ant-card-body > [style="display: flex; justify-content: space-between;"] > h3', timeout)
      .contains('Akumulasi Energi Item');
      cy.wait(7000);
      cy.get('[style="width: 100%; margin-top: 20px;"] > .ant-card-body > .ant-table-wrapper > .ant-spin-nested-loading > .ant-spin-container > .ant-table > .ant-table-container > .ant-table-content > table > .ant-table-thead > tr > :nth-child(1)', timeout)
      .contains('March 2023')
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

    it('Menampilkan grafik bar Energi dan grafik line Index Fasilitas atau Mesin Produksi sesuai card yang dipilih, yaitu Aktual Energi, Target Energi, Aktual Energi Berjalan, Aktual Index, Target Index, dan Target Energi Mendatang per bulannya dalam setahun serta terdapat grafik nilai average di ujung kanan grafik.', () => {
      // card device 1
      cy.get(':nth-child(1) > [style="padding: 10px;"]', timeout).contains('Fasilitas')
      cy.get('[style="display: flex; gap: 20px;"] > :nth-child(2) > div', timeout).contains('Mesin Produksi')
      cy.get(':nth-child(1) > [style="padding: 10px;"]', timeout).click();
      cy.wait(3000);
      // graphic
      cy.get('canvas', timeout).eq(1).should('be.visible');
      // close
      cy.get('[style="width: 100%; margin-top: 20px;"] > .ant-card-body > [style="display: flex; justify-content: space-between;"] > .ant-btn', timeout)
        .click();
      cy.wait(3000);
      cy.get('body').find('canvas').then((graphic) => {
        var graphicCount = Cypress.$(graphic).length;
        expect(graphicCount).to.be.equal(1)
      })
      // open
      cy.get('[style="width: 100%; margin-top: 20px;"] > .ant-card-body > div > .ant-btn', timeout).click();
      cy.wait(3000);
      cy.get('body').find('canvas').then((graphic) => {
        var graphicCount = Cypress.$(graphic).length;
        expect(graphicCount).to.be.equal(2)
      })

      // card device 2
      cy.get(':nth-child(1) > [style="padding: 10px;"]', timeout).contains('Fasilitas')
      cy.get('[style="display: flex; gap: 20px;"] > :nth-child(2) > div', timeout).contains('Mesin Produksi')
      cy.get('[style="display: flex; gap: 20px;"] > :nth-child(2) > div', timeout).click();
      cy.wait(7000);
      // graphic
      cy.get('canvas', timeout).eq(1).should('be.visible');
      // close
      cy.get('[style="width: 100%; margin-top: 20px;"] > .ant-card-body > [style="display: flex; justify-content: space-between;"] > .ant-btn', timeout)
        .click();
      cy.wait(3000);
      cy.get('body').find('canvas').then((graphic) => {
        var graphicCount = Cypress.$(graphic).length;
        expect(graphicCount).to.be.equal(28)
      })
      // open
      cy.get('[style="width: 100%; margin-top: 20px;"] > .ant-card-body > div > .ant-btn', timeout).click();
      cy.wait(3000);
      cy.get('body').find('canvas').then((graphic) => {
        var graphicCount = Cypress.$(graphic).length;
        expect(graphicCount).to.be.equal(29)
      })
    });

    it('Pada card Mesin Produksi, terdapat tambahan tampilan Akumulasi Energi Per Line yaitu Arm BF 23 Line 1, Arm BF 23 Line 2 dll yang setiap line nya terdapat grafik bar Energi dan grafik line Index per bulannya dalam setahun serta terdapat grafik nilai average di ujung kanan grafik.', () => {
      // bug: Per Line
      // cy.get('[style="margin-top: 2rem;"]', timeout).contains('Akumulasi Energi Per Line')
      // Line 1
      cy.get(':nth-child(1) > .ant-card-body > [style=""] > [style="display: flex; justify-content: space-between;"] > h4', timeout)
        .contains('P/W GS-34 Line 4')
      // cy.get(':nth-child(1) > .ant-card-body > [style=""] > [style="display: flex; justify-content: space-between;"] > p', timeout)
      //   .contains('Terakhir Diperbarui : 24/12/20 -10:05')
      cy.get('canvas', timeout).eq(2).should('be.visible')
      // Line 2
      cy.get(':nth-child(2) > .ant-card-body > [style=""] > [style="display: flex; justify-content: space-between;"] > h4', timeout)
      .contains('P/W GS-34 Line-6')
      // cy.get(':nth-child(2) > .ant-card-body > [style=""] > [style="display: flex; justify-content: space-between;"] > p', timeout)
      //   .contains('Terakhir Diperbarui : 24/12/20 -10:05')
      cy.get('canvas', timeout).eq(28).should('be.visible')
      // check for the other trafo
      cy.get(':nth-child(28) > .ant-card-body > [style=""] > [style="display: flex; justify-content: space-between;"] > h4', timeout)
      .should('not.exist')
      cy.get(':nth-child(28) > .ant-card-body > [style=""] > [style="display: flex; justify-content: space-between;"] > p', timeout)
        .should('not.exist')
      cy.get('canvas', timeout).eq(29).should('not.exist')
    });
  });

  describe('Melihat halaman utama Dashboard Energy Monitoring (Item View)', () => {
    it('Menampilkan tabel Akumulasi Energi Mesin Produksi seperti informasi target, aktual dan evaluasinya per indikator yaitu Energi dan Index', () => {
      cy.wait(3000);
      cy.get('ol > li', timeout).click();
      cy.wait(1000);
      cy.get(':nth-child(5) > .ant-tree-node-content-wrapper', timeout).click();
      cy.wait(3000);
      // table
      cy.get('[style="width: 100%;"] > .ant-card-body', timeout).should('be.visible');
      cy.get('[style="width: 100%;"] > .ant-card-body > [style="display: flex; justify-content: space-between;"] > h3', timeout)
      .contains('Akumulasi Energi Mesin Produksi');
      cy.get('[style="width: 100%;"] > .ant-card-body > .ant-table-wrapper > .ant-spin-nested-loading > .ant-spin-container > .ant-table > .ant-table-container > .ant-table-content > table > .ant-table-thead > tr > :nth-child(1)', timeout)
      .contains('March 2023')
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

    it('Menampilkan grafik bar Energi dan grafik line Index Mesin Produksi yaitu Aktual Energi, Target Energi, Aktual Energi Berjalan, Aktual Index, Target Index, dan Target Energi Mendatang per bulannya dalam setahun serta terdapat grafik nilai average di ujung kanan grafik.', () => {
      // graphic
      cy.get('canvas', timeout).eq(0).should('be.visible');
      // close
      cy.get('[style="width: 100%;"] > .ant-card-body > [style="display: flex; justify-content: space-between;"] > .ant-btn', timeout)
        .click();
      cy.wait(3000);
      cy.get('body').find('canvas').then((graphic) => {
        var graphicCount = Cypress.$(graphic).length;
        expect(graphicCount).to.be.equal(27)
      })
      // open
      cy.get('[style="width: 100%;"] > .ant-card-body > div > .ant-btn', timeout).click();
      cy.wait(3000);
      cy.get('body').find('canvas').then((graphic) => {
        var graphicCount = Cypress.$(graphic).length;
        expect(graphicCount).to.be.equal(28)
      })
    });
    
    it('Menampilkan Akumulasi Energi Per Line yaitu Arm BF 23 Line 1, Arm BF 23 Line 2 dll yang setiap line nya terdapat grafik bar Energi dan grafik line Index per bulannya dalam setahun serta terdapat grafik nilai average di ujung kanan grafik.', () => {
      cy.get('[style="margin-top: 2rem;"]', timeout).contains('Akumulasi Energi Per Line')
      // Line 1
      cy.get(':nth-child(1) > .ant-card-body > [style=""] > [style="display: flex; justify-content: space-between;"] > h4', timeout)
        .contains('Arm BF 23 Line 1')
      // cy.get(':nth-child(1) > .ant-card-body > [style=""] > [style="display: flex; justify-content: space-between;"] > p', timeout)
      //   .contains('Terakhir Diperbarui : 24/12/20 -10:05')
      cy.get('canvas', timeout).eq(1).should('be.visible')
      // Line 2
      cy.get(':nth-child(2) > .ant-card-body > [style=""] > [style="display: flex; justify-content: space-between;"] > h4', timeout)
        .contains('Arm BF 23 Line 2')
      // cy.get(':nth-child(2) > .ant-card-body > [style=""] > [style="display: flex; justify-content: space-between;"] > p', timeout)
      //   .contains('Terakhir Diperbarui : 24/12/20 -10:05')
      cy.get('canvas', timeout).eq(27).should('be.visible')
      // Device 28
      cy.get(':nth-child(28) > .ant-card-body > [style=""] > [style="display: flex; justify-content: space-between;"] > h4', timeout)
        .should('not.exist')
      cy.get(':nth-child(28) > .ant-card-body > [style=""] > [style="display: flex; justify-content: space-between;"] > p', timeout)
        .should('not.exist')
      cy.get('canvas', timeout).eq(28).should('not.exist')
      /*
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
      */
    });
  });

  describe('Melihat halaman utama Dashboard Energy Monitoring (Line View)', () => {
    it('Menampilkan tabel Akumulasi Energi Arm PS Line 4 seperti informasi target, aktual dan evaluasinya per indikator yaitu Energi dan Index', () => {
      cy.get('ol > li', timeout).click();
      cy.wait(1000);
      cy.get(':nth-child(18) > .ant-tree-node-content-wrapper > .ant-tree-title', timeout).click();
      cy.wait(3000);
      // table
      cy.get('[style="width: 100%;"] > .ant-card-body', timeout).should('be.visible');
      cy.get('[style="width: 100%;"] > .ant-card-body > [style="display: flex; justify-content: space-between;"] > h3', timeout)
      .contains('Akumulasi Energi Arm PS Line 4');
      cy.get('[style="width: 100%;"] > .ant-card-body > .ant-table-wrapper > .ant-spin-nested-loading > .ant-spin-container > .ant-table > .ant-table-container > .ant-table-content > table > .ant-table-thead > tr > :nth-child(1)', timeout)
      .contains('March 2023')
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

    it('Menampilkan grafik bar Energi dan grafik line Index Arm PS Line 4 yaitu Aktual Energi, Target Energi, Aktual Energi Berjalan, Aktual Index, Target Index, dan Target Energi Mendatang per bulannya dalam setahun serta terdapat grafik nilai averagef di ujung kanan grafik', () => {
      // graphic
      cy.get('canvas', timeout).should('be.visible');
      // close
      cy.get('[style="width: 100%;"] > .ant-card-body > [style="display: flex; justify-content: space-between;"] > .ant-btn', timeout)
        .click();
      cy.wait(1000);
      cy.get('body').find('canvas').then((graphic) => {
        var graphicCount = Cypress.$(graphic).length;
        expect(graphicCount).to.be.equal(1)
      })
      // open
      cy.get('[style="width: 100%;"] > .ant-card-body > div > .ant-btn', timeout).click();
      cy.wait(3000);
      cy.get('body').find('canvas').then((graphic) => {
        var graphicCount = Cypress.$(graphic).length;
        expect(graphicCount).to.be.equal(2)
      })
    });

    it('Menampilkan Akumulasi Energi Per Device yaitu MP_14A. Dan setiap device terdapat grafik bar Energi dan grafik line Index per bulannya dalam setahun serta terdapat grafik nilai average di ujung kanan grafik.', () => {
      cy.get('[style="margin-top: 2rem;"]', timeout).contains('Akumulasi Energi Per Device')
      // Gedung 1
      cy.get(':nth-child(1) > .ant-card-body > [style=""] > [style="display: flex; justify-content: space-between;"] > h4', timeout)
        .contains('MP 14A')
      // cy.get(':nth-child(1) > .ant-card-body > [style=""] > [style="display: flex; justify-content: space-between;"] > p', timeout)
      //   .contains('Terakhir Diperbarui : 24/12/20 -10:05')
      cy.get('canvas', timeout).eq(1).should('be.visible')
      // check for the other gedung
      cy.get(':nth-child(2) > .ant-card-body > [style=""] > [style="display: flex; justify-content: space-between;"] > h4', timeout)
      .should('not.exist')
      cy.get(':nth-child(2) > .ant-card-body > [style=""] > [style="display: flex; justify-content: space-between;"] > p', timeout)
        .should('not.exist')
      cy.get('canvas', timeout).eq(2).should('not.exist')
    });
  });
});