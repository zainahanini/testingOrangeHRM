import LoginPage from "../../support/pages/login-page";

Cypress.on("uncaught:exception", (err) => {
  if (
    err.message.includes("Request failed with status code 500") ||
    err.message.includes("Dt.request") ||
    err.message.includes("chunk-vendors.js")
  ) {
    return false;
  }
});

describe("Recruitment – Candidates Page", () => {
  beforeEach(() => {
    LoginPage.visit();
    LoginPage.isLoaded();

    cy.fixture("users").as("users");
    cy.fixture("candidates-data").as("candidate");
    cy.fixture("interviewData").as("interview");

    cy.get("@users").then((users: any) => {
      cy.login(users.valid.username, users.valid.password);
    });
  });

  it("Add, Shortlist & Interview Candidate", function () {
    cy.get("@candidate").then((candidate: any) => {
      cy.manageCandidate(candidate);
    });

    cy.get("@candidate").then((candidate: any) => {
      cy.get("@interview").then((interview: any) => {
        cy.processInterview(candidate, interview);
      });
    });
  });
});
