/// <reference types="Cypress" />

var timeout = { timeout: 60000 }

describe('User', () => {
  before(() => {
    cy.login('admin');
    cy.get('[title="User"] > .ant-menu-title-content > a', timeout).click();
  });
  
  describe('Tambah User (Admin Only)', () => {
    it('Akan muncul halaman berisi daftar user', () => {
      cy.get('.title', timeout).contains('USER');
      cy.get('.ant-table-thead > tr > :nth-child(1)', timeout).contains('Profile');
      cy.get('[aria-label="Full Name"] > .ant-table-column-sorters > .ant-table-column-title', timeout).contains('Full Name');
      cy.get('[aria-label="Username"] > .ant-table-column-sorters > .ant-table-column-title', timeout).contains('Username');
      cy.get('[aria-label="Role"] > .ant-table-column-sorters', timeout).contains('Role');
      cy.get('[aria-label="Created Date"] > .ant-table-column-sorters > .ant-table-column-title', timeout).contains('Created Date');
      cy.get('.ant-table-thead > tr > :nth-child(6)', timeout).should('be.visible');
    });

    it('Menampilkan Form Tambah User bagian Profile', () => {
      cy.contains('Tambah', timeout).click();
      cy.get('#users_form_step1_firstName', timeout).clear().type('Aauto test');
      cy.get('#users_form_step1_email', timeout).clear().type('tes.auto@gmail.com');
      cy.get('#users_form_step1_no_hp', timeout).clear().type('1234567890');
      cy.get('#users_form_step1_scope', timeout).click({force:true});
      cy.wait(1000);
      cy.get('.ant-select-item-option-active', timeout).click({force:true});
      cy.contains('Selanjutnya', timeout).click({force:true});
    });

    it('Menampilkan Form Tambah User bagian ID', () => {
      cy.get('#users_form_step2_username', timeout).clear().type('aautotes');
      cy.get('#users_form_step2_password', timeout).type('{selectAll}password');
      cy.get('#users_form_step2_confirm_password', timeout).type('{selectAll}password');
      cy.get('.ant-space > :nth-child(2) > .Button__BaseButton-sc-1hmbtsr-0', timeout)
        .click({force:true});
    });

    it('Menampilkan notifikasi berhasil dan data user berhasil ditambahkan', () => {
      cy.contains('Berhasil', timeout).should('be.visible');
      // check data
      cy.wait(3000);
      cy.get(':nth-child(2)', timeout).eq(1).contains('Aauto test');
      cy.contains('Username', timeout).click();
      cy.get('.ant-table-column-sort', timeout).eq(1).should('have.contain', 'aautotes');
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
  })

  describe('Edit User', () => {
    it('Menampilkan Form Edit User', () => {
      cy.get(':nth-child(6) > .ant-space > .ant-space-item > .ant-dropdown-trigger', timeout).eq(0).click();
      cy.contains('Edit', timeout).click();
      cy.get('#update_user_form_firstName', timeout).should('have.value', 'Aauto test');
      cy.get('#update_user_form_firstName', timeout).clear().type('aauto tes update');
      cy.get('#update_user_form_email', timeout).clear().type('tes_@update.com');
      cy.get('#update_user_form_no_hp', timeout).clear().type('1234567890');
      cy.get('#update_user_form_username', timeout).clear().type('aautotes 2');
      cy.get('#update_user_form > .ant-row-space-between > :nth-child(2) > .Button__BaseButton-sc-1hmbtsr-0', timeout).click({force:true});
    });

    it('Menampilkan notifikasi berhasil dan data user berhasil diedit', () => {
      cy.contains('Berhasil', timeout).should('be.visible');
      // check after edit
      cy.wait(3000);
      cy.get(':nth-child(2)', timeout).eq(1).contains('aautotes 2');
      cy.contains('Username', timeout).click();
      cy.get('.ant-table-column-sort', timeout).eq(1).should('have.contain', 'aautotes 2');
      cy.contains('Username', timeout).click();
      cy.wait(1000);
      cy.contains('Username', timeout).click();
      cy.contains('Role', timeout).click();
      cy.get('.ant-table-column-sort', timeout).eq(1).should('have.contain', 'admin');
      cy.contains('Created Date', timeout).click();
      cy.wait(1000);
      cy.contains('Created Date', timeout).click();
      // cy.get('body', timeout).find('.Header__TimeWrapper-q0uusf-1 > :nth-child(1)').invoke('text')
      //   .then((text) => {
      //     dateToday = text.slice()
      //   })
      // const todaysDate = Cypress.moment().format('DD MMM YYYY');
      // cy.get('.ant-table-column-sort', timeout).eq(1).contains(todaysDate);

    });
  });

  describe('Hapus User', () => {
    it('Menampilkan notifikasi konfirmasi hapus', () => {
      cy.wait(3000);
      cy.get(':nth-child(6) > .ant-space > .ant-space-item > .ant-dropdown-trigger', timeout).eq(0).click({force:true});
      cy.contains('Hapus', timeout).click({force:true});
      cy.contains('Tidak', timeout).click();
      cy.get(':nth-child(6) > .ant-space > .ant-space-item > .ant-dropdown-trigger', timeout).eq(0).click({force:true});
      cy.contains('Hapus', timeout).click({force:true});
      cy.contains('Anda yakin ingin menghapus user aautotes 2?', timeout).should('be.visible');
      cy.get('.swal2-confirm', timeout).click();
    });

    it('Menampilkan notifikasi berhasil dan data user berhasil dihapus', () => {
      cy.contains('Berhasil', timeout).should('be.visible');
      // check after edit
      cy.wait(3000);
      cy.contains('auto', timeout).should('not.exist');
    });
  });
});


