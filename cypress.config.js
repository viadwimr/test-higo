const { defineConfig } = require('Cypress')
const AllureWriter = require('@shelex/cypress-allure-plugin/writer');

module.exports = defineConfig({
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      AllureWriter(on, config);
      return require('./cypress/plugins/index.js')(on, config);
    },
    baseUrl: 'https://blog.higo.id/',
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
