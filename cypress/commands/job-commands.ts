import { jobDetailsPage } from "../support/pages/job-details-page";

declare global {
  namespace Cypress {
    interface Chainable {
      assignJobDetails(details: any): Chainable<void>;
      verifyJobDetails(details: any): Chainable<void>;
    }
  }
}

Cypress.Commands.add("assignJobDetails", (details) => {
  jobDetailsPage.navigateToJobTab();
  jobDetailsPage.fillJobDetails(details);
  jobDetailsPage.saveJobDetails();
});

Cypress.Commands.add("verifyJobDetails", (details) => {
  jobDetailsPage.verifyJobDetails(details);
});
