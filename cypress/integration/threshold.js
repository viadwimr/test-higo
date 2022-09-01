/// <reference types="Cypress" />

var timeout = { timeout: 60000 }

describe('Threshold', () => {
  describe('Threshold Utama', () => {
    beforeEach(() => {
      cy.visit('/setting-threshold');
      cy.get(':nth-child(4) > label', timeout).click({force:true});
      cy.get(':nth-child(2) > .ant-row > .ant-col-23 > form > :nth-child(1) > label', timeout)
        .click();
    });
    
    describe('Validasi Input', () => {
      it('Kosong', () => {
        cy.get('#siaga_form_lower_limit', timeout).clear();
        cy.get('.ant-form-item-explain-error', timeout).contains('Min value is required');
        cy.get('#siaga_form_upper_limit', timeout).clear();
        cy.get(':nth-child(3) > :nth-child(2) > .ant-row-middle > [style="flex: 3 3 auto;"] > .ant-form-item > .ant-row > .ant-col > [style="display: flex; flex-wrap: nowrap;"] > .ant-form-item-explain > .ant-form-item-explain-error', timeout)
          .contains('Max value is required');
        cy.get('#siaga_form_warning_lower_limit', timeout).clear();
        cy.get(':nth-child(5) > :nth-child(1) > .ant-row-middle > [style="flex: 3 3 auto;"] > .ant-form-item > .ant-row > .ant-col > [style="display: flex; flex-wrap: nowrap;"] > .ant-form-item-explain > .ant-form-item-explain-error', timeout)
          .contains('Min value is required');
        cy.get('#siaga_form_warning_upper_limit', timeout).clear();
        cy.get(':nth-child(5) > :nth-child(2) > .ant-row-middle > [style="flex: 3 3 auto;"] > .ant-form-item > .ant-row > .ant-col > [style="display: flex; flex-wrap: nowrap;"] > .ant-form-item-explain > .ant-form-item-explain-error', timeout)
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
  /*
  describe('Additional Threshold', () => {
    beforeEach(() => {
      cy.visit('/setting-threshold');
      cy.get('.ant-select-selection-item', timeout).click();
      cy.contains('Semua Sektor', timeout).click();
      cy.get(':nth-child(4) > label', timeout).click({force:true});
      cy.get(':nth-child(2) > .ant-row > .ant-col-23 > form > :nth-child(1) > label', timeout)
        .click();
    });
  
    it('Add additional threshold', () => {
      cy.get('[data-testid=btn-add-threshold]', timeout).click();
      cy.get('[data-testid=input-name-new-threshold]', timeout).type('Test Threshold');
      cy.get('[data-testid=new-threshold-input-min]', timeout).type('200');
      cy.get('[data-testid=new-threshold-input-max]', timeout).type('600');
      cy.get('.ant-btn-primary', timeout).click();
      cy.contains('Berhasil disimpan', timeout).should('be.visible');
      cy.wait(3000);
      // bug: hasil harus direfresh
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
  */
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
      cy.get(':nth-child(2) > .ant-select-tree-node-content-wrapper', timeout).click();
      cy.wait(3000);
      cy.get('form > :nth-child(2) > label', timeout).click();
      cy.contains('Arus Listrik (A)', timeout).should('be.visible');
      cy.contains('Daya (kW)', timeout).should('be.visible');
      cy.contains('Frequency (Hz)', timeout).should('be.visible');
      cy.contains('Voltage (V)', timeout).should('be.visible');
    });
  });
  
  describe('Filter & Search', () => {
    beforeEach(() => {
      cy.visit('/setting-threshold');
      cy.get('.ant-select-selection-item', timeout).click();
      cy.wait(3000);
      cy.contains('Semua Sektor', timeout).click();
      cy.get('.ant-input-affix-wrapper', timeout).eq(1).type('u');
      cy.get('.ant-input-suffix', timeout).eq(1).click();
      cy.get('.ant-input-affix-wrapper', timeout).eq(1).type('Line 2');
    });
  
    it('Search List Sector', () => {
      cy.get('.ant-select-tree-list-holder-inner > :nth-child(1)', timeout).contains('Semua Sektor');
      cy.get(':nth-child(2) > .ant-select-tree-node-content-wrapper', timeout).contains('Baking Line 2');
      cy.get(':nth-child(3) > .ant-select-tree-node-content-wrapper', timeout).contains('Ball Mill Line 2');
      cy.get(':nth-child(4) > .ant-select-tree-node-content-wrapper', timeout).contains('Forming Baking Line 2');
      cy.get(':nth-child(5) > .ant-select-tree-node-content-wrapper', timeout).contains('Forming Line 2');
      cy.get(':nth-child(6) > .ant-select-tree-node-content-wrapper', timeout).contains('Packaging Line 2');
    });

    it('Filter Sector', () => {
      cy.contains('Forming Baking Line 2', timeout).click();
      cy.wait(3000);
      cy.get('form > :nth-child(1) > label', timeout).contains('Gauge roll 1 Gap');
      cy.get(':nth-child(2) > label', timeout).contains('Gauge roll 1 lamp');
      cy.get(':nth-child(3) > label', timeout).contains('Panner_ampere');
      cy.get(':nth-child(4) > label', timeout).contains('Sheeter Roll Speed');
      cy.get(':nth-child(5) > label', timeout).contains('Sprinkle wiremesh_speed');
    });

    it('Search List Device', () => {
      cy.contains('Forming Baking Line 2', timeout).click();
      cy.get('.ant-input-affix-wrapper', timeout).eq(0).type('s');
      cy.get('form > :nth-child(1) > label', timeout).contains('Sheeter Roll Speed');
      cy.get('form > :nth-child(2) > label', timeout).contains('Sprinkle wiremesh_speed');
      cy.get('[style="display: flex; justify-content: space-between;"] > .ant-input-affix-wrapper > .ant-input-suffix > .ant-input-clear-icon > .anticon > svg', timeout).eq(0).click({force:true});
      cy.get('form > :nth-child(1) > label', timeout).contains('Gauge roll 1 Gap');
    });
  });
});