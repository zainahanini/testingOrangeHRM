import { APP_MODULES } from "../enums/modules-enums";
import { TOAST_MESSAGES } from "../enums/messages-enums";

const LOCATORS = {
  NAV_BAR: "nav",
  ENTITLEMENTS_TAB: ".oxd-topbar-body-nav-tab-item",
  ADD_TAB: ".oxd-topbar-body-nav-tab-link",
  EMPLOYEE_NAME_INPUT: "input[placeholder='Type for hints...']",
  AUTOCOMPLETE_RESULT: "div[role='listbox'].oxd-autocomplete-dropdown",
  LEAVE_DROPDOWN_TRIGGER: ".oxd-select-text--after",
  LEAVE_OPTION: ".oxd-select-dropdown .oxd-select-option",
  ENTITLEMENT_INPUT: "input[class='oxd-input oxd-input--active']",
  SAVE_BTN: "button[type='submit']",
  CONFIRM_BTN: "button.oxd-button--secondary.orangehrm-button-margin",
  APPLY_TAB: ".oxd-topbar-body-nav-tab-item",
  DATE_INPUT: "input[placeholder='yyyy-dd-mm']",
  APPROVE_BTN: "button.oxd-button--label-success",
  TABLE_CELL: ".oxd-table-cell[role='cell']",
  TABLE_ROW: ".oxd-table-row--with-border",
};

class LeavePage {
  goToLeaveModule() {
    cy.get(LOCATORS.NAV_BAR).contains(APP_MODULES.LEAVE).click();
  }

  openEntitlementsTab() {
    cy.get(LOCATORS.ENTITLEMENTS_TAB).contains("Entitlements").click();
  }

  openAddEntitlement() {
    cy.get(LOCATORS.ADD_TAB).contains("Add Entitlements").click();
  }

  enterEmployee(employeeName: string) {
    expect(employeeName, "Employee name").to.exist;
    cy.get(LOCATORS.EMPLOYEE_NAME_INPUT)
      .clear()
      .type(employeeName);
    cy.get(LOCATORS.AUTOCOMPLETE_RESULT)
      .should(($el) => {
        const actual = $el.text().replace(/\s+/g, " ").trim();
        const expected = employeeName.replace(/\s+/g, " ").trim();
        expect(actual).to.include(expected);
      })
      .contains(new RegExp(employeeName.replace(/\s+/g, "\\s+")))
      .click();
  }


  chooseLeaveType(leaveType: string) {
    cy.get(LOCATORS.LEAVE_DROPDOWN_TRIGGER).first().click();
    cy.get(LOCATORS.LEAVE_OPTION).contains(leaveType).click();
  }

  inputEntitlement(days: string) {
    expect(days, "Entitlement days").to.exist;
    cy.get(LOCATORS.ENTITLEMENT_INPUT).last().clear().type(days);
  }

  clickSave() {
    cy.get(LOCATORS.SAVE_BTN).click();
  }

  confirmSave() {
    cy.get(LOCATORS.CONFIRM_BTN).contains("Confirm").click();
    cy.contains(TOAST_MESSAGES.SUCCESS_SAVE);
  }

  applyForLeave(leaveType: string, fromDate: string, toDate: string) {
    cy.get(LOCATORS.APPLY_TAB).contains("Apply").click();
    cy.get(LOCATORS.LEAVE_DROPDOWN_TRIGGER).click();
    cy.get(LOCATORS.LEAVE_OPTION).contains(leaveType).click();
    cy.get(LOCATORS.DATE_INPUT).first().clear().type(fromDate);
    cy.get(LOCATORS.DATE_INPUT).last().clear().type(toDate);
    cy.get(LOCATORS.SAVE_BTN).click();
    cy.contains(TOAST_MESSAGES.SUCCESS_SAVE);
  }

  approveLeaveRequest() {
    cy.get(LOCATORS.APPROVE_BTN).contains("Approve").click();
    cy.contains(TOAST_MESSAGES.SUCCESS_UPDATE);
  }

  goToMyLeaveTab() {
  cy.get(LOCATORS.NAV_BAR).contains(APP_MODULES.LEAVE).click();
  cy.contains("My Leave").click();
}


  verifyLeaveRecord(employeeName: string, leaveBalance: string, leaveType: string, leavePeriod: string) {
    this.goToMyLeaveTab();
    cy.get(LOCATORS.TABLE_CELL)
      .contains(employeeName)
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
