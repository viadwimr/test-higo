/// <reference types="Cypress" />

const timeout = { timeout: 6000 };
const force = { force: true };

describe('Blog', () => {
  before(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
  });

  beforeEach(() => {
    cy.visit('/');
    cy.wait(3000);
  });

  it('Translate', () => {
    cy.get(':nth-child(7) > :nth-child(2) > .grid', timeout).should('contain','ID');
    cy.get(':nth-child(7) > :nth-child(2) > .grid', timeout).realHover();
    cy.wait(1000);
    cy.contains('English', timeout).should('be.visible');
    cy.wait(1000);
    cy.contains('English', timeout).click();
    cy.wait(3000);
    cy.get(':nth-child(7) > :nth-child(2) > .grid', timeout).should('contain','EN');
    cy.get('.text-lg', timeout).should('not.contain','Artikel Terbaru');
  });

  it('Artikel Terbaru', () => {
    cy.get('.gap-6').find('.line-clamp-2').each(($el, index) => {
      if (index < 4) {
        cy.get('.line-clamp-2').eq(index).invoke('text').then((titleName) => {
          cy.document().then((doc) => {
            doc.body.style.overflow = 'hidden';
          });
          cy.wait(1000);
          cy.get('.line-clamp-2').eq(index).click();
          cy.wait(3000);
          cy.get('body').find('header.grid > .text-xl').invoke('text').then((headerName) => {
            expect(titleName).to.be.equal(headerName);
          });
          cy.visit('/');
        });
      }
    });
  });

  it('Artikel Populer', () => {
    function testIndex(i) {
      if (i >= 19) return;

      if (i >= 4 && i % 2 === 0) {
        cy.get('.line-clamp-2').eq(i).invoke('text').then((titleName) => {
          cy.get('.line-clamp-2').eq(i).click({ force: true });
          cy.wait(1000);

          cy.get('header.grid > .text-xl').invoke('text').then((headerName) => {
            expect(titleName).to.equal(headerName);
          });

          cy.visit('/').then(() => {
            testIndex(i + 1);
          });
        });
      } else {
        testIndex(i + 1);
      }
    }

    cy.visit('/').then(() => {
      testIndex(4);
    });
  });

  it('Search Artikel', () => {
    function klikLebihBanyakSampaiHabis() {
      cy.get('body').then($body => {
        if ($body.find('button:contains("lebih banyak")').length > 0) {
          cy.contains('button', 'lebih banyak').click({ force: true });
          cy.wait(2000);
          klikLebihBanyakSampaiHabis();
        } else {
          cy.log('Semua data telah dimuat');
        }
      });
    }

    cy.get('form.relative > .w-full', { timeout: 10000 }).click();
    cy.wait(1000);
    cy.get('form.relative > .w-full').type('Manfaat{enter}');
    cy.wait(3000);

    cy.get('body').then($body => {
      if ($body.find('.gap-8 > .bg-primary').length > 0) {
        cy.get('.gap-8 > .bg-primary').click({ force: true });
      }
    });

    klikLebihBanyakSampaiHabis();

    cy.get('.grid-flow-row > .text-base', { timeout: 10000 }).each(($el) => {
      cy.wrap($el).invoke('text').then((text) => {
        expect(text.toLowerCase()).to.include('manfaat');
      });
    });
  });

  it('Topik Populer', () => {
    cy.get('.p-3 form > .px-3').then(($items) => {
      const texts = [...$items].map(el => el.innerText.trim().toLowerCase());
      const duplicates = texts.filter((item, index) => texts.indexOf(item) !== index);
      expect(duplicates.length, `Duplikat ditemukan: ${duplicates}`).to.eq(0);
    });
  });

  it('All', () => {
    let listNumberCountTotal = 0;

    cy.task('setValue', { key: 'listNumberCountTotal', value: listNumberCountTotal });

    function doUpdate(updateLoop, maxLoop) {
      if (updateLoop > maxLoop) return;

      cy.wait(3000);
      cy.log(`🔁 Iterasi ke-${updateLoop}`);

      cy.task('getValue', { key: 'listNumberCountTotal' }).then((listNumberCountTotal) => {
        cy.get('.mt-6').find('.grid-cols-r-fill').then((listNumber) => {
          const listNumberCount = listNumber.length - 5;

          listNumberCountTotal = listNumberCount;

          const expected = updateLoop * 4;

          cy.log(`📦 Item tampil: ${listNumberCountTotal}`);
          cy.log(`✅ Expected: ${expected}`);

          expect(listNumberCountTotal).to.equal(expected);
          let listNumberCountTotalAll = listNumberCountTotal 
          cy.task('setValue', { key: 'listNumberCountTotal', value: listNumberCountTotal });
          cy.task('setValue', { key: 'listNumberCountTotalAll', value: listNumberCountTotalAll });

          cy.contains('Tampilkan lebih banyak', timeout).click().then(() => {
            doUpdate(updateLoop + 1, maxLoop);
          });
        });
      });
    }

    doUpdate(1, 100);
  });

  it('Higoes Update', () => {
    cy.get(':nth-child(2) > .line-clamp-1', timeout).click();

    let listNumberCountTotal = 0;

    cy.task('setValue', { key: 'listNumberCountTotal', value: listNumberCountTotal });

    function doUpdate(updateLoop, maxLoop) {
      if (updateLoop > maxLoop) return;

      cy.wait(3000);
      cy.log(`🔁 Iterasi ke-${updateLoop}`);

      cy.task('getValue', { key: 'listNumberCountTotal' }).then((listNumberCountTotal) => {
        cy.get('.mt-6').find('.grid-cols-r-fill').then((listNumber) => {
          const listNumberCount = Cypress.$(listNumber).length - 5;

          listNumberCountTotal = listNumberCount;

          const expected = updateLoop * 4;

          cy.log(`📦 Item tampil: ${listNumberCountTotal}`);
          cy.log(`✅ Expected: ${expected}`);

          expect(listNumberCountTotal).to.equal(expected);

          cy.task('setValue', { key: 'listNumberCountTotal', value: listNumberCountTotal });

          cy.contains('Tampilkan lebih banyak', timeout).click().then(() => {
            doUpdate(updateLoop + 1, maxLoop);
          });
        });
      });
    }

    doUpdate(1, 100);
  });

  it('Hangout', () => {
    cy.get(':nth-child(3) > .line-clamp-1', timeout).click();

    let listNumberCountTotal = 0;

    cy.task('setValue', { key: 'listNumberCountTotal', value: listNumberCountTotal });

    function doUpdate(updateLoop, maxLoop) {
      if (updateLoop > maxLoop) return;

      cy.wait(3000);
      cy.log(`🔁 Iterasi ke-${updateLoop}`);

      cy.task('getValue', { key: 'listNumberCountTotal' }).then((listNumberCountTotal) => {
        cy.get('.mt-6').find('.grid-cols-r-fill').then((listNumber) => {
          const listNumberCount = Cypress.$(listNumber).length - 5;

          listNumberCountTotal = listNumberCount;

          const expected = updateLoop * 4;

          cy.log(`📦 Item tampil: ${listNumberCountTotal}`);
          cy.log(`✅ Expected: ${expected}`);

          expect(listNumberCountTotal).to.equal(expected);

          cy.task('setValue', { key: 'listNumberCountTotal', value: listNumberCountTotal });

          cy.contains('Tampilkan lebih banyak', timeout).click().then(() => {
            doUpdate(updateLoop + 1, maxLoop);
          });
        });
      });
    }

    doUpdate(1, 100);
  });

  it('Lifestyle', () => {
    cy.get(':nth-child(4) > .line-clamp-1', timeout).click();

    let listNumberCountTotal = 0;

    cy.task('setValue', { key: 'listNumberCountTotal', value: listNumberCountTotal });

    function doUpdate(updateLoop, maxLoop) {
      if (updateLoop > maxLoop) return;

      cy.wait(3000);
      cy.log(`🔁 Iterasi ke-${updateLoop}`);

      cy.task('getValue', { key: 'listNumberCountTotal' }).then((listNumberCountTotal) => {
        cy.get('.mt-6').find('.grid-cols-r-fill').then((listNumber) => {
          const listNumberCount = Cypress.$(listNumber).length - 5;

          listNumberCountTotal = listNumberCount;

          const expected = updateLoop * 4;

          cy.log(`📦 Item tampil: ${listNumberCountTotal}`);
          cy.log(`✅ Expected: ${expected}`);

          expect(listNumberCountTotal).to.equal(expected);

          cy.task('setValue', { key: 'listNumberCountTotal', value: listNumberCountTotal });

          cy.contains('Tampilkan lebih banyak', timeout).click().then(() => {
            doUpdate(updateLoop + 1, maxLoop);
          });
        });
      });
    }

    doUpdate(1, 100);
  });

  it('Tech & Social Media', () => {
    cy.get(':nth-child(5) > .line-clamp-1', timeout).click();

    let listNumberCountTotal = 0;

    cy.task('setValue', { key: 'listNumberCountTotal', value: listNumberCountTotal });

    function doUpdate(updateLoop, maxLoop) {
      if (updateLoop > maxLoop) return;

      cy.wait(3000);
      cy.log(`🔁 Iterasi ke-${updateLoop}`);

      cy.task('getValue', { key: 'listNumberCountTotal' }).then((listNumberCountTotal) => {
        cy.get('.mt-6').find('.grid-cols-r-fill').then((listNumber) => {
          const listNumberCount = Cypress.$(listNumber).length - 5;

          listNumberCountTotal = listNumberCount;

          const expected = updateLoop * 4;

          cy.log(`📦 Item tampil: ${listNumberCountTotal}`);
          cy.log(`✅ Expected: ${expected}`);

          expect(listNumberCountTotal).to.equal(expected);

          cy.task('setValue', { key: 'listNumberCountTotal', value: listNumberCountTotal });

          cy.contains('Tampilkan lebih banyak', timeout).click().then(() => {
            doUpdate(updateLoop + 1, maxLoop);
          });
        });
      });
    }

    doUpdate(1, 100);
  });

  it('Business Trip', () => {
    cy.get(':nth-child(6) > .line-clamp-1', timeout).click();

    let listNumberCountTotal = 0;

    cy.task('setValue', { key: 'listNumberCountTotal', value: listNumberCountTotal });

    function doUpdate(updateLoop, maxLoop) {
      if (updateLoop > maxLoop) return;

      cy.wait(3000);
      cy.log(`🔁 Iterasi ke-${updateLoop}`);

      cy.task('getValue', { key: 'listNumberCountTotal' }).then((listNumberCountTotal) => {
        cy.get('.mt-6').find('.grid-cols-r-fill').then((listNumber) => {
          const listNumberCount = Cypress.$(listNumber).length - 5;

          listNumberCountTotal = listNumberCount;

          const expected = updateLoop * 4;

          cy.log(`📦 Item tampil: ${listNumberCountTotal}`);
          cy.log(`✅ Expected: ${expected}`);

          expect(listNumberCountTotal).to.equal(expected);

          cy.task('setValue', { key: 'listNumberCountTotal', value: listNumberCountTotal });

          cy.contains('Tampilkan lebih banyak', timeout).click().then(() => {
            doUpdate(updateLoop + 1, maxLoop);
          });
        });
      });
    }

    doUpdate(1, 100);
  });
});
