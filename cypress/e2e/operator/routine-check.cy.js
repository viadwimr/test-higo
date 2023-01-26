/* eslint-disable */
/// <reference types="cypress" />

const timeout = { timeout: 5000 };
//const ipData = '34.87.144.83:3009';
const force = { force: true };
const d = new Date();
var noRuntime = '';

// Shift Panjang
if (d.getHours()>=22 || d.getHours()<6) {
  var [line1,line2,line7] = [3,6,9];
} else if(d.getHours()>=6 && d.getHours()<14) {
  var [line1,line2,line7] = [1,4,7];
} else if (d.getHours()>=14 && d.getHours()<22) {
  var [line1,line2,line7] = [2,5,8];
}

/*
// Shift Pendek
if (d.getHours()>=16 && d.getHours()<22) {
  var [line1,line2,line7] = [3,5,9];
} else if(d.getHours()>=6 && d.getHours()<11) {
  var [line1,line2,line7] = [1,4,7];
} else if (d.getHours()>=12 && d.getHours()<16) {
  var [line1,line2,line7] = [2,5,8];
}
*/

describe('Line 1', () => {
  const user = Cypress.env(`oprprd${line1}`)
  const pass = Cypress.env('password')
  beforeEach(() => {
    Cypress.Cookies.preserveOnce('secret')
  })

  it('Normal APQ Filler', () => {
    cy.login(user, pass)
    cy.wait(7000);
    cy.get('body', timeout).then((body) => {
      // history runtime
      if (body.find('[style="min-height: 100vh; display: flex; flex-direction: column; justify-content: center; align-items: center;"] > .ant-space').length > 0) {
        cy.get('.Button__StyledButton-sc-1s4bp2x-0', timeout).click();
        cy.wait(3000);
        // check data runtime
        cy.get('body', timeout).then((body) => {
          if (body.find('[data-testid="nodata"]').length > 0) {
            // close
            cy.get('.ant-row > :nth-child(2)', timeout).click();
            cy.logout()
            // detect no runtime
            noRuntime = ' (No Runtime)';
          } else {
            // select runtime
            cy.get('.ant-layout-content > :nth-child(1) > :nth-child(2) > :nth-child(1)', timeout)
              .contains('Filler GBM').click();
            cy.get('body', timeout).then((body) => {
              if (body.find('.swal2-confirm').length > 0) {
                cy.get('.swal2-confirm', timeout).click();
              }
            });
            cy.wait(7000);      
            cy.oeeAPQ();
          }
        });
        
      } else {
        // back to the history runtime
        cy.get('div[style=""] > div > .ant-btn', timeout).click();
        cy.wait(7000);
        cy.get('body', timeout).then((body) => {
          if (body.find('.ant-layout-content > :nth-child(1) > :nth-child(2) > :nth-child(1)').length > 0) {
            // select runtime
            cy.get('.ant-layout-content > :nth-child(1) > :nth-child(2) > :nth-child(1)', timeout)
              .contains('Filler GBM').click();
          }
        });
        cy.get('body', timeout).then((body) => {
          if (body.find('.swal2-confirm').length > 0) {
            cy.get('.swal2-confirm', timeout).click();
          }
        });
        cy.wait(7000);
        cy.oeeAPQ();
      }
    });
  });

  it(`Good-Reject Product Filler${noRuntime}`, () => {
    // check runtime/no runtime
    cy.get('body', timeout).then((body) => {
      if (body.find(':nth-child(1) > .ant-card > .ant-card-body > .qtt-value').length > 0) {
        cy.totalProduct();
      }
    });
  });

  it(`Normal APQ Packer${noRuntime}`, () => {
    // check runtime/no runtime
    cy.get('body', timeout).then((body) => {
      if (body.find('div[style=""] > div > .ant-btn').length > 0) {
        // change runtime
        cy.get('div[style=""] > div > .ant-btn', timeout).eq(0).click();
        cy.wait(3000);
        // check runtime
        cy.get('body', timeout).then((body) => {
          // passed runtime
          if (body.find('.Button__StyledButton-sc-1s4bp2x-0').length > 0) {
            cy.get('.Button__StyledButton-sc-1s4bp2x-0', timeout).click();
            // select runtime
            cy.get('.ant-layout-content > :nth-child(1) > :nth-child(2) > :nth-child(1)', timeout)
              .contains('Packaging').click();
            cy.get('.swal2-confirm', timeout).click();
          }
          // running time
          else {
            // select runtime
            cy.get(':nth-child(1) > .ant-row > .ant-col > .ant-card > .ant-card-body', timeout)
              .contains('Packaging').click();
          }
          cy.get('body', timeout).then((body) => {
            if (body.find('.swal2-confirm').length > 0) {
              cy.get('.swal2-confirm', timeout).click();
            }
          });
          cy.wait(7000);
          cy.oeeAPQ();
        });
      }
    });
  });

  it(`Good-Reject Product Packer${noRuntime}`, () => {
    // check runtime/no runtime
    cy.get('body', timeout).then((body) => {
      if (body.find('div[style=""] > div > .ant-btn').length > 0) {
        cy.totalProduct();
      }
    });
  });
});

