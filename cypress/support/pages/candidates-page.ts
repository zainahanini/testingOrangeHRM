import { RECRUITMENT_BUTTONS } from "../enums/candidates-enums";

const LOCATORS = {
  DROPDOWN: ".oxd-select-text--after",
  DROPDOWN_INPUT: ".oxd-select-text-input",
  DROPDOWN_OPTION: ".oxd-select-dropdown",
  UPLOAD_FILE: 'input[type="file"]',
  UPLOAD_FILE_BUTTON: ".oxd-file-button",
  FIRST_NAME: 'input[name="firstName"]',
  MIDDLE_NAME: 'input[name="middleName"]',
  LAST_NAME: 'input[name="lastName"]',
  CANDIDATE_NAME_INPUT: 'input[placeholder="Type for hints..."]',
  CANDIDATE_NAME_DROPDOWN: ".oxd-autocomplete-dropdown",
  INTERVIEWER_NAME_INPUT: 'input[placeholder="Type for hints..."]',
  INTERVIEWER_NAME_DROPDOWN: ".oxd-autocomplete-option",
  NOTE: 'textarea[placeholder="Type here"].oxd-textarea',
  DOWNLOAD_BUTTON: ".oxd-icon.bi-download",
  EMAIL: 'input[placeholder="Type here"].oxd-input--active',
  CONTACT_NUMBER: 'input[placeholder="Type here"].oxd-input--active',
  KEYWORDS: 'input[placeholder="Enter comma seperated words..."]',
  SUBMIT_BUTTON: 'button[type="submit"]',
  BUTTON_BUTTON: 'button[type="button"]',
  INTERVIEW_TITLE:
    'input.oxd-input.oxd-input--active:not([readonly]):not([placeholder="Search"])',
  DATE: 'input[placeholder="yyyy-dd-mm"]',
  TIME: 'input[placeholder="hh:mm"]',
  LIST_ROW: ".oxd-table-card",
  EYE_BUTTON: ".oxd-icon.bi-eye-fill",
};

class CandidatesPage {
  visitCandidatesPage() {
    cy.get("a").contains("Recruitment").click();
    cy.contains("Candidates").click();
  }

  clickAddButton() {
    cy.get("button").contains(RECRUITMENT_BUTTONS.ADD).click();
  }

  fillCandidateDetails(candidate: any) {
    cy.get(LOCATORS.FIRST_NAME).type(candidate.firstName);
    if (candidate.middleName) cy.get(LOCATORS.MIDDLE_NAME).type(candidate.middleName);
    cy.get(LOCATORS.LAST_NAME).type(candidate.lastName);

    cy.get(LOCATORS.EMAIL)
      .should("have.length.at.least", 1)
      .eq(0)
      .type(candidate.email, { force: true });

    cy.get(LOCATORS.CONTACT_NUMBER).last().type(candidate.contactNumber, { force: true });


    if (candidate.keywords) cy.get(LOCATORS.KEYWORDS).type(candidate.keywords);

    cy.get(LOCATORS.DROPDOWN).first().click();
    cy.get(LOCATORS.DROPDOWN_OPTION).contains(candidate.vacancy).click();
  }


  uploadResume(filePath: string) {
    cy.get(LOCATORS.UPLOAD_FILE_BUTTON).click();
    cy.get(LOCATORS.UPLOAD_FILE).selectFile(filePath, { force: true });
  }

  saveCandidate() {
    cy.get(LOCATORS.SUBMIT_BUTTON).contains(RECRUITMENT_BUTTONS.SAVE).click();
    cy.contains("Successfully Saved").should("be.visible");
  }

  searchCandidate(name: string) {
    cy.get(LOCATORS.CANDIDATE_NAME_INPUT).type(name);
    cy.get(LOCATORS.CANDIDATE_NAME_DROPDOWN).contains(name).click({ force: true });
  }

  verifyCandidateInList(name: string) {
    cy.get(LOCATORS.LIST_ROW).should("contain", name).and("be.visible");
  }

  openCandidate() {
    cy.get(LOCATORS.LIST_ROW).first().find(LOCATORS.EYE_BUTTON).click();
  }

  shortlistCandidate(note: string) {
    cy.get(LOCATORS.BUTTON_BUTTON)
      .contains(RECRUITMENT_BUTTONS.SHORTLIST)
      .click();
    cy.get(LOCATORS.NOTE).type(note);
    cy.get(LOCATORS.SUBMIT_BUTTON).click();
    cy.contains("Successfully Updated").should("be.visible");
  }

  scheduleInterview(data: { title: string; date: string; time: string; interviewer: string }) {
    cy.get(LOCATORS.BUTTON_BUTTON)
      .contains(RECRUITMENT_BUTTONS.SCHEDULE_INTERVIEW)
      .click();

    cy.get(LOCATORS.INTERVIEW_TITLE).first().type(data.title);
    cy.get(LOCATORS.DATE).clear().type(data.date);
    cy.get(LOCATORS.TIME).clear().type(data.time);

    cy.get(LOCATORS.INTERVIEWER_NAME_INPUT).type(data.interviewer);
    cy.get(LOCATORS.INTERVIEWER_NAME_DROPDOWN).contains(data.interviewer).click();

    cy.get(LOCATORS.SUBMIT_BUTTON).click();
    cy.contains("Successfully Saved").should("be.visible");
  }

  markInterviewPassed() {
    cy.get(LOCATORS.BUTTON_BUTTON)
      .contains(RECRUITMENT_BUTTONS.MARK_PASSED)
      .click();
    cy.contains("Successfully Updated").should("be.visible");
  }

  verifyResumeAttachment() {
    cy.get(LOCATORS.LIST_ROW).first().find(LOCATORS.DOWNLOAD_BUTTON).should("be.visible");
  }

  openRecruitment() {
    cy.contains("a", "Recruitment").click();
    cy.contains("Candidates").click();
  }

}


export const candidatesPage = new CandidatesPage();
