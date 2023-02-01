/* eslint-disable */
/// <reference types="cypress" />

const timeout = { timeout: 5000 };
//const ipData = '34.87.144.83:3009';
const force = { force: true };
const d = new Date();

// default shift
if (d.getHours()>=22 || d.getHours()<6) {
  var [line1,line2,line7] = [3,6,9];
} else if(d.getHours()>=6 && d.getHours()<14) {
  var [line1,line2,line7] = [1,4,7];
} else if (d.getHours()>=14 && d.getHours()<22) {
  var [line1,line2,line7] = [2,5,8];
}

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
        cy.contains('Tidak ada runtime yang berjalan', timeout).should('be.visible');
        cy.get('.Button__StyledButton-sc-1s4bp2x-0', timeout).click();
        cy.wait(3000);
        // check data runtime
        cy.get('body', timeout).then((body) => {
          if (body.find('[data-testid="nodata"]').length > 0) {
            cy.contains('Tidak Ada Runtime').should('be.visible');
            // close
            cy.get('.ant-row > :nth-child(2)', timeout).click();
            cy.logout()
          } else {
            // check passed runtime
            cy.get('body', timeout).then((body) => {
              if (body.find(':nth-child(1) > [style="margin-left: -4px; margin-right: -4px; row-gap: 8px;"] > :nth-child(1) > .ant-card > .ant-card-body').length > 0) {
                // close
                expect('Filler GBM tidak ada runtime').to.deep.equal('Filler GBM tidak ada runtime')
                cy.get('.ant-row > :nth-child(2)', timeout).eq(0).click();  
                cy.wait(3000);
              }
            })
          }
        });
        
      } else {
        // back to the history runtime
        cy.get('div[style=""] > div > .ant-btn', timeout).click();
        cy.wait(7000);
        cy.get('body', timeout).then((body) => {
          if (body.find('.ant-layout-content > :nth-child(1) > :nth-child(2) > :nth-child(1)').length > 0) {
            // check shift
            cy.get('body').find(':nth-child(1) > [style="margin-left: -4px; margin-right: -4px; row-gap: 8px;"] > :nth-child(1) > .ant-card > .ant-card-body > .ant-row > :nth-child(3) > .ant-space > .ant-space-item > table > tbody > :nth-child(2) > [data-testid="end-time"]')
            .invoke('text').then((text) => {
              var shiftEnd = text.substring(11)
              if (shiftEnd=='10:59:59' || shiftEnd=='15:59:59' || shiftEnd=='20:59:59') {
                if (d.getHours()>=16 && d.getHours()<22) {
                  var [line1,line2,line7] = [3,5,9];
                } else if(d.getHours()>=6 && d.getHours()<11) {
                  var [line1,line2,line7] = [1,4,7];
                } else if (d.getHours()>=12 && d.getHours()<16) {
                  var [line1,line2,line7] = [2,5,8];
                }
                // close
                cy.get('.ant-row > :nth-child(2)', timeout).click();
                cy.logout()
                // re-login
                user = Cypress.env(`oprprd${line1}`)
                cy.login(user, pass) 
                cy.wait(7000);     
              }
            })
            cy.select_runtime('Filler GBM')
            cy.wait(7000);
            cy.oeeAPQ();
          }
        });
      }
    });
  });

  it(`Count Downtime Filler`, () => {
    // check runtime/no runtime
    cy.get('body', timeout).then((body) => {
      if (body.find(':nth-child(1) > .ant-card > .ant-card-body > .qtt-value').length > 0) {
        cy.count_downtime();
      }
    });
  });

  it(`Good-Reject Product Filler`, () => {
    // check runtime/no runtime
    cy.get('body', timeout).then((body) => {
      if (body.find(':nth-child(1) > .ant-card > .ant-card-body > .qtt-value').length > 0) {
        cy.totalProduct();
      }
    });
  });

  it(`Normal APQ Packer`, () => {
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
            // close
            expect('Packaging tidak ada runtime').to.deep.equal('Packaging tidak ada runtime')
            cy.get('.ant-row > :nth-child(2)', timeout).eq(0).click();  
            cy.wait(3000);
          }
          // running time
          else {
            cy.select_runtime('Packaging')
            cy.wait(7000);
            cy.oeeAPQ();
          };
        });
      }
    });
  });

  it(`Count Downtime Packer`, () => {
    // check runtime/no runtime
    cy.get('body', timeout).then((body) => {
      if (body.find('div[style=""] > div > .ant-btn').length > 0) {
        cy.count_downtime();
      }
    });
  });

  it(`Good-Reject Product Packer`, () => {
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
        cy.contains('Tidak ada runtime yang berjalan', timeout).should('be.visible');
        cy.get('.Button__StyledButton-sc-1s4bp2x-0', timeout).click();
        cy.wait(3000);
        // check data runtime
        cy.get('body', timeout).then((body) => {
          if (body.find('[data-testid="nodata"]').length > 0) {
            cy.contains('Tidak Ada Runtime').should('be.visible');
            // close
            cy.get('.ant-row > :nth-child(2)', timeout).click();
            cy.logout()
          } else {
            // check passed runtime
            cy.get('body', timeout).then((body) => {
              if (body.find(':nth-child(1) > [style="margin-left: -4px; margin-right: -4px; row-gap: 8px;"] > :nth-child(1) > .ant-card > .ant-card-body').length > 0) {
                // close
                expect('Filler NATEC tidak ada runtime').to.deep.equal('Filler NATEC tidak ada runtime')
                cy.get('.ant-row > :nth-child(2)', timeout).eq(0).click();  
                cy.wait(3000);
              }
            })
          }
        });
      } else {
        // back to the history runtime
        cy.get('div[style=""] > div > .ant-btn', timeout).click();
        cy.wait(7000);
        // check runtime
        cy.get('body', timeout).then((body) => {
          if (body.find('.ant-layout-content > :nth-child(1) > :nth-child(2) > :nth-child(1)').length > 0) {
            // check shift
            cy.get('body').find(':nth-child(1) > [style="margin-left: -4px; margin-right: -4px; row-gap: 8px;"] > :nth-child(1) > .ant-card > .ant-card-body > .ant-row > :nth-child(3) > .ant-space > .ant-space-item > table > tbody > :nth-child(2) > [data-testid="end-time"]')
            .invoke('text').then((text) => {
              var shiftEnd = text.substring(11)
              if (shiftEnd=='10:59:59' || shiftEnd=='15:59:59' || shiftEnd=='20:59:59') {
                if (d.getHours()>=16 && d.getHours()<22) {
                  var [line1,line2,line7] = [3,5,9];
                } else if(d.getHours()>=6 && d.getHours()<11) {
                  var [line1,line2,line7] = [1,4,7];
                } else if (d.getHours()>=12 && d.getHours()<16) {
                  var [line1,line2,line7] = [2,5,8];
                }
                // close
                cy.get('.ant-row > :nth-child(2)', timeout).click();
                cy.logout()
                // re-login
                user = Cypress.env(`oprprd${line2}`)
                cy.login(user, pass) 
                cy.wait(7000);     
              }
            })
            cy.select_runtime('Filler NATEC')
            cy.wait(7000);
            cy.oeeAPQ();
          }
        });
      }
    });
  });

  it(`Count Downtime Filler`, () => {
    // check runtime/no runtime
    cy.get('body', timeout).then((body) => {
      if (body.find(':nth-child(1) > .ant-card > .ant-card-body > .qtt-value').length > 0) {
        cy.count_downtime();
      }
    })
  });

  it(`Good-Reject Product Filler`, () => {
    // check runtime/no runtime
    cy.get('body', timeout).then((body) => {
      if (body.find(':nth-child(1) > .ant-card > .ant-card-body > .qtt-value').length > 0) {
        cy.totalProduct();
      }
    })
  });

  it(`Normal APQ Packer`, () => {
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
            // close
            expect('Packer PFM SCIROCO tidak ada runtime').to.deep.equal('Packer PFM SCIROCO tidak ada runtime')
            cy.get('.ant-row > :nth-child(2)', timeout).eq(0).click();  
            cy.wait(3000);
          }
          // running time
          else {
            cy.select_runtime('Packer PFM SCIROCO')
            cy.wait(7000);
            cy.oeeAPQ();
          }
        });
      }
    });
  });

  it(`Count Downtime Packer`, () => {
    // check runtime/no runtime
    cy.get('body', timeout).then((body) => {
      if (body.find(':nth-child(1) > .ant-card > .ant-card-body > .qtt-value').length > 0) {
        cy.count_downtime();
      }
    });
  });

  it(`Good-Reject Product Packer`, () => {
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
        cy.contains('Tidak ada runtime yang berjalan', timeout).should('be.visible');
        cy.get('.Button__StyledButton-sc-1s4bp2x-0', timeout).click();
        cy.wait(3000);
        // check data runtime
        cy.get('body', timeout).then((body) => {
          if (body.find('[data-testid="nodata"]').length > 0) {
            cy.contains('Tidak Ada Runtime').should('be.visible');
            // close
            cy.get('.ant-row > :nth-child(2)', timeout).click();
            cy.logout()
          } else {
            // check passed runtime
            cy.get('body', timeout).then((body) => {
              if (body.find(':nth-child(1) > [style="margin-left: -4px; margin-right: -4px; row-gap: 8px;"] > :nth-child(1) > .ant-card > .ant-card-body').length > 0) {
                // close
                expect('Filler TREPKO A tidak ada runtime').to.deep.equal('Filler TREPKO A tidak ada runtime')
                cy.get('.ant-row > :nth-child(2)', timeout).eq(0).click();  
                cy.wait(3000);
              }
            })
          }
        });
        
      } else {
        // back to the history runtime
        cy.get('div[style=""] > div > .ant-btn', timeout).click();
        cy.wait(7000);
        // check runtime
        cy.get('body', timeout).then((body) => {
          if (body.find('.ant-layout-content > :nth-child(1) > :nth-child(2) > :nth-child(1)').length > 0) {
            // check shift
            cy.get('body').find(':nth-child(1) > [style="margin-left: -4px; margin-right: -4px; row-gap: 8px;"] > :nth-child(1) > .ant-card > .ant-card-body > .ant-row > :nth-child(3) > .ant-space > .ant-space-item > table > tbody > :nth-child(2) > [data-testid="end-time"]')
            .invoke('text').then((text) => {
              var shiftEnd = text.substring(11)
              if (shiftEnd=='10:59:59' || shiftEnd=='15:59:59' || shiftEnd=='20:59:59') {
                if (d.getHours()>=16 && d.getHours()<22) {
                  var [line1,line2,line7] = [3,5,9];
                } else if(d.getHours()>=6 && d.getHours()<11) {
                  var [line1,line2,line7] = [1,4,7];
                } else if (d.getHours()>=12 && d.getHours()<16) {
                  var [line1,line2,line7] = [2,5,8];
                }
                // close
                cy.get('.ant-row > :nth-child(2)', timeout).click();
                cy.logout()
                // re-login
                user = Cypress.env(`oprprd${line7}`)
                cy.login(user, pass) 
                cy.wait(7000);     
              }
            })
            cy.select_runtime('Filler TREPKO A')
            cy.wait(7000);
            cy.oeeAPQ();
          }
        });
      }
    });
  });

  it(`Count Downtime Filler 1`, () => {
    // check runtime/no runtime
    cy.get('body', timeout).then((body) => {
      if (body.find(':nth-child(1) > .ant-card > .ant-card-body > .qtt-value').length > 0) {
        cy.count_downtime();
      }
    })
  });

  it(`Good-Reject Product Filler 1`, () => {
    // check runtime/no runtime
    cy.get('body', timeout).then((body) => {
      if (body.find(':nth-child(1) > .ant-card > .ant-card-body > .qtt-value').length > 0) {
        cy.totalProduct();
      }
    })
  });

  it(`Normal APQ Filler 2`, () => {
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
            // close
            expect('Filler TREPKO B tidak ada runtime').to.deep.equal('Filler TREPKO B tidak ada runtime')
            cy.get('.ant-row > :nth-child(2)', timeout).eq(0).click();  
            cy.wait(3000);
          }
          // running time
          else {
            cy.select_runtime('Filler TREPKO B')
            cy.wait(7000);
            cy.oeeAPQ();
          }
        });
      }
    });
  });

  it(`Count Downtime Filler 2`, () => {
    // check runtime/no runtime
    cy.get('body', timeout).then((body) => {
      if (body.find(':nth-child(1) > .ant-card > .ant-card-body > .qtt-value').length > 0) {
        cy.count_downtime();
      }
    });
  });

  it(`Good-Reject Product Filler 2`, () => {
    // check runtime/no runtime
    cy.get('body', timeout).then((body) => {
      if (body.find(':nth-child(1) > .ant-card > .ant-card-body > .qtt-value').length > 0) {
        cy.totalProduct();
      }
    });
  });

  it(`Normal APQ Packer 1`, () => {
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
            //close
            expect('Packer HMPS tidak ada runtime').to.deep.equal('Packer HMPS tidak ada runtime')
            cy.get('.ant-row > :nth-child(2)', timeout).eq(0).click();  
            cy.wait(7000);
          }
          // running time
          else {
            // check packer machine
            cy.get('body', timeout).then((body) => {
              if (body.find(':nth-child(1) > [style="margin-left: -4px; margin-right: -4px; row-gap: 8px;"] > :nth-child(3) > .ant-card > .ant-card-body').length > 0) {
                cy.select_runtime('Packer HMPS')
                cy.wait(7000);
                cy.oeeAPQ();
              } else {
                // close
                expect('Packer HMPS tidak ada runtime').to.deep.equal('Packer HMPS tidak ada runtime')
                cy.get('.ant-row > :nth-child(2)', timeout).eq(0).click();  
                cy.wait(7000);
              }
            })
          }
        });
      }
    });
  });

  it(`Count Downtime Packer 1`, () => {
    // check runtime/no runtime
    cy.get('body', timeout).then((body) => {
      if (body.find(':nth-child(1) > .ant-card > .ant-card-body > .qtt-value').length > 0) {
        // check machine name
        cy.get('body').find('.ant-page-header-heading-title').invoke('text').then((text) => {
          if (text == `Operator Produksi ${line7} - Packer HMPS`) {
            cy.count_downtime();
          }
        })
      }
    })
  });

  it(`Good-Reject Product Packer 1`, () => {
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

  it(`Normal APQ Packer 2`, () => {
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
            // close
            expect('Packer CIEME tidak ada runtime').to.deep.equal('Packer CIEME tidak ada runtime')
            cy.get('.ant-row > :nth-child(2)', timeout).eq(0).click();
            cy.wait(7000);
          }
          // running time
          else {
            // check packer machine
            cy.get('body', timeout).then((body) => {
              if (body.find(':nth-child(1) > [style="margin-left: -4px; margin-right: -4px; row-gap: 8px;"] > :nth-child(3) > .ant-card > .ant-card-body').length > 0) {
                cy.select_runtime('Packer CIEME')
                cy.wait(7000);
                cy.oeeAPQ();
              } else {
                // close
                expect('Packer CIEME tidak ada runtime').to.deep.equal('Packer CIEME tidak ada runtime')
                cy.get('.ant-row > :nth-child(2)', timeout).eq(0).click();  
                cy.wait(7000);
              }
            }); 
          }
        });
      }
    });
  });

  it(`Count Downtime Packer 2`, () => {
    // check runtime/no runtime
    cy.get('body', timeout).then((body) => {
      if (body.find(':nth-child(1) > .ant-card > .ant-card-body > .qtt-value').length > 0) {
        // check machine name
        cy.get('body').find('.ant-page-header-heading-title').invoke('text').then((text) => {
          if (text == `Operator Produksi ${line7} - Packer CIEME`) {
            cy.count_downtime();
          }
        });
      }
    });
  });

  it(`Good-Reject Product Packer 2`, () => {
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
