/// <reference types="Cypress" />

var timeout = { timeout: 60000 }

describe('User', () => {
  before(() => {
    cy.get('[title="User"] > .ant-menu-title-content > a', timeout).click();
  });

  describe('Sorting Data', () => {
    describe('by Full Name', () => {
      it('ASC', () => {
        cy.wait(3000);
        cy.contains('Full Name', timeout).click();
        cy.get('.ant-table-column-sort', timeout).eq(1).should('have.contain', 'Administrator PSPD');
        cy.get('.ant-table-column-sort', timeout).eq(2).should('have.contain', 'angel');
        cy.get('.ant-table-column-sort', timeout).eq(3).should('have.contain', 'Augustinus');
        cy.get('.ant-table-column-sort', timeout).eq(4).should('have.contain', 'Awan_HoM');
        cy.get('.ant-table-column-sort', timeout).eq(5).should('have.contain', 'Engineering');
      });
  
      it('DESC', () => {
        cy.wait(3000);
        cy.contains('Full Name', timeout).click();
        cy.get('.ant-table-column-sort', timeout).eq(1).should('have.contain', 'TPM');
        cy.get('.ant-table-column-sort', timeout).eq(2).should('have.contain', 'Telly_HoMS');
        cy.get('.ant-table-column-sort', timeout).eq(3).should('have.contain', 'Teknik');
        cy.get('.ant-table-column-sort', timeout).eq(4).should('have.contain', 'Supervisor Line 1');
        cy.get('.ant-table-column-sort', timeout).eq(5).should('have.contain', 'Supervisor');
      });
    });
    
    describe('by Username', () => {
      it('ASC', () => {
        cy.wait(3000);
        cy.contains('Username', timeout).click();
        cy.get('.ant-table-column-sort', timeout).eq(1).should('have.contain', 'adminpspd');
        cy.get('.ant-table-column-sort', timeout).eq(2).should('have.contain', 'angel');
        cy.get('.ant-table-column-sort', timeout).eq(3).should('have.contain', 'augustinus');
        cy.get('.ant-table-column-sort', timeout).eq(4).should('have.contain', 'Awan_HoM');
        cy.get('.ant-table-column-sort', timeout).eq(5).should('have.contain', 'engineering');
      });
  
      it('DESC', () => {
        cy.wait(3000);
        cy.contains('Username', timeout).click();
        cy.get('.ant-table-column-sort', timeout).eq(1).should('have.contain', 'TPM');
        cy.get('.ant-table-column-sort', timeout).eq(2).should('have.contain', 'Telly_HoMS');
        cy.get('.ant-table-column-sort', timeout).eq(3).should('have.contain', 'teknik');
        cy.get('.ant-table-column-sort', timeout).eq(4).should('have.contain', 'supervisor');
        cy.get('.ant-table-column-sort', timeout).eq(5).should('have.contain', 'spv_line_1');
      });
    });

    describe('by Role', () => {
      it('ASC', () => {
        cy.wait(3000);
        cy.contains('Role', timeout).click();
        cy.get('.ant-table-column-sort', timeout).eq(1).should('have.contain', 'admin');
        cy.get('.ant-table-column-sort', timeout).eq(2).should('have.contain', 'admin');
        cy.get('.ant-table-column-sort', timeout).eq(3).should('have.contain', 'admin');
        cy.get('.ant-table-column-sort', timeout).eq(4).should('have.contain', 'admin');
        cy.get('.ant-table-column-sort', timeout).eq(5).should('have.contain', 'admin');
      });
  
      it('DESC', () => {
        cy.wait(3000);
        cy.contains('Role', timeout).click();
        cy.get('.ant-table-column-sort', timeout).eq(1).should('have.contain', 'team_leader');
        cy.get('.ant-table-column-sort', timeout).eq(2).should('have.contain', 'team_leader');
        cy.get('.ant-table-column-sort', timeout).eq(3).should('have.contain', 'team_leader');
        cy.get('.ant-table-column-sort', timeout).eq(4).should('have.contain', 'team_leader');
        cy.get('.ant-table-column-sort', timeout).eq(5).should('have.contain', 'supervisor');
      });
    });

    describe('by Created Date', () => {
      it('ASC', () => {
        cy.wait(3000);
        cy.contains('Created Date', timeout).click();
        cy.get('.ant-table-column-sort', timeout).eq(1).should('have.contain', '18 Feb 2020 - 10:33:12');
        cy.get('.ant-table-column-sort', timeout).eq(2).should('have.contain', '18 Feb 2020 - 10:34:20');
        cy.get('.ant-table-column-sort', timeout).eq(3).should('have.contain', '11 Mar 2020 - 16:54:27');
        cy.get('.ant-table-column-sort', timeout).eq(4).should('have.contain', '11 Mar 2020 - 16:55:09');
        cy.get('.ant-table-column-sort', timeout).eq(5).should('have.contain', '11 Mar 2020 - 16:56:00');
      });
  
      it('DESC', () => {
        cy.wait(3000);
        cy.contains('Created Date', timeout).click();
        cy.get('.ant-table-column-sort', timeout).eq(1).should('have.contain', '20 Okt 2021 - 00:35:39');
        cy.get('.ant-table-column-sort', timeout).eq(2).should('have.contain', '01 Okt 2021 - 17:09:05');
        cy.get('.ant-table-column-sort', timeout).eq(3).should('have.contain', '23 Agt 2021 - 11:30:25');
        cy.get('.ant-table-column-sort', timeout).eq(4).should('have.contain', '18 Agt 2021 - 14:55:15');
        cy.get('.ant-table-column-sort', timeout).eq(5).should('have.contain', '13 Agt 2021 - 13:46:39');
      });
    });

    describe('Gallery List', () => {
      it('by Name', () => {
        cy.wait(3000);
        cy.get(':nth-child(2) > .ant-row > :nth-child(2) > .Button__BaseButton-sc-1hmbtsr-0', timeout).click();
        cy.get(':nth-child(1) > .ant-card > .ant-card-body', timeout).should('have.contain', 'Administrator PSPD');
        cy.get(':nth-child(2) > .ant-card > .ant-card-body', timeout).should('have.contain', 'angel');
        cy.get(':nth-child(3) > .ant-card > .ant-card-body', timeout).should('have.contain', 'Augustinus');
        cy.get(':nth-child(4) > .ant-card > .ant-card-body', timeout).should('have.contain', 'Awan_HoM');
        cy.get(':nth-child(5) > .ant-card > .ant-card-body', timeout).should('have.contain', 'Engineering')
      });
    });

  });
});


