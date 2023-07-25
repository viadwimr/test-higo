/// <reference types="Cypress" />

var timeout = { timeout: 6000 }
var force = { force: true }

describe('Alert', () => {
  before(() => {
    cy.login('reviewer-wapres');
  });
  
  beforeEach(() => {
    cy.visit('/')
    cy.get('[title="Alert"] > .ant-menu-title-content > a', timeout).click();
  });
  
  describe.skip('Sorting Data', () => {
    describe('Sorting List Tabel Rules', () => {
      it('ASC', () => {
        cy.wait(3000);
        cy.contains('Nama Alert', timeout).click();
        cy.get('.ant-table-column-sort', timeout).eq(2).should('exist');
        cy.get('.ant-table-column-sort', timeout).eq(1).should('exist');
      });

      it('DESC', () => {
        cy.wait(3000);
        cy.contains('Nama Alert', timeout).click();
        cy.wait(3000);
        cy.contains('Nama Alert', timeout).click();
        cy.get('.ant-table-column-sort', timeout).eq(2).should('exist');
        cy.get('.ant-table-column-sort', timeout).eq(1).should('exist');
      });
    });

    describe('Sorting List Form Rules', () => {
      it('Filter', () => {
        cy.wait(3000);
        cy.contains('Tambah Rules', timeout).click();
        cy.get('[data-testid=select-name-device] > .ant-select-selector', timeout).click();
        cy.wait(1000);
        cy.contains('Paragon Device 1', timeout).should('be.visible');
        cy.contains('Paragon Device 2', timeout).should('be.visible');
        cy.contains('Paragon Device 3', timeout).should('be.visible');
      });
    });

    describe('Sorting List Tabel Channels', () => {
      beforeEach(() => {
        cy.contains('CHANNEL', timeout).click();
      });

      it('ASC', () => {
        cy.wait(3000);
        cy.contains('Nama Channel', timeout).click();
        cy.get('.ant-table-column-sort', timeout).eq(1).should('have.contain', 'Notif Krishna');
        cy.get('.ant-table-column-sort', timeout).eq(2).should('have.contain', 'Telegram Group Paragon EMS Monitoring Telkom');
        cy.get('.ant-table-column-sort', timeout).eq(3).should('have.contain', 'Trial Email ulva');
      });

      it('DESC', () => {
        cy.wait(3000);
        cy.contains('Nama Channel', timeout).click();
        cy.wait(3000);
        cy.contains('Nama Channel', timeout).click();
        cy.get('.ant-table-column-sort', timeout).eq(3).should('have.contain', 'Notif Krishna');
        cy.get('.ant-table-column-sort', timeout).eq(2).should('have.contain', 'Telegram Group Paragon EMS Monitoring Telkom');
        cy.get('.ant-table-column-sort', timeout).eq(1).should('have.contain', 'Trial Email ulva');
      });
    });
  });
  
  describe('Rules', () => {
    beforeEach(() => {
      cy.contains('RULES', timeout).click();
    });

    it('Data', () => {
      cy.wait(3000);
      cy.contains('Tem', timeout).should('be.visible');
      cy.contains('Sensor Lingkungan 1', timeout).should('be.visible');
      cy.contains('danger', timeout).should('be.visible');
      cy.contains('Email - email', timeout).should('be.visible');
      cy.contains('10 Menit', timeout).should('be.visible');
      cy.contains('25/04/23 06:14:47', timeout).should('be.visible');
    });
    
    it.skip('Tambah Rules (Negative)', () => {
      cy.wait(3000);
      cy.contains('Tambah Rules', timeout).click();
      cy.get('[style="display: flex; width: 100%; justify-content: flex-end;"] > .Button__BaseButton-sc-1hmbtsr-0', timeout).click();
      cy.contains('Nama Alert wajib di isi!', timeout).should('be.visible');
      cy.contains('Device wajib di pilih!', timeout).should('be.visible');
      cy.contains('Channel wajib di pilih!', timeout).should('be.visible');
      cy.contains('Aksi wajib di pilih!', timeout).should('be.visible');
      cy.contains('Aksi wajib di pilih!', timeout).should('be.visible');
      cy.contains('Interval wajib di pilih!', timeout).should('be.visible');
    });

    it.skip('Tambah Rules (Positive)', () => {
      cy.wait(3000);
      cy.contains('Tambah Rules', timeout).click();
      cy.get('#name', timeout).type('Test Alert');
      cy.get('#device', timeout).click();
      cy.wait(1000);
      cy.get('div[class="ant-select-item-option-content"]', timeout).contains('Paragon Device 2 - Kemas Primer Semsol', timeout).click();
      cy.get('#channel', timeout).click();
      cy.get('[data-testid="select-name-channel-2"]', timeout).click();
      cy.get('#action', timeout).click();
      cy.get('div[class="ant-select-item-option-content"]', timeout).contains('Indikator').click();
      cy.get('#status', timeout).click();
      cy.get('div[class="ant-select-item-option-content"]', timeout).contains('danger').click();
      cy.get('#running', timeout).click();
      cy.get('div[class="ant-select-item-option-content"]', timeout).contains('Notifikasi').click();
      cy.get('#message', timeout).type('Lorem ipsum');
      cy.get('#interval', timeout).type('5');
      cy.get('[style="display: flex; width: 100%; justify-content: flex-end;"] > .Button__BaseButton-sc-1hmbtsr-0', timeout).click();
      cy.contains('Rule berhasil ditambahkan.', timeout).should('be.visible');
      cy.wait(3000);
      cy.get('tr[class="ant-table-row ant-table-row-level-0"]', timeout).eq(0).should('contain.text', 'Test Alert')
        .and('contain.text', 'Paragon Device 2 - Kemas Primer Semsol')
        .and('contain.text', 'danger')
        .and('contain.text', 'Notif Krishna - email')
        .and('contain.text', '10 Menit') //minim 10
    });

    it.skip('Edit Rules (Negative)', () => {
      cy.wait(3000);
      cy.get('div[class="ant-dropdown-trigger"]', timeout).eq(0).click();
      cy.get('span[class="ant-dropdown-menu-title-content"]', timeout).contains('Edit').click();
      cy.get('#name', timeout).should('have.value','Test Alert');
      cy.get('#name', timeout).clear();
      cy.get('[style="display: flex; width: 100%; justify-content: flex-end;"] > .Button__BaseButton-sc-1hmbtsr-0', timeout).click();
      cy.contains('Nama Alert wajib di isi!', timeout).should('be.visible');
    });

    it.skip('Edit Rules (Positive)', () => {
      cy.wait(3000);
      cy.get('div[class="ant-dropdown-trigger"]', timeout).eq(0).click();
      cy.get('span[class="ant-dropdown-menu-title-content"]', timeout).contains('Edit').click();
      cy.get('#name', timeout).should('have.value','Test Alert');
      cy.get('#name', timeout).clear().type('Test Alert Edit');
      cy.get('[style="display: flex; width: 100%; justify-content: flex-end;"] > .Button__BaseButton-sc-1hmbtsr-0', timeout).click();
      cy.contains('Rule berhasil diubah.', timeout).should('be.visible');
      cy.get('tr[class="ant-table-row ant-table-row-level-0"]', timeout).eq(0).should('contain.text', 'Test Alert Edit')
    });

    it.skip('Duplicate', () => {
      cy.wait(3000);
      cy.get('div[class="ant-dropdown-trigger"]', timeout).eq(0).click();
      cy.get('span[class="ant-dropdown-menu-title-content"]', timeout).contains('Duplikat').click();
      cy.contains('Rule berhasil ditambahkan.', timeout).should('be.visible');
      cy.contains('Test Alert Edit duplikat', timeout).should('be.visible');
    });
    
    describe.skip('Hapus Rule', () => {
      it('Hapus Rule Duplikat', () => {
        cy.wait(3000);
        cy.get('div[class="ant-dropdown-trigger"]', timeout).eq(0).click();
        cy.get('span[class="ant-dropdown-menu-title-content"]', timeout).contains('Hapus').click();
        cy.contains('Yakin hapus Test Alert Edit duplikat?').should('be.visible');
        cy.contains('Tidak', timeout).click();
        cy.get('div[class="ant-dropdown-trigger"]', timeout).eq(0).click();
        cy.get('span[class="ant-dropdown-menu-title-content"]', timeout).contains('Hapus').click();
        cy.contains('Yakin hapus Test Alert Edit duplikat?').should('be.visible');
        cy.get('.swal2-confirm', timeout).click();
        cy.contains('Rule berhasil dihapus.', timeout).should('be.visible');
        cy.contains('Test Alert Edit duplikat', timeout).should('not.exist');
      });

      it('Hapus Rule Edit', () => {
        cy.wait(3000);
        cy.get('div[class="ant-dropdown-trigger"]', timeout).eq(0).click();
        cy.get('span[class="ant-dropdown-menu-title-content"]', timeout).contains('Hapus').click();
        cy.contains('Yakin hapus Test Alert Edit?').should('be.visible');
        cy.contains('Tidak', timeout).click();
        cy.get('div[class="ant-dropdown-trigger"]', timeout).eq(0).click();
        cy.get('span[class="ant-dropdown-menu-title-content"]', timeout).contains('Hapus').click();
        cy.contains('Yakin hapus Test Alert Edit?').should('be.visible');
        cy.get('.swal2-confirm', timeout).click();
        cy.contains('Rule berhasil dihapus.', timeout).should('be.visible');
        cy.contains('Test Alert Edit', timeout).should('not.exist');
      });
    });
  });

  describe('Channel', () => {
    beforeEach(() => {
      cy.contains('CHANNEL', timeout).click();
    });

    it('Data', () => {
      cy.wait(3000);
      cy.contains('Email', timeout).should('exist');
      cy.contains('email', timeout).should('exist');
      cy.contains('25/04/2023 06:11:57', timeout).should('exist');
    });
    
    describe.skip('Tambah Channel (Negative)', () => {
      it('Tambah Channel (Email)', () => {
        cy.wait(3000);
        cy.contains('Tambah Channel', timeout).click();
        cy.get('.ant-btn > span', timeout).click();
        cy.contains('Nama Channel wajib di isi!', timeout).should('be.visible');
        cy.contains('Email harus di isi.', timeout).should('be.visible');
      });

      it('Tambah Channel (Telegram)', () => {
        cy.wait(3000);
        cy.contains('Tambah Channel', timeout).click();
        cy.get('.ant-select-selection-item', timeout).click();
        cy.get('div[class="ant-select-item-option-content"]', timeout).contains('Telegram').click();
        cy.get('.ant-btn > span', timeout).click();
        cy.contains('Nama Channel wajib di isi!', timeout).should('be.visible');
        cy.contains('BOT TOKEN harus di isi.', timeout).should('be.visible');
        cy.contains('CHAT ID harus di isi.', timeout).should('be.visible');
      });

      it('Tambah Channel (SMS)', () => {
        cy.wait(3000);
        cy.contains('Tambah Channel', timeout).click();
        cy.get('.ant-select-selection-item', timeout).click();
        cy.get('div[class="ant-select-item-option-content"]', timeout).contains('SMS').click();
        cy.get('.ant-btn > span', timeout).click();
        cy.contains('Nama Channel wajib di isi!', timeout).should('be.visible');
        cy.contains('No Telepon harus di isi.', timeout).should('be.visible');
      });
    });

    describe.skip('Tambah Channel (Positive)', () => {
      it('Tambah Channel (Email)', () => {
        cy.wait(3000);
        cy.contains('Tambah Channel', timeout).click();
        cy.get('#name', timeout).type('Channel Email Test');
        cy.get('.ant-select-selection-item', timeout).click();
        cy.get('div[class="ant-select-item-option-content"]', timeout).contains('Email').click();
        cy.get('#list_email', timeout).type('test@mailinator.com');
        cy.get('.ant-btn > span', timeout).click();
        cy.contains('Channel berhasil ditambah.', timeout).should('be.visible');
        cy.contains('Channel Email Test', timeout).should('be.visible');
      });

      it('Edit Channel (Email)', () => {
        cy.wait(3000);
        cy.get(':nth-child(4) > [data-testid=menu-update-0]', timeout).click();
        cy.get('span[class="ant-dropdown-menu-title-content"]', timeout).contains('Edit').click();
        cy.get('#name', timeout).should('have.value', 'Channel Email Test')
        cy.get('#name', timeout).clear().type('Channel Email Test Edit');
        cy.get('.ant-btn > span', timeout).click();
        cy.contains('Channel berhasil diubah.', timeout).should('be.visible');
        cy.contains('Channel Email Test Edit', timeout).should('be.visible');
      });

      it('Tambah Channel (Telegram)', () => {
        cy.wait(3000);
        cy.contains('Tambah Channel', timeout).click();
        cy.get('#name', timeout).type('Channel Telegram Test');
        cy.get('.ant-select-selection-item', timeout).click();
        cy.get('div[class="ant-select-item-option-content"]', timeout).contains('Telegram').click();
        cy.get('#telegram_bot_token', timeout).type('123123');
        cy.get('#telegram_chat_id', timeout).type('chatid');
        cy.get('.ant-btn > span', timeout).click();
        cy.contains('Channel berhasil ditambah.', timeout).should('be.visible');
        cy.contains('Channel Telegram Test', timeout).should('be.visible');
      });

      it('Edit Channel (Telegram)', () => {
        cy.wait(3000);
        cy.get(':nth-child(4) > [data-testid=menu-update-0]', timeout).click();
        cy.get('span[class="ant-dropdown-menu-title-content"]', timeout).contains('Edit').click();
        cy.get('#name', timeout).should('have.value', 'Channel Telegram Test')
        cy.get('#name', timeout).clear().type('Channel Telegram Test Edit');
        cy.get('.ant-btn > span', timeout).click();
        cy.contains('Channel berhasil diubah.', timeout).should('be.visible');
        cy.contains('Channel Telegram Test Edit', timeout).should('be.visible');
      });

      // it('Tambah Channel (Push Notification)', () => {
      //   cy.wait(3000);
      //   cy.contains('Tambah Channel', timeout).click();
      //   cy.get('#name', timeout).type('Channel Push Notification');
      //   cy.get('.ant-select-selection-item', timeout).click();
      //   cy.get('div[class="ant-select-item-option-content"]', timeout).contains('Push Notification').click();
      //   cy.get('.ant-select-selection-overflow', timeout).click();
      //   cy.get('div[class="ant-select-item-option-content"]', timeout).contains('Budi').click();
      //   cy.get('.ant-select-selection-overflow', timeout).click();
      //   cy.get('.ant-btn > span', timeout).click();
      //   cy.contains('Channel berhasil ditambah.', timeout).should('be.visible');
      //   cy.contains('Channel Push Notification', timeout).should('be.visible');
      // });

      // it('Edit Channel (Push Notification)', () => {
      //   cy.wait(3000);
      //   cy.get('[data-row-key="616d5e42bdf3b00001655412"] > :nth-child(4) > .ant-dropdown-trigger > svg', timeout).click();
      //   cy.get('span[class="ant-dropdown-menu-title-content"]', timeout).contains('Edit').click();
      //   cy.get('#name', timeout).clear().type('Channel Push Notification Edit');
      //   cy.get('.ant-btn > span', timeout).click();
      //   cy.contains('Channel berhasil diubah.', timeout).should('be.visible');
      //   cy.contains('Channel Push Notification Edit', timeout).should('be.visible');
      // });

      it('Tambah Channel (SMS)', () => {
        cy.wait(3000);
        cy.contains('Tambah Channel', timeout).click();
        cy.get('#name', timeout).type('Channel SMS Test');
        cy.get('.ant-select-selection-item', timeout).click();
        cy.get('div[class="ant-select-item-option-content"]', timeout).contains('SMS').click();
        cy.get('#list_phone', timeout).type('081222333444');
        cy.get('.ant-btn > span', timeout).click();
        cy.contains('Channel berhasil ditambah.', timeout).should('be.visible');
        cy.contains('Channel SMS Test', timeout).should('be.visible');
      });

      it('Edit Channel (SMS)', () => {
        cy.wait(3000);
        cy.get(':nth-child(4) > [data-testid=menu-update-0]', timeout).click();
        cy.get('span[class="ant-dropdown-menu-title-content"]', timeout).contains('Edit').click();
        cy.get('#name', timeout).should('have.value', 'Channel SMS Test')
        cy.get('#name', timeout).clear().type('Channel SMS Test Edit');
        cy.get('.ant-btn > span', timeout).click();
        cy.contains('Channel berhasil diubah.', timeout).should('be.visible');
        cy.contains('Channel SMS Test Edit', timeout).should('be.visible');
      });
    });
    
    describe.skip('Hapus Channel', () => {
      it('Hapus Channel (SMS)', () => {
        cy.wait(3000);
        cy.get(':nth-child(4) > [data-testid=menu-update-0]', timeout).click();
        cy.get('span[class="ant-dropdown-menu-title-content"]', timeout).contains('Hapus').click();
        cy.contains('Yakin hapus Channel SMS Test Edit?', timeout).should('be.visible');
        cy.contains('Tidak', timeout).click();
        cy.get(':nth-child(4) > [data-testid=menu-update-0]', timeout).click();
        cy.get('span[class="ant-dropdown-menu-title-content"]', timeout).contains('Hapus').click();
        cy.contains('Yakin hapus Channel SMS Test Edit?', timeout).should('be.visible');
        cy.get('.swal2-confirm', timeout).click();
        cy.contains('Channel berhasil dihapus.', timeout).should('be.visible');
        cy.contains('Channel SMS Test Edit', timeout).should('not.exist');
      });

      it('Hapus Channel (Telegram)', () => {
        cy.wait(3000);
        cy.get(':nth-child(4) > [data-testid=menu-update-0]', timeout).click();
        cy.get('span[class="ant-dropdown-menu-title-content"]', timeout).contains('Hapus').click();
        cy.contains('Yakin hapus Channel Telegram Test Edit?', timeout).should('be.visible');
        cy.contains('Tidak', timeout).click();
        cy.get(':nth-child(4) > [data-testid=menu-update-0]', timeout).click();
        cy.get('span[class="ant-dropdown-menu-title-content"]', timeout).contains('Hapus').click();
        cy.contains('Yakin hapus Channel Telegram Test Edit?', timeout).should('be.visible');
        cy.get('.swal2-confirm', timeout).click();
        cy.contains('Channel berhasil dihapus.', timeout).should('be.visible');
        cy.contains('Channel Telegram Test Edit', timeout).should('not.exist');
      });

      it('Hapus Channel (Email)', () => {
        cy.wait(3000)
        cy.get(':nth-child(4) > [data-testid=menu-update-0]', timeout).click();
        cy.get('span[class="ant-dropdown-menu-title-content"]', timeout).contains('Hapus').click();
        cy.contains('Yakin hapus Channel Email Test Edit?', timeout).should('be.visible');
        cy.contains('Tidak', timeout).click();
        cy.get(':nth-child(4) > [data-testid=menu-update-0]', timeout).click();
        cy.get('span[class="ant-dropdown-menu-title-content"]', timeout).contains('Hapus').click();
        cy.contains('Yakin hapus Channel Email Test Edit?', timeout).should('be.visible');
        cy.get('.swal2-confirm', timeout).click();
        cy.contains('Channel berhasil dihapus.', timeout).should('be.visible');
        cy.contains('Channel Email Test Edit', timeout).should('not.exist');
      });
    });
    
  });
});
