// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, pass) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

/* cy.url().then(($url) => {
    if($url.includes('/runtime')) {
      cy.url()
        .should('include', '/runtime')
      cy.get('.ant-layout-content')
        .get('.ant-row-space-between')
        .contains('RUNTIME')
        .get('.ant-layout-content > :nth-child(1) > :nth-child(2) > :nth-child(1)')
        .contains('SEDANG BERJALAN')
        .get('.ant-layout-content > :nth-child(1) > :nth-child(2) > :nth-child(2)')
        .contains('DAFTAR')
    } else if($url.includes('/products')) {
      cy.url()
        .should('include', '/products')
      cy.get('.ant-layout-content')
        .get('.ant-row-space-between')
        .contains('SKU')
        .get('.ant-layout-content > :nth-child(1) > :nth-child(2) > :nth-child(1)')
        .contains('SEDANG BERJALAN')
        .get('.ant-layout-content > :nth-child(1) > :nth-child(2) > :nth-child(2)')
        .contains('DAFTAR')
    } else {
      cy.url()
        .should('include', '/')
      cy.get('.ant-page-header')
        .contains('Operator Produksi')
        .get('[style="min-height: 100vh; display: flex; flex-direction: column; justify-content: center; align-items: center;"]')
        .contains('Tidak ada runtime yang berjalan')
    }
  }) */

/* cy.get(':button')
    .then((x) => {
      if (!x.is(':disabled')) {
        //do something if enabled
        cy.get(':nth-child(3) > div > .ant-btn')
      } else {
        //do something else
      }
  }) */

//const timeout = { timeout: 5000 };

Cypress.Commands.add("login", (user, pass) => {
  cy.visit("/").url().should("include", "/");
  cy.get("#login_username").type(user).should("have.value", user);
  cy.get("#login_password")
    .type(pass, { log: false })
    .should((el$) => {
      if (el$.val() !== pass) {
        throw new Error("Different value of typed password");
      }
    });
  cy.get("#btn-login").click().wait(7000);
  cy.get("body").then((body) => {
    if (
      body.find(
        ':nth-child(1) > [style="margin-left: -4px; margin-right: -4px; row-gap: 8px;"] > :nth-child(1) > .ant-card > .ant-card-body'
      ).length > 0
    ) {
      cy.get(
        ':nth-child(1) > [style="margin-left: -4px; margin-right: -4px; row-gap: 8px;"] > :nth-child(1) > .ant-card > .ant-card-body'
      ).click();
      cy.get(".ant-layout-content");
      cy.url().should("include", "/dashboardhmi");
    } else {
      cy.get(".Button__StyledButton-sc-1s4bp2x-0");
    }
  });
});

Cypress.Commands.add("select_product", () => {
  cy.get("body").then((body) => {
    if (
      body.find(
        ':nth-child(1) > [style="margin-left: -4px; margin-right: -4px; row-gap: 8px;"] > :nth-child(1) > .ant-card > .ant-card-body'
      ).length > 0
    ) {
      cy.get(
        ':nth-child(1) > [style="margin-left: -4px; margin-right: -4px; row-gap: 8px;"] > :nth-child(1) > .ant-card > .ant-card-body'
      ).click();
      cy.get(".ant-layout-content");
      cy.url().should("include", "/dashboardhmi");
    } else {
      cy.get(".Button__StyledButton-sc-1s4bp2x-0").click().wait(3000);
      cy.get("body").then((body) => {
        if (
          body.find(":nth-child(1) > .ant-card > .ant-card-body").length > 0
        ) {
          cy.get(
            ':nth-child(1) > [style="margin-left: -4px; margin-right: -4px; row-gap: 8px;"] > :nth-child(1) > .ant-card > .ant-card-body'
          ).click();
          cy.get(".swal2-confirm").click().wait(3000);
        } else {
          cy.get(".ant-btn").click().wait(3000);
        }
      });
    }
  });
});

Cypress.Commands.add("change_product", () => {
  cy.get("body").then((body) => {
    if (body.find(".ant-layout-content").length > 0) {
      cy.get(":nth-child(3) > div > .ant-btn").then((btn) => {
        if (!btn.is(":disabled")) {
          //do something if enabled
          cy.get(":nth-child(3) > div > .ant-btn > span").click();
          cy.url().should("include", "/products");
          cy.get(
            ':nth-child(2) > [style="margin-left: -4px; margin-right: -4px; row-gap: 8px;"] > :nth-child(1) > .ant-card > .ant-card-body'
          ).click();
          cy.get(".swal2-confirm").click().wait(3000);
          /* cy.url()
                  .should('include', '/products')
                cy.get(':nth-child(1) > [style="margin-left: -4px; margin-right: -4px; row-gap: 8px;"] > .ant-col-24 > .ant-card > .ant-card-body')
                  .click() */
          cy.url().should("include", "/dashboardhmi");
        } else {
          //do something else
          cy.log(
            "Karena tombol yang diinginkan tidak bisa diklik, jangan lakukan apapun"
          );
        }
      });
    } else {
      cy.log("Karena tidak ada runtime yang berjalan, jangan lakukan apapun");
    }
  });
});

