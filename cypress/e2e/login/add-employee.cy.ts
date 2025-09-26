import DashboardPage from "../../support/pages/dashboard-page.js";
import LoginPage from "../../support/pages/login-page.js";
import PimPage from "../../support/pages/pim-page.js";

beforeEach(() => {
    LoginPage.visit();
    LoginPage.isLoaded();
    cy.fixture("users").as("users");
    cy.fixture("employee").as("employee");
});

describe("Add new employee on OrangeHRM", () => {
    it("TC01: Should add a new employee successfully", () => {
        cy.get("@users").then((users: any) => {
            cy.login(users.valid.username, users.valid.password);

            cy.get("@employee").then((employee: any) => {
                cy.addEmployee(employee.firstName, employee.middleName, employee.lastName,employee.empId);
            });
        });

        PimPage.assertPersonalDetailsVisible();
    });
});
