describe("E2e Testing Application production Mesin", () => {
  context("Supervisor 1 Line 1", () => {
    const user = Cypress.env('SPV PRD 1')
    const pass = Cypress.env('password')

    beforeEach(() => {
      Cypress.Cookies.preserveOnce("secret");
    });

    it.only("Check untuk user login (team leader)", () => {
      cy.login(user, pass);
      cy.masuk_line1();
    });

    it("Check Parameter lini saat masuk", () => {
      cy.lini();
    });

    it("Check daily dan line packer Mesin", () => {
      cy.get(':nth-child(1) > .ant-card > .ant-card-body > .ant-btn').click()
      cy.packer_card_daily();
    });

    it("Check Shiftly dan line packer Mesin", () => {
      cy.packer_card_shiftly();
    });

    it.only("Check logout", () => {
      cy.logout();
    });
  });

  context("Supervisor 1 Line 2", () => {
    const user = Cypress.env('SPV PRD 1')
    const pass = Cypress.env('password')

    beforeEach(() => {
      Cypress.Cookies.preserveOnce("secret");
    });

    it("Check untuk user login (team leader)", () => {
      cy.login(user, pass);
      cy.masuk_line2();
    });

    it("Check Parameter lini saat masuk", () => {
      cy.lini();
    });

    it("Check daily dan line packer Mesin", () => {
      cy.get(':nth-child(1) > .ant-card > .ant-card-body > .ant-btn').click()
      cy.packer_card_daily();
    });

    it("Check Shiftly dan line packer Mesin", () => {
      cy.packer_card_shiftly();
    });

    it("Check logout", () => {
      cy.logout();
    });
  });

  context("Supervisor 1 Line 7", () => {
    const user = Cypress.env('SPV PRD 1')
    const pass = Cypress.env('password')

    beforeEach(() => {
      Cypress.Cookies.preserveOnce("secret");
    });

    it("Check untuk user login (team leader)", () => {
      cy.login(user, pass);
      cy.masuk_line7();
    });

    it("Check Parameter lini saat masuk", () => {
      cy.lini();
    });

    it("Check daily dan line packer Mesin", () => {
      cy.get(':nth-child(1) > .ant-card > .ant-card-body > .ant-btn').click()
      cy.packer_card_daily();
    });

    it("Check Shiftly dan line packer Mesin", () => {
      cy.packer_card_shiftly();
    });

    it("Check logout", () => {
      cy.logout();
    });
  });  
});
