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

  it('Check Zero Value Filler Line 1', () => {
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
            
            // check availability
            cy.get('body').find('[data-testid="percent-AVA"]').invoke('text').then((text) => {
              const valueAVA = parseInt(text.replace('%',''))
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
                  expect(parseInt(text.replace('%','').replace('.',''))).to.be.within(1,110)
                });
                // check total product
                cy.get('body').find(':nth-child(1) > .ant-card > .ant-card-body > .qtt-value')
                  .invoke('text').then((text) => {
                    expect(parseInt(text.replace('%',''))).to.be.greaterThan(0)
                });
              }
            });
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
        
        // check availability
        cy.get('body').find('[data-testid="percent-AVA"]').invoke('text').then((text) => {
          const valueAVA = parseInt(text.replace('%',''))
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
              expect(parseInt(text.replace('%','').replace('.',''))).to.be.within(1,110)
            });
            // check total product
            cy.get('body').find(':nth-child(1) > .ant-card > .ant-card-body > .qtt-value')
              .invoke('text').then((text) => {
                expect(parseInt(text.replace('%',''))).to.be.greaterThan(0)
            });
          }
        });
      }
    });
  });

  it(`Check Good Value Filler Line 1${noRuntime}`, () => {
    // check runtime/no runtime
    cy.get('body', timeout).then((body) => {
      if (body.find(':nth-child(1) > .ant-card > .ant-card-body > .qtt-value').length > 0) {
        // check total Product
        cy.get('body').find(':nth-child(1) > .ant-card > .ant-card-body > .qtt-value')
          .invoke('text').then((text) => {
            const valueProduct = parseInt(text.replace('%',''))
            if (valueProduct == 0) {
              // check good product
              cy.get('body').find(':nth-child(2) > .ant-card > .ant-card-body > .qtt-value')
                .invoke('text').then((text) => {
                  expect(parseInt(text.replace('%',''))).to.be.equal(0)
              });
            } else {
            // get reject product
            cy.get('body').find(':nth-child(3) > .ant-card > .ant-card-body > .qtt-value')
              .invoke('text').then((text) => {
                const valueReject = parseInt(text.replace('%','').replace('.',''))
                // check good product
                cy.get('body').find(':nth-child(2) > .ant-card > .ant-card-body > .qtt-value')
                  .invoke('text').then((text) => {
                    expect(parseInt(text.replace('%','').replace('.',''))).to.be.greaterThan(valueReject)
                });
            });
            }
        });
      }
    });
  });

  it(`Check Zero Value Packer Line 1${noRuntime}`, () => {
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
          // check availability
          cy.get('body').find('[data-testid="percent-AVA"]').invoke('text').then((text) => {
            const valueAVA = parseInt(text.replace('%',''))
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
                expect(parseInt(text.replace('%','').replace('.',''))).to.be.within(1,110)
              });
              // check total product
              cy.get('body').find(':nth-child(1) > .ant-card > .ant-card-body > .qtt-value')
                .invoke('text').then((text) => {
                  expect(parseInt(text.replace('%',''))).to.be.greaterThan(0)
              });
            }
          });
        });
      }
    });
  });

  it(`Check Good Value Packer Line 1${noRuntime}`, () => {
    // check runtime/no runtime
    cy.get('body', timeout).then((body) => {
      if (body.find('div[style=""] > div > .ant-btn').length > 0) {
        // check total Product
        cy.get('body').find(':nth-child(1) > .ant-card > .ant-card-body > .qtt-value')
        .invoke('text').then((text) => {
          const valueProduct = parseInt(text.replace('%',''))
          if (valueProduct == 0) {
            // check good product
            cy.get('body').find(':nth-child(2) > .ant-card > .ant-card-body > .qtt-value')
              .invoke('text').then((text) => {
                expect(parseInt(text.replace('%',''))).to.be.equal(0)
            });
          } else {
            // get reject product
            cy.get('body').find(':nth-child(3) > .ant-card > .ant-card-body > .qtt-value')
              .invoke('text').then((text) => {
                const valueReject = parseInt(text.replace('%','').replace('.',''))
                // check good product
                cy.get('body').find(':nth-child(2) > .ant-card > .ant-card-body > .qtt-value')
                  .invoke('text').then((text) => {
                    expect(parseInt(text.replace('%','').replace('.',''))).to.be.greaterThan(valueReject)
                });
            });
          }
        });
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

  it('Check Zero Value Filler Line 2', () => {
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
    
            // check availability
            cy.get('body').find('[data-testid="percent-AVA"]').invoke('text').then((text) => {
              const valueAVA = parseInt(text.replace('%',''))
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
                  expect(parseInt(text.replace('%','').replace('.',''))).to.be.within(1,110)
                });
                // check total product
                cy.get('body').find(':nth-child(1) > .ant-card > .ant-card-body > .qtt-value')
                  .invoke('text').then((text) => {
                    expect(parseInt(text.replace('%',''))).to.be.greaterThan(0)
                });
              }
            });
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
        // check availability
        cy.get('body').find('[data-testid="percent-AVA"]').invoke('text').then((text) => {
          const valueAVA = parseInt(text.replace('%',''))
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
              expect(parseInt(text.replace('%','').replace('.',''))).to.be.within(1,110)
            });
            // check total product
            cy.get('body').find(':nth-child(1) > .ant-card > .ant-card-body > .qtt-value')
              .invoke('text').then((text) => {
                expect(parseInt(text.replace('%',''))).to.be.greaterThan(0)
            });
          }
        });
      }
    });
  });

  it(`Check Good Value Filler Line 2${noRuntime}`, () => {
    // check runtime/no runtime
    cy.get('body', timeout).then((body) => {
      if (body.find(':nth-child(1) > .ant-card > .ant-card-body > .qtt-value').length > 0) {
        // check total Product
        cy.get('body').find(':nth-child(1) > .ant-card > .ant-card-body > .qtt-value')
        .invoke('text').then((text) => {
          const valueProduct = parseInt(text.replace('%',''))
          if (valueProduct == 0) {
            // check good product
            cy.get('body').find(':nth-child(2) > .ant-card > .ant-card-body > .qtt-value')
              .invoke('text').then((text) => {
                expect(parseInt(text.replace('%',''))).to.be.equal(0)
            });
          } else {
            // get reject product
            cy.get('body').find(':nth-child(3) > .ant-card > .ant-card-body > .qtt-value')
              .invoke('text').then((text) => {
                const valueReject = parseInt(text.replace('%','').replace('.',''))
                // check good product
                cy.get('body').find(':nth-child(2) > .ant-card > .ant-card-body > .qtt-value')
                  .invoke('text').then((text) => {
                    expect(parseInt(text.replace('%','').replace('.',''))).to.be.greaterThan(valueReject)
                });
            });
          }
        });
      }
    })
  });

  it(`Check Zero Value Packer Line 2${noRuntime}`, () => {
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
          // check availability
          cy.get('body').find('[data-testid="percent-AVA"]').invoke('text').then((text) => {
            const valueAVA = parseInt(text.replace('%',''))
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
                expect(parseInt(text.replace('%','').replace('.',''))).to.be.within(1,110)
              });
              // check total product
              cy.get('body').find(':nth-child(1) > .ant-card > .ant-card-body > .qtt-value')
                .invoke('text').then((text) => {
                  expect(parseInt(text.replace('%',''))).to.be.greaterThan(0)
              });
            }
          });
        });
      }
    });
  });

  it(`Check Good Value Packer Line 2${noRuntime}`, () => {
    // check runtime/no runtime
    cy.get('body', timeout).then((body) => {
      if (body.find(':nth-child(1) > .ant-card > .ant-card-body > .qtt-value').length > 0) {
        // check total Product
        cy.get('body').find(':nth-child(1) > .ant-card > .ant-card-body > .qtt-value')
        .invoke('text').then((text) => {
          const valueProduct = parseInt(text.replace('%',''))
          if (valueProduct == 0) {
            // check good product
            cy.get('body').find(':nth-child(2) > .ant-card > .ant-card-body > .qtt-value')
              .invoke('text').then((text) => {
                expect(parseInt(text.replace('%',''))).to.be.equal(0)
            });
          } else {
            // get reject product
            cy.get('body').find(':nth-child(3) > .ant-card > .ant-card-body > .qtt-value')
              .invoke('text').then((text) => {
                const valueReject = parseInt(text.replace('%','').replace('.',''))
                // check good product
                cy.get('body').find(':nth-child(2) > .ant-card > .ant-card-body > .qtt-value')
                  .invoke('text').then((text) => {
                    expect(parseInt(text.replace('%','').replace('.',''))).to.be.greaterThan(valueReject)
                });
            });

          }
        });
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

  it('Check Zero Value Filler 1 Line 7', () => {
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
    
            // check availability
            cy.get('body').find('[data-testid="percent-AVA"]').invoke('text').then((text) => {
              const valueAVA = parseInt(text.replace('%',''))
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
                  expect(parseInt(text.replace('%','').replace('.',''))).to.be.within(1,110)
                });
                // check total product
                cy.get('body').find(':nth-child(1) > .ant-card > .ant-card-body > .qtt-value')
                  .invoke('text').then((text) => {
                    expect(parseInt(text.replace('%',''))).to.be.greaterThan(0)
                });
              }
            });
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
        // check availability
        cy.get('body').find('[data-testid="percent-AVA"]').invoke('text').then((text) => {
          const valueAVA = parseInt(text.replace('%',''))
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
              expect(parseInt(text.replace('%','').replace('.',''))).to.be.within(1,110)
            });
            // check total product
            cy.get('body').find(':nth-child(1) > .ant-card > .ant-card-body > .qtt-value')
              .invoke('text').then((text) => {
                expect(parseInt(text.replace('%',''))).to.be.greaterThan(0)
            });
          }
        });
      }
    });
  });

  it(`Check Good Value Filler 1 Line 7${noRuntime}`, () => {
    // check runtime/no runtime
    cy.get('body', timeout).then((body) => {
      if (body.find(':nth-child(1) > .ant-card > .ant-card-body > .qtt-value').length > 0) {
        // check total Product
        cy.get('body').find(':nth-child(1) > .ant-card > .ant-card-body > .qtt-value')
        .invoke('text').then((text) => {
          const valueProduct = parseInt(text.replace('%',''))
          if (valueProduct == 0) {
            // check good product
            cy.get('body').find(':nth-child(2) > .ant-card > .ant-card-body > .qtt-value')
              .invoke('text').then((text) => {
                expect(parseInt(text.replace('%',''))).to.be.equal(0)
            });
          } else {
            // get reject product
            cy.get('body').find(':nth-child(3) > .ant-card > .ant-card-body > .qtt-value')
              .invoke('text').then((text) => {
                const valueReject = parseInt(text.replace('%','').replace('.',''))
                // check good product
                cy.get('body').find(':nth-child(2) > .ant-card > .ant-card-body > .qtt-value')
                  .invoke('text').then((text) => {
                    expect(parseInt(text.replace('%','').replace('.',''))).to.be.greaterThan(valueReject)
                });
            });
          }
        });
      }
    })
  });

  it(`Check Zero Value Filler 2 Line 7${noRuntime}`, () => {
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
          // check availability
          cy.get('body').find('[data-testid="percent-AVA"]').invoke('text').then((text) => {
            const valueAVA = parseInt(text.replace('%',''))
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
                expect(parseInt(text.replace('%','').replace('.',''))).to.be.within(1,110)
              });
              // check total product
              cy.get('body').find(':nth-child(1) > .ant-card > .ant-card-body > .qtt-value')
                .invoke('text').then((text) => {
                  expect(parseInt(text.replace('%',''))).to.be.greaterThan(0)
              });
            }
          });
        });
      }
    });
  });

  it(`Check Good Value Filler 2 Line 7${noRuntime}`, () => {
    // check runtime/no runtime
    cy.get('body', timeout).then((body) => {
      if (body.find(':nth-child(1) > .ant-card > .ant-card-body > .qtt-value').length > 0) {
        // check total Product
        cy.get('body').find(':nth-child(1) > .ant-card > .ant-card-body > .qtt-value')
        .invoke('text').then((text) => {
          const valueProduct = parseInt(text.replace('%',''))
          if (valueProduct == 0) {
            // check good product
            cy.get('body').find(':nth-child(2) > .ant-card > .ant-card-body > .qtt-value')
              .invoke('text').then((text) => {
                expect(parseInt(text.replace('%',''))).to.be.equal(0)
            });
          } else {
            // get reject product
            cy.get('body').find(':nth-child(3) > .ant-card > .ant-card-body > .qtt-value')
              .invoke('text').then((text) => {
                const valueReject = parseInt(text.replace('%','').replace('.',''))
                // check good product
                cy.get('body').find(':nth-child(2) > .ant-card > .ant-card-body > .qtt-value')
                  .invoke('text').then((text) => {
                    expect(parseInt(text.replace('%','').replace('.',''))).to.be.greaterThan(valueReject)
                });
            });
          }
        });
      }
    });
  });

  it(`Check Zero Value Packer 1 Line 7${noRuntime}`, () => {
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
              .contains('Packer HMPS').click();
            cy.get('.swal2-confirm', timeout).click();
          }
          // running time
          else {
            // select runtime
            cy.get('.ant-layout-content > :nth-child(1) > :nth-child(2) > :nth-child(1)', timeout)
              .contains('Packer HMPS').click();
          }
          cy.get('body', timeout).then((body) => {
            if (body.find('.swal2-confirm').length > 0) {
              cy.get('.swal2-confirm', timeout).click();
            }
          });
          cy.wait(7000);
          // check availability
          cy.get('body').find('[data-testid="percent-AVA"]').invoke('text').then((text) => {
            const valueAVA = parseInt(text.replace('%',''))
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
                expect(parseInt(text.replace('%','').replace('.',''))).to.be.within(1,110)
              });
              // check total product
              cy.get('body').find(':nth-child(1) > .ant-card > .ant-card-body > .qtt-value')
                .invoke('text').then((text) => {
                  expect(parseInt(text.replace('%',''))).to.be.greaterThan(0)
              });
            }
          });
        });
      }
    });
  });

  it(`Check Good Value Packer 1 Line 7${noRuntime}`, () => {
    // check runtime/no runtime
    cy.get('body', timeout).then((body) => {
      if (body.find(':nth-child(1) > .ant-card > .ant-card-body > .qtt-value').length > 0) {
        // check total Product
        cy.get('body').find(':nth-child(1) > .ant-card > .ant-card-body > .qtt-value')
        .invoke('text').then((text) => {
          const valueProduct = parseInt(text.replace('%',''))
          if (valueProduct == 0) {
            // check good product
            cy.get('body').find(':nth-child(2) > .ant-card > .ant-card-body > .qtt-value')
              .invoke('text').then((text) => {
                expect(parseInt(text.replace('%',''))).to.be.equal(0)
            });
          } else {
            // get reject product
            cy.get('body').find(':nth-child(3) > .ant-card > .ant-card-body > .qtt-value')
              .invoke('text').then((text) => {
                const valueReject = parseInt(text.replace('%','').replace('.',''))
                // check good product
                cy.get('body').find(':nth-child(2) > .ant-card > .ant-card-body > .qtt-value')
                  .invoke('text').then((text) => {
                    expect(parseInt(text.replace('%','').replace('.',''))).to.be.greaterThan(valueReject)
                });
            });
          }
        });
      }
    })
  });

  it(`Check Zero Value Packer 2 Line 7${noRuntime}`, () => {
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
              .contains('Packer CIEME').click();
            cy.get('.swal2-confirm', timeout).click();
          }
          // running time
          else {
            // select runtime
            cy.get(':nth-child(1) > .ant-row > .ant-col > .ant-card > .ant-card-body', timeout)
              .contains('Packer CIEME').click();
          }
          cy.get('body', timeout).then((body) => {
            if (body.find('.swal2-confirm').length > 0) {
              cy.get('.swal2-confirm', timeout).click();
            }
          });
          cy.wait(7000);
          // check availability
          cy.get('body').find('[data-testid="percent-AVA"]').invoke('text').then((text) => {
            const valueAVA = parseInt(text.replace('%',''))
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
                expect(parseInt(text.replace('%','').replace('.',''))).to.be.within(1,110)
              });
              // check total product
              cy.get('body').find(':nth-child(1) > .ant-card > .ant-card-body > .qtt-value')
                .invoke('text').then((text) => {
                  expect(parseInt(text.replace('%',''))).to.be.greaterThan(0)
              });
            }
          });
        });
      }
    });
  });

  it(`Check Good Value Packer 2 Line 7${noRuntime}`, () => {
    // check runtime/no runtime
    cy.get('body', timeout).then((body) => {
      if (body.find(':nth-child(1) > .ant-card > .ant-card-body > .qtt-value').length > 0) {
        // check total Product
        cy.get('body').find(':nth-child(1) > .ant-card > .ant-card-body > .qtt-value')
        .invoke('text').then((text) => {
          const valueProduct = parseInt(text.replace('%',''))
          if (valueProduct == 0) {
            // check good product
            cy.get('body').find(':nth-child(2) > .ant-card > .ant-card-body > .qtt-value')
              .invoke('text').then((text) => {
                expect(parseInt(text.replace('%',''))).to.be.equal(0)
            });
          } else {
            // get reject product
            cy.get('body').find(':nth-child(3) > .ant-card > .ant-card-body > .qtt-value')
              .invoke('text').then((text) => {
                const valueReject = parseInt(text.replace('%','').replace('.',''))
                // check good product
                cy.get('body').find(':nth-child(2) > .ant-card > .ant-card-body > .qtt-value')
                  .invoke('text').then((text) => {
                    expect(parseInt(text.replace('%','').replace('.',''))).to.be.greaterThan(valueReject)
                });
            });
          }
        });
      }
    });
  });
});