Cypress.Commands.add("unreasoned_downtime_cards", () => {
  cy.get("body").then((body) => {
    if (body.find(".ant-layout-content").length > 0) {
      cy.get(":nth-child(1) > .Button__StyledButton-sc-1s4bp2x-0").click();
      cy.url().should("include", "/dashboardhmi");
    } else {
      cy.log("Karena tidak ada runtime yang berjalan, jangan lakukan apapun");
    }
  });
});

Cypress.Commands.add("downtime_ascending", () => {
  cy.get("body").then((body) => {
    if (body.find(".ant-layout-content").length > 0) {
      cy.get(":nth-child(3) > .Button__StyledButton-sc-1s4bp2x-0")
        .click()
        .wait(1000);
      cy.url().should("include", "/dashboardhmi");
    } else {
      cy.log("Karena tidak ada runtime yang berjalan, jangan lakukan apapun");
    }
  });
});

Cypress.Commands.add("downtime_descending", () => {
  cy.get("body").then((body) => {
    if (body.find(".ant-layout-content").length > 0) {
      cy.get(":nth-child(3) > .Button__StyledButton-sc-1s4bp2x-0")
        .click()
        .wait(1000);
      cy.url().should("include", "/dashboardhmi");
    } else {
      cy.log("Karena tidak ada runtime yang berjalan, jangan lakukan apapun");
    }
  });
});

Cypress.Commands.add("default_input_reason", () => {
  cy.get("body").then((body) => {
    if (body.find(".ant-layout-content").length > 0) {
      cy.url().should("include", "/dashboardhmi");
      cy.get(":nth-child(3) > .Button__StyledButton-sc-1s4bp2x-0")
        .click()
        .wait(1000);
      if (body.find(".indiana-scroll-container > :nth-child(1)").length > 0) {
        if (body.find(".indiana-scroll-container > :nth-child(2)").length > 0) {
          cy.get(".indiana-scroll-container > :nth-child(1)").click();
          cy.get("#input_reason_reason")
            .click()
            .get(":nth-child(1) > .ant-select-item-option-content")
            .click();
          /* .get('[title="Automatic replace film error"] > .ant-select-item-option-content')
                .type('Alarm{enter}') */
          cy.get("#input_reason_note")
            .type("Test default input reason")
            .should("have.value", "Test default input reason");
          cy.get(".ant-form-item-control-input-content > .ant-btn")
            .click()
            .wait(2000);
        } else {
          cy.log("Downtime reason sedang berjalan");
        }
      } else {
        cy.log("Tidak ada downtime reason yang tercatat");
      }
    } else {
      cy.log("Karena tidak ada runtime yang berjalan, jangan lakukan apapun");
    }
  });
});

Cypress.Commands.add("other_input_reason", () => {
  cy.get("body").then((body) => {
    if (body.find(".ant-layout-content").length > 0) {
      cy.url().should("include", "/dashboardhmi");
      if (body.find(".indiana-scroll-container > :nth-child(1)").length > 0) {
        if (body.find(".indiana-scroll-container > :nth-child(2)").length > 0) {
          cy.get(".indiana-scroll-container > :nth-child(1)").click();
          cy.get('[data-testid="other-reason"]').click();
          cy.get("#input_reason_reason")
            .type("Test other input reason")
            .should("have.value", "Test other input reason");
          cy.get("#input_reason_category_id")
            .click()
            .get(":nth-child(1) > .ant-select-item-option-content")
            .click();
          cy.get("#input_reason_note")
            .type("Test other input reason")
            .should("have.value", "Test other input reason");
          cy.get(".ant-form-item-control-input-content > .ant-btn")
            .click()
            .wait(2000);
        } else {
          cy.log("Downtime reason sedang berjalan");
        }
      } else {
        cy.log("Tidak ada downtime reason yang tercatat");
      }
    } else {
      cy.log("Karena tidak ada runtime yang berjalan, jangan lakukan apapun");
    }
  });
});

