const LOCATORS = {
  FIRST_NAME: 'input[name="firstName"]',
  MIDDLE_NAME: 'input[name="middleName"]',
  LAST_NAME: 'input[name="lastName"]',
  EMAIL: 'input[name="email"]',
  CONTACT_NUMBER: 'input[name="contactNumber"]',
  KEYWORDS: 'input[name="keywords"]',
  VACANCY_DROPDOWN: ".oxd-select-text--after",
  VACANCY_OPTIONS: ".oxd-select-dropdown",
  UPLOAD_FILE: 'input[type="file"]',
  SUBMIT_BUTTON: 'button[type="submit"]',
  BUTTON: "button",
  CANDIDATE_NAME_INPUT: 'input[placeholder="Type for hints..."]',
  CANDIDATE_NAME_DROPDOWN: ".oxd-autocomplete-dropdown",
  LIST_ROW: '[role="row"]',
  NOTE: 'textarea[placeholder="Type here"].oxd-textarea',
  INTERVIEW_TITLE:
    'input.oxd-input.oxd-input--active:not([readonly]):not([placeholder="Search"])',
  DATE: 'input[placeholder="yyyy-dd-mm"]',
  TIME: 'input[placeholder="hh:mm"]',
  INTERVIEWER_NAME_INPUT: 'input[placeholder="Type for hints..."]',
  INTERVIEWER_NAME_DROPDOWN: ".oxd-autocomplete-option",
  DOWNLOAD_BUTTON: ".oxd-icon.bi-download",
};

class CandidatesPage {
  navigateToCandidates() {
    cy.get("nav").contains("Recruitment").click();
    cy.get("a").contains("Candidates").should("be.visible").click();
  }

  addCandidate(candidate: {
    firstName: string;
    middleName?: string;
    lastName: string;
    email: string;
    contactNumber?: string;
    keywords?: string;
    resumePath: string;
    vacancy: string;
  }) {
    cy.contains(LOCATORS.BUTTON, "Add", { timeout: 10000 }).eq(0).click();
    cy.get(LOCATORS.FIRST_NAME).eq(0).type(candidate.firstName);
    if (candidate.middleName) cy.get(LOCATORS.MIDDLE_NAME).eq(0).type(candidate.middleName);
    cy.get(LOCATORS.LAST_NAME).eq(0).type(candidate.lastName);
    cy.get(LOCATORS.EMAIL).eq(0).type(candidate.email);
    if (candidate.contactNumber) cy.get(LOCATORS.CONTACT_NUMBER).eq(0).type(candidate.contactNumber);
    if (candidate.keywords) cy.get(LOCATORS.KEYWORDS).eq(0).type(candidate.keywords);
    cy.get(LOCATORS.VACANCY_DROPDOWN).eq(0).click();
    cy.get(LOCATORS.VACANCY_OPTIONS).contains(candidate.vacancy).click();
    cy.get(LOCATORS.UPLOAD_FILE).eq(0).attachFile(candidate.resumePath);
    cy.get(LOCATORS.SUBMIT_BUTTON).eq(0).click();
  }

  searchCandidate(nameOrEmail: string) {
    cy.get(LOCATORS.CANDIDATE_NAME_INPUT).eq(0).clear().type(nameOrEmail, { force: true });
    cy.get(LOCATORS.CANDIDATE_NAME_DROPDOWN)
      .contains(nameOrEmail, { timeout: 10000 })
      .eq(0)
      .click({ force: true });
  }

  shortlistCandidate(comment: string) {
    cy.get(LOCATORS.LIST_ROW).eq(0).within(() => {
      cy.contains(LOCATORS.BUTTON, "Shortlist", { timeout: 10000 }).eq(0).click({ force: true });
    });
    cy.get(LOCATORS.NOTE).eq(0).type(comment);
    cy.get(LOCATORS.SUBMIT_BUTTON).eq(0).click();
  }

  scheduleInterview(interview: {
    title: string;
    date: string;
    time: string;
    interviewer: string;
  }) {
    cy.get(LOCATORS.LIST_ROW).eq(0).within(() => {
      cy.contains(LOCATORS.BUTTON, "Schedule Interview", { timeout: 10000 }).eq(0).click({ force: true });
    });
    cy.get(LOCATORS.INTERVIEW_TITLE).eq(0).type(interview.title);
    cy.get(LOCATORS.DATE).eq(0).type(interview.date);
    cy.get(LOCATORS.TIME).eq(0).type(interview.time);
    cy.get(LOCATORS.INTERVIEWER_NAME_INPUT).eq(0).type(interview.interviewer);
    cy.get(LOCATORS.INTERVIEWER_NAME_DROPDOWN).contains(interview.interviewer).eq(0).click();
    cy.get(LOCATORS.SUBMIT_BUTTON).eq(0).click();
  }

  markInterviewPassed() {
    cy.get(LOCATORS.LIST_ROW).eq(0).within(() => {
      cy.contains(LOCATORS.BUTTON, "Mark as Passed", { timeout: 10000 }).eq(0).click({ force: true });
    });
  }

  verifyResumeAttached() {
    cy.get(LOCATORS.LIST_ROW).eq(0).find(LOCATORS.DOWNLOAD_BUTTON).should("exist");
  }
}

export const candidatesPage = new CandidatesPage();
