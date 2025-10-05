import LoginPage from "../../support/pages/login-page";
import { jobDetailsPage } from "../../support/pages/job-details-page";

beforeEach(() => {
  LoginPage.visit();
  LoginPage.isLoaded();

  cy.fixture("users").as("users");
  cy.fixture("jobDetails").as("job");

  cy.get("@users").then((users: any) => {
    cy.login(users.valid.username, users.valid.password);
  });
});

describe("Employee - Assign Job Details", () => {
  it("TC20: Assign Job Details and verify in Employee List", function () {
    cy.get("@job").then((job: any) => {
      jobDetailsPage.openEmployeeProfile(job.employeeName);
      jobDetailsPage.navigateToJobTab();
      jobDetailsPage.fillJobDetails(job);
      jobDetailsPage.saveJobDetails();
      jobDetailsPage.verifyJobDetails(job);
    });
  });
});
