import { APP_MODULES, MODULE_URL_FREG } from "../enums/modules-enums";

const LOCATORS = {
  mainMenuItem: '.oxd-main-menu-item',
  headerH6: 'h6.oxd-topbar-header-breadcrumb-module',
  addEmployeeTab: 'a.oxd-topbar-body-nav-tab-item',
  firstName: 'input[name="firstName"]',
  middleName: 'input[name="middleName"]',
  lastName: 'input[name="lastName"]',
  empId: 'input.oxd-input.oxd-input--active',
  saveButton: 'button[type="submit"]',
  photoUpload: 'input[type="file"]',
  createLoginDetailsCheckbox: 'input[type="checkbox"]',
  usernameInput: 'input.oxd-input.oxd-input--active',
  passwordInput: 'input.oxd-input.oxd-input--active[type="password"]',
  confirmPasswordInput: 'input.oxd-input.oxd-input--active[type="password"]',
  statusButton: 'button[type="submit"]',
  employeeListTable: 'div.oxd-table-card',
  personalDetailsHeader: 'h6.oxd-text.oxd-text--h6.orangehrm-main-title',
  profilePhoto: 'div.oxd-avatar > img'
};

class PimPage {
  openPIMModule() {
    cy.contains(LOCATORS.mainMenuItem, APP_MODULES.PIM)
      .scrollIntoView()
      .should('be.visible')
      .click();
    cy.url().should('include', MODULE_URL_FREG.PIM);
    cy.get(LOCATORS.headerH6).should('contain.text', APP_MODULES.PIM);
  }

  openAddEmployeeTab() {
    cy.get(LOCATORS.addEmployeeTab)
      .contains('Add Employee')
      .should('be.visible')
      .click();
    cy.url().should('include', 'addEmployee');
  }

  typeFirstName(value: string) {
    cy.get(LOCATORS.firstName).type(value);
  }

  typeMiddleName(value: string) {
    cy.get(LOCATORS.middleName).type(value);
  }

  typeLastName(value: string) {
    cy.get(LOCATORS.lastName).type(value);
  }
  uploadPhoto(filePath: string) {
    cy.get(LOCATORS.photoUpload).attachFile(filePath);
  }
  enableLoginDetails() {
    cy.get(LOCATORS.createLoginDetailsCheckbox).check({ force: true });
  }
  typeUsername(value: string) {
    cy.get(LOCATORS.usernameInput).eq(5).type(value);
  }
  typePassword(value: string) {
    cy.get(LOCATORS.passwordInput).eq(0).type(value);
  }
  typeConfirmPassword(value: string) {
    cy.get(LOCATORS.confirmPasswordInput).eq(0).type(value);
  }

  typeEmpId(value: string) {
    cy.contains('label', 'Employee Id')
      .parent()
      .find(LOCATORS.empId)
      .click()
      .clear()
      .type(value);
  }

  clickSave() {
    cy.get(LOCATORS.saveButton).should('be.enabled').click();
    cy.contains('Successfully Saved').should('be.visible');
  }
  assertPersonalDetailsVisible() {
    cy.contains(LOCATORS.personalDetailsHeader, 'Personal Details').should('be.visible');
  }
  assertEmployeeCreated(firstName: string, lastName: string, empId?: string) {
    cy.get(LOCATORS.personalDetailsHeader).should('be.visible');
    cy.get(LOCATORS.firstName).should('have.value', firstName);
    cy.get(LOCATORS.lastName).should('have.value', lastName);
  }


  assertValidationMessages() {
    cy.contains('Required').should('be.visible');
    cy.contains('Upload a valid file').should('be.visible');
    cy.contains('Should have at least 8 characters').should('be.visible');
  }
}

export default new PimPage();
