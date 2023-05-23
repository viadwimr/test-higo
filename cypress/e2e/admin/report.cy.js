/// <reference types="Cypress" />

var timeout = { timeout: 60000 }

describe('Report', () => {
  before(() => {
    cy.login('admin');
    cy.get('[title="Report"] > .ant-menu-title-content > a', timeout).click();
  });
     
  it('Akan muncul halaman untuk men-generate report dari dashboard', () => {
    cy.get('.title', timeout).contains('REPORT');
    cy.get(':nth-child(1) > .ant-col-3 > .ant-row', timeout).contains('Device');
    cy.get(':nth-child(2) > .ant-col-3 > .ant-row', timeout).contains('Indikator');
    cy.get(':nth-child(3) > .ant-col-3 > .ant-row', timeout).contains('Periode');
    cy.get(':nth-child(4) > .ant-col-3 > .ant-row', timeout).contains('Interval');
    cy.get(':nth-child(5) > .ant-col-3 > .ant-row', timeout).contains('Waktu');
    cy.get('#report_form_device', timeout).should('be.visible');
    cy.get('.css-1hwfws3', timeout).should('be.visible');
    cy.get('[data-testid="form-period"] > .ant-select-selector', timeout).should('be.visible');
    cy.get('[data-testid=form-interval] > .ant-select-selector', timeout).should('be.visible');
    cy.get('[data-testid=time-daily-report] > [data-testid=label]', timeout).should('be.visible');
    cy.get('[data-testid="time-hour-report"] > [data-testid="label"]', timeout).should('be.visible');
    cy.get('[data-testid=submit-btn-report]', timeout).should('be.visible');
    cy.get('[data-testid="save-report-btn"]', timeout).should('be.visible');
  });

  it('Menu drop-down nama device yang ada', () => {
    cy.get('#report_form_device', timeout).click(timeout);
    cy.wait(1000);
    cy.get('[data-testid="select-Paragon Device 2 - Kemas Primer Semsol"]', timeout).click();
  });

  it('Menu drop-down indikator yang ada', () => {
    cy.get('.css-1hwfws3', timeout).click();
    cy.contains('Kelembapan', timeout).click();
    cy.get('.css-1hwfws3', timeout).click();
  });

  it('Menu drop-down untuk jangka waktu yang ada', () => {
    cy.get('[data-testid="form-period"] > .ant-select-selector', timeout).click();
    cy.get('div[class="ant-select-item ant-select-item-option"]', timeout).eq(3).click();
  });

  it('Menu drop-down interval mulai dari Lihat Semua, 5 Menit hingga 60 Menit', () => {
    cy.get('[data-testid=form-interval] > .ant-select-selector', timeout).click();
    cy.contains('Lihat Semua', timeout).should('be.visible');
    cy.contains('5 Menit', timeout).should('be.visible');
    cy.contains('15 Menit', timeout).should('be.visible');
    cy.contains('30 Menit', timeout).should('be.visible');
    cy.contains('60 Menit', timeout).should('be.visible');
    cy.contains('15 Menit', timeout).click({force:true});
  });

  it('Daily satuan terkecil harian dan Hourly untuk satuan terkecil per-jam', () => {
    cy.get('[data-testid=time-daily-report] > [data-testid=label]', timeout).click();
    // hourly
  });

  // Tambahan
  it('Menu drop-down statistic', () => {
    cy.get('[data-testid="input-statistic"] > .ant-select-selector', timeout).click();
    cy.contains('Sum', timeout).should('be.visible');
    cy.contains('Average', timeout).should('be.visible');
    cy.wait(1000);
    cy.get('[title="Min"]', timeout).should('be.visible');
    cy.contains('Max', timeout).should('be.visible');
    cy.contains('Median', timeout).should('be.visible');
    cy.contains('First', timeout).should('be.visible');
    cy.contains('Last', timeout).should('be.visible');
    cy.contains('Spread', timeout).should('be.visible');
    // cy.contains('Mode', timeout).should('be.visible');
    cy.contains('Average', timeout).click({force:true});
  });

  it('Report tampil berupa tabel di bawah form', () => {
    cy.get('[data-testid=submit-btn-report]').click({force:true});
    cy.get('.ant-card-head-title', timeout).contains('Report Paragon Device 2 - Kemas Primer Semsol', timeout).should('be.visible');
    cy.get('.ant-card-body', timeout).should('be.visible');
    cy.get('.ant-layout-content > :nth-child(3)', timeout).should('be.visible');
  });

  it('Untuk file PDF berupa laporan dengan format file .pdf dan untuk CSV dengan format .csv', () => {
    //csv
    cy.get('[data-testid=download-report]', timeout).click();
    cy.get('[data-testid=download-csv-report] > .ant-dropdown-menu-title-content', timeout).click();
    cy.contains('Download Berhasil!', timeout).should('be.visible');
    // pdf
    cy.wait(3000);
    cy.get('[data-testid=download-report]', timeout).click();
    cy.get('[data-testid=download-pdf-report] > .ant-dropdown-menu-title-content', timeout).click();
    cy.contains('Download Berhasil!', timeout).should('be.visible');
  });

  describe('Generate Report', () => {
    it('Hourly Report', () => {
      cy.get('.title', timeout).contains('REPORT');
      cy.get(':nth-child(1) > .ant-col-3 > .ant-row', timeout).contains('Device');
      cy.get(':nth-child(2) > .ant-col-3 > .ant-row', timeout).contains('Indikator');
      cy.get(':nth-child(3) > .ant-col-3 > .ant-row', timeout).contains('Periode');
      cy.get(':nth-child(4) > .ant-col-3 > .ant-row', timeout).contains('Interval');
      cy.get(':nth-child(5) > .ant-col-3 > .ant-row', timeout).contains('Statistic');
      cy.get(':nth-child(6) > .ant-col-3 > .ant-row', timeout).contains('Waktu');
      // hourly
      cy.get('[data-testid="time-hour-report"] > [data-testid="label"]', timeout).click();
      cy.wait(1000);
      cy.get('#report_form_start_time', timeout).click();
      cy.wait(1000);
      cy.get('.rc-time-picker-panel-input-wrap', timeout).type('08:00:00');
      cy.get('#report_form_end_time', timeout).click();
      cy.wait(1000);
      cy.get('.rc-time-picker-panel-input-wrap', timeout).type('09:00:00');
      cy.wait(1000);
      
      cy.get('[data-testid=submit-btn-report]').click({force:true});
      cy.wait(5000);
      cy.get('.ant-card-head-title', timeout).contains('Report Paragon Device 2 - Kemas Primer Semsol', timeout).should('be.visible');
      cy.get('.ant-card-body', timeout).should('be.visible');
      cy.get('.ant-layout-content > :nth-child(3)', timeout).should('be.visible');
      // check result
      // cy.get('> :nth-child(3)', timeout).eq(1).contains('08:00:00');
      //csv
      cy.get('[data-testid=download-report]', timeout).click();
      cy.get('[data-testid=download-csv-report] > .ant-dropdown-menu-title-content', timeout).click();
      cy.contains('Download Berhasil!', timeout).should('be.visible');
      // pdf
      cy.wait(3000);
      cy.get('[data-testid=download-report]', timeout).click();
      cy.get('[data-testid=download-pdf-report] > .ant-dropdown-menu-title-content', timeout).click();
      cy.contains('Download Berhasil!', timeout).should('be.visible');
    });

    it('Custom Date Report', () => {
      cy.get('.title', timeout).contains('REPORT');
      cy.get(':nth-child(1) > .ant-col-3 > .ant-row', timeout).contains('Device');
      cy.get(':nth-child(2) > .ant-col-3 > .ant-row', timeout).contains('Indikator');
      cy.get(':nth-child(3) > .ant-col-3 > .ant-row', timeout).contains('Periode');
      cy.get(':nth-child(4) > .ant-col-3 > .ant-row', timeout).contains('Interval');
      cy.get(':nth-child(5) > .ant-col-3 > .ant-row', timeout).contains('Statistic');
      cy.get(':nth-child(6) > .ant-col-3 > .ant-row', timeout).contains('Waktu');
      // custom date
      cy.get('[data-testid="switch-period-btn"]', timeout).click();
      cy.wait(1000)
      cy.get('#report_form_period_by_date', timeout).click();
      cy.wait(1000)
      cy.get('#report_form_period_by_date', timeout).type('2023-05-08');
      cy.wait(1000)
      cy.get(':nth-child(3) > input', timeout).click();
      cy.wait(1000)
      cy.get(':nth-child(3) > input', timeout).type('2023-05-08{enter}');
      cy.wait(1000)
         
      cy.get('[data-testid=submit-btn-report]').click({force:true});
      cy.wait(5000);
      cy.get('.ant-card-head-title', timeout).contains('Report Paragon Device 2 - Kemas Primer Semsol', timeout).should('be.visible');
      cy.get('.ant-card-body', timeout).should('be.visible');
      cy.get('.ant-layout-content > :nth-child(3)', timeout).should('be.visible');
      cy.contains('08-05-2023 08:00:00', timeout).should('be.visible');

      //csv
      cy.get('[data-testid=download-report]', timeout).click();
      cy.get('[data-testid=download-csv-report] > .ant-dropdown-menu-title-content', timeout).click();
      cy.contains('Download Berhasil!', timeout).should('be.visible');
      // pdf
      cy.wait(3000);
      cy.get('[data-testid=download-report]', timeout).click();
      cy.get('[data-testid=download-pdf-report] > .ant-dropdown-menu-title-content', timeout).click();
      cy.contains('Download Berhasil!', timeout).should('be.visible');
    });

    it('Report Terjadwal', () => {
      cy.get('[data-testid="save-report-btn"]', timeout).click();
      cy.get('[data-testid="schedule-name-form"]', timeout).type('automate test');
      cy.get('[data-testid="schedule-select-period"] > .ant-select-selector', timeout).click();
      cy.wait(1000);
      cy.get('[data-testid="schedule-select-period-0-form"]', timeout).click();
      // cy.contains('Hari ini', timeout).click();
      // cy.get('div[class="ant-select-item ant-select-item-option"]', timeout).eq(3).click();
      cy.wait(1000);
      cy.get('[data-testid="schedule-send-date-form"]', timeout).click();
      cy.wait(1000);
      cy.contains('Today', timeout).click();
      // cy.get('[data-testid="schedule-send-date-form"]', timeout).type('2023-05-08{enter}');
      cy.get('#scheduled_report_form_send_time', timeout).click();
      cy.wait(1000);
      cy.get('.rc-time-picker-panel-input', timeout).type('07:00:00{enter}');
      // cy.contains('Email', timeout).click();
      cy.get('[data-testid="schedule-submit-btn"]', timeout).click();
      cy.wait(1000);
      cy.get('[data-testid="schedule-type-send"] > :nth-child(1)', timeout).click();
      cy.get('[data-testid="schedule-input-email"]', timeout).type('qaevomotelkom@gmail.com');
      cy.wait(1000);
      cy.get('[data-testid="schedule-submit-btn"]', timeout).click();
      cy.contains('Berhasil', timeout).should('be.visible');
      cy.reload();
      cy.contains('automate test', timeout).should('be.visible');
      cy.get('.ant-table-row > :nth-child(6)', timeout).eq(0).click();
      cy.contains('Yakin hapus automate test ?', timeout).should('be.visible');
      cy.contains('Tidak', timeout).click();
      cy.get('.ant-table-row > :nth-child(6)', timeout).eq(0).click();
      cy.contains('Yakin hapus automate test ?', timeout).should('be.visible');
      cy.get('.swal2-confirm', timeout).click();
      cy.contains('Report berhasil dihapus.', timeout).should('be.visible');
      cy.wait(3000);
      cy.contains('automate test', timeout).should('not.exist');
    });
  })
});