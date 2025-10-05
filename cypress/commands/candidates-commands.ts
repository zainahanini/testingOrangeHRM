import { candidatesPage } from "../support/pages/candidates-page";

declare global {
  namespace Cypress {
    interface Chainable {
      manageCandidate(candidate: any): Chainable<void>;
      processInterview(candidate: any, interview: any): Chainable<void>;
    }
  }
}

Cypress.Commands.add("manageCandidate", (candidate) => {
  candidatesPage.visitCandidatesPage();
  candidatesPage.clickAddButton();
  candidatesPage.fillCandidateDetails(candidate);
  candidatesPage.uploadResume(candidate.resumePath);
  candidatesPage.saveCandidate();
});

Cypress.Commands.add("processInterview", (candidate, interview) => {
  candidatesPage.openRecruitment();
  candidatesPage.searchCandidate(candidate.firstName);
  candidatesPage.verifyCandidateInList(candidate.firstName);
  candidatesPage.openCandidate();
  candidatesPage.shortlistCandidate("Strong candidate");
  candidatesPage.scheduleInterview(interview);
  candidatesPage.markInterviewPassed();
  candidatesPage.verifyResumeAttachment();
});