Cypress.Commands.add("multiple_default_reason", () => {
  cy.get("body").then((body) => {
    if (body.find(".ant-layout-content").length > 0) {
      cy.url().should("include", "/dashboardhmi");
      if (body.find(".indiana-scroll-container > :nth-child(1)").length > 0) {
        if (body.find(".indiana-scroll-container > :nth-child(2)").length > 0) {
          cy.get(":nth-child(4) > .Button__StyledButton-sc-1s4bp2x-0").click();
          if (
            body.find(
              ":nth-child(1) > .ant-card-body > .reason-card__container--warning"
            ).length > 0
          ) {
            cy.get(
              ":nth-child(1) > .ant-card-body > .reason-card__container--warning > .reason-card__title--warning > .ant-row > :nth-child(2)"
            ).click();
          } else {
            cy.get(
              ":nth-child(1) > .ant-card-body > .reason-card__container--danger > .reason-card__title--danger > .ant-row > :nth-child(2)"
            ).click();
          }
          if (
            body.find(
              ":nth-child(2) > .ant-card-body > .reason-card__container--warning"
            ).length > 0
          ) {
            cy.get(
              ":nth-child(2) > .ant-card-body > .reason-card__container--warning > .reason-card__title--warning > .ant-row > :nth-child(2)"
            ).click();
            cy.get(
              ":nth-child(1) > .ant-row > :nth-child(3) > .Button__StyledButton-sc-1s4bp2x-0"
            ).click();
            cy.get("#input_reason_reason")
              .click()
              .get(":nth-child(1) > .ant-select-item-option-content")
              .click();
            cy.get('[data-testid="submit-input-reason"]').click().wait(2000);
          } else {
            cy.get(
              ":nth-child(2) > .ant-card-body > .reason-card__container--danger > .reason-card__title--danger > .ant-row > :nth-child(2)"
            ).click();
            cy.get(
              ":nth-child(1) > .ant-row > :nth-child(3) > .Button__StyledButton-sc-1s4bp2x-0"
            ).click();
            cy.get("#input_reason_reason")
              .click()
              .get(":nth-child(1) > .ant-select-item-option-content")
              .click();
            cy.get('[data-testid="submit-input-reason"]').click().wait(2000);
          }
        } else {
          cy.log("Downtime reason hanya berjumlah 1");
        }
        /* cy.get('div[class="ant-card ant-card-bordered reason-card--warning"]').eq(0).click({force:true});
            cy.get('div[class="ant-card ant-card-bordered reason-card--warning"]').eq(1).click(); */
      } else {
        cy.log("Tidak ada downtime reason yang tercatat");
      }
    } else {
      cy.log("Karena tidak ada runtime yang berjalan, jangan lakukan apapun");
    }
  });
});

Cypress.Commands.add("multiple_other_reason", () => {
  cy.get("body").then((body) => {
    if (body.find(".ant-layout-content").length > 0) {
      cy.url().should("include", "/dashboardhmi");
      if (body.find(".indiana-scroll-container > :nth-child(1)").length > 0) {
        if (body.find(".indiana-scroll-container > :nth-child(2)").length > 0) {
          cy.get(":nth-child(4) > .Button__StyledButton-sc-1s4bp2x-0").click();
          if (
            body.find(
              ":nth-child(1) > .ant-card-body > .reason-card__container--warning"
            ).length > 0
          ) {
            cy.get(
              ":nth-child(1) > .ant-card-body > .reason-card__container--warning > .reason-card__title--warning > .ant-row > :nth-child(2)"
            ).click();
          } else {
            cy.get(
              ":nth-child(1) > .ant-card-body > .reason-card__container--danger > .reason-card__title--danger > .ant-row > :nth-child(2)"
            ).click();
          }
          if (
            body.find(
              ":nth-child(2) > .ant-card-body > .reason-card__container--warning"
            ).length > 0
          ) {
            cy.get(
              ":nth-child(2) > .ant-card-body > .reason-card__container--warning > .reason-card__title--warning > .ant-row > :nth-child(2)"
            ).click();
            cy.get(
              ":nth-child(1) > .ant-row > :nth-child(3) > .Button__StyledButton-sc-1s4bp2x-0"
            ).click();
            cy.get('[data-testid="other-reason"]').click();
            cy.get("#input_reason_reason")
              .type("Test other input multiple reason")
              .should("have.value", "Test other input multiple reason");
            cy.get("#input_reason_category_id")
              .click()
              .get(":nth-child(1) > .ant-select-item-option-content")
              .click();
            cy.get('[data-testid="submit-input-reason"]').click().wait(2000);
          } else {
            cy.get(
              ":nth-child(2) > .ant-card-body > .reason-card__container--danger > .reason-card__title--danger > .ant-row > :nth-child(2)"
            ).click();
            cy.get(
              ":nth-child(1) > .ant-row > :nth-child(3) > .Button__StyledButton-sc-1s4bp2x-0"
            ).click();
            cy.get('[data-testid="other-reason"]').click();
            cy.get("#input_reason_reason")
              .type("Test other input multiple reason")
              .should("have.value", "Test other input multiple reason");
            cy.get("#input_reason_category_id")
              .click()
              .get(":nth-child(1) > .ant-select-item-option-content")
              .click();
            cy.get('[data-testid="submit-input-reason"]').click().wait(2000);
          }
        } else {
          cy.log("Downtime reason hanya berjumlah 1");
        }
        /* cy.get('div[class="ant-card ant-card-bordered reason-card--warning"]').eq(0).click({force:true});
            cy.get('div[class="ant-card ant-card-bordered reason-card--warning"]').eq(1).click(); */
      } else {
        cy.log("Tidak ada downtime reason yang tercatat");
      }
    } else {
      cy.log("Karena tidak ada runtime yang berjalan, jangan lakukan apapun");
    }
  });
});

