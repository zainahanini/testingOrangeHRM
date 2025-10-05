const LOCATORS = {
  JOB_TAB: 'a.orangehrm-tabs-item:contains("Job")',
  SAVE_BUTTON: 'button[type="submit"]:contains("Save")',
  SEARCH_BUTTON: 'button[type="submit"]:contains("Search")',
  DROPDOWN_TOGGLE: ".oxd-select-text--after",
  DROPDOWN_OPTION: ".oxd-select-option",
  SUCCESS_TOAST: ".oxd-toast-content",
  EMPLOYEE_LIST_INPUT: 'input[placeholder="Type for hints..."]',
  EMPLOYEE_CARD: ".oxd-table-card",
  JOB_TITLE_FIELD: ".oxd-select-text-input:eq(0)",
  EMPLOYMENT_STATUS_FIELD: ".oxd-select-text-input:eq(1)",
  SUB_UNIT_FIELD: ".oxd-select-text-input:eq(2)",
  LOCATION_FIELD: ".oxd-select-text-input:eq(3)",
  EDIT_ICON: "i.oxd-icon.bi-pencil-fill",
  DATE_INPUT: ".oxd-date-input input",
};

class JobDetailsPage {
  openEmployeeProfile(employeeName: string) {
    cy.visit("/web/index.php/pim/viewEmployeeList");
    cy.get(LOCATORS.EMPLOYEE_LIST_INPUT).first().clear().type(employeeName);
    cy.get(LOCATORS.SEARCH_BUTTON).click();
    cy.contains(LOCATORS.EMPLOYEE_CARD, employeeName, { timeout: 10000 })
      .should("be.visible")
      .within(() => {
        cy.get(LOCATORS.EDIT_ICON).click({ force: true });
      });
    cy.get('h6:contains("Personal Details")', { timeout: 15000 }).should("be.visible");
  }

  navigateToJobTab() {
    cy.get(LOCATORS.JOB_TAB, { timeout: 10000 }).should("be.visible").click();
  }

  fillJobDetails(details: any) {
    cy.get(LOCATORS.DROPDOWN_TOGGLE).eq(0).click();
    cy.get(LOCATORS.DROPDOWN_OPTION).contains(details.jobTitle).scrollIntoView().click({ force: true });

    cy.get(LOCATORS.DROPDOWN_TOGGLE).eq(1).click();
    cy.get(LOCATORS.DROPDOWN_OPTION).contains(details.employmentStatus).scrollIntoView().click({ force: true });

    cy.get(LOCATORS.DROPDOWN_TOGGLE).eq(2).click();
    cy.get(LOCATORS.DROPDOWN_OPTION).contains(details.subUnit).scrollIntoView().click({ force: true });

    cy.get(LOCATORS.DROPDOWN_TOGGLE).eq(3).click();
    cy.get(LOCATORS.DROPDOWN_OPTION).contains(details.location).scrollIntoView().click({ force: true });

    cy.get(LOCATORS.DATE_INPUT, { timeout: 10000 }).clear().type(details.effectiveDate);
  }

  saveJobDetails() {
    cy.get(LOCATORS.SAVE_BUTTON).click();
    cy.get(LOCATORS.SUCCESS_TOAST, { timeout: 10000 })
      .should("be.visible")
      .and("contain.text", "Successfully Updated");
  }

  verifyJobDetails(details: any) {
    cy.get(LOCATORS.JOB_TITLE_FIELD).should("contain.text", details.jobTitle);
    cy.get(LOCATORS.EMPLOYMENT_STATUS_FIELD).should("contain.text", details.employmentStatus);
    cy.get(LOCATORS.SUB_UNIT_FIELD).should("contain.text", details.subUnit);
    cy.get(LOCATORS.LOCATION_FIELD).should("contain.text", details.location);
  }

  verifyEmployeeFilter(details: any) {
    cy.visit("/web/index.php/pim/viewEmployeeList");

    cy.get(LOCATORS.DROPDOWN_TOGGLE).eq(0).click();
    cy.get(LOCATORS.DROPDOWN_OPTION).contains(details.jobTitle).scrollIntoView().click({ force: true });

    cy.get(LOCATORS.DROPDOWN_TOGGLE).eq(2).click(); 
    cy.get(LOCATORS.DROPDOWN_OPTION).contains(details.subUnit).scrollIntoView().click({ force: true });

    cy.get(LOCATORS.SEARCH_BUTTON).click();

    cy.contains(LOCATORS.EMPLOYEE_CARD, details.employeeName, { timeout: 10000 })
      .should("be.visible")
      .and("contain.text", details.jobTitle)
      .and("contain.text", details.subUnit);
  }
}

export const jobDetailsPage = new JobDetailsPage();