describe('Line 2', () => {
  const user = Cypress.env(`oprprd${line2}`)
  const pass = Cypress.env('password')
  beforeEach(() => {
    Cypress.Cookies.preserveOnce('secret')
  })

  it('Normal APQ Filler', () => {
    cy.logout()
    cy.login(user, pass)
    cy.wait(7000);
    cy.get('body', timeout).then((body) => {
      // history runtime
      if (body.find('[style="min-height: 100vh; display: flex; flex-direction: column; justify-content: center; align-items: center;"] > .ant-space').length > 0) {
        cy.get('.Button__StyledButton-sc-1s4bp2x-0', timeout).click();
        cy.wait(3000);
        // check data runtime
        cy.get('body', timeout).then((body) => {
          if (body.find('[data-testid="nodata"]').length > 0) {
            // close
            cy.get('.ant-row > :nth-child(2)', timeout).click();
            cy.logout()
            // detect no runtime
            noRuntime = 'No Runtime';
          } else {
            // select runtime
            cy.get('.ant-layout-content > :nth-child(1) > :nth-child(2) > :nth-child(1)', timeout)
              .contains('Filler NATEC').click();
            cy.get('body', timeout).then((body) => {
              if (body.find('.swal2-confirm').length > 0) {
                cy.get('.swal2-confirm', timeout).click();
              }
            });
            cy.wait(7000);
            cy.oeeAPQ();
          }
        });
        
      } else {
        // back to the history runtime
        cy.get('div[style=""] > div > .ant-btn', timeout).click();
        cy.wait(7000);
        // check runtime
        cy.get('body', timeout).then((body) => {
          if (body.find('.ant-layout-content > :nth-child(1) > :nth-child(2) > :nth-child(1)').length > 0) {
            // select runtime
            cy.get('.ant-layout-content > :nth-child(1) > :nth-child(2) > :nth-child(1)', timeout)
              .contains('Filler NATEC').click();
          }
        });
        cy.get('body', timeout).then((body) => {
          if (body.find('.swal2-confirm').length > 0) {
            cy.get('.swal2-confirm', timeout).click();
          }
        });
        cy.wait(7000);
        cy.oeeAPQ();
      }
    });
  });

  it(`Good-Reject Product Filler${noRuntime}`, () => {
    // check runtime/no runtime
    cy.get('body', timeout).then((body) => {
      if (body.find(':nth-child(1) > .ant-card > .ant-card-body > .qtt-value').length > 0) {
        cy.totalProduct();
      }
    })
  });

  it(`Normal APQ Packer${noRuntime}`, () => {
    // check runtime/no runtime
    cy.get('body', timeout).then((body) => {
      if (body.find('div[style=""] > div > .ant-btn').length > 0) {
        // change runtime
        cy.get('div[style=""] > div > .ant-btn', timeout).eq(0).click();
        cy.wait(3000);
        // check runtime
        cy.get('body', timeout).then((body) => {
          // passed runtime
          if (body.find('.Button__StyledButton-sc-1s4bp2x-0').length > 0) {
            cy.get('.Button__StyledButton-sc-1s4bp2x-0', timeout).click();
            // select runtime
            cy.get(':nth-child(1) > .ant-row > .ant-col > .ant-card > .ant-card-body', timeout)
              .contains('Packer PFM SCIROCO').click();
            cy.get('.swal2-confirm', timeout).click();
          }
          // running time
          else {
            // select runtime
            cy.get(':nth-child(1) > .ant-row > .ant-col > .ant-card > .ant-card-body', timeout)
              .contains('Packer PFM SCIROCO').click();
          }
          cy.get('body', timeout).then((body) => {
            if (body.find('.swal2-confirm').length > 0) {
              cy.get('.swal2-confirm', timeout).click();
            }
          });
          cy.wait(7000);
          cy.oeeAPQ();
        });
      }
    });
  });

  it(`Good-Reject Product Packer${noRuntime}`, () => {
    // check runtime/no runtime
    cy.get('body', timeout).then((body) => {
      if (body.find(':nth-child(1) > .ant-card > .ant-card-body > .qtt-value').length > 0) {
        cy.totalProduct();
      }
    });
  });
});

