import { jobDetailsPage } from "../support/pages/job-details-page";

declare global {
  namespace Cypress {
    interface Chainable {
      assignJobDetails(details: any): Chainable<void>;
      verifyJobDetails(details: any): Chainable<void>;
      openEmployeeProfile(employeeName: string): Chainable<void>;
    }
  }
}

Cypress.Commands.add("openEmployeeProfile", (employeeName: string) => {
  jobDetailsPage.openEmployeeProfile(employeeName);
});

Cypress.Commands.add("assignJobDetails", (details: any) => {
  jobDetailsPage.navigateToJobTab();
  jobDetailsPage.fillJobDetails(details);
  jobDetailsPage.saveJobDetails();
});

Cypress.Commands.add("verifyJobDetails", (details: any) => {
  jobDetailsPage.verifyJobDetails(details);
});
