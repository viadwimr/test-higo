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

  Cypress.Commands.add('login', (user, pass) => {
    cy.visit('/')
      .url()
      .should('include', '/')
    cy.get('#login_username')
      .type(user)
      .should('have.value', user)
    cy.get('#login_password')
      .type(pass, {log:false})
      .should(el$ => {
        if(el$.val() !== pass) {
          throw new Error('Different value of typed password')
        }
      })
    cy.get('#btn-login')
      .click()
      .wait(3000)
    cy.get('body')
      .then((body) => {
        if(body.find(':nth-child(1) > [style="margin-left: -4px; margin-right: -4px; row-gap: 8px;"] > :nth-child(1) > .ant-card > .ant-card-body').length > 0) {
          cy.get(':nth-child(1) > [style="margin-left: -4px; margin-right: -4px; row-gap: 8px;"] > :nth-child(1) > .ant-card > .ant-card-body')
          cy.get('.ant-layout-content')
          cy.url()
            .should('include', '/dashboardhmi')
        } else {
          cy.get('.Button__StyledButton-sc-1s4bp2x-0')
        }
      })
  })
  
  Cypress.Commands.add('select_product', () => {
    cy.get('body')
      .then((body) => {
        if(body.find(':nth-child(1) > [style="margin-left: -4px; margin-right: -4px; row-gap: 8px;"] > :nth-child(1) > .ant-card > .ant-card-body').length > 0) {
          cy.get(':nth-child(1) > [style="margin-left: -4px; margin-right: -4px; row-gap: 8px;"] > :nth-child(1) > .ant-card > .ant-card-body')
            .click()
          cy.get('.ant-layout-content')
          cy.url()
            .should('include', '/dashboardhmi')
        } else {
          cy.get('.Button__StyledButton-sc-1s4bp2x-0')
            .click()
            .wait(3000)
          cy.get('body')
            .then((body) => {
              if(body.find(':nth-child(1) > .ant-card > .ant-card-body').length > 0) {
                cy.get(':nth-child(1) > [style="margin-left: -4px; margin-right: -4px; row-gap: 8px;"] > :nth-child(1) > .ant-card > .ant-card-body')
                  .click()
                cy.get('.swal2-confirm')
                  .click()
                  .wait(3000)
              } else {
                cy.get('.ant-btn')
                  .click()
                  .wait(3000)
              }
            })
        }
      })
  })
  
  Cypress.Commands.add('change_product', () => {
    cy.get('body')
      .then((body) => {
        if(body.find('.ant-layout-content').length > 0) {
          cy.get(':nth-child(3) > div > .ant-btn')
            .then((btn) => {
              if (!btn.is(':disabled')) {
                //do something if enabled
                cy.get(':nth-child(3) > div > .ant-btn > span')
                  .click()
                cy.url()
                  .should('include', '/products')
                cy.get(':nth-child(2) > [style="margin-left: -4px; margin-right: -4px; row-gap: 8px;"] > :nth-child(1) > .ant-card > .ant-card-body')
                  .click()
                cy.get('.swal2-confirm')
                  .click()
                  .wait(3000)
                /* cy.url()
                  .should('include', '/products')
                cy.get(':nth-child(1) > [style="margin-left: -4px; margin-right: -4px; row-gap: 8px;"] > .ant-col-24 > .ant-card > .ant-card-body')
                  .click() */
                cy.url()
                  .should('include', '/dashboardhmi')
              } else {
                //do something else
                cy.log('Karena tombol yang diinginkan tidak bisa diklik, jangan lakukan apapun')
              }
          })
        } else {
          cy.log('Karena tidak ada runtime yang berjalan, jangan lakukan apapun')
        }
      })
  })
  
  Cypress.Commands.add('unreasoned_downtime_cards', () => {
    cy.get('body')
      .then((body) => {
        if(body.find('.ant-layout-content').length > 0) {
          cy.get(':nth-child(1) > .Button__StyledButton-sc-1s4bp2x-0')
            .click()
          cy.url()
            .should('include', '/dashboardhmi')
        } else {
          cy.log('Karena tidak ada runtime yang berjalan, jangan lakukan apapun')
        }
      })
  })
  
  Cypress.Commands.add('downtime_ascending', () => {
    cy.get('body')
      .then((body) => {
        if(body.find('.ant-layout-content').length > 0) {
          cy.get(':nth-child(3) > .Button__StyledButton-sc-1s4bp2x-0')
            .click()
            .wait(1000)
          cy.url()
            .should('include', '/dashboardhmi')
        } else {
          cy.log('Karena tidak ada runtime yang berjalan, jangan lakukan apapun')
        }
      })
  })
  
  Cypress.Commands.add('downtime_descending', () => {
    cy.get('body')
      .then((body) => {
        if(body.find('.ant-layout-content').length > 0) {
          cy.get(':nth-child(3) > .Button__StyledButton-sc-1s4bp2x-0')
            .click()
            .wait(1000)
          cy.url()
            .should('include', '/dashboardhmi')
        } else {
          cy.log('Karena tidak ada runtime yang berjalan, jangan lakukan apapun')
        }
      })
  })
  
  Cypress.Commands.add('default_input_reason', () => {
    cy.get('body')
      .then((body) => {
        if(body.find('.ant-layout-content').length > 0) {
          cy.url()
            .should('include', '/dashboardhmi')
          cy.get(':nth-child(3) > .Button__StyledButton-sc-1s4bp2x-0')
          .click()
          .wait(1000)
          if(body.find('.indiana-scroll-container > :nth-child(1)').length > 0) {
            if(body.find('.indiana-scroll-container > :nth-child(2)').length > 0) {
              cy.get('.indiana-scroll-container > :nth-child(1)')
                .click()
              cy.get('#input_reason_reason')
                .click()
                .get(':nth-child(1) > .ant-select-item-option-content')
                .click()
                /* .get('[title="Automatic replace film error"] > .ant-select-item-option-content')
                .type('Alarm{enter}') */
              cy.get('#input_reason_note')
                .type('Test default input reason')
                .should('have.value', 'Test default input reason')
              cy.get('.ant-form-item-control-input-content > .ant-btn')
                .click()
                .wait(2000)
            } else {
              cy.log('Downtime reason sedang berjalan')
            }
          } else {
            cy.log('Tidak ada downtime reason yang tercatat')
          }
        } else {
          cy.log('Karena tidak ada runtime yang berjalan, jangan lakukan apapun')
        }
      })
  })
  
  Cypress.Commands.add('other_input_reason', () => {
    cy.get('body')
      .then((body) => {
        if(body.find('.ant-layout-content').length > 0) {
          cy.url()
            .should('include', '/dashboardhmi')
          if(body.find('.indiana-scroll-container > :nth-child(1)').length > 0) {
            if(body.find('.indiana-scroll-container > :nth-child(2)').length > 0) {
              cy.get('.indiana-scroll-container > :nth-child(1)')
                .click()
              cy.get('[data-testid="other-reason"]')
                .click()
              cy.get('#input_reason_reason')
                .type('Test other input reason')
                .should('have.value', 'Test other input reason')
              cy.get('#input_reason_category_id')
                .click()
                .get(':nth-child(1) > .ant-select-item-option-content')
                .click()
              cy.get('#input_reason_note')
                .type('Test other input reason')
                .should('have.value', 'Test other input reason')
              cy.get('.ant-form-item-control-input-content > .ant-btn')
                .click()
                .wait(2000)
            } else {
              cy.log('Downtime reason sedang berjalan')
            }
          } else {
            cy.log('Tidak ada downtime reason yang tercatat')
          }
        } else {
          cy.log('Karena tidak ada runtime yang berjalan, jangan lakukan apapun')
        }
      })
  })
  
  Cypress.Commands.add('multiple_default_reason', () => {
    cy.get('body')
      .then((body) => {
        if(body.find('.ant-layout-content').length > 0) {
          cy.url()
            .should('include', '/dashboardhmi')
          if(body.find('.indiana-scroll-container > :nth-child(1)').length > 0) {
            if(body.find('.indiana-scroll-container > :nth-child(2)').length > 0) {
              cy.get(':nth-child(4) > .Button__StyledButton-sc-1s4bp2x-0')
                .click()
              if(body.find(':nth-child(1) > .ant-card-body > .reason-card__container--warning').length > 0) {
                cy.get(':nth-child(1) > .ant-card-body > .reason-card__container--warning > .reason-card__title--warning > .ant-row > :nth-child(2)')
                  .click()
              } else {
                cy.get(':nth-child(1) > .ant-card-body > .reason-card__container--danger > .reason-card__title--danger > .ant-row > :nth-child(2)')
                  .click()
              }
              if(body.find(':nth-child(2) > .ant-card-body > .reason-card__container--warning').length > 0) {
                cy.get(':nth-child(2) > .ant-card-body > .reason-card__container--warning > .reason-card__title--warning > .ant-row > :nth-child(2)')
                  .click()
                cy.get(':nth-child(1) > .ant-row > :nth-child(3) > .Button__StyledButton-sc-1s4bp2x-0')
                  .click()
                cy.get('#input_reason_reason')
                  .click()
                  .get(':nth-child(1) > .ant-select-item-option-content')
                  .click()
                cy.get('[data-testid="submit-input-reason"]')
                  .click()
                  .wait(2000)
              } else {
                cy.get(':nth-child(2) > .ant-card-body > .reason-card__container--danger > .reason-card__title--danger > .ant-row > :nth-child(2)')
                  .click()
                cy.get(':nth-child(1) > .ant-row > :nth-child(3) > .Button__StyledButton-sc-1s4bp2x-0')
                  .click()
                cy.get('#input_reason_reason')
                  .click()
                  .get(':nth-child(1) > .ant-select-item-option-content')
                  .click()
                cy.get('[data-testid="submit-input-reason"]')
                  .click()
                  .wait(2000)
              }
            } else {
              cy.log('Downtime reason hanya berjumlah 1')
            }
            /* cy.get('div[class="ant-card ant-card-bordered reason-card--warning"]').eq(0).click({force:true});
            cy.get('div[class="ant-card ant-card-bordered reason-card--warning"]').eq(1).click(); */
          } else {
            cy.log('Tidak ada downtime reason yang tercatat')
          }
        } else {
          cy.log('Karena tidak ada runtime yang berjalan, jangan lakukan apapun')
        }
      })
  })
  
  Cypress.Commands.add('multiple_other_reason', () => {
    cy.get('body')
      .then((body) => {
        if(body.find('.ant-layout-content').length > 0) {
          cy.url()
            .should('include', '/dashboardhmi')
          if(body.find('.indiana-scroll-container > :nth-child(1)').length > 0) {
            if(body.find('.indiana-scroll-container > :nth-child(2)').length > 0) {
              cy.get(':nth-child(4) > .Button__StyledButton-sc-1s4bp2x-0')
                .click()
              if(body.find(':nth-child(1) > .ant-card-body > .reason-card__container--warning').length > 0) {
                cy.get(':nth-child(1) > .ant-card-body > .reason-card__container--warning > .reason-card__title--warning > .ant-row > :nth-child(2)')
                  .click()
              } else {
                cy.get(':nth-child(1) > .ant-card-body > .reason-card__container--danger > .reason-card__title--danger > .ant-row > :nth-child(2)')
                  .click()
              }
              if(body.find(':nth-child(2) > .ant-card-body > .reason-card__container--warning').length > 0) {
                cy.get(':nth-child(2) > .ant-card-body > .reason-card__container--warning > .reason-card__title--warning > .ant-row > :nth-child(2)')
                  .click()
                cy.get(':nth-child(1) > .ant-row > :nth-child(3) > .Button__StyledButton-sc-1s4bp2x-0')
                  .click()
                cy.get('[data-testid="other-reason"]')
                  .click()
                cy.get('#input_reason_reason')
                  .type('Test other input multiple reason')
                  .should('have.value', 'Test other input multiple reason')
                cy.get('#input_reason_category_id')
                  .click()
                  .get(':nth-child(1) > .ant-select-item-option-content')
                  .click()
                cy.get('[data-testid="submit-input-reason"]')
                  .click()
                  .wait(2000)
              } else {
                cy.get(':nth-child(2) > .ant-card-body > .reason-card__container--danger > .reason-card__title--danger > .ant-row > :nth-child(2)')
                  .click()
                cy.get(':nth-child(1) > .ant-row > :nth-child(3) > .Button__StyledButton-sc-1s4bp2x-0')
                  .click()
                cy.get('[data-testid="other-reason"]')
                  .click()
                cy.get('#input_reason_reason')
                  .type('Test other input multiple reason')
                  .should('have.value', 'Test other input multiple reason')
                cy.get('#input_reason_category_id')
                  .click()
                  .get(':nth-child(1) > .ant-select-item-option-content')
                  .click()
                cy.get('[data-testid="submit-input-reason"]')
                  .click()
                  .wait(2000)
              }
            } else {
              cy.log('Downtime reason hanya berjumlah 1')
            }
            /* cy.get('div[class="ant-card ant-card-bordered reason-card--warning"]').eq(0).click({force:true});
            cy.get('div[class="ant-card ant-card-bordered reason-card--warning"]').eq(1).click(); */
          } else {
            cy.log('Tidak ada downtime reason yang tercatat')
          }
        } else {
          cy.log('Karena tidak ada runtime yang berjalan, jangan lakukan apapun')
        }
      })
  })
  
  Cypress.Commands.add('logout', () => {
    cy.get('.ant-avatar')
      .click()
    cy.get('.ant-dropdown-menu-item')
      .click()
    cy.get('#login')
    cy.url()
      .should('include', '/')
  })