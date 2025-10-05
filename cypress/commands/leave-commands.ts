import { leavePage } from "../support/pages/leave-page";

declare global {
  namespace Cypress {
    interface Chainable {
      assignLeaveEntitlement(entitlement: { employeeName: string; leaveType: string; days: string }): Chainable<void>;
      applyLeave(request: { leaveType: string; fromDate: string; toDate: string; comment?: string }): Chainable<void>;
      approveLeaveRequest(): Chainable<void>;
      verifyLeaveRecord(employeeName: string, leaveType: string, leavePeriod: string, leaveBalance: string): Chainable<void>;
      logout(): Chainable<void>; 
    }
  }
}

Cypress.Commands.add("assignLeaveEntitlement", (entitlement) => {
  leavePage.goToLeaveModule();
  leavePage.openEntitlementsTab();
  leavePage.openAddEntitlement();
  leavePage.enterEmployee(entitlement.employeeName);
  leavePage.chooseLeaveType(entitlement.leaveType);
  leavePage.inputEntitlement(entitlement.days);
  leavePage.clickSave();
  leavePage.confirmSave();
});

Cypress.Commands.add("applyLeave", (request) => {
  leavePage.goToLeaveModule();
  leavePage.applyForLeave(request.leaveType, request.fromDate, request.toDate);
});

Cypress.Commands.add("approveLeaveRequest", () => {
  leavePage.goToLeaveModule();
  leavePage.approveLeaveRequest();
});

Cypress.Commands.add("verifyLeaveRecord", (employeeName, leaveType, leavePeriod, leaveBalance) => {
  leavePage.goToMyLeaveTab();
  leavePage.verifyLeaveRecord(employeeName, leaveBalance, leaveType, leavePeriod);
});

Cypress.Commands.add("logout", () => {
  cy.get("[class*='userdropdown-tab']", { timeout: 10000 })
    .should("be.visible")
    .click();
  cy.contains("Logout", { matchCase: false, timeout: 10000 })
    .should("be.visible")
    .click();
  cy.url().should("include", "/auth/login");
  cy.get('input[name="username"]').should("be.visible");
});
