import { candidatesPage } from "../support/pages/candidates-page";

declare global {
    namespace Cypress {
        interface Chainable {
            navigateToCandidates(): Chainable<void>;
            addCandidate(candidate: any): Chainable<void>;
            searchCandidate(nameOrEmail: string): Chainable<void>;
            shortlistCandidate(comment: string): Chainable<void>;
            scheduleInterview(interview: any): Chainable<void>;
            markInterviewPassed(): Chainable<void>;
            verifyResumeAttached(): Chainable<void>;
        }
    }
}

Cypress.Commands.add("navigateToCandidates", () => candidatesPage.navigateToCandidates());
Cypress.Commands.add("addCandidate", (candidate) => candidatesPage.addCandidate(candidate));
Cypress.Commands.add("searchCandidate", (nameOrEmail) => candidatesPage.searchCandidate(nameOrEmail));
Cypress.Commands.add("shortlistCandidate", (comment) => candidatesPage.shortlistCandidate(comment));
Cypress.Commands.add("scheduleInterview", (interview) => candidatesPage.scheduleInterview(interview));
Cypress.Commands.add("markInterviewPassed", () => candidatesPage.markInterviewPassed());
Cypress.Commands.add("verifyResumeAttached", () => candidatesPage.verifyResumeAttached());