/*-------HMI Supervisor----------*/

Cypress.Commands.add("lini_card_daily1", () => {
  cy.get(":nth-child(1) > .ant-card > .ant-card-body > .ant-btn", {
    timeout: 50000,
  }).click();
  cy.get(":nth-child(2) > .Button__StyledButton-sc-1s4bp2x-0", {
    timeout: 50000,
  })
    .first()
    .click();
  cy.wait(2000);
  cy.get(":nth-child(2) > .Button__StyledButton-sc-1s4bp2x-0", {
    timeout: 50000,
  }).click();
  cy.wait(2000);
  cy.get(".ant-page-header-back-button > svg", { timeout: 50000 }).click();
});

Cypress.Commands.add("lini_card_daily11", () => {
  cy.get(":nth-child(2) > .Button__StyledButton-sc-1s4bp2x-0", {
    timeout: 50000,
  })
    .last()
    .click();
  cy.wait(2000);
  cy.get(":nth-child(2) > .Button__StyledButton-sc-1s4bp2x-0", {
    timeout: 50000,
  }).click();
  cy.wait(2000);
  cy.get(".ant-page-header-back-button > svg", { timeout: 50000 }).click();
});

Cypress.Commands.add("lini_card_shiftly1", () => {
  cy.get('[data-testid="shiftly-btn"]', { timeout: 50000 }).click();
  cy.get(":nth-child(2) > .Button__StyledButton-sc-1s4bp2x-0", {
    timeout: 50000,
  })
    .last()
    .click();
  cy.wait(2000);
  cy.get(":nth-child(2) > .Button__StyledButton-sc-1s4bp2x-0", {
    timeout: 50000,
  }).click();
  cy.wait(2000);
  cy.get(".ant-page-header-back-button > svg > path", {
    timeout: 50000,
  }).click();
});

Cypress.Commands.add("lini_card_shiftly11", () => {
  cy.get('[data-testid="shiftly-btn"]', { timeout: 50000 }).click();
  cy.get(":nth-child(2) > .Button__StyledButton-sc-1s4bp2x-0", {
    timeout: 50000,
  })
    .last()
    .click();
  cy.wait(2000);
  cy.get(":nth-child(2) > .Button__StyledButton-sc-1s4bp2x-0", {
    timeout: 50000,
  }).click();
  cy.wait(2000);
  cy.get(".ant-page-header-back-button > svg > path", {
    timeout: 50000,
  }).click();
});

Cypress.Commands.add("lini_card_daily2", () => {
  cy.get(":nth-child(2) > .ant-card > .ant-card-body > .ant-btn", {
    timeout: 50000,
  }).click();
  cy.wait(2000);
  cy.get(":nth-child(2) > .Button__StyledButton-sc-1s4bp2x-0", {
    timeout: 50000,
  }).click();
  cy.wait(2000);
  cy.get(".ant-page-header-back-button > svg", { timeout: 50000 }).click();
});

Cypress.Commands.add("lini_card_shiftly2", () => {
  cy.get('[data-testid="shiftly-btn"]', { timeout: 50000 }).click();
  cy.get(":nth-child(2) > .Button__StyledButton-sc-1s4bp2x-0", {
    timeout: 50000,
  })
    .first()
    .click();
  cy.wait(5000);
  cy.get(":nth-child(2) > .Button__StyledButton-sc-1s4bp2x-0", {
    timeout: 50000,
  }).click();
  cy.wait(2000);
  cy.get(".ant-page-header-back-button > svg > path", {
    timeout: 50000,
  }).click();
});

Cypress.Commands.add("packer_card_daily11", () => {
  cy.get('[style=""] > .Button__StyledButton-sc-1s4bp2x-0', { timeout: 50000 })
    .last()
    .click();
  cy.wait(5000);
  cy.get(".ant-select-selection-item").click();
  cy.get('[title = "2 Jam"]', { timeout: 50000 }).click();
  cy.get('[data-testid="button-relatif"]', { timeout: 50000 }).click();
  cy.get(".ant-select-selection-item", { timeout: 50000 }).click();
  cy.get('[title = "4 Jam"]', { timeout: 50000 }).click();
  cy.get('[data-testid="date-root"]', { timeout: 50000 }).click();
  cy.get('[data-testid="1 Jam Terakhir"]', { timeout: 50000 }).click();
  cy.get(".ant-page-header-back-button > svg > path").click();
});

Cypress.Commands.add("lini_shiftly_card_daily1", () => {
  cy.wait(3500);
  cy.get('[data-testid="shiftly-btn"]', { timeout: 50000 }).click();
  cy.wait(3500);
  cy.get(":nth-child(1) > .ant-card > .ant-card-body > .ant-btn", {
    timeout: 50000,
  }).click();
  cy.wait(2000);
  cy.get(":nth-child(2) > .Button__StyledButton-sc-1s4bp2x-0", {
    timeout: 50000,
  })
    .first()
    .click();
  cy.wait(2000);
  cy.get(":nth-child(2) > .Button__StyledButton-sc-1s4bp2x-0", {
    timeout: 50000,
  }).click();
  cy.wait(2000);
  cy.get(".ant-page-header-back-button > svg", { timeout: 50000 }).click();
});

Cypress.Commands.add("lini_shiftly_card_daily1_1", () => {
  cy.get(":nth-child(2) > .Button__StyledButton-sc-1s4bp2x-0", {
    timeout: 50000,
  })
    .first()
    .click();
  cy.wait(2000);
  cy.get(":nth-child(2) > .Button__StyledButton-sc-1s4bp2x-0", {
    timeout: 50000,
  }).click();
  cy.wait(2000);
  cy.get(".ant-page-header-back-button > svg", { timeout: 50000 }).click();
});

Cypress.Commands.add("lini_shiftly_card_shiftly1", () => {
  cy.wait(2000);
  cy.get('[data-testid="shiftly-btn"]', { timeout: 50000 }).click();
  cy.get(":nth-child(2) > .Button__StyledButton-sc-1s4bp2x-0", {
    timeout: 50000,
  })
    .first()
    .click();
  cy.wait(3000);
  cy.get(":nth-child(2) > .Button__StyledButton-sc-1s4bp2x-0", {
    timeout: 50000,
  }).click();
  cy.wait(3000);
  cy.get(".ant-page-header-back-button > svg > path", {
    timeout: 50000,
  }).click();
});

Cypress.Commands.add("lini_shiftly_card_shiftly1_1", () => {
  cy.wait(2000);
  cy.get('[data-testid="shiftly-btn"]', { timeout: 50000 }).click();
  cy.get(":nth-child(2) > .Button__StyledButton-sc-1s4bp2x-0", {
    timeout: 50000,
  })
    .last()
    .click();
  cy.wait(3000);
  cy.get(":nth-child(2) > .Button__StyledButton-sc-1s4bp2x-0", {
    timeout: 50000,
  }).click();
  cy.wait(3000);
  cy.get(".ant-page-header-back-button > svg > path", {
    timeout: 50000,
  }).click();
  cy.get(".ant-page-header-back-button > svg > path").click();
});

Cypress.Commands.add("lini_shiftly_card_daily2", () => {
  cy.wait(2000);
  cy.get('[data-testid="shiftly-btn"]', { timeout: 50000 }).click();
  cy.get(":nth-child(2) > .ant-card > .ant-card-body > .ant-btn", {
    timeout: 50000,
  })
    .last()
    .click();
  cy.get(":nth-child(2) > .Button__StyledButton-sc-1s4bp2x-0", {
    timeout: 50000,
  })
    .last()
    .click();
  cy.wait(3000);
  cy.get(":nth-child(2) > .Button__StyledButton-sc-1s4bp2x-0", {
    timeout: 50000,
  }).click();
  cy.wait(3000);
  cy.get(".ant-page-header-back-button > svg", { timeout: 50000 }).click();
});

Cypress.Commands.add("lini_shiftly_card_daily2_2", () => {
  cy.wait(2000);
  cy.get('[data-testid="shiftly-btn"]', { timeout: 50000 }).click();
  cy.get(":nth-child(2) > .Button__StyledButton-sc-1s4bp2x-0", {
    timeout: 50000,
  })
    .last()
    .click();
  cy.wait(3000);
  cy.get(":nth-child(2) > .Button__StyledButton-sc-1s4bp2x-0", {
    timeout: 50000,
  }).click();
  cy.wait(3000);
  cy.get(".ant-page-header-back-button > svg", { timeout: 50000 }).click();
});

