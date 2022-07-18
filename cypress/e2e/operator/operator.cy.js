describe('Operator Shift 1 (Line 1)', () => {
  const user = 'OPR PRD 1'
  const pass = 'password'
  beforeEach(() => {
    Cypress.Cookies.preserveOnce('secret')
  })
  it('User Authentication Login', () => {
    cy.login(user, pass)
  })
  it('Pilih Produk', () => {
    cy.select_product()
  })
  it('Ganti Produk', () => {
    cy.change_product()
  })
  it('Melihat Semua Card Downtime Reason yang Belum Diberi Reason', () => {
    cy.unreasoned_downtime_cards()
  })
  it('Melihat Card Downtime Berdasarkan Tanggal Terkecil (Ascending)', () => {
    cy.downtime_ascending()
  })
  it('Melihat Card Downtime Berdasarkan Tanggal Terbesar (Descending)', () => {
    cy.downtime_descending()
  })
  it('Input Reason dengan Default', () => {
    cy.default_input_reason()
  })
  it('Input Reason dengan Other', () => {
    cy.other_input_reason()
  })
  it('Input Multiple Reason dengan Default', () => {
    cy.multiple_default_reason()
  })
  it('Input Multiple Reason dengan Other', () => {
    cy.multiple_other_reason()
  })
  it('User Logout', () => {
    cy.logout()
  })
})

describe('Operator Shift 2 (Line 1)', () => {
  const user = 'OPR PRD 2'
  const pass = 'password'
  beforeEach(() => {
    Cypress.Cookies.preserveOnce('secret')
  })
  it('User Authentication Login', () => {
    cy.login(user, pass)
  })
  it('Pilih Produk', () => {
    cy.select_product()
  })
  it('Ganti Produk', () => {
    cy.change_product()
  })
  it('Melihat Semua Card Downtime Reason yang Belum Diberi Reason', () => {
    cy.unreasoned_downtime_cards()
  })
  it('Melihat Card Downtime Berdasarkan Tanggal Terkecil (Ascending)', () => {
    cy.downtime_ascending()
  })
  it('Melihat Card Downtime Berdasarkan Tanggal Terbesar (Descending)', () => {
    cy.downtime_descending()
  })
  it('Input Reason dengan Default', () => {
    cy.default_input_reason()
  })
  it('Input Reason dengan Other', () => {
    cy.other_input_reason()
  })
  it('Input Multiple Reason dengan Default', () => {
    cy.multiple_default_reason()
  })
  it('Input Multiple Reason dengan Other', () => {
    cy.multiple_other_reason()
  })
  it('User Logout', () => {
    cy.logout()
  })
})

describe('Operator Shift 3 (Line 1)', () => {
  const user = 'OPR PRD 3'
  const pass = 'password'
  beforeEach(() => {
    Cypress.Cookies.preserveOnce('secret')
  })
  it('User Authentication Login', () => {
    cy.login(user, pass)
  })
  it('Pilih Produk', () => {
    cy.select_product()
  })
  it('Ganti Produk', () => {
    cy.change_product()
  })
  it('Melihat Semua Card Downtime Reason yang Belum Diberi Reason', () => {
    cy.unreasoned_downtime_cards()
  })
  it('Melihat Card Downtime Berdasarkan Tanggal Terkecil (Ascending)', () => {
    cy.downtime_ascending()
  })
  it('Melihat Card Downtime Berdasarkan Tanggal Terbesar (Descending)', () => {
    cy.downtime_descending()
  })
  it('Input Reason dengan Default', () => {
    cy.default_input_reason()
  })
  it('Input Reason dengan Other', () => {
    cy.other_input_reason()
  })
  it('Input Multiple Reason dengan Default', () => {
    cy.multiple_default_reason()
  })
  it('Input Multiple Reason dengan Other', () => {
    cy.multiple_other_reason()
  })
  it('User Logout', () => {
    cy.logout()
  })
})

describe('Operator Shift 1 (Line 2)', () => {
  const user = 'OPR PRD 4'
  const pass = 'password'
  beforeEach(() => {
    Cypress.Cookies.preserveOnce('secret')
  })
  it('User Authentication Login', () => {
    cy.login(user, pass)
  })
  it('Pilih Produk', () => {
    cy.select_product()
  })
  it('Ganti Produk', () => {
    cy.change_product()
  })
  it('Melihat Semua Card Downtime Reason yang Belum Diberi Reason', () => {
    cy.unreasoned_downtime_cards()
  })
  it('Melihat Card Downtime Berdasarkan Tanggal Terkecil (As cending)', () => {
    cy.downtime_ascending()
  })
  it('Melihat Card Downtime Berdasarkan Tanggal Terbesar (Descending)', () => {
    cy.downtime_descending()
  })
  it('Input Reason dengan Default', () => {
    cy.default_input_reason()
  })
  it('Input Reason dengan Other', () => {
    cy.other_input_reason()
  })
  it('Input Multiple Reason dengan Default', () => {
    cy.multiple_default_reason()
  })
  it('Input Multiple Reason dengan Other', () => {
    cy.multiple_other_reason()
  })
  it('User Logout', () => {
    cy.logout()
  })
})

