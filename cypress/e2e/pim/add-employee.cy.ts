import DashboardPage from "../../support/pages/dashboard-page.js";
import LoginPage from "../../support/pages/login-page.js";
import PimPage from "../../support/pages/pim-page.js";

beforeEach(() => {
    LoginPage.visit();
    LoginPage.isLoaded();
    cy.fixture("users").as("users");
    cy.fixture("employee").as("employee");
    cy.fixture("employee-invalid").as("employeeInvalid");
});

describe("Add new employee on OrangeHRM", () => {
    it("TC11: Should add a new employee successfully", () => {
        cy.get("@users").then((users: any) => {
            cy.login(users.valid.username, users.valid.password);

            cy.get("@employee").then((employee: any) => {
                cy.addEmployee(employee.firstName, employee.middleName, employee.lastName, employee.empId);
            });
        });

        PimPage.assertPersonalDetailsVisible();
    });

    it("TC15: Should add Employee with Photo & Login Details", () => {
        cy.get("@users").then((users: any) => {
            cy.login(users.valid.username, users.valid.password);

            cy.get("@employee").then((employee: any) => {
                cy.addEmployeeWithPhotoAndLogin(employee);
                PimPage.assertEmployeeCreated(employee.firstName, employee.lastName, employee.empId);
            });
        });
    });

    it.only("TC16: Should display validation errors for invalid employee data", () => {
        cy.get("@users").then((users: any) => {
            cy.login(users.valid.username, users.valid.password);

            cy.get("@employeeInvalid").then((employeeInvalid: any) => {
                cy.addEmployeeWithPhotoAndLogin(employeeInvalid);
                PimPage.assertValidationMessages();
            });
        });
    });
});