import { adminPage } from "../../support/pages/admin-page.js";
import DashboardPage from "../../support/pages/dashboard-page.js";
import LoginPage from "../../support/pages/login-page.js";
import PimPage from "../../support/pages/pim-page.js";

beforeEach(() => {
    LoginPage.visit();
    LoginPage.isLoaded();
    cy.fixture("users").as("users");
    cy.fixture("employee").as("employee");
});

describe("User Management - Search and Edit", () => {

    it("TC12: Should search user by Username, Role, Name and Status", () => {
        cy.get("@users").then((users: any) => {
            cy.login(users.valid.username, users.valid.password);

            cy.get("@employee").then((employee: any) => {
                cy.searchEmployee(employee.username, employee.role, employee.firstName, employee.status);
            });
        });
    });

    it.only("TC13: Should search and edit user Role and Status", () => {
        cy.get("@users").then((users: any) => {
            cy.login(users.valid.username, users.valid.password);

            cy.get("@employee").then((employee: any) => {
                cy.searchEmployee(employee.username, employee.role, employee.firstName, employee.status);
                cy.editUser(employee.username, employee.newRole, employee.newStatus);
            });
        });
    });

});
