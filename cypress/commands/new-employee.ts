import { adminPage } from "../support/pages/admin-page.js";
import PimPage from "../support/pages/pim-page.js";

declare global {
  namespace Cypress {
    interface Chainable {
      addEmployee(first: string, middle: string, last: string, empId: string): Chainable<void>;
      searchEmployee(username: string, role: string, name: string, status: string): Chainable<void>;
      editUser(username: string, newRole: string, newStatus: string): Chainable<void>;
      deleteUser(username: string, role: string, name: string, status: string): Chainable<void>;
      addEmployeeWithPhotoAndLogin(employee: {
        firstName: string;
        middleName: string;
        lastName: string;
        empId?: string;
        username: string;
        password: string;
        photo: string;
      }): Chainable<void>;
      addEmployeeWithInvalidData(employee: {
        lastName: string;
        photo: string;
        username: string;
        password: string;
      }): Chainable<void>;
    }
  }
}


Cypress.Commands.add(
  "addEmployee",
  (first: string, middle: string, last: string, empId: string) => {
    PimPage.openPIMModule();
    PimPage.openAddEmployeeTab();
    PimPage.typeFirstName(first);
    PimPage.typeMiddleName(middle);
    PimPage.typeLastName(last);
    PimPage.clickSave();
    PimPage.assertPersonalDetailsVisible();
  }
);

Cypress.Commands.add(
  "searchEmployee",
  (username: string, role: string, name: string, status: string) => {
    adminPage.openFromMenu();
    adminPage.validateURL();
    adminPage.verifyUserSearchScreen();
    adminPage.typeUsername(username);
    adminPage.selectUserRole(role);
    adminPage.selectStatus(status);
    adminPage.clickSearch();
    adminPage.validateUserInTable(username, role, status);
  }
);

Cypress.Commands.add(
  "editUser",
  (username: string, newRole: string, newStatus: string) => {
    adminPage.openFromMenu();
    adminPage.validateURL();
    adminPage.typeUsername(username);
    adminPage.clickSearch();
    adminPage.clickEditButton(username);
    adminPage.verifyEditUserPage();
    adminPage.editRoleAndStatus(newRole, newStatus, username);
  }
);

Cypress.Commands.add(
  "deleteUser",
  (username: string, role: string, name: string, status: string) => {
    adminPage.openFromMenu();
    adminPage.validateURL();
    adminPage.typeUsername(username);
    adminPage.selectUserRole(role);
    adminPage.typeUserName(name);
    adminPage.selectStatus(status);
    adminPage.clickSearch();
    adminPage.clickDeleteButton(username);
    adminPage.confirmDelete();
  }
);

Cypress.Commands.add(
  "addEmployeeWithPhotoAndLogin",
  (employee: {
    firstName: string;
    middleName: string;
    lastName: string;
    empId?: string;
    username: string;
    password: string;
    photo: string;
  }) => {
    PimPage.openPIMModule();
    PimPage.openAddEmployeeTab();
    PimPage.typeFirstName(employee.firstName);
    PimPage.typeMiddleName(employee.middleName);
    PimPage.typeLastName(employee.lastName);

    if (employee.photo) {
      PimPage.uploadPhoto(employee.photo);
    }

    PimPage.enableLoginDetails();
    PimPage.typeUsername(employee.username);
    PimPage.typePassword(employee.password);
    PimPage.typeConfirmPassword(employee.password);
    PimPage.clickSave();
  }
);

