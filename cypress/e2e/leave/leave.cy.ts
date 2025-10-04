import LoginPage from "../../support/pages/login-page.js";
import { leavePage } from "../../support/pages/leave-page.js";

beforeEach(() => {
  LoginPage.visit();
  LoginPage.isLoaded();

  cy.fixture("users").as("users");
  cy.fixture("employee-leave").as("employeeLeave");
  cy.fixture("leave-entitlement").as("leaveEntitlement");

  cy.get("@users").then((users: any) => {
    cy.login(users.valid.username, users.valid.password); 
  });
});

describe("Leave Management - Apply and Approve", () => {
  it("TC17: Employee applies for leave, admin approves, verify status and balance", function () {
    cy.get("@leaveEntitlement").then((entitlement: any) => {
      cy.assignLeaveEntitlement({
        employeeName: entitlement.employeeName,
        leaveType: entitlement.leaveType,
        days: entitlement.days,
      });
    });

    cy.get("@employeeLeave").then((employee: any) => {
      cy.applyLeave({
        employeeName: employee.name,
        leaveType: employee.leaveType,
        fromDate: employee.leaveRequest.fromDate,
        toDate: employee.leaveRequest.toDate,
        comment: employee.leaveRequest.comment,
      });

      cy.verifyLeaveRecord(
        employee.name,
        employee.leaveType,
        employee.leaveRequest.leavePeriod,
        employee.leaveRequest.leaveBalance
      );
    });

    cy.approveLeaveRequest();

    cy.get("@employeeLeave").then((employee: any) => {
      cy.verifyLeaveRecord(
        employee.name,
        employee.leaveType,
        employee.leaveRequest.leavePeriod,
        employee.leaveRequest.leaveBalance
      );

      cy.verifyLeaveBalance(employee.name, employee.leaveType);
    });
  });
});
