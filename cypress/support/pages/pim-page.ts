import { APP_MODULES, MODULE_URL_FREG } from "../enums/modules-enums";

const LOCATORS = {
  mainMenuItem: '.oxd-main-menu-item',
  headerH6: 'h6.oxd-topbar-header-breadcrumb-module',
  addEmployeeTab: 'a.oxd-topbar-body-nav-tab-item', 
  firstName: 'input[name="firstName"]',
  middleName: 'input[name="middleName"]',
  lastName: 'input[name="lastName"]',
  empId: 'input.oxd-input.oxd-input--active',
  saveButton: 'button[type="submit"]'
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
  }

  assertPersonalDetailsVisible() {
    cy.contains('Personal Details').should('be.visible');
  }

  addEmployee(first: string, middle: string, last: string, empId: string) {
    this.typeFirstName(first);
    this.typeMiddleName(middle);
    this.typeLastName(last);
    this.typeEmpId(empId);
    this.clickSave();
    this.assertPersonalDetailsVisible();
  }
}

export default new PimPage();
