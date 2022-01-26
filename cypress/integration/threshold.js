/// <reference types="Cypress" />

var timeout = { timeout: 60000 }

describe('Threshold', () => {
  describe('Threshold Utama', () => {
    beforeEach(() => {
      cy.visit('/setting-threshold');
      cy.get('.ant-select-selection-item', timeout).click();
      cy.contains('Semua Sektor', timeout).click();
      cy.get('form > :nth-child(1) > label', timeout).click({force:true});
      cy.get(':nth-child(4) > .ant-row > .ant-col-23 > form > .ThresholdPage__RadioWrapper-sc-3zdoyo-5 > label', timeout).click();
    });
    
    describe('Validasi Input', () => {
      it('Kosong', () => {
        cy.get('#siaga_form_lower_limit', timeout).clear();
        cy.get(':nth-child(3) > :nth-child(1) > .ant-row-middle > [style="flex: 3 3 auto;"] > .ant-row > .ant-col > .ant-form-item-explain > div', timeout)
          .contains('Min value is required');
        cy.get('#siaga_form_upper_limit', timeout).clear();
        cy.get(':nth-child(3) > :nth-child(2) > .ant-row-middle > [style="flex: 3 3 auto;"] > .ant-row > .ant-col > .ant-form-item-explain', timeout)
          .contains('Max value is required');
        cy.get('#siaga_form_warning_lower_limit', timeout).clear();
        cy.get(':nth-child(5) > :nth-child(1) > .ant-row-middle > [style="flex: 3 3 auto;"] > .ant-row > .ant-col > .ant-form-item-explain > div', timeout)
          .contains('Min value is required');
        cy.get('#siaga_form_warning_upper_limit', timeout).clear();
        cy.get(':nth-child(5) > :nth-child(2) > .ant-row-middle > [style="flex: 3 3 auto;"] > .ant-row > .ant-col > .ant-form-item-explain > div', timeout)
          .contains('Max value is required');
      });

      it('Lower < Upper', () => {
        cy.get('#siaga_form_lower_limit', timeout).clear().type('1');
        cy.get('#siaga_form_upper_limit', timeout).clear().type('0');
        cy.get('#siaga_form_warning_lower_limit', timeout).clear().type('0');
        cy.get('#siaga_form_warning_upper_limit', timeout).clear().type('0');
        cy.get('.ThresholdPage__BtnSave-sc-3zdoyo-6', timeout).click();
        cy.contains('upper limit must be more than lower limit', timeout).should('be.visible');
        cy.contains('OK', timeout).click();
      });

      it('Lower < Warning < Upper ', () => {
        cy.get('#siaga_form_lower_limit', timeout).clear().type('0');
        cy.get('#siaga_form_upper_limit', timeout).clear().type('0');
        cy.get('#siaga_form_warning_lower_limit', timeout).clear().type('0');
        cy.get('#siaga_form_warning_upper_limit', timeout).clear().type('1');
        cy.get('.ThresholdPage__BtnSave-sc-3zdoyo-6', timeout).click();
        cy.contains('warning limit value must be between the upper and lower limit', timeout).should('be.visible');
        cy.contains('OK', timeout).click();
      });

      it('Lower Warning < Upper Warning', () => {
        cy.get('#siaga_form_lower_limit', timeout).clear().type('50');
        cy.get('#siaga_form_upper_limit', timeout).clear().type('100');
        cy.get('#siaga_form_warning_lower_limit', timeout).clear().type('70');
        cy.get('#siaga_form_warning_upper_limit', timeout).clear().type('30');
        cy.get('.ant-form-item-explain > div', timeout).contains('Max value must be greater than Min');
      });
    });

    describe('CRUD', () => {
      it('Add threshold', () => {
        cy.get('#siaga_form_lower_limit', timeout).clear().type('302');
        cy.get('#siaga_form_upper_limit', timeout).clear().type('602');
        cy.get('#siaga_form_warning_lower_limit', timeout).clear().type('399');
        cy.get('#siaga_form_warning_upper_limit', timeout).clear().type('501');
        cy.get('.ThresholdPage__BtnSave-sc-3zdoyo-6', timeout).click();
        cy.contains('Berhasil', timeout).should('be.visible');
      });

      it('Cek threshold', () => {
        cy.get('#siaga_form_lower_limit', timeout).should('have.value', '302');
        cy.get('#siaga_form_upper_limit', timeout).should('have.value', '602');
        cy.get('#siaga_form_warning_lower_limit', timeout).should('have.value', '399');
        cy.get('#siaga_form_warning_upper_limit', timeout).should('have.value', '501');
      });

      it('Update threshold', () => {
        cy.get('#siaga_form_lower_limit', timeout).clear().type('300');
        cy.get('#siaga_form_upper_limit', timeout).clear().type('559');
        cy.get('#siaga_form_warning_lower_limit', timeout).clear().type('400');
        cy.get('#siaga_form_warning_upper_limit', timeout).clear().type('500');
        cy.get('.ThresholdPage__BtnSave-sc-3zdoyo-6', timeout).click();
        cy.contains('Berhasil', timeout).should('be.visible');
      });
    });
  });
  
  describe('Additional Threshold', () => {
    beforeEach(() => {
      cy.visit('/setting-threshold');
      cy.get('.ant-select-selection-item', timeout).click();
      cy.contains('Semua Sektor', timeout).click();
      cy.get('form > :nth-child(1) > label', timeout).click({force:true});
      cy.get(':nth-child(4) > .ant-row > .ant-col-23 > form > .ThresholdPage__RadioWrapper-sc-3zdoyo-5 > label', timeout).click();
    });
  
    it('Add additional threshold', () => {
      cy.get('[data-testid=btn-add-threshold]', timeout).click();
      cy.get('[data-testid=input-name-new-threshold]', timeout).type('Test Threshold');
      cy.get('[data-testid=new-threshold-input-min]', timeout).type('200');
      cy.get('[data-testid=new-threshold-input-max]', timeout).type('600');
      cy.get('.ant-btn-primary', timeout).click();
      cy.contains('Berhasil disimpan', timeout).should('be.visible');
      cy.get('[data-testid="Test Threshold-input-min"]', timeout).should('have.value', '200');
      cy.get('[data-testid="Test Threshold-input-max"]', timeout).should('have.value', '600');
    });
  
    it('Update additional threshold (Success)', () => {
      cy.get('#siaga_form_warning_lower_limit', timeout).clear().type('401');
      cy.get('.ThresholdPage__BtnSave-sc-3zdoyo-6', timeout).click();
      cy.contains('Berhasil', timeout).should('be.visible');
      cy.wait(3000);
      cy.get('[data-testid=more-menu-threshold] > svg', timeout).click();
      cy.get('[data-testid=additional-edit-threshold]', timeout).click();
      cy.get('[data-testid=new-threshold-input-min]', timeout).clear().type('250');
      cy.get('[data-testid=new-threshold-input-max]', timeout).clear().type('650');
      cy.get('.ant-btn-primary', timeout).click();
      cy.contains('Berhasil disimpan', timeout).should('be.visible');
      cy.get('[data-testid="Test Threshold-input-min"]', timeout).should('have.value', '250');
      cy.get('[data-testid="Test Threshold-input-max"]', timeout).should('have.value', '650');
    });
  
    it('Update additional threshold (Failed)', () => {
      cy.get('[data-testid=more-menu-threshold] > svg', timeout).click();
      cy.get('[data-testid=additional-edit-threshold]', timeout).click();
      cy.get('[data-testid=new-threshold-input-min]', timeout).clear().type('400');
      cy.get('[data-testid=new-threshold-input-max]', timeout).clear().type('300');
      cy.contains('Max value must be greater than Min', timeout).should('be.visible');
      cy.get('[data-testid=new-threshold-input-min]', timeout).clear().type('400');
      cy.get('[data-testid=new-threshold-input-max]', timeout).clear().type('600');
      cy.get('.ant-btn-primary', timeout).click();
      cy.contains('additional lower limit value must be less than lower limit and additional upper limit value must be more than upper limit', timeout).should('be.visible');
    });
  
    it('Delete additional Threshold', () => {
      cy.get('[data-testid=more-menu-threshold] > svg', timeout).click();
      cy.get('[data-testid=additional-delete-threshold]', timeout).click();
      cy.get('.swal2-confirm', timeout).click();
      cy.contains('Berhasil disimpan', timeout).should('be.visible');
      cy.get('[data-testid="Test Threshold-input-min"]', timeout).should('not.exist');
    });
  });
 
  describe('Sorting Data Threshold', () => {
    beforeEach(() => {
      cy.visit('/setting-threshold');
      cy.get('.ant-select-selection-item', timeout).click();
      cy.contains('Semua Sektor', timeout).click();
    });
  
    it('Sorting List Parameter', () => {
      cy.contains('ac Produksi Aktual Per Detik', timeout).should('be.visible');
      cy.contains('ac Produksi Recipe Per Detik', timeout).should('be.visible');
      cy.contains('ac Produksi Recipe Per Menit', timeout).should('be.visible');
      cy.contains('Agromon', timeout).should('be.visible');
      cy.contains('Agromon', timeout).should('be.visible');
    });

    it('Sorting List Indicator', () => {
      cy.get(':nth-child(3) > .ant-row > .ant-col-23 > form > :nth-child(4) > label', timeout).click();
      cy.contains('Kalium', timeout).should('be.visible');
      cy.contains('Kelembaban Tanah', timeout).should('be.visible');
      cy.contains('Nitrogen', timeout).should('be.visible');
      cy.contains('Phospat', timeout).should('be.visible');
      cy.contains('Temperatur', timeout).should('be.visible');
      cy.contains('Voltage', timeout).should('be.visible');
    });
  });
  
  describe('Filter & Search', () => {
    beforeEach(() => {
      cy.visit('/setting-threshold');
      cy.get('.ant-select-selection-item', timeout).click();
      cy.get('[style="flex-wrap: nowrap; padding: 8px;"] > .ant-input-affix-wrapper', timeout)
        .type('u');
      cy.get('[style="flex-wrap: nowrap; padding: 8px;"] > .ant-input-affix-wrapper > .ant-input-suffix', timeout)
        .click();
      cy.get('[style="flex-wrap: nowrap; padding: 8px;"] > .ant-input-affix-wrapper', timeout)
        .type('Li');
    });
  
    it('Search List Sector', () => {
      cy.get('.ant-select-item-option-content', timeout).eq(1).contains('Ball Mill Line 2');
      cy.get('.ant-select-item-option-content', timeout).eq(2).contains('Forming Baking Line 2');
      cy.get('.ant-select-item-option-content', timeout).eq(3).contains('Forming Line 2');
      cy.get('.ant-select-item-option-content', timeout).eq(4).contains('Packaging Line 2');
    });

    it('Filter Sector', () => {
      cy.contains('Forming Baking Line 2', timeout).click();
      cy.get('form > :nth-child(1) > label', timeout).contains('Gauge roll 1 Gap');
      cy.get(':nth-child(2) > label', timeout).contains('Gauge roll 1 lamp');
      cy.get(':nth-child(3) > label', timeout).contains('Panner_ampere');
      cy.get(':nth-child(4) > label', timeout).contains('Sheeter Roll Speed');
      cy.get(':nth-child(5) > label', timeout).contains('Sprinkle wiremesh_speed');
    });

    it('Search List Device', () => {
      cy.contains('Forming Baking Line 2', timeout).click();
      cy.get(':nth-child(2) > .ant-input-affix-wrapper > #sector_search', timeout).type('s');
      cy.get(':nth-child(1) > label', timeout).contains('Sheeter Roll Speed');
      cy.get(':nth-child(2) > label', timeout).contains('Sprinkle wiremesh_speed');
      cy.get(':nth-child(2) > .ant-input-affix-wrapper > .ant-input-suffix > .anticon > svg > path', timeout)
        .click({force:true});
      cy.get(':nth-child(1) > label', timeout).contains('Gauge roll 1 Gap');
    });
    
  });
});