const LOCATORS = {
  ENTITLEMENTS: ".oxd-topbar-body-nav-tab-item",
  ADD_TAB: ".oxd-topbar-body-nav-tab-link",
  EMPLOYEE_NAME: "input[placeholder='Type for hints...']",
  SEARCHED_EMPLOYEE_NAME: "div[role='listbox'].oxd-autocomplete-dropdown",
  LEAVE_TYPE: ".oxd-select-text-input",
  LEAVE_DROPDOWN: ".oxd-select-text--after",
  LEAVE_TAB: ".oxd-select-dropdown .oxd-select-option",
  ADD_ENTITLEMENTS: "input[class='oxd-input oxd-input--active']",
  SAVE_BTN: "button[type='submit']",
  CONFIRM_BTN: "button.oxd-button--secondary.orangehrm-button-margin",
  LOG_OUT_BTN: ".oxd-userdropdown-tab",
  APPLY_TAB: ".oxd-topbar-body-nav-tab-item",
  DATE: "input[placeholder='yyyy-dd-mm']",
  APPROVE_BTN:
    "button.oxd-button.oxd-button--medium.oxd-button--label-success.oxd-table-cell-action-space",
  TABLE_CELL: '.oxd-table-cell[role="cell"]',
  TABLE_ROW: ".oxd-table-row--with-border",
};

class LeavePage {
  goToLeaveModule() {
    cy.get("nav").contains("Leave").click();
  }

  openEntitlementsTab() {
    cy.get(LOCATORS.ENTITLEMENTS).contains("Entitlements").click();
  }

  openAddEntitlement() {
    cy.get(LOCATORS.ADD_TAB).contains("Add Entitlements").click();
  }

  enterEmployee(employeeName: string) {
    cy.get(LOCATORS.EMPLOYEE_NAME).clear().type(employeeName);
    cy.get(LOCATORS.SEARCHED_EMPLOYEE_NAME).contains(employeeName).click();
  }

  chooseLeaveType(leaveType: string = "Annual Leave") {
    cy.get(LOCATORS.LEAVE_DROPDOWN).first().click();
    cy.contains(LOCATORS.LEAVE_TAB, leaveType).click();
  }

  inputEntitlement(balance: string) {
    cy.get(LOCATORS.ADD_ENTITLEMENTS).last().type(balance);
  }

  clickSave() {
    cy.get(LOCATORS.SAVE_BTN).click();
  }

  clickConfirm() {
    cy.get(LOCATORS.CONFIRM_BTN).contains("Confirm").click();
    cy.contains("Successfully Saved");
  }

  applyForLeave(
    leaveType: string,
    dateFrom: string,
    dateTo: string
  ) {
    cy.get(LOCATORS.APPLY_TAB).contains("Apply").click();

    cy.get(LOCATORS.LEAVE_DROPDOWN).click();
    cy.contains(LOCATORS.LEAVE_TAB, leaveType).click();

    cy.get(LOCATORS.DATE).first().clear().type(dateFrom);
    cy.get(LOCATORS.DATE).last().clear().type(dateTo);

    cy.contains("Close").click();
    cy.get(LOCATORS.SAVE_BTN).click();

    cy.contains("Successfully Saved");
  }

  approveLeaveRequest() {
    cy.get(LOCATORS.APPROVE_BTN).contains("Approve").click();
    cy.contains("Successfully Updated");
  }

  goToMyLeaveTab() {
    cy.get("a").contains("My Leave").click();
  }

  checkRecord(employeeName: string, leaveBalance: string, leaveType: string = "Annual Leave", leavePeriod: string) {
    cy.contains(LOCATORS.TABLE_CELL, employeeName)
      .closest(LOCATORS.TABLE_ROW)
      .within(() => {
        cy.contains(leavePeriod).should("be.visible");
        cy.contains(leaveType).should("be.visible");
        cy.contains(leaveBalance).should("be.visible");
        cy.contains("Cancel").should("be.visible");
      });
  }
}

export const leavePage = new LeavePage();