Cypress.Commands.add("lini_shiftly_card_shiftly2", () => {
  cy.wait(2000);
  cy.get('[data-testid="shiftly-btn"]', { timeout: 50000 }).click();
  cy.get(":nth-child(2) > .Button__StyledButton-sc-1s4bp2x-0", {
    timeout: 50000,
  })
    .first()
    .click();
  cy.wait(2000);
  cy.get(":nth-child(2) > .Button__StyledButton-sc-1s4bp2x-0", {
    timeout: 50000,
  }).click();
  cy.wait(2000);
  cy.get(".ant-page-header-back-button > svg > path", {
    timeout: 50000,
  }).click();
  // cy.get(".ant-page-header-back-button > svg").click();
  // cy.wait(2000);
});

Cypress.Commands.add("lini_shiftly_card_shiftly2_2", () => {
  cy.wait(2000);
  cy.get('[data-testid="shiftly-btn"]', { timeout: 50000 }).click();
  cy.get(":nth-child(2) > .Button__StyledButton-sc-1s4bp2x-0", {
    timeout: 50000,
  })
    .last()
    .click();
  cy.wait(2000);
  cy.get(":nth-child(2) > .Button__StyledButton-sc-1s4bp2x-0", {
    timeout: 50000,
  }).click();
  cy.wait(2000);
  cy.get(".ant-page-header-back-button > svg > path", {
    timeout: 50000,
  }).click();
  // cy.get(".ant-page-header-back-button > svg").click();
  // cy.wait(2000);
});

//PACKER
Cypress.Commands.add("masuk_packer_card", () => {
  cy.get(":nth-child(2) > .ant-card > .ant-card-body > .ant-btn").click();
  cy.get(":nth-child(2) > .Button__StyledButton-sc-1s4bp2x-0", {
    timeout: 50000,
  })
    .first()
    .click();
  cy.wait(5000);
  cy.get(":nth-child(2) > .Button__StyledButton-sc-1s4bp2x-0", {
    timeout: 50000,
  }).click();
  cy.wait(2000);
  cy.get(".ant-page-header-back-button > svg", { timeout: 50000 }).click();
});

Cypress.Commands.add("packer_card_daily", () => {
  cy.get('[style=""] > .Button__StyledButton-sc-1s4bp2x-0', { timeout: 50000 })
    .first()
    .click();
  cy.wait(5000);
  cy.get(".ant-select-selection-item").click();
  cy.get('[title = "2 Jam"]', { timeout: 50000 }).click();
  cy.get('[data-testid="button-relatif"]', { timeout: 50000 }).click();
  cy.get(".ant-select-selection-item").click();
  cy.get('[title = "4 Jam"]', { timeout: 50000 }).click();
  cy.get('[data-testid="date-root"]').click();
  cy.get('[data-testid="1 Jam Terakhir"]', { timeout: 50000 }).click();
  cy.get(".ant-page-header-back-button > svg > path").click();
});

Cypress.Commands.add("packer_card_daily2", () => {
  cy.get('[style=""] > .Button__StyledButton-sc-1s4bp2x-0', { timeout: 50000 })
    .last()
    .click();
  cy.wait(5000);
  cy.get(".ant-select-selection-item").click();
  cy.get('[title = "2 Jam"]', { timeout: 50000 }).click();
  cy.get('[data-testid="button-relatif"]', { timeout: 50000 }).click();
  cy.get(".ant-select-selection-item").click();
  cy.get('[title = "4 Jam"]', { timeout: 50000 }).click();
  cy.get('[data-testid="date-root"]').click();
  cy.get('[data-testid="1 Jam Terakhir"]', { timeout: 50000 }).click();
  cy.get(".ant-page-header-back-button > svg > path").click();
});

Cypress.Commands.add("packer_card_shiftly", () => {
  cy.contains("SHIFTLY").click();
  cy.wait(2500);
  cy.get('[style=""] > .Button__StyledButton-sc-1s4bp2x-0').first().click();
  cy.get('[data-testid="button-kumulatif"]').click();
  cy.get('[data-testid="button-relatif"]', { timeout: 60000 }).click();
  cy.wait(5000);
  cy.get(".ant-select-selection-item").click();
  cy.get('[title = "4 Jam"]', { timeout: 60000 }).click();
  cy.get('[data-testid="date-root"]').click();
  cy.get('[data-testid="1 Jam Terakhir"]', { timeout: 60000 }).click();
  cy.get(".ant-page-header-back-button > svg > path").click();
});

