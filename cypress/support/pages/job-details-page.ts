const LOCATORS = {
  JOB_TAB: 'a[role="tab"]:contains("Job")',
  JOB_TITLE: '.oxd-select-text-input[name="jobTitle"]',
  EMPLOYMENT_STATUS: '.oxd-select-text-input[name="employmentStatus"]',
  SUB_UNIT: '.oxd-select-text-input[name="subUnit"]',
  LOCATION: '.oxd-select-text-input[name="location"]',
  EFFECTIVE_DATE: 'input[placeholder="yyyy-mm-dd"]',
  SAVE_BUTTON: 'button[type="submit"]',
};

class JobDetailsPage {
  navigateToJobTab() {
    cy.get(LOCATORS.JOB_TAB).click();
  }

  fillJobDetails(details: {
    jobTitle: string;
    employmentStatus: string;
    subUnit: string;
    location: string;
    effectiveDate: string;
  }) {
    cy.get(LOCATORS.JOB_TITLE).click().type(details.jobTitle).type("{enter}");
    cy.get(LOCATORS.EMPLOYMENT_STATUS).click().type(details.employmentStatus).type("{enter}");
    cy.get(LOCATORS.SUB_UNIT).click().type(details.subUnit).type("{enter}");
    cy.get(LOCATORS.LOCATION).click().type(details.location).type("{enter}");
    cy.get(LOCATORS.EFFECTIVE_DATE).clear().type(details.effectiveDate);
  }

  saveJobDetails() {
    cy.get(LOCATORS.SAVE_BUTTON).click();
  }

  verifyJobDetails(details: { jobTitle: string; subUnit: string }) {
    cy.get('table').contains('td', details.jobTitle).should('exist');
    cy.get('table').contains('td', details.subUnit).should('exist');
  }
}

export const jobDetailsPage = new JobDetailsPage();