describe('Operator Shift 2 (Line 2)', () => {
  const user = 'OPR PRD 5'
  const pass = 'password'
  beforeEach(() => {
    Cypress.Cookies.preserveOnce('secret')
  })
  it('User Authentication Login', () => {
    cy.login(user, pass)
  })
  it('Pilih Produk', () => {
    cy.select_product()
  })
  it('Ganti Produk', () => {
    cy.change_product()
  })
  it('Melihat Semua Card Downtime Reason yang Belum Diberi Reason', () => {
    cy.unreasoned_downtime_cards()
  })
  it('Melihat Card Downtime Berdasarkan Tanggal Terkecil (Ascending)', () => {
    cy.downtime_ascending()
  })
  it('Melihat Card Downtime Berdasarkan Tanggal Terbesar (Descending)', () => {
    cy.downtime_descending()
  })
  it('Input Reason dengan Default', () => {
    cy.default_input_reason()
  })
  it('Input Reason dengan Other', () => {
    cy.other_input_reason()
  })
  it('Input Multiple Reason dengan Default', () => {
    cy.multiple_default_reason()
  })
  it('Input Multiple Reason dengan Other', () => {
    cy.multiple_other_reason()
  })
  it('User Logout', () => {
    cy.logout()
  })
})

describe('Operator Shift 3 (Line 2)', () => {
  const user = 'OPR PRD 6'
  const pass = 'password'
  beforeEach(() => {
    Cypress.Cookies.preserveOnce('secret')
  })
  it('User Authentication Login', () => {
    cy.login(user, pass)
  })
  it('Pilih Produk', () => {
    cy.select_product()
  })
  it('Ganti Produk', () => {
    cy.change_product()
  })
  it('Melihat Semua Card Downtime Reason yang Belum Diberi Reason', () => {
    cy.unreasoned_downtime_cards()
  })
  it('Melihat Card Downtime Berdasarkan Tanggal Terkecil (Ascending)', () => {
    cy.downtime_ascending()
  })
  it('Melihat Card Downtime Berdasarkan Tanggal Terbesar (Descending)', () => {
    cy.downtime_descending()
  })
  it('Input Reason dengan Default', () => {
    cy.default_input_reason()
  })
  it('Input Reason dengan Other', () => {
    cy.other_input_reason()
  })
  it('Input Multiple Reason dengan Default', () => {
    cy.multiple_default_reason()
  })
  it('Input Multiple Reason dengan Other', () => {
    cy.multiple_other_reason()
  })
  it('User Logout', () => {
    cy.logout()
  })
})

describe('Operator Shift 1 (Line 7)', () => {
  const user = 'OPR PRD 7'
  const pass = 'password'
  beforeEach(() => {
    Cypress.Cookies.preserveOnce('secret')
  })
  it('User Authentication Login', () => {
    cy.login(user, pass)
  })
  it('Pilih Produk', () => {
    cy.select_product()
  })
  it('Ganti Produk', () => {
    cy.change_product()
  })
  it('Melihat Semua Card Downtime Reason yang Belum Diberi Reason', () => {
    cy.unreasoned_downtime_cards()
  })
  it('Melihat Card Downtime Berdasarkan Tanggal Terkecil (Ascending)', () => {
    cy.downtime_ascending()
  })
  it('Melihat Card Downtime Berdasarkan Tanggal Terbesar (Descending)', () => {
    cy.downtime_descending()
  })
  it('Input Reason dengan Default', () => {
    cy.default_input_reason()
  })
  it('Input Reason dengan Other', () => {
    cy.other_input_reason()
  })
  it('Input Multiple Reason dengan Default', () => {
    cy.multiple_default_reason()
  })
  it('Input Multiple Reason dengan Other', () => {
    cy.multiple_other_reason()
  })
  it('User Logout', () => {
    cy.logout()
  })
})

describe('Operator Shift 2 (Line 7)', () => {
  const user = 'OPR PRD 8'
  const pass = 'password'
  beforeEach(() => {
    Cypress.Cookies.preserveOnce('secret')
  })
  it('User Authentication Login', () => {
    cy.login(user, pass)
  })
  it('Pilih Produk', () => {
    cy.select_product()
  })
  it('Ganti Produk', () => {
    cy.change_product()
  })
  it('Melihat Semua Card Downtime Reason yang Belum Diberi Reason', () => {
    cy.unreasoned_downtime_cards()
  })
  it('Melihat Card Downtime Berdasarkan Tanggal Terkecil (Ascending)', () => {
    cy.downtime_ascending()
  })
  it('Melihat Card Downtime Berdasarkan Tanggal Terbesar (Descending)', () => {
    cy.downtime_descending()
  })
  it('Input Reason dengan Default', () => {
    cy.default_input_reason()
  })
  it('Input Reason dengan Other', () => {
    cy.other_input_reason()
  })
  it('Input Multiple Reason dengan Default', () => {
    cy.multiple_default_reason()
  })
  it('Input Multiple Reason dengan Other', () => {
    cy.multiple_other_reason()
  })
  it('User Logout', () => {
    cy.logout()
  })
})

describe('Operator Shift 3 (Line 7)', () => {
  const user = 'OPR PRD 9'
  const pass = 'password'
  beforeEach(() => {
    Cypress.Cookies.preserveOnce('secret')
  })
  it('User Authentication Login', () => {
    cy.login(user, pass)
  })
  it('Pilih Produk', () => {
    cy.select_product()
  })
  it('Ganti Produk', () => {
    cy.change_product()
  })
  it('Melihat Semua Card Downtime Reason yang Belum Diberi Reason', () => {
    cy.unreasoned_downtime_cards()
  })
  it('Melihat Card Downtime Berdasarkan Tanggal Terkecil (Ascending)', () => {
    cy.downtime_ascending()
  })
  it('Melihat Card Downtime Berdasarkan Tanggal Terbesar (Descending)', () => {
    cy.downtime_descending()
  })
  it('Input Reason dengan Default', () => {
    cy.default_input_reason()
  })
  it('Input Reason dengan Other', () => {
    cy.other_input_reason()
  })
  it('Input Multiple Reason dengan Default', () => {
    cy.multiple_default_reason()
  })
  it('Input Multiple Reason dengan Other', () => {
    cy.multiple_other_reason()
  })
  it('User Logout', () => {
    cy.logout()
  })
})