describe('Line 7', () => {
  const user = Cypress.env(`oprprd${line7}`)
  const pass = Cypress.env('password')
  beforeEach(() => {
    Cypress.Cookies.preserveOnce('secret')
  })

  it('Normal APQ Filler 1', () => {
    cy.logout()
    cy.login(user, pass)
    cy.wait(7000); 
    cy.get('body', timeout).then((body) => {
      // history runtime
      if (body.find('[style="min-height: 100vh; display: flex; flex-direction: column; justify-content: center; align-items: center;"] > .ant-space').length > 0) {
        cy.get('.Button__StyledButton-sc-1s4bp2x-0', timeout).click();
        cy.wait(3000);
        // check data runtime
        cy.get('body', timeout).then((body) => {
          if (body.find('[data-testid="nodata"]').length > 0) {
            // close
            cy.get('.ant-row > :nth-child(2)', timeout).click();
            cy.logout()
            // detect no runtime
            noRuntime = 'No Runtime';
          } else {
            // select runtime
            cy.get('.ant-layout-content > :nth-child(1) > :nth-child(2) > :nth-child(1)', timeout)
              .contains('Filler TREPKO A').click();
            cy.get('body', timeout).then((body) => {
              if (body.find('.swal2-confirm').length > 0) {
                cy.get('.swal2-confirm', timeout).click();
              }
            });
            cy.wait(7000);
            cy.oeeAPQ();
          }
        });
        
      } else {
        // back to the history runtime
        cy.get('div[style=""] > div > .ant-btn', timeout).click();
        cy.wait(7000);
        // check runtime
        cy.get('body', timeout).then((body) => {
          if (body.find('.ant-layout-content > :nth-child(1) > :nth-child(2) > :nth-child(1)').length > 0) {
            // select runtime
            cy.get('.ant-layout-content > :nth-child(1) > :nth-child(2) > :nth-child(1)', timeout)
              .contains('Filler TREPKO A').click();
          }
        });
        cy.get('body', timeout).then((body) => {
          if (body.find('.swal2-confirm').length > 0) {
            cy.get('.swal2-confirm', timeout).click();
          }
        });
        cy.wait(7000);
        cy.oeeAPQ();
      }
    });
  });

  it(`Good-Reject Product Filler 1${noRuntime}`, () => {
    // check runtime/no runtime
    cy.get('body', timeout).then((body) => {
      if (body.find(':nth-child(1) > .ant-card > .ant-card-body > .qtt-value').length > 0) {
        cy.totalProduct();
      }
    })
  });

  it(`Normal APQ Filler 2${noRuntime}`, () => {
    // check runtime/no runtime
    cy.get('body', timeout).then((body) => {
      if (body.find('div[style=""] > div > .ant-btn').length > 0) {
        // change runtime
        cy.get('div[style=""] > div > .ant-btn', timeout).eq(0).click();
        cy.wait(3000);
        // check runtime
        cy.get('body', timeout).then((body) => {
          // passed runtime
          if (body.find('.Button__StyledButton-sc-1s4bp2x-0').length > 0) {
            cy.get('.Button__StyledButton-sc-1s4bp2x-0', timeout).click();
            // select runtime
            cy.get('.ant-layout-content > :nth-child(1) > :nth-child(2) > :nth-child(1)', timeout)
              .contains('Filler TREPKO B').click();
            cy.get('.swal2-confirm', timeout).click();
          }
          // running time
          else {
            // select runtime
            cy.get(':nth-child(1) > .ant-row > .ant-col > .ant-card > .ant-card-body', timeout)
              .contains('Filler TREPKO B').click();
          }
          cy.get('body', timeout).then((body) => {
            if (body.find('.swal2-confirm').length > 0) {
              cy.get('.swal2-confirm', timeout).click();
            }
          });
          cy.wait(7000);
          cy.oeeAPQ();
        });
      }
    });
  });

  it(`Good-Reject Product Filler 2${noRuntime}`, () => {
    // check runtime/no runtime
    cy.get('body', timeout).then((body) => {
      if (body.find(':nth-child(1) > .ant-card > .ant-card-body > .qtt-value').length > 0) {
        cy.totalProduct();
      }
    });
  });

  it(`Normal APQ Packer 1${noRuntime}`, () => {
    // check runtime/no runtime
    cy.get('body', timeout).then((body) => {
      if (body.find('div[style=""] > div > .ant-btn').length > 0) {
        // change runtime
        cy.get('div[style=""] > div > .ant-btn', timeout).eq(0).click();
        cy.wait(3000);
        // check runtime
        cy.get('body', timeout).then((body) => {
          // passed runtime
          if (body.find('.Button__StyledButton-sc-1s4bp2x-0').length > 0) {
            cy.get('.Button__StyledButton-sc-1s4bp2x-0', timeout).click();
              // check packer machine
              cy.get('body', timeout).then((body) => {
                if (body.find(':nth-child(1) > [style="margin-left: -4px; margin-right: -4px; row-gap: 8px;"] > :nth-child(3) > .ant-card > .ant-card-body').length > 0) {
                  // select runtime
                  cy.get('.ant-layout-content > :nth-child(1) > :nth-child(2) > :nth-child(1)', timeout)
                    .contains('Packer HMPS').click();
                  cy.get('.swal2-confirm', timeout).click();
                  cy.wait(7000);
                  cy.oeeAPQ();
                } else {
                  //close
                  cy.get('.ant-row > :nth-child(2)', timeout).eq(0).click();  
                  cy.wait(7000);
                }
              });
          }
          // running time
          else {
            // check packer machine
            cy.get('body', timeout).then((body) => {
              if (body.find(':nth-child(1) > [style="margin-left: -4px; margin-right: -4px; row-gap: 8px;"] > :nth-child(3) > .ant-card > .ant-card-body').length > 0) {
                // select runtime
                cy.get('.ant-layout-content > :nth-child(1) > :nth-child(2) > :nth-child(1)', timeout)
                .contains('Packer HMPS').click();
                cy.get('body', timeout).then((body) => {
                  if (body.find('.swal2-confirm').length > 0) {
                    cy.get('.swal2-confirm', timeout).click();
                  }
                });
                cy.wait(7000);
                cy.oeeAPQ();
              } else {
                // close
                cy.get('.ant-row > :nth-child(2)', timeout).eq(0).click();  
                cy.wait(7000);
              }
            })
          }
        });
      }
    });
  });

  it(`Good-Reject Product Packer 1${noRuntime}`, () => {
    // check runtime/no runtime
    cy.get('body', timeout).then((body) => {
      if (body.find(':nth-child(1) > .ant-card > .ant-card-body > .qtt-value').length > 0) {
        // check machine name
        cy.get('body').find('.ant-page-header-heading-title').invoke('text').then((text) => {
          if (text == `Operator Produksi ${line7} - Packer HMPS`) {
            cy.totalProduct();
          }
        })
      }
    })
  });

  it(`Normal APQ Packer 2${noRuntime}`, () => {
    // check runtime/no runtime
    cy.get('body', timeout).then((body) => {
      if (body.find('div[style=""] > div > .ant-btn').length > 0) {
        // change runtime
        cy.get('div[style=""] > div > .ant-btn', timeout).eq(0).click();
        cy.wait(3000);
        // check runtime
        cy.get('body', timeout).then((body) => {
          // passed runtime
          if (body.find('.Button__StyledButton-sc-1s4bp2x-0').length > 0) {
            cy.get('.Button__StyledButton-sc-1s4bp2x-0', timeout).click();
            // check packer machine
            cy.get('body', timeout).then((body) => {
              if (body.find(':nth-child(1) > [style="margin-left: -4px; margin-right: -4px; row-gap: 8px;"] > :nth-child(3) > .ant-card > .ant-card-body').length > 0) {
                // select runtime
                cy.get('.ant-layout-content > :nth-child(1) > :nth-child(2) > :nth-child(1)', timeout)
                  .contains('Packer CIEME').click();
                cy.get('.swal2-confirm', timeout).click();
                cy.wait(7000);
                cy.oeeAPQ();
              } else {
                // close
                cy.get('.ant-row > :nth-child(2)', timeout).eq(0).click();
                cy.wait(7000);
              }
            });
          }
          // running time
          else {
            // check packer machine
            cy.get('body', timeout).then((body) => {
              if (body.find(':nth-child(1) > [style="margin-left: -4px; margin-right: -4px; row-gap: 8px;"] > :nth-child(3) > .ant-card > .ant-card-body').length > 0) {
                // select runtime
                cy.get(':nth-child(1) > .ant-row > .ant-col > .ant-card > .ant-card-body', timeout)
                .contains('Packer CIEME').click();
                cy.get('body', timeout).then((body) => {
                  if (body.find('.swal2-confirm').length > 0) {
                    cy.get('.swal2-confirm', timeout).click();
                  }
                });
                cy.wait(7000);
                cy.oeeAPQ();
              } else {
                // close
                cy.get('.ant-row > :nth-child(2)', timeout).eq(0).click();
                cy.wait(7000);
              }
            }); 
          }
        });
      }
    });
  });

  it(`Good-Reject Product Packer 2${noRuntime}`, () => {
    // check runtime/no runtime
    cy.get('body', timeout).then((body) => {
      if (body.find(':nth-child(1) > .ant-card > .ant-card-body > .qtt-value').length > 0) {
        // check machine name
        cy.get('body').find('.ant-page-header-heading-title').invoke('text').then((text) => {
          if (text == `Operator Produksi ${line7} - Packer CIEME`) {
            cy.totalProduct();
          }
        });
      }
    });
  });
});