/// <reference types="Cypress" />

var timeout = { timeout: 60000 }

describe('Indicator', () => {
  describe('Cek Validasi Nilai Indicator', () => {
    before(() => {
      cy.get('[title="Indicator"] > .ant-menu-title-content > a', timeout).click();
    });

    it('Input Nilai Max Lebih Rendah', () => {
      cy.get(':nth-child(1) > label', timeout).click({ force: true });
      cy.get('#indikator_form_min_valid', timeout).clear().type('44');
      cy.get('#indikator_form_max_valid', timeout).clear({ force: true }).type('22');
      cy.get('.ant-form-item-explain > div', timeout).should('have.contain', 'Max value must be greater than Min');
    });

    it('Input Huruf & Koma', () => {
      cy.get(':nth-child(7) > label', timeout).click({ force: true });
      cy.get('#indikator_form_min_valid', timeout).clear().type('a');
      cy.get('.ant-form-item-explain > div', timeout).should('have.contain', 'Min value is required');
      cy.get('#indikator_form_max_valid', timeout).clear({ force: true }).type('7,3');
      cy.get('.ant-form-item-explain > div', timeout).should('have.contain', 'Max value must be greater than Min');
    });
  });

  describe('Simpan Nilai Indicator', () => {
    before(() => {
      cy.get('[title="Indicator"] > .ant-menu-title-content > a', timeout).click();
    });
  
    it('Arus Listrik', () => {
      cy.get(':nth-child(1) > label', timeout).click();
      cy.get('#indikator_form_min_valid', timeout).clear().type('37');
      cy.get('#indikator_form_max_valid', timeout).clear({ force: true }).type('94');
      cy.get('.IndicatorPage__BtnSubmit-sc-1da0oss-7', timeout).click({ force: true });
    });
  
    it('Kelembaban', () => {
      cy.get(':nth-child(7) > label', timeout).click({ force: true });
      cy.get('#indikator_form_min_valid', timeout).clear({ force: true }).type('79', { force: true });
      cy.get('#indikator_form_max_valid', timeout).clear({ force: true }).type('800', { force: true });
      cy.get('.IndicatorPage__BtnSubmit-sc-1da0oss-7', timeout).click({ force: true });
    })
  });
  
  describe('Cek Data Indicator', () => {
    before(() => {
      cy.get('[title="Threshold"] > .ant-menu-title-content > a', timeout).click({ force: true });
      cy.wait(3000);
      cy.get('[title="Indicator"] > .ant-menu-title-content > a', timeout).click({ force: true });
    });
  
    it('Arus Listrik', () => {
      cy.get(':nth-child(1) > label', timeout).click({ force: true });
      cy.get('#indikator_form_sensor_name', timeout).should('have.value', 'Arus Listrik');
      cy.get('#indikator_form_sensor_unit', timeout).should('have.value', 'AM test');
      cy.get('#indikator_form_min_valid', timeout).should('have.value', '37');
      cy.get('#indikator_form_max_valid', timeout).should('have.value', '94');
    });
  
    it('Kelembaban', () => {
      cy.get(':nth-child(7) > label', timeout).click({ force: true });
      cy.get('#indikator_form_sensor_name', timeout).should('have.value', 'Kelembaban');
      cy.get('#indikator_form_sensor_unit', timeout).should('have.value', '%');
      cy.get('#indikator_form_min_valid', timeout).should('have.value', '79');
      cy.get('#indikator_form_max_valid', timeout).should('have.value', '800');
    });
  });
  
  describe('Sorting & Search Data Indicator', () => {
    before(() => {
      cy.get('[title="Threshold"] > .ant-menu-title-content > a', timeout).click({ force: true });
      cy.wait(3000);
      cy.get('[title="Indicator"] > .ant-menu-title-content > a', timeout).click({ force: true });
    });
  
    it('Sorting List Indicator', () => {
      cy.contains('Arus Listrik', timeout).should('be.visible');
      cy.contains('Daya', timeout).should('be.visible');
      cy.contains('Frequency', timeout).should('be.visible');
      cy.contains('Intensitas Cahaya', timeout).should('be.visible');
      cy.contains('Kalium', timeout).should('be.visible');
      cy.contains('Kecepatan Angin', timeout).should('be.visible');
    });

    it('Search Indicator', () => {
      cy.get('#sector_search', timeout).type('da');
      cy.contains('Daya', timeout).should('be.visible');
      cy.contains('Tekanan Udara', timeout).should('be.visible');
      cy.contains('time update', timeout).should('be.visible');
      cy.get('.ant-input-suffix', timeout).click();
      cy.contains('Arus Listrik', timeout).should('be.visible');
      cy.contains('Daya', timeout).should('be.visible');
      cy.contains('Frequency', timeout).should('be.visible');
      cy.get('#sector_search', timeout).type('ke');
      cy.contains('Kecepatan Angin', timeout).should('be.visible');
      cy.contains('Kelembaban', timeout).should('be.visible');
      cy.contains('Kelembaban Tanah', timeout).should('be.visible');
      cy.get('.ant-input-suffix', timeout).click();
    });
  });
});


