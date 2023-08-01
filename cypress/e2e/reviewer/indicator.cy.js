/// <reference types="Cypress" />

var timeout = { timeout: 6000 }

describe('Indicator', () => {
  before(() => {
    cy.login('reviewer');
  });
  
  describe.skip('Cek Validasi Nilai Indicator', () => {
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

    it('Battery', () => {
      cy.get('form > :nth-child(1) > label', timeout).click({ force: true });
      cy.get('#indikator_form_sensor_name', timeout).should('have.value', 'Battery');
      cy.get('#indikator_form_sensor_unit', timeout).should('have.value', '%');
      cy.get('#indikator_form_min_valid', timeout).should('have.value', '0');
      cy.get('#indikator_form_max_valid', timeout).should('have.value', '100');
    });

    it('Humidity', () => {
      cy.get('form > :nth-child(2) > label', timeout).click({ force: true });
      cy.get('#indikator_form_sensor_name', timeout).should('have.value', 'Humidity');
      cy.get('#indikator_form_sensor_unit', timeout).should('have.value', '%');
      cy.get('#indikator_form_min_valid', timeout).should('have.value', '0');
      cy.get('#indikator_form_max_valid', timeout).should('have.value', '100');
    });

    it('Temperature', () => {
      cy.get('form > :nth-child(3) > label', timeout).click({ force: true });
      cy.get('#indikator_form_sensor_name', timeout).should('have.value', 'Temperature');
      cy.get('#indikator_form_sensor_unit', timeout).should('have.value', '℃');
      cy.get('#indikator_form_min_valid', timeout).should('have.value', '0');
      cy.get('#indikator_form_max_valid', timeout).should('have.value', '100');
    });
  });

  describe.skip('Simpan Nilai Indicator', () => {
    before(() => {
      cy.get('[title="Indicator"] > .ant-menu-title-content > a', timeout).click();
    });

    it('Battery', () => {
      cy.get('form > :nth-child(1) > label', timeout).click();
      cy.get('#indikator_form_sensor_unit', timeout).clear().type('Test_test')
      cy.get('#indikator_form_min_valid', timeout).clear().type('37');
      cy.get('#indikator_form_max_valid', timeout).clear({ force: true }).type('94');
      cy.get('.IndicatorPage__BtnSubmit-sc-1da0oss-7', timeout).click({ force: true });
    });

    it('Humidity', () => {
      cy.get(':nth-child(2) > label', timeout).click({ force: true });
      cy.get('#indikator_form_min_valid', timeout).clear({ force: true }).type('-1', { force: true });
      cy.get('#indikator_form_max_valid', timeout).clear({ force: true }).type('800', { force: true });
      cy.get('.IndicatorPage__BtnSubmit-sc-1da0oss-7', timeout).click({ force: true });
    })
  });

  describe.skip('Cek Data Indicator After Edit', () => {
    before(() => {
      cy.get('[title="Threshold"] > .ant-menu-title-content > a', timeout).click({ force: true });
      cy.wait(3000);
      cy.get('[title="Indicator"] > .ant-menu-title-content > a', timeout).click({ force: true });
    });

    it('Battery', () => {
      cy.get('form > :nth-child(1) > label', timeout).click({ force: true });
      cy.get('#indikator_form_sensor_name', timeout).should('have.value', 'Battery');
      cy.get('#indikator_form_sensor_unit', timeout).should('have.value', 'Test_test');
      cy.get('#indikator_form_min_valid', timeout).should('have.value', '37');
      cy.get('#indikator_form_max_valid', timeout).should('have.value', '94');

      // Back to previous data
      cy.get('#indikator_form_sensor_unit', timeout).clear().type('%')
      cy.get('#indikator_form_min_valid', timeout).clear().type('0');
      cy.get('#indikator_form_max_valid', timeout).clear({ force: true }).type('100');
      cy.get('.IndicatorPage__BtnSubmit-sc-1da0oss-7', timeout).click({ force: true });
    });

    it('Humidity', () => {
      cy.get(':nth-child(7) > label', timeout).click({ force: true });
      cy.get('#indikator_form_sensor_name', timeout).should('have.value', 'Humidity');
      cy.get('#indikator_form_sensor_unit', timeout).should('have.value', '%');
      cy.get('#indikator_form_min_valid', timeout).should('have.value', '-1');
      cy.get('#indikator_form_max_valid', timeout).should('have.value', '800');

      // Back to previous data
      cy.wait(7000)
      cy.get(':nth-child(1) > .ant-row-middle > [style="flex: 3 3 auto;"] > .ant-form-item > .ant-row > .ant-col > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-input-number > .ant-input-number-handler-wrap > .ant-input-number-handler-up', timeout)
        .click();
      cy.get('#indikator_form_max_valid', timeout).clear({ force: true }).type('0');
      cy.get('.IndicatorPage__BtnSubmit-sc-1da0oss-7', timeout).click({ force: true });
    }); 
  });
  
  describe('Sorting Data Indicator', () => {
    before(() => {
      cy.get('[title="Threshold"] > .ant-menu-title-content > a', timeout).click({ force: true });
      cy.wait(3000);
      cy.get('[title="Indicator"] > .ant-menu-title-content > a', timeout).click({ force: true });
    });

    it('Sorting List Indicator', () => {
      cy.get('form > :nth-child(1) > label').contains('1. Battery (%)', timeout).should('be.visible');
      cy.get('form > :nth-child(2) > label').contains('2. Humidity (%)', timeout).should('be.visible');
      cy.get('form > :nth-child(3) > label').contains('3. Temperature (℃)', timeout).should('be.visible');
      
    });
  });

  describe('Search Indicator', () => {
    before(() => {
      cy.get('[title="Threshold"] > .ant-menu-title-content > a', timeout).click({ force: true });
      cy.wait(3000);
      cy.get('[title="Indicator"] > .ant-menu-title-content > a', timeout).click({ force: true });
    });

    it('Data found', () => {
      cy.get('#sector_search', timeout).type('tery{enter}');
      cy.get('label', timeout).should('contain.text', '1. Battery (%)');
      cy.get('form > :nth-child(1) > label', timeout).click({ force: true });
      cy.get('#indikator_form_sensor_name', timeout).should('have.value', 'Battery');
      cy.get('#indikator_form_sensor_unit', timeout).should('have.value', '%');
      cy.get('#indikator_form_min_valid', timeout).should('have.value', '0');
      cy.get('#indikator_form_max_valid', timeout).should('have.value', '100');
    });

    it('Data not found', () => {
      cy.get('#sector_search', timeout).clear().type('Random{enter}');
      cy.get('form > :nth-child(1) > label', timeout).should('not.exist');
      cy.get('.ant-input-clear-icon', timeout).click();
      cy.get('form > :nth-child(1) > label', timeout).should('be.visible');
    });
  }); 
});