Cypress.Commands.add("packer_card_shiftly11", () => {
  cy.contains("SHIFTLY").click();
  cy.wait(2500);
  cy.get('[style=""] > .Button__StyledButton-sc-1s4bp2x-0').last().click();
  cy.get('[data-testid="button-kumulatif"]').click();
  cy.get('[data-testid="button-relatif"]', { timeout: 60000 }).click();
  cy.wait(5000);
  cy.get(".ant-select-selection-item").click();
  cy.get('[title = "4 Jam"]', { timeout: 60000 }).click();
  cy.get('[data-testid="date-root"]').click();
  cy.get('[data-testid="1 Jam Terakhir"]', { timeout: 60000 }).click();
  cy.get(".ant-page-header-back-button > svg > path").click();
});

Cypress.Commands.add("packer_card_shiftly2", () => {
  cy.contains("SHIFTLY").click();
  cy.wait(2500);
  cy.get('[style=""] > .Button__StyledButton-sc-1s4bp2x-0').last().click();
  cy.get('[data-testid="button-kumulatif"]').click();
  cy.get('[data-testid="button-relatif"]', { timeout: 60000 }).click();
  cy.wait(5000);
  cy.get(".ant-select-selection-item").click();
  cy.get('[title = "4 Jam"]', { timeout: 60000 }).click();
  cy.get('[data-testid="date-root"]').click();
  cy.get('[data-testid="1 Jam Terakhir"]', { timeout: 60000 }).click();
  cy.get(".ant-page-header-back-button > svg > path").click();
});

Cypress.Commands.add("oeeAPQ", () => {
  // check availability
  cy.get('body').find('[data-testid="percent-AVA"]').invoke('text').then((text) => {
    const valueAVA = parseFloat(text.replace('%','').replace('.','').replace(',','.'))
    expect(valueAVA).to.be.within(0,100)
    if (valueAVA == 0) {
      // check performance, quality, oee
      cy.get('body').find('[data-testid="percent-PER"]').invoke('text').then((text) => {
        expect(parseInt(text.replace('%',''))).to.be.equal(0)
      });
      cy.get('body').find('[data-testid="percent-QUA"]').invoke('text').then((text) => {
        expect(parseInt(text.replace('%',''))).to.be.equal(0)
      });
      cy.get('body').find('[data-testid="percent-OEE"]').invoke('text').then((text) => {
        expect(parseInt(text.replace('%',''))).to.be.equal(0)
      });
    } else {
      // check performance
      cy.get('body').find('[data-testid="percent-PER"]').invoke('text').then((text) => {
        var valuePER = parseFloat(text.replace('%','').replace('.','').replace(',','.'))
        if (valueAVA > 0 && valueAVA < 0.3) {
          expect(valuePER).to.be.within(0,110)
        } else if (valueAVA >= 0.3 && valueAVA < 1) {
          expect(valuePER).to.be.within(10,110)
        } else if (valueAVA >= 1 && valueAVA < 10) {
          expect(valuePER).to.be.within(30,110)
        } else {
          expect(valuePER).to.be.within(45,110)
        }
        // check quality
        cy.get('body').find('[data-testid="percent-QUA"]').invoke('text').then((text) => {
          var valueQUA = parseFloat(text.replace('%','').replace('.','').replace(',','.'))
          expect(valueQUA).to.be.within(0,110)
          // calculate oee
          cy.get('body').find('[data-testid="percent-OEE"]').invoke('text').then((text) => {
            var valueOEE = parseInt(text.replace('%','').replace('.',''))
            var calculateOEE = parseInt((valueAVA/100 * valuePER/100 * valueQUA/100)*100)
            expect(calculateOEE).to.be.equal(valueOEE)
          });
        });
      });
    }
  });
})

Cypress.Commands.add("totalProduct", () => {
  // check total Product
  cy.get('body').find(':nth-child(1) > .ant-card > .ant-card-body > .qtt-value')
    .invoke('text').then((text) => {
      const valueProduct = parseInt(text.replace('%','').replace('.',''))
        // get reject product
        cy.get('body').find(':nth-child(3) > .ant-card > .ant-card-body > .qtt-value')
        .invoke('text').then((text) => {
          const valueReject = parseInt(text.replace('%','').replace('.',''))
          // check good product
          cy.get('body').find(':nth-child(2) > .ant-card > .ant-card-body > .qtt-value')
            .invoke('text').then((text) => {
              const valueGood = parseInt(text.replace('%','').replace('.',''))
              if (valueProduct == 0) {
                expect(valueGood).to.be.equal(0)
                expect(valueReject).to.be.equal(0)
              } else {
                var valueHalfProduct = valueProduct / 2
                expect(valueGood).to.be.greaterThan(valueReject)
                expect(valueGood).to.be.at.least(valueHalfProduct)
              }
          });
        });
  });
})

