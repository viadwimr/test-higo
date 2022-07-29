describe('Operator Shift 1 (Line 1)', () => {
  const user = Cypress.env('oprprd1')
  const pass = Cypress.env('password')
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