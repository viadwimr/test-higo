const { defineConfig } = require("cypress");
const AllureWriter = require('@shelex/cypress-allure-plugin/writer')
/*
module.exports = defineConfig({
  projectId: '6mw663',
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    charts: true,
    reportPageTitle: 'Prochiz',
    reportFilename: '[status]_[datetime]-[name]-report',
    timestamp: 'default',
    embeddedScreenshots: true,
    inlineAssets: true,
    overwrite: false,
    saveAllAttempts: true
  },
  e2e: {
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
    },
    baseUrl: 'http://10.50.15.25:8003/',
    // baseUrl: 'https://dev-hmi.evomo.id/',
    video: false,
    screenshotOnRunFailure: true,
    trashAssetsBeforeRuns: false,
    defaultCommandTimeout: 10000
  }
});
*/
module.exports = defineConfig({
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      AllureWriter(on, config);
      return require('./cypress/plugins/index.js')(on, config);
    },
    baseUrl: 'http://10.50.15.25:8003/',
    video: true,
    screenshotOnRunFailure: true,
    trashAssetsBeforeRuns: true,
    chromeWebSecurity: false,
    waitForAnimations: true,
    retries: 0,
    defaultCommandTimeout: 10000,
    viewportWidth: 1500,
    viewportHeight: 1000,
    pageLoadTimeout: 60000
  },
  env: {
    oprprd1: 'OPR PRD 1',
    oprprd2: 'OPR PRD 2',
    oprprd3: 'OPR PRD 3',
    oprprd4: 'OPR PRD 4',
    oprprd5: 'OPR PRD 5',
    oprprd6: 'OPR PRD 6',
    oprprd7: 'OPR PRD 7',
    oprprd8: 'OPR PRD 8',
    oprprd9: 'OPR PRD 9',
    spvprd1: 'SPV PRD 1',
    password: 'password',
    staging: 'gf_packaging_a1',
    staging_pass: 'password'
  }
})

