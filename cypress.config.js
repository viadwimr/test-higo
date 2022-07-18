const { defineConfig } = require('cypress')

module.exports = defineConfig({
  video: false,
  viewportWidth: 1500,
  viewportHeight: 1000,
  pageLoadTimeout: 60000,
  chromeWebSecurity: false,
  reporter: 'mochawesome',
  waitForAnimations: true,
  retries: 2,
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      return require('./cypress/plugins/index.js')(on, config)
    },
    baseUrl: 'http://10.50.15.25:8003',
  },
})
