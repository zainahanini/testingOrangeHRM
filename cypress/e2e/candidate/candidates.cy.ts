import LoginPage from "../../support/pages/login-page";

beforeEach(() => {
  LoginPage.visit();
  LoginPage.isLoaded();

  cy.fixture("users").as("users");
  cy.fixture("candidateData").as("candidate");
  cy.fixture("interviewData").as("interview");

  cy.get("@users").then((users: any) => {
    cy.login(users.valid.username, users.valid.password);
  });

  cy.navigateToCandidates();
});

describe("Recruitment - Candidates Workflow", () => {
  it("TC19: Add, Search, Shortlist & Interview Candidate", function () {
    cy.get("@candidate").then((candidate: any) => {
      cy.addCandidate(candidate);
    });

    cy.get("@candidate").then((candidate: any) => {
      cy.searchCandidate(candidate.firstName);
      cy.verifyResumeAttached();

      cy.shortlistCandidate("Strong candidate for the role");

      cy.get("@interview").then((interview: any) => {
        cy.scheduleInterview(interview);
      });

      cy.markInterviewPassed();
    });
  });
});
