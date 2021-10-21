/// <reference types="Cypress" />

var timeout = { timeout: 10000 }
var force = { force: true }

describe('Alert', () => {
  beforeEach(() => {
    cy.visit('/alert');
  });

  describe('Rules', () => {
    beforeEach(() => {
      cy.contains('RULES', timeout).click();
    });

    it('Tambah Rules (Negative)', () => {
      cy.wait(3000);
      cy.contains('Tambah Rules', timeout).click();
      cy.get('[style="display: flex; width: 100%; justify-content: flex-end;"] > .Button__BaseButton-sc-1hmbtsr-0', timeout).click();
      cy.contains('Nama Alert wajib di isi!', timeout).should('be.visible');
      cy.contains('Device wajib di pilih!', timeout).should('be.visible');
      cy.contains('Channel wajib di pilih!', timeout).should('be.visible');
      cy.contains('Aksi wajib di pilih!', timeout).should('be.visible');
      cy.contains('Aksi wajib di pilih!', timeout).should('be.visible');
      cy.contains('Interval wajib di input!', timeout).should('be.visible');
    });

    it('Tambah Rules (Positive)', () => {
      cy.wait(3000);
      cy.contains('Tambah Rules', timeout).click();
      cy.get('#name', timeout).type('Test Alert');
      cy.get('#device', timeout).click();
      cy.get('div[class="ant-select-item-option-content"]', timeout).contains('Suhu Aktual Zona 1', timeout).click();
      cy.get('#channel', timeout).click();
      cy.get('div[class="ant-select-item-option-content"]', timeout).contains('Channel SMS', timeout).click();
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
        .and('contain.text', 'Suhu Aktual Zona 1')
        .and('contain.text', 'danger')
        .and('contain.text', 'Channel SMS - sms')
        .and('contain.text', '5 Menit')
    });

    it('Edit Rules (Negative)', () => {
      cy.wait(3000);
      cy.get('div[class="ant-dropdown-trigger"]', timeout).eq(0).click();
      cy.get('span[class="ant-dropdown-menu-title-content"]', timeout).contains('Edit').click();
      cy.get('#name', timeout).clear();
      cy.get('[style="display: flex; width: 100%; justify-content: flex-end;"] > .Button__BaseButton-sc-1hmbtsr-0', timeout).click();
      cy.contains('Nama Alert wajib di isi!', timeout).should('be.visible');
    });

    it('Edit Rules (Positive)', () => {
      cy.wait(3000);
      cy.get('div[class="ant-dropdown-trigger"]', timeout).eq(0).click();
      cy.get('span[class="ant-dropdown-menu-title-content"]', timeout).contains('Edit').click();
      cy.get('#name', timeout).clear().type('Test Alert Edit');
      cy.get('[style="display: flex; width: 100%; justify-content: flex-end;"] > .Button__BaseButton-sc-1hmbtsr-0', timeout).click();
      cy.contains('Rule berhasil diubah.', timeout).should('be.visible');
      cy.get('tr[class="ant-table-row ant-table-row-level-0"]', timeout).eq(0).should('contain.text', 'Test Alert Edit')
    });

    it('Duplicate', () => {
      cy.wait(3000);
      cy.get('div[class="ant-dropdown-trigger"]', timeout).eq(0).click();
      cy.get('span[class="ant-dropdown-menu-title-content"]', timeout).contains('Duplikat').click();
      cy.contains('Rule berhasil ditambahkan.', timeout).should('be.visible');
      cy.contains('Test Alert Edit duplikat', timeout).should('be.visible');
    });
  });

  describe('Channel', () => {
    beforeEach(() => {
      cy.contains('CHANNEL', timeout).click();
    });

    it('Tambah Channel (Negative)', () => {
      cy.wait(3000);
      cy.contains('Tambah Channel', timeout).click();
      cy.get('.ant-btn > span', timeout).click();
      cy.contains('Nama Channel wajib di isi!', timeout).should('be.visible');
      cy.contains('Email harus di isi.', timeout).should('be.visible');
      cy.contains('Format email tidak sesuai.', timeout).should('be.visible');
    });

    describe('Tambah Channel (Positive)', () => {
      it('Tambah Channel (Email)', () => {
        cy.wait(3000);
        cy.contains('Tambah Channel', timeout).click();
        cy.get('#name', timeout).type('Channel Email');
        cy.get('.ant-select-selection-item', timeout).click();
        cy.get('div[class="ant-select-item-option-content"]', timeout).contains('Email').click();
        cy.get('#list_email', timeout).type('test@mailinator.com');
        cy.get('.ant-btn > span', timeout).click();
        cy.contains('Channel berhasil ditambah.', timeout).should('be.visible');
        cy.contains('Channel Email', timeout).should('be.visible');
      });

      it('Edit Channel (Email)', () => {
        cy.wait(3000);
        cy.get(':nth-child(4) > [data-testid=menu-update-0]', timeout).click();
        cy.get('span[class="ant-dropdown-menu-title-content"]', timeout).contains('Edit').click();
        cy.get('#name', timeout).clear().type('Channel Email Edit');
        cy.get('.ant-btn > span', timeout).click();
        cy.contains('Channel berhasil diubah.', timeout).should('be.visible');
        cy.contains('Channel Email Edit', timeout).should('be.visible');
      });

      it('Tambah Channel (Telegram)', () => {
        cy.wait(3000);
        cy.contains('Tambah Channel', timeout).click();
        cy.get('#name', timeout).type('Channel Telegram');
        cy.get('.ant-select-selection-item', timeout).click();
        cy.get('div[class="ant-select-item-option-content"]', timeout).contains('Telegram').click();
        cy.get('#telegram_bot_token', timeout).type('123123');
        cy.get('#telegram_chat_id', timeout).type('chatid');
        cy.get('.ant-btn > span', timeout).click();
        cy.contains('Channel berhasil ditambah.', timeout).should('be.visible');
      });

      it('Edit Channel (Telegram)', () => {
        cy.wait(3000);
        cy.get(':nth-child(4) > [data-testid=menu-update-0]', timeout).click();
        cy.get('span[class="ant-dropdown-menu-title-content"]', timeout).contains('Edit').click();
        cy.get('#name', timeout).clear().type('Channel Telegram Edit');
        cy.get('.ant-btn > span', timeout).click();
        cy.contains('Channel berhasil diubah.', timeout).should('be.visible');
        cy.contains('Channel Telegram Edit', timeout).should('be.visible');
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
        cy.get('#name', timeout).type('Channel SMS');
        cy.get('.ant-select-selection-item', timeout).click();
        cy.get('div[class="ant-select-item-option-content"]', timeout).contains('SMS').click();
        cy.get('#list_phone', timeout).type('081222333444');
        cy.get('.ant-btn > span', timeout).click();
        cy.contains('Channel berhasil ditambah.', timeout).should('be.visible');
      });

      it('Edit Channel (SMS)', () => {
        cy.wait(3000);
        
        cy.get(':nth-child(4) > [data-testid=menu-update-0]', timeout).click();
        cy.get('span[class="ant-dropdown-menu-title-content"]', timeout).contains('Edit').click();
        cy.get('#name', timeout).clear().type('Channel SMS Edit');
        cy.get('.ant-btn > span', timeout).click();
        cy.contains('Channel berhasil diubah.', timeout).should('be.visible');
        cy.contains('Channel SMS Edit', timeout).should('be.visible');
      });
    });
  });
});