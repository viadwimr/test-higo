const { defineConfig } = require('cypress')
const AllureWriter = require('@shelex/cypress-allure-plugin/writer');

module.exports = defineConfig({
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      AllureWriter(on, config);
      return require('./cypress/plugins/index.js')(on, config);
    },
    baseUrl: 'http://server-denso.tailb26b2.ts.net:8085/',
    // baseUrl: 'http://100.71.187.75:8085/',
    video: true,
    screenshotOnRunFailure: true,
    trashAssetsBeforeRuns: true,
    chromeWebSecurity: false,
    waitForAnimations: true,
    viewportWidth: 1200,
    viewportHeight: 1000,
    waitForAnimations: true,
    projectId: '6jhnka'
  },
})
