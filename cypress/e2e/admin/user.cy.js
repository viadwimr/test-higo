/// <reference types="Cypress" />

var timeout = { timeout: 60000 }

describe('User', () => {
  before(() => {
    cy.login('admin');
  });
  
  before(() => {
    cy.get('[title="User"] > .ant-menu-title-content > a', timeout).click();
  });
  
  describe('Sorting Data', () => {
    describe('by Full Name', () => {
      it('ASC', () => {
        cy.wait(3000);
        cy.contains('Full Name', timeout).click();
        cy.get('.ant-table-column-sort', timeout).eq(1).should('have.contain', 'Augustinus');
        cy.get('.ant-table-column-sort', timeout).eq(2).should('have.contain', 'engineering');
        cy.get('.ant-table-column-sort', timeout).eq(3).should('have.contain', 'Engineering');
        cy.get('.ant-table-column-sort', timeout).eq(4).should('have.contain', 'Flexem 350219100011');
        cy.get('.ant-table-column-sort', timeout).eq(5).should('have.contain', 'Flexem 350219100036 ');
      });
  
      it('DESC', () => {
        cy.wait(3000);
        cy.contains('Full Name', timeout).click();
        cy.get('.ant-table-column-sort', timeout).eq(1).should('have.contain', 'Tim Leader');
        cy.get('.ant-table-column-sort', timeout).eq(2).should('have.contain', 'Supervisor');
        cy.get('.ant-table-column-sort', timeout).eq(3).should('have.contain', 'Superuser');
        cy.get('.ant-table-column-sort', timeout).eq(4).should('have.contain', 'putra putri');
        cy.get('.ant-table-column-sort', timeout).eq(5).should('have.contain', 'Pungky');
      });
    });
    
    describe('by Username', () => {
      it('ASC', () => {
        cy.wait(3000);
        cy.contains('Username', timeout).click();
        cy.get('.ant-table-column-sort', timeout).eq(1).should('have.contain', 'augustinus');
        cy.get('.ant-table-column-sort', timeout).eq(2).should('have.contain', 'engineering');
        cy.get('.ant-table-column-sort', timeout).eq(3).should('have.contain', 'engineering_');
        cy.get('.ant-table-column-sort', timeout).eq(4).should('have.contain', 'gerysalut');
        cy.get('.ant-table-column-sort', timeout).eq(5).should('have.contain', 'gf_packaging_a1');
      });
  
      it('DESC', () => {
        cy.wait(3000);
        cy.contains('Username', timeout).click();
        cy.get('.ant-table-column-sort', timeout).eq(1).should('have.contain', 'superuser');
        cy.get('.ant-table-column-sort', timeout).eq(2).should('have.contain', 'putraputrijaya');
        cy.get('.ant-table-column-sort', timeout).eq(3).should('have.contain', 'pungky');
        cy.get('.ant-table-column-sort', timeout).eq(4).should('have.contain', 'oven_baking');
        cy.get('.ant-table-column-sort', timeout).eq(5).should('have.contain', 'mysupervisor2');
      });
    });

    describe('by Role', () => {
      it('ASC', () => {
        cy.wait(3000);
        cy.contains('Role', timeout).click();
        cy.get('.ant-table-column-sort', timeout).eq(1).should('have.contain', 'admin');
        cy.get('.ant-table-column-sort', timeout).eq(2).should('have.contain', 'direktur');
        cy.get('.ant-table-column-sort', timeout).eq(3).should('have.contain', 'engineering');
        cy.get('.ant-table-column-sort', timeout).eq(4).should('have.contain', 'engineering');
        cy.get('.ant-table-column-sort', timeout).eq(5).should('have.contain', 'kepala_pabrik');
      });
  
      it('DESC', () => {
        cy.wait(3000);
        cy.contains('Role', timeout).click();
        cy.get('.ant-table-column-sort', timeout).eq(1).should('have.contain', 'team_leader');
        cy.get('.ant-table-column-sort', timeout).eq(2).should('have.contain', 'supervisor');
        cy.get('.ant-table-column-sort', timeout).eq(3).should('have.contain', 'supervisor');
        cy.get('.ant-table-column-sort', timeout).eq(4).should('have.contain', 'superuser');
        cy.get('.ant-table-column-sort', timeout).eq(5).should('have.contain', 'operator');
      });
    });

    describe('by Created Date', () => {
      it('ASC', () => {
        cy.wait(3000);
        cy.contains('Created Date', timeout).click();
        cy.get('.ant-table-column-sort', timeout).eq(1).should('have.contain', '18 Feb 2020 - 10:33:12');
        cy.get('.ant-table-column-sort', timeout).eq(2).should('have.contain', '18 Feb 2020 - 10:34:20');
        cy.get('.ant-table-column-sort', timeout).eq(3).should('have.contain', '11 Mar 2020 - 16:54:27');
        cy.get('.ant-table-column-sort', timeout).eq(4).should('have.contain', '11 Mar 2020 - 16:55:09');
        cy.get('.ant-table-column-sort', timeout).eq(5).should('have.contain', '11 Mar 2020 - 16:56:00');
      });
  
      it('DESC', () => {
        cy.wait(3000);
        cy.contains('Created Date', timeout).click();
        cy.get('.ant-table-column-sort', timeout).eq(1).should('have.contain', '09 Agt 2022 - 10:42:26');
        cy.get('.ant-table-column-sort', timeout).eq(2).should('have.contain', '18 Jul 2022 - 13:20:30');
        cy.get('.ant-table-column-sort', timeout).eq(3).should('have.contain', '23 Mei 2022 - 10:39:00');
        cy.get('.ant-table-column-sort', timeout).eq(4).should('have.contain', '31 Mar 2022 - 05:23:43');
        cy.get('.ant-table-column-sort', timeout).eq(5).should('have.contain', '15 Mar 2022 - 17:21:37');
        cy.get('.ant-table-column-sort', timeout).eq(6).should('have.contain', '12 Jan 2022 - 15:01:40');
        cy.get('.ant-table-column-sort', timeout).eq(7).should('have.contain', '12 Jan 2022 - 14:58:52');
      });
    });

    describe('Gallery List', () => {
      it('by Name', () => {
        cy.wait(3000);
        cy.get(':nth-child(2) > .ant-row > :nth-child(2) > .Button__BaseButton-sc-1hmbtsr-0', timeout).click();
        cy.get(':nth-child(1) > .ant-card > .ant-card-body', timeout).should('have.contain', 'Augustinus');
        cy.get(':nth-child(2) > .ant-card > .ant-card-body', timeout).should('have.contain', 'Engineering');
        cy.get(':nth-child(3) > .ant-card > .ant-card-body', timeout).should('have.contain', 'engineering');
        cy.get(':nth-child(4) > .ant-card > .ant-card-body', timeout).should('have.contain', 'Flexem 350219100011');
        cy.get(':nth-child(5) > .ant-card > .ant-card-body', timeout).should('have.contain', 'Flexem 350219100036 ')
      });
    });
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
      cy.get('#users_form_step2_username', timeout).type('engineering');
      cy.get('#users_form_step2_password', timeout).type('{selectAll}password');
      cy.get('#users_form_step2_confirm_password', timeout).type('{selectAll}password');
      cy.get('.ant-space > :nth-child(2) > .Button__BaseButton-sc-1hmbtsr-0', timeout)
        .click();
      cy.contains('Failure', timeout).should('be.visible');
      cy.contains('Username "engineering" is already taken in client 5e4b58ba2b91b5525a1bf8a1', timeout)
        .should('be.visible');
      cy.contains('OK', timeout).click();
      cy.get('.ant-modal-body > :nth-child(1) > :nth-child(2) > .Button__BaseButton-sc-1hmbtsr-0', timeout).click();
    });
    
    it('Tambah', () => {
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

    it('Cek Data', () => {
      cy.wait(3000);
      cy.get(':nth-child(2)', timeout).eq(1).contains('Aauto test');
      cy.contains('Username', timeout).click();
      cy.get('.ant-table-column-sort', timeout).eq(2).should('have.contain', 'autotes');
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
    
    it('Edit', () => {
      cy.get(':nth-child(6) > .ant-space > .ant-space-item > .ant-dropdown-trigger', timeout).eq(0).click();
      cy.contains('Edit', timeout).click();
      cy.get('#update_user_form_firstName', timeout).clear().type('aauto tes update');
      cy.get('#update_user_form_email', timeout).clear().type('tes_@update.com');
      cy.get('#update_user_form_no_hp', timeout).clear().type('1234567890');
      cy.get('#update_user_form_username', timeout).clear().type('autotes 2');
      cy.get('#update_user_form > .ant-row-space-between > :nth-child(2) > .Button__BaseButton-sc-1hmbtsr-0', timeout).click({force:true});
      cy.contains('Berhasil', timeout).should('be.visible');
    });
    
    it('Hapus', () => {
      cy.wait(3000);
      cy.get(':nth-child(6) > .ant-space > .ant-space-item > .ant-dropdown-trigger', timeout).eq(0).click({force:true});
      cy.contains('Hapus', timeout).click({force:true});
      cy.contains('Tidak', timeout).click();
      cy.get(':nth-child(6) > .ant-space > .ant-space-item > .ant-dropdown-trigger', timeout).eq(0).click({force:true});
      cy.contains('Hapus', timeout).click({force:true});
      cy.contains('Anda yakin ingin menghapus user autotes 2?', timeout).should('be.visible');
      cy.get('.swal2-confirm', timeout).click();
      cy.contains('Berhasil', timeout).should('be.visible');
    });
  });
});


