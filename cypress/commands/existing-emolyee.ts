import { leavePage } from "../support/pages/leave-page";

declare global {
    namespace Cypress {
        interface Chainable {
            assignLeaveEntitlement(entitlement: { employeeName: string; leaveType: string; days: string }): Chainable<void>;
            applyLeave(request: { employeeName: string; leaveType: string; fromDate: string; toDate: string; comment?: string }): Chainable<void>;
            approveLeaveRequest(): Chainable<void>;
            verifyLeaveRecord(employeeName: string, leaveType: string, leavePeriod: string, leaveBalance: string): Chainable<void>;
            verifyLeaveBalance(employeeName: string, leaveType: string): Chainable<void>;
        }
    }
}

Cypress.Commands.add(
    "assignLeaveEntitlement",
    (entitlement: { employeeName: string; leaveType: string; days: string }) => {
        leavePage.goToLeaveModule();
        leavePage.openEntitlementsTab();
        leavePage.openAddEntitlement();
        leavePage.enterEmployee(entitlement.employeeName);
        leavePage.chooseLeaveType(entitlement.leaveType);
        leavePage.inputEntitlement(entitlement.days);
        leavePage.clickSave();
        leavePage.clickConfirm();
    }
);

Cypress.Commands.add(
    "applyLeave",
    (request: { employeeName: string; leaveType: string; fromDate: string; toDate: string; comment?: string }) => {
        leavePage.goToLeaveModule();
        leavePage.applyForLeave(request.leaveType, request.fromDate, request.toDate);
        leavePage.clickSave();
    }
);

Cypress.Commands.add(
    "approveLeaveRequest",
    () => {
        leavePage.goToLeaveModule();
        leavePage.approveLeaveRequest();
    }
);

Cypress.Commands.add(
    "verifyLeaveRecord",
    (employeeName: string, leaveType: string, leavePeriod: string, leaveBalance: string) => {
        leavePage.goToMyLeaveTab();
        leavePage.checkRecord(employeeName, leaveBalance, leaveType, leavePeriod);
    }
);

Cypress.Commands.add(
    "verifyLeaveBalance",
    (employeeName: string, leaveType: string) => {
        leavePage.goToMyLeaveTab();
        leavePage.checkRecord(employeeName, "N/A", leaveType, "N/A");
    }
);
