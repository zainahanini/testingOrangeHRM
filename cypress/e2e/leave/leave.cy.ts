import LoginPage from "../../support/pages/login-page";
import { APP_MODULES } from "../../support/enums/modules-enums";

beforeEach(() => {
  LoginPage.visit();
  LoginPage.isLoaded();

  cy.fixture("users").as("users");
  cy.fixture("employee-leave").as("employeeLeave");
  cy.fixture("leave-entitlement").as("leaveEntitlement");
});

describe("TC17: Leave Management - Employee Applies, Admin Approves, Employee Checks Status", () => {
  it("should create entitlement, apply leave, approve it, and verify balance", function () {
    cy.get("@users").then((users: any) => {
      cy.login(users.valid.username, users.valid.password);
    });

    cy.get("@leaveEntitlement").then((entitlement: any) => {
      cy.assignLeaveEntitlement(entitlement);
    });

    cy.logout();

    cy.get("@employeeLeave").then((employee: any) => {
      cy.login(employee.username, employee.password);

      const today = new Date();
      const fromDate = new Date(today);
      fromDate.setDate(today.getDate() + 2);
      const toDate = new Date(today);
      toDate.setDate(today.getDate() + 5);

      const formattedFrom = fromDate.toISOString().split("T")[0];
      const formattedTo = toDate.toISOString().split("T")[0];

      cy.applyLeave({
        leaveType: employee.leaveType,
        fromDate: formattedFrom,
        toDate: formattedTo,
        comment: employee.leaveRequest.comment,
      });
    });


    cy.logout();

    cy.get("@users").then((users: any) => {
      cy.login(users.valid.username, users.valid.password);
      cy.approveLeaveRequest();
    });

    cy.logout();

    cy.get("@employeeLeave").then((employee: any) => {
      cy.login(employee.username, employee.password);
      cy.verifyLeaveRecord(
        employee.name,
        employee.leaveType,
        employee.leaveRequest.leavePeriod,
        employee.leaveRequest.leaveBalance
      );
    });
  });
});
