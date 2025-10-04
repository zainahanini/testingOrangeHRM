import { adminPage } from "../../support/pages/admin-page.js";
import DashboardPage from "../../support/pages/dashboard-page.js";
import LoginPage from "../../support/pages/login-page.js";
import PimPage from "../../support/pages/pim-page.js";

describe("User Management - Search, Edit, Delete", () => {
  beforeEach(() => {
    LoginPage.visit();
    LoginPage.isLoaded();
    cy.fixture("users").as("users");
    cy.fixture("employee").as("employee");
    cy.fixture("messages").as("messages");
  });

  it("TC12: Should search user by Username, Role, Name and Status", () => {
    cy.get("@users").then((users: any) => {
      cy.login(users.valid.username, users.valid.password);

      cy.get("@employee").then((employee: any) => {
        cy.searchEmployee(
          employee.username,
          employee.role,
          employee.fullName,
          employee.status
        );
      });
    });
  });

 it("TC13: Should search and edit user Role and Status", () => {
  cy.get("@users").then((users: any) => {
    cy.login(users.valid.username, users.valid.password);

    cy.get("@employee").then((employee: any) => {
      cy.get("@messages").then((msg: any) => {
        cy.searchEmployee(
          employee.username,
          employee.role,
          employee.fullName,
          employee.status
        );
        cy.editUser(employee.username, employee.newRole, employee.newStatus);
        adminPage.typeUsername(employee.username);
        adminPage.clickSearch();
        adminPage.validateUserInTable(
          employee.username,
          employee.newRole,
          employee.newStatus
        );

      });
    });
  });
});


  it.only("TC14: Should search and delete user", () => {
    cy.get("@users").then((users: any) => {
      cy.login(users.valid.username, users.valid.password);

      cy.get("@employee").then((employee: any) => {
        cy.searchEmployee(
          employee.username,
          employee.newRole, 
          employee.fullName,
          employee.newStatus 
        );

        cy.deleteUser(
          employee.username,
          employee.newRole,
          employee.fullName,
          employee.newStatus
        );

        cy.get("@messages").then((msg: any) => {
          adminPage.validateToastMessage(msg.deleteSuccess);
        });

        adminPage.typeUsername(employee.username);
        adminPage.clickSearch();
        adminPage.validateNoRecordsFound();
      });
    });
  });
});