Cypress.Commands.add(`count_downtime`, () => {
  // get reasons frequency
  cy.get('body').find('[data-testid="count"]').invoke('text').then((text) => {
    var frequencyReasons = parseInt(text)
    var totalMinorStop=0;
    var totalDowntimeMoreThanOneHours=0
    var numberReason=1;
    var totalMinorStopReason=0
    if (frequencyReasons > 0) {
      while (numberReason <= frequencyReasons) {
        // check downtime/minorstop
        cy.get('body', { timeout: 5000 }).then((body) => {
          totalMinorStop=0;
          totalDowntimeMoreThanOneHours=0
          numberReason=1;
          totalMinorStopReason=0
          while (numberReason <= frequencyReasons) {
            if (body.find(`:nth-child(${numberReason}) > .ant-card-body > .reason-card__container--danger > :nth-child(3)`).length > 0) {
              // check downtime hour
              cy.get('body').find(`:nth-child(${numberReason}) > .ant-card-body > .reason-card__container--danger > :nth-child(3)`)
                .invoke('text').then((text) => {
                  var endReasonHour = parseInt(text.slice(10,13))
                  var startReasonHour = parseInt(text.slice(0,2))
                  var reasonHourMinus = endReasonHour - startReasonHour
                  // check downtime width
                  if (reasonHourMinus != 0) {
                    if (endReasonHour > startReasonHour) {
                      reasonHourMinus=endReasonHour-startReasonHour
                    } else if ( endReasonHour < startReasonHour ) {
                      reasonHourMinus=endReasonHour+24-startReasonHour
                    }
                    totalDowntimeMoreThanOneHours=totalDowntimeMoreThanOneHours+reasonHourMinus
                  } 
                  expect(totalDowntimeMoreThanOneHours).to.be.at.least(0)                
              });                  
            } else if (body.find(`:nth-child(${numberReason}) > .ant-card-body > .reason-card__container--default`).length > 0) {  
              cy.get('body').find(`:nth-child(${numberReason}) > .ant-card-body > .reason-card__container--default > :nth-child(3)`)
              .invoke('text').then((text) => {
                var endReasonHour = parseInt(text.slice(10,13))
                var startReasonHour = parseInt(text.slice(0,2))
                var reasonHourMinus = endReasonHour - startReasonHour
                // check downtime width
                if (reasonHourMinus != 0) {
                  if (endReasonHour > startReasonHour) {
                    reasonHourMinus=endReasonHour-startReasonHour
                  } else if ( endReasonHour < startReasonHour ) {
                    reasonHourMinus=endReasonHour+24-startReasonHour
                  }
                  totalDowntimeMoreThanOneHours=totalDowntimeMoreThanOneHours+reasonHourMinus
                }
                expect(totalDowntimeMoreThanOneHours).to.be.at.least(0)
                cy.get('body').find(`:nth-child(${numberReason}) > .ant-card-body > .reason-card__container--default > .reason-card__title--default`).invoke('text').then((text) => {
                  if (text == 'minor_stop') {
                    totalMinorStopReason++
                  }
                })               
              });                  
            } else {
              totalMinorStop++
            }
            numberReason++
          }
        }) 
        numberReason++
      }

      // get downtimes frequency
      cy.get('body').find('[style*="background-color: rgb(235, 87, 87)"]').then((downtimeBar) => {
        var downtimeBarCount = Cypress.$(downtimeBar).length;
        expect(downtimeBarCount).to.be.at.least(0)
        expect(totalDowntimeMoreThanOneHours).to.be.at.least(0)
        expect(frequencyReasons).to.be.at.least(0)
        expect(totalMinorStop).to.be.at.least(0)
        expect(totalMinorStopReason).to.be.at.least(0)
        expect(downtimeBarCount-totalDowntimeMoreThanOneHours)
          .to.be.equal(frequencyReasons-totalMinorStop-totalMinorStopReason)
      })
    }
  })
})

/*-----Logout------*/
Cypress.Commands.add("logout", () => {
  cy.wait(3000);
  cy.get("body", { timeout: 5000 }).then((body) => {
    if (body.find(".ant-avatar").length > 0) {
      cy.get(".ant-avatar").click();
      cy.get(".ant-dropdown-menu-item").click();
      cy.get("#login");
      cy.url().should("include", "/");
    }
  });
});
