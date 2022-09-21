/// <reference types="Cypress" />

var timeout = { timeout: 60000 }

describe('Indicator', () => {
  before(() => {
    cy.login('admin');
  });
  
  describe('Cek Validasi Nilai Indicator', () => {
    before(() => {
      cy.get('[title="Indicator"] > .ant-menu-title-content > a', timeout).click();
    });

    it('Input Nilai Max < Nilai Min', () => {
      cy.get('form > :nth-child(1) > label', timeout).click({ force: true });
      cy.get('#indikator_form_min_valid', timeout).clear().type('44');
      cy.get('#indikator_form_max_valid', timeout).clear({ force: true }).type('22');
      cy.get('.ant-form-item-explain > div', timeout).should('have.contain', 'Max value must be greater than Min');
    });

    it('Input Huruf & Koma', () => {
      cy.get('form > :nth-child(1) > label', timeout).click({ force: true });
      cy.get('#indikator_form_min_valid', timeout).clear().type('a');
      cy.get('.ant-form-item-explain > div', timeout).should('have.contain', 'Min value is required');
      cy.get('#indikator_form_max_valid', timeout).clear({ force: true }).type('7,3');
      cy.get('.ant-form-item-explain > div', timeout).should('have.contain', 'Max value must be greater than Min');
    });
  });

  describe('Cek Data Indicator', () => {
    before(() => {
      cy.get('[title="Threshold"] > .ant-menu-title-content > a', timeout).click({ force: true });
      cy.wait(3000);
      cy.get('[title="Indicator"] > .ant-menu-title-content > a', timeout).click({ force: true });
    });

    it('Arus Listrik', () => {
      cy.get('form > :nth-child(1) > label', timeout).click({ force: true });
      cy.get('#indikator_form_sensor_name', timeout).should('have.value', 'Arus Listrik');
      cy.get('#indikator_form_sensor_unit', timeout).should('have.value', 'A');
      cy.get('#indikator_form_min_valid', timeout).should('have.value', '0');
      cy.get('#indikator_form_max_valid', timeout).should('have.value', '0');
    });

    it('EOB Stand Aktif Energy Terima', () => {
      cy.get(':nth-child(7) > label', timeout).click({ force: true });
      cy.get('#indikator_form_sensor_name', timeout).should('have.value', 'EOB Stand Aktif Energy Terima');
      cy.get('#indikator_form_sensor_unit', timeout).should('have.value', 'Wh');
      cy.get('#indikator_form_min_valid', timeout).should('have.value', '0');
      cy.get('#indikator_form_max_valid', timeout).should('have.value', '0');
    });

    it('Frequency', () => {
      cy.get(':nth-child(9) > label', timeout).click({ force: true });
      cy.get('#indikator_form_sensor_name', timeout).should('have.value', 'Frequency');
      cy.get('#indikator_form_sensor_unit', timeout).should('have.value', 'Hz');
      cy.get('#indikator_form_min_valid', timeout).should('have.value', '2');
      cy.get('#indikator_form_max_valid', timeout).should('have.value', '3');
    }); 
  });

  describe('Simpan Nilai Indicator', () => {
    before(() => {
      cy.get('[title="Indicator"] > .ant-menu-title-content > a', timeout).click();
    });

    it('Arus Listrik', () => {
      cy.get('form > :nth-child(1) > label', timeout).click();
      cy.get('#indikator_form_sensor_unit', timeout).clear().type('Test_test')
      cy.get('#indikator_form_min_valid', timeout).clear().type('37');
      cy.get('#indikator_form_max_valid', timeout).clear({ force: true }).type('94');
      cy.get('.IndicatorPage__BtnSubmit-sc-1da0oss-7', timeout).click({ force: true });
    });

    it('EOB Stand Aktif Energy Terima', () => {
      cy.get(':nth-child(7) > label', timeout).click({ force: true });
      cy.get('#indikator_form_min_valid', timeout).clear({ force: true }).type('-1', { force: true });
      cy.get('#indikator_form_max_valid', timeout).clear({ force: true }).type('800', { force: true });
      cy.get('.IndicatorPage__BtnSubmit-sc-1da0oss-7', timeout).click({ force: true });
    })
  });

  describe('Cek Data Indicator After Edit', () => {
    before(() => {
      cy.get('[title="Threshold"] > .ant-menu-title-content > a', timeout).click({ force: true });
      cy.wait(3000);
      cy.get('[title="Indicator"] > .ant-menu-title-content > a', timeout).click({ force: true });
    });

    it('Arus Listrik', () => {
      cy.get('form > :nth-child(1) > label', timeout).click({ force: true });
      cy.get('#indikator_form_sensor_name', timeout).should('have.value', 'Arus Listrik');
      cy.get('#indikator_form_sensor_unit', timeout).should('have.value', 'Test_test');
      cy.get('#indikator_form_min_valid', timeout).should('have.value', '37');
      cy.get('#indikator_form_max_valid', timeout).should('have.value', '94');

      // Back to previous data
      cy.get('#indikator_form_sensor_unit', timeout).clear().type('A')
      cy.get('#indikator_form_min_valid', timeout).clear().type('0');
      cy.get('#indikator_form_max_valid', timeout).clear({ force: true }).type('0');
      cy.get('.IndicatorPage__BtnSubmit-sc-1da0oss-7', timeout).click({ force: true });
    });

    it('EOB Stand Aktif Energy Terima', () => {
      cy.get(':nth-child(7) > label', timeout).click({ force: true });
      cy.get('#indikator_form_sensor_name', timeout).should('have.value', 'EOB Stand Aktif Energy Terima');
      cy.get('#indikator_form_sensor_unit', timeout).should('have.value', 'Wh');
      cy.get('#indikator_form_min_valid', timeout).should('have.value', '-1');
      cy.get('#indikator_form_max_valid', timeout).should('have.value', '800');

      // Back to previous data
      cy.wait(7000)
      cy.get(':nth-child(1) > .ant-row-middle > [style="flex: 3 3 auto;"] > .ant-form-item > .ant-row > .ant-col > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-input-number > .ant-input-number-handler-wrap > .ant-input-number-handler-up', timeout)
        .click();
      cy.get('#indikator_form_max_valid', timeout).clear({ force: true }).type('0');
      cy.get('.IndicatorPage__BtnSubmit-sc-1da0oss-7', timeout).click({ force: true });
    });

    it('Frequency', () => {
      cy.get(':nth-child(9) > label', timeout).click({ force: true });
      cy.get('#indikator_form_sensor_name', timeout).should('have.value', 'Frequency');
      cy.get('#indikator_form_sensor_unit', timeout).should('have.value', 'Hz');
      cy.get('#indikator_form_min_valid', timeout).should('have.value', '2');
      cy.get('#indikator_form_max_valid', timeout).should('have.value', '3');
    }); 
  });
  
  describe('Sorting Data Indicator', () => {
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
  });

  describe('Search Indicator', () => {
    before(() => {
      cy.get('[title="Threshold"] > .ant-menu-title-content > a', timeout).click({ force: true });
      cy.wait(3000);
      cy.get('[title="Indicator"] > .ant-menu-title-content > a', timeout).click({ force: true });
    });

    it('Data found', () => {
      cy.get('#sector_search', timeout).type('Kelembaban Tanah{enter}');
      cy.get('label', timeout).should('contain.text', '1. Kelembaban Tanah (%)');
      cy.get('form > :nth-child(1) > label', timeout).click({ force: true });
      cy.get('#indikator_form_sensor_name', timeout).should('have.value', 'Kelembaban Tanah');
      cy.get('#indikator_form_sensor_unit', timeout).should('have.value', '%');
      cy.get('#indikator_form_min_valid', timeout).should('have.value', '9');
      cy.get('#indikator_form_max_valid', timeout).should('have.value', '10');
    });

    it('Data not found', () => {
      cy.get('#sector_search', timeout).clear().type('Random{enter}');
      cy.get('form > :nth-child(1) > label', timeout).should('not.exist');
    });
  }); 
});


