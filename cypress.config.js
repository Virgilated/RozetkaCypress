const { defineConfig } = require('cypress');

module.exports = defineConfig({
   reporter: `cypress-mochawesome-reporter`,
   reporterOptions: {
      embeddedScreenshots: true,
      inlineAssets: true,
      autoOpen: true,
      videoOnFailOnly: true,
   },
   e2e: {
      setupNodeEvents(on, config) {
         require(`cypress-mochawesome-reporter/plugin`)(on);
         // implement node event listeners here
      },
      baseUrl: `https://rozetka.com.ua/ua`,
      viewportHeight: 1080,
      viewportWidth: 1920,
      testIsolation: false,
      defaultCommandTimeout: 20000,
      userAgent: `
Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36`,
   },
});
