/// <reference types="Cypress" />

var timeout = { timeout: 6000 }
const d = new Date();

describe('Forgot Password', () => {
  before(() => {
    cy.visit('/');
    cy.wait(1000);
  });

  describe('Forgot Password Validation', () => {
    it('Empty Input', () => {
      cy.get(':nth-child(2) > a', timeout).click();
      cy.get('#check_account_email', timeout).type('qaevomotelkom.test@gmail.com').clear();
      cy.contains('Email tidak boleh kosong', timeout).should('be.visible');
      cy.get('#check_account_no_hp', timeout).type('098765432101').clear();
      cy.contains('Nomor tidak boleh kosong', timeout).should('be.visible');
      cy.wait(1000)
      cy.get('.ant-btn-primary', timeout).should('be.disabled')
    })

    it('Wrong Email & No Hp', () => {
      cy.get('#check_account_email', timeout).type('qaevomotelkom.test@gmail.com');
      cy.get('#check_account_no_hp', timeout).type('098765432101');
      cy.get('.ant-btn-primary', timeout).click();
      cy.contains('Failure', timeout).should('be.visible');
      cy.get('.swal2-confirm', timeout).click();
    })

    it('Wrong Email', () => {
      cy.get('#check_account_email', timeout).clear().type('1.,2/3"][=-op!@#$%^&*()_+|}{":?><x@gmail.com');
      cy.get('#check_account_email_help > .ant-form-item-explain-error > .alert-container > [data-testid="message"]', timeout)
        .contains('Email Tidak Tepat')
      cy.get('#check_account_email', timeout).clear().type('test.qa_12-12@gmail.com');
      cy.get('#check_account_no_hp', timeout).clear().type('1');
      cy.get('.ant-btn-primary', timeout).click();
      cy.contains('Failure', timeout).should('be.visible');
      cy.get('.swal2-confirm', timeout).click();
    })

    it('Wrong No Hp', () => {
      cy.get('#check_account_email', timeout).clear().type('qaevomotelkom@gmail.com');
      cy.get('#check_account_no_hp', timeout).clear().type('108734662829020003000');
      cy.get('#check_account_no_hp_help > .ant-form-item-explain-error > .alert-container > [data-testid="message"]', timeout)
        .contains('Harus berupa nomor, max 15 digit')
      cy.get('#check_account_no_hp', timeout).clear().type('1');
      cy.get('.ant-btn-primary', timeout).click();
      cy.contains('Failure', timeout).should('be.visible');
      cy.get('.swal2-confirm', timeout).click();
    })
  })

  describe('UAT', () => {
    it('Muncul halaman lupa password', () => {
      cy.visit('/');
      cy.wait(1000);
      cy.get(':nth-child(2) > a', timeout).click();
      cy.get('#check_account_email', timeout).should('be.visible');
      cy.get('#check_account_no_hp', timeout).should('be.visible');
      cy.wait(1000);
    })

    it('Tombol Kirim akan aktif setelah memasukkan email dan no HP', () => {
      cy.get('#check_account_email', timeout).type('qaevomotelkom@gmail.com');
      cy.get('#check_account_no_hp', timeout).type('1');
      cy.get('.ant-btn-primary', timeout).click();
    })

    it('Akan tampil halaman untuk reset password', () => {
      cy.contains('Success', timeout).should('be.visible');
      cy.wait(1000);
      cy.get('.swal2-confirm', timeout).click();
      cy.get(':nth-child(2) > .ant-row > .ant-col > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-input-affix-wrapper', timeout)
        .type('T123!@#$%^&*()_+')
      cy.get(':nth-child(4) > .ant-row > .ant-col > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-input-affix-wrapper', timeout)
        .type('T123!@#$%^&*()_+')
      cy.get('.ant-btn-primary', timeout).click();

      // check login
      cy.visit('/');
      cy.wait(1000);
      cy.get('#username', timeout).clear().type('tes-reviewer');
      cy.get('#password', timeout).clear().type('T123!@#$%^&*()_+');
      cy.get('.ant-btn', timeout).click();
      cy.get('.logo > img', timeout).should('be.visible');
      cy.contains('Dashboard', timeout).should('be.visible');
      cy.contains('Device', timeout).should('be.visible');
      cy.contains('Laporan', timeout).should('be.visible');
      cy.contains('User', timeout).should('be.visible');
      cy.get('[title="Target"] > .ant-menu-title-content > a', timeout).should('be.visible');
      cy.contains('Analisis', timeout).click();
      cy.contains('Trend', timeout).should('be.visible');

      // logout
      cy.get(':nth-child(2) > .ant-dropdown-trigger', timeout).click();
      cy.wait(1000);
      cy.contains('Logout', timeout).click();
      cy.wait(7000);
      cy.get('#username', timeout).should('be.visible');
      cy.get('#password', timeout).should('be.visible');
      cy.get('.ant-btn', timeout).should('be.visible');

      // back to prev data
      cy.wait(2000);
      cy.get(':nth-child(2) > a', timeout).click();
      cy.get('#check_account_email', timeout).type('qaevomotelkom@gmail.com');
      cy.get('#check_account_no_hp', timeout).type('1');
      cy.get('.ant-btn-primary', timeout).click();
      cy.contains('Success', timeout).should('be.visible');
      cy.wait(3000);
      cy.get('.swal2-confirm', timeout).click();
      cy.get(':nth-child(2) > .ant-row > .ant-col > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-input-affix-wrapper', timeout)
        .type('Jeager123')
      cy.get(':nth-child(4) > .ant-row > .ant-col > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-input-affix-wrapper', timeout)
        .type('Jeager123')
      cy.get('.ant-btn-primary', timeout).click();
      // check login
      cy.visit('/');
      cy.wait(1000);
      cy.get('#username', timeout).clear().type('tes-reviewer');
      cy.get('#password', timeout).clear().type('T123!@#$%^&*()_+');
      cy.get('.ant-btn', timeout).click();
      cy.contains('Failure', timeout).should('be.visible');
    })
  })

  describe('Reset Password Validation', () => {
    it('Empty Input', () => {
      cy.visit('/');
      cy.wait(1000);
      cy.get(':nth-child(2) > a', timeout).click();
      cy.get('#check_account_email', timeout).type('qaevomotelkom@gmail.com');
      cy.get('#check_account_no_hp', timeout).type('1');
      cy.get('.ant-btn-primary', timeout).click();
      cy.contains('Success', timeout).should('be.visible');
      cy.wait(3000);
      cy.get('.swal2-confirm', timeout).click();
      cy.wait(1000);
      cy.get(':nth-child(2) > .ant-row > .ant-col > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-input-affix-wrapper', timeout)
        .type('Telkom123!@#$%^&*()_+').clear();
      cy.contains('Password Baru tidak boleh kosong', timeout).should('be.visible');
      cy.get(':nth-child(4) > .ant-row > .ant-col > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-input-affix-wrapper', timeout)
        .type('Telko123!@#$%^&*()_+').clear();
      cy.contains('Konfirmasi Password Baru tidak boleh kosong', timeout).should('be.visible');
      cy.wait(1000);
      cy.get('.ant-btn-primary', timeout).should('be.disabled');
    })

    it('Wrong Password', () => {
      cy.get(':nth-child(2) > .ant-row > .ant-col > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-input-affix-wrapper', timeout)
        .clear().type('QATelkom123!@#$%^&*()_+')
      cy.get(':nth-child(4) > .ant-row > .ant-col > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-input-affix-wrapper', timeout)
        .clear().type('Telko123!@#$%^&*()_+')
      cy.get('.ant-form-item-explain-error',timeout).contains('Password tidak sama!')
      cy.get('.ant-btn-primary', timeout).should('be.disabled');
      cy.get(':nth-child(2) > .ant-row > .ant-col > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-input-affix-wrapper', timeout)
        .clear().type('Telko123!@#$%^&*()_+')
      cy.wait(1000);
      cy.get('.ant-btn-primary', timeout).should('be.enabled');
    })

    it('Wrong Confirm Password', () => {
      cy.get(':nth-child(2) > .ant-row > .ant-col > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-input-affix-wrapper', timeout)
        .clear().type('Telko123!@#$%^&*()_+')
      cy.get(':nth-child(4) > .ant-row > .ant-col > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-input-affix-wrapper', timeout)
        .clear().type('QATelkom123!@#$%^&*()_+')
      cy.get('.ant-form-item-explain-error',timeout).contains('Password tidak sama!')
      cy.get('.ant-btn-primary', timeout).should('be.disabled');
      cy.get(':nth-child(4) > .ant-row > .ant-col > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-input-affix-wrapper', timeout)
        .clear().type('Telko123!@#$%^&*()_+')
      cy.wait(1000);
      cy.get('.ant-btn-primary', timeout).should('be.enabled');

      // back to login page
      cy.get('.ant-btn-link', timeout).click();
      cy.get('h1', timeout).contains('Energy Monitoring System Denso Manufacturing Indonesia');
    })

    it('Long Password', () => {
      cy.visit('/');
      cy.wait(1000);
      cy.get(':nth-child(2) > a', timeout).click();
      cy.get('#check_account_email', timeout).type('qaevomotelkom@gmail.com');
      cy.get('#check_account_no_hp', timeout).type('1');
      cy.get('.ant-btn-primary', timeout).click();
      cy.contains('Success', timeout).should('be.visible');
      cy.wait(3000);
      cy.get('.swal2-confirm', timeout).click();
      cy.wait(1000);
      cy.get(':nth-child(2) > .ant-row > .ant-col > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-input-affix-wrapper', timeout)
        .type('QATelkom123!@#$%^&*()_+')
      cy.get(':nth-child(4) > .ant-row > .ant-col > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-input-affix-wrapper', timeout)
        .type('QATelkom123!@#$%^&*()_+')
      cy.get('.ant-btn-primary', timeout).click();
      cy.contains('400 "password" length must be less than or equal to 20 characters long', timeout).should('be.visible');
      cy.get('.swal2-confirm', timeout).click();
      /*
      // improvement
      cy.wait(3000)
      cy.get(':nth-child(2) > .ant-row > .ant-col > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-input-affix-wrapper', timeout)
        .should('be.visible');
      cy.get(':nth-child(4) > .ant-row > .ant-col > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-input-affix-wrapper', timeout)
        .should('be.visible');
      cy.get('.ant-btn-primary', timeout).should('be.visible');
      */
    })
  })
});

