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

Cypress.Commands.add('login', (user, pass) => {
  cy.visit('/')
  cy.get('#login_username', {timeout:60000})
    .type(user)
    .should('have.value', user)
  cy.get('#login_password')
    .type(pass)
    .should('have.value', pass)
  cy.get('#btn-login')
    .click()
  /* cy.url()
    .should('include', '/products') */
})
Cypress.Commands.add('select_product', () => {
  cy.wait(5000)
  cy.url().then(($url) => {
    if ($url.includes('/runtime')) {
      cy.get(':nth-child(1) > [style="margin-left: -4px; margin-right: -4px; row-gap: 8px;"] > :nth-child(1) > .ant-card > .ant-card-body', {timeout: 60000}).should('exist');
    } else {
      cy.get('.Button__StyledButton-sc-1s4bp2x-0', {timeout: 60000}).should('exist');
    }
  });
  /* cy.get('body')
    .then((body) => {
      console.log(body.find('div:contains(Tidak ada runtime yang berjalan)'))
      if(body.find(':nth-child(1) > [style="margin-left: -4px; margin-right: -4px; row-gap: 8px;"] > :nth-child(1) > .ant-card > .ant-card-body').length > 0) {
        cy.get(':nth-child(2) > .ant-card > .ant-card-body')
        cy.get(':nth-child(1) > [style="margin-left: -4px; margin-right: -4px; row-gap: 8px;"] > :nth-child(1) > .ant-card > .ant-card-body')
        cy.get(':nth-child(2) > [style="margin-left: -4px; margin-right: -4px; row-gap: 8px;"] > :nth-child(1) > .ant-card > .ant-card-body')
          .click()
        cy.get('.ant-layout-content')
        cy.url()
          .should('include', '/dashboardhmi')
      } else {
        cy.get('.Button__StyledButton-sc-1s4bp2x-0')
          .click()
        cy.get(':nth-child(1) > [style="margin-left: -4px; margin-right: -4px; row-gap: 8px;"] > :nth-child(1) > .ant-card > .ant-card-body')
          .click()
        cy.get('.swal2-confirm')
          .click()
      }
    }) */
})

Cypress.Commands.add('change_product', () => {
  cy.get(':nth-child(3) > div > .ant-btn > span')
    .click()
  cy.url()
    .should('include', '/products')
  cy.get(':nth-child(2) > [style="margin-left: -4px; margin-right: -4px; row-gap: 8px;"] > :nth-child(1) > .ant-card > .ant-card-body')
    .click()
  cy.get('.swal2-confirm')
    .click()
  cy.wait(5000)
  cy.url()
    .should('include', '/products')
  cy.get(':nth-child(1) > [style="margin-left: -4px; margin-right: -4px; row-gap: 8px;"] > .ant-col-24 > .ant-card > .ant-card-body')
    .click()
  cy.url()
    .should('include', '/dashboardhmi')
})

Cypress.Commands.add('unreasoned_downtime_cards', () => {
  cy.get(':nth-child(1) > .Button__StyledButton-sc-1s4bp2x-0')
    .click()
  cy.url()
    .should('include', '/dashboardhmi')
})

Cypress.Commands.add('downtime_ascending', () => {
  cy.get(':nth-child(3) > .Button__StyledButton-sc-1s4bp2x-0')
    .click()
  cy.wait(2000)
  cy.url()
    .should('include', '/dashboardhmi')
})

Cypress.Commands.add('downtime_descending', () => {
  cy.get(':nth-child(3) > .Button__StyledButton-sc-1s4bp2x-0')
    .click()
  cy.wait(2000)
  cy.url()
    .should('include', '/dashboardhmi')
})

Cypress.Commands.add('default_input_reason', () => {
  cy.get('.indiana-scroll-container > :nth-child(1)')
    .click()
  cy.get('#input_reason_reason')
    .type('Alarm{enter}')
  cy.get('#input_reason_note')
    .type('test')
    .should('have.value', 'test')
  cy.get('.ant-form-item-control-input-content > .ant-btn > span')
    .click()
  cy.wait(5000)
})

Cypress.Commands.add('other_input_reason', () => {
  cy.get('.indiana-scroll-container > :nth-child(1)')
    .click()
  cy.get('[data-testid="other-reason"]')
    .click()
  cy.get('#input_reason_reason')
    .type('Alarm{enter}')
  cy.get('#input_reason_category_id')
    .type('Set{enter}')
  cy.get('#input_reason_note')
    .type('test')
    .should('have.value', 'test')
  cy.get('.ant-form-item-control-input-content > .ant-btn > span')
    .click()
  cy.wait(5000)
})

Cypress.Commands.add('multiple_default_reason', () => {
  cy.get(':nth-child(4) > .Button__StyledButton-sc-1s4bp2x-0')
    .click()
  /* cy.get(':nth-child(1) > .ant-card-body > .reason-card__container--warning > .reason-card__title--warning > .ant-row > :nth-child(2) > .ReasonCardMulti__StyledCheckbox-lnd26r-0') */
  /* cy.get(':nth-child(1) > .ant-card-body > .reason-card__container--warning > .reason-card__title--warning > .ant-row > :nth-child(2) > .ReasonCardMulti__StyledCheckbox-lnd26r-0')
    .click() */
  cy.get('div[class="ant-card ant-card-bordered reason-card--warning"]').eq(0).click({force:true});
  cy.get('div[class="ant-card ant-card-bordered reason-card--warning"]').eq(1).click();
  /* cy.get(':nth-child(3) > .ant-card-body > .reason-card__container--warning > .reason-card__title--warning > .ant-row > :nth-child(2) > .ReasonCardMulti__StyledCheckbox-lnd26r-0')
    .click() */
  /* cy.get(':nth-child(3) > .ant-card-body > .reason-card__container--danger > .reason-card__title--danger > .ant-row > :nth-child(2) > .ReasonCardMulti__StyledCheckbox-lnd26r-0')
    .click() */
  cy.get(':nth-child(1) > .ant-row > :nth-child(3) > .Button__StyledButton-sc-1s4bp2x-0')
    .click()
  cy.get('#input_reason_reason')
    .type('Alarm{enter}')
  cy.get('[data-testid="submit-input-reason"]')
    .click()
  cy.wait(5000)
})

Cypress.Commands.add('multiple_other_reason', () => {
  cy.get(':nth-child(4) > .Button__StyledButton-sc-1s4bp2x-0')
    .click()
  cy.get(':nth-child(2) > .ant-card-body > .reason-card__container--warning > .reason-card__title--warning > .ant-row > :nth-child(2) > .ReasonCardMulti__StyledCheckbox-lnd26r-0')
    .click()
  cy.get(':nth-child(3) > .ant-card-body > .reason-card__container--warning > .reason-card__title--warning > .ant-row > :nth-child(2) > .ReasonCardMulti__StyledCheckbox-lnd26r-0')
    .click()
  /* cy.get(':nth-child(3) > .ant-card-body > .reason-card__container--danger > .reason-card__title--danger > .ant-row > :nth-child(2) > .ReasonCardMulti__StyledCheckbox-lnd26r-0')
    .click() */
  cy.get(':nth-child(1) > .ant-row > :nth-child(3) > .Button__StyledButton-sc-1s4bp2x-0')
    .click()
  cy.get('[data-testid="other-reason"]')
    .click()
  cy.get('#input_reason_reason')
    .type('Alarm{enter}')
  cy.get('#input_reason_category_id')
    .type('Set{enter}')
  cy.get('[data-testid="submit-input-reason"]')
    .click()
  cy.wait(5000)
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