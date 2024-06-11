const { defineConfig } = require('cypress');

module.exports = defineConfig({
    e2e: {
        baseUrl: 'http://qamid.tmweb.ru',
        projectId: 'i1hobb',
        setupNodeEvents(on, config) {
            // implement node event listeners here
        }
    }
});
