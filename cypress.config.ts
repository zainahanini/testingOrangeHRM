import { defineConfig } from "cypress";
import { configureAllureAdapterPlugins } from "@mmisty/cypress-allure-adapter/plugins";

export default defineConfig({
  e2e: {
    baseUrl: "https://opensource-demo.orangehrmlive.com",

    setupNodeEvents(on, config) {
      configureAllureAdapterPlugins(on, config);
      return config;
    },
  },

  env: {
    allure: true,
    allureResults: "allure-results",
  },
});
