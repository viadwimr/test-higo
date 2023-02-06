/// <reference types="Cypress" />

var timeout = { timeout: 60000 }

describe('User', () => {
  before(() => {
    cy.login('admin');
  });
  
  before(() => {
    cy.get('[title="User"] > .ant-menu-title-content > a', timeout).click();
  });
  
  describe('CRUD', () => {
    it('Validasi Input', () => {
      cy.get('.ant-row-middle > :nth-child(2) > .ant-row > :nth-child(1) > .Button__BaseButton-sc-1hmbtsr-0', timeout).click();
      cy.contains('Tambah', timeout).click();
      cy.get('#users_form_step1_email', timeout).type('tes');
      cy.get('.ant-form-item-explain > div', timeout).contains('Masukan Email dengan benar')
      cy.get('#users_form_step1_no_hp', timeout).type('123');
      cy.get('#users_form_step1 > .ant-row-space-between > :nth-child(2) > .Button__BaseButton-sc-1hmbtsr-0', timeout).should('be.disabled');
      cy.get('#users_form_step1_firstName', timeout).clear().type('Aauto test');
      cy.get('#users_form_step1_email', timeout).clear().type('tes@gmail.com');
      cy.get('#users_form_step1_no_hp', timeout).clear().type('1234567890');
      cy.get('#users_form_step1_scope', timeout).click();
      cy.wait(1000);
      cy.get('.ant-select-item-option-active', timeout).click({force:true});
      cy.contains('Selanjutnya', timeout).click({force:true});
      cy.get('#users_form_step2_password').type('p');
      cy.get('#users_form_step2_confirm_password', timeout).type('password1');
      cy.get('.ant-form-item-explain > div', timeout).contains('Konfirmasi Password kurang tepat!');
      // cy.get('.ant-space > :nth-child(2) > .Button__BaseButton-sc-1hmbtsr-0', timeout).should('be.disabled');
      cy.get('#users_form_step2_username', timeout).type('DM1902367');
      cy.get('#users_form_step2_password', timeout).type('{selectAll}password');
      cy.get('#users_form_step2_confirm_password', timeout).type('{selectAll}password');
      cy.get('.ant-space > :nth-child(2) > .Button__BaseButton-sc-1hmbtsr-0', timeout)
        .click();
      cy.contains('Failure', timeout).should('be.visible');
      cy.contains('Username "DM1902367" is already taken in client 63a402a976d29900110d6566', timeout)
        .should('be.visible');
      cy.contains('OK', timeout).click();
      cy.get('.ant-modal-body > :nth-child(1) > :nth-child(2) > .Button__BaseButton-sc-1hmbtsr-0', timeout).click();
    });
    
    it('Create', () => {
      cy.contains('Tambah', timeout).click();
      cy.get('#users_form_step1_firstName', timeout).clear().type('Aauto test');
      cy.get('#users_form_step1_email', timeout).clear().type('tes.auto@gmail.com');
      cy.get('#users_form_step1_no_hp', timeout).clear().type('1234567890');
      cy.get('#users_form_step1_scope', timeout).click({force:true});
      cy.wait(1000);
      cy.get('.ant-select-item-option-active', timeout).click({force:true});
      cy.contains('Selanjutnya', timeout).click({force:true});
      cy.get('#users_form_step2_username', timeout).clear().type('autotes');
      cy.get('#users_form_step2_password', timeout).type('{selectAll}password');
      cy.get('#users_form_step2_confirm_password', timeout).type('{selectAll}password');
      cy.get('.ant-space > :nth-child(2) > .Button__BaseButton-sc-1hmbtsr-0', timeout)
        .click({force:true});
      cy.contains('Berhasil', timeout).should('be.visible');
    });

    it('Read', () => {
      cy.wait(3000);
      cy.get(':nth-child(2)', timeout).eq(1).contains('Aauto test');
      cy.contains('Username', timeout).click();
      cy.get('.ant-table-column-sort', timeout).eq(1).should('have.contain', 'autotes');
      cy.contains('Username', timeout).click();
      cy.wait(1000);
      cy.contains('Username', timeout).click();
      cy.contains('Role', timeout).click();
      cy.get('.ant-table-column-sort', timeout).eq(1).should('have.contain', 'admin');
      cy.contains('Created Date', timeout).click();
      cy.wait(1000);
      cy.contains('Created Date', timeout).click();
      // const todaysDate = Cypress.moment().format('DD MMM YYYY');
      // cy.get('.ant-table-column-sort', timeout).eq(1).contains(todaysDate);
    });
    
    it('Update', () => {
      cy.get(':nth-child(6) > .ant-space > .ant-space-item > .ant-dropdown-trigger', timeout).eq(0).click();
      cy.contains('Edit', timeout).click();
      cy.get('#update_user_form_firstName', timeout).should('have.value', 'Aauto test');
      cy.get('#update_user_form_firstName', timeout).clear().type('aauto tes update');
      cy.get('#update_user_form_email', timeout).clear().type('tes_@update.com');
      cy.get('#update_user_form_no_hp', timeout).clear().type('1234567890');
      cy.get('#update_user_form_username', timeout).clear().type('autotes 2');
      cy.get('#update_user_form > .ant-row-space-between > :nth-child(2) > .Button__BaseButton-sc-1hmbtsr-0', timeout).click({force:true});
      cy.contains('Berhasil', timeout).should('be.visible');
    });
    
    it('Delete', () => {
      cy.wait(3000);
      cy.get(':nth-child(6) > .ant-space > .ant-space-item > .ant-dropdown-trigger', timeout).eq(0).click({force:true});
      cy.contains('Hapus', timeout).click({force:true});
      cy.contains('Tidak', timeout).click();
      cy.get(':nth-child(6) > .ant-space > .ant-space-item > .ant-dropdown-trigger', timeout).eq(0).click({force:true});
      cy.contains('Hapus', timeout).click({force:true});
      cy.contains('Anda yakin ingin menghapus user autotes 2?', timeout).should('be.visible');
      cy.get('.swal2-confirm', timeout).click();
      cy.contains('Berhasil', timeout).should('be.visible');
      cy.contains('auto', timeout).should('not.exist');
    });
  });
});


