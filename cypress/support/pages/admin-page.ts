import { APP_MODULES, MODULE_URL_FREG } from "../enums/modules-enums";

const LOCATORS = {
    mainMenuItem: '.oxd-main-menu-item',
    headerH6: 'h6.oxd-topbar-header-breadcrumb-module',
    SystemUsersLabel: 'oxd-text.oxd-text--h5.oxd-table-filter-title',
    usernameInput: 'input.oxd-input.oxd-input--active',
    employeeNameInput: 'input[placeholder="Type for hints..."]',
    userRoleDropdown: 'div.oxd-select-text.oxd-select-text--active',
    userRoleOptions: 'div.oxd-select-text-input',
    statusDropdown: 'div.oxd-select-text-input',
    searchButton: 'button[type="submit"]',
    container: 'div[role="listbox"]',
    editButton: 'button.oxd-icon-button.oxd-table-cell-action-space',
    editUserPageHeader: 'h6.oxd-text.oxd-text--h6.orangehrm-main-title',
    saveButton: 'button[type="submit"]',
    addButton: 'button:contains("Add")',
    deleteIcon: 'i.oxd-icon.bi-trash',
    deleteConfirmButton: 'button.oxd-button--label-danger',
    passwordInputs: 'input[type="password"]',
    successToast: 'div.oxd-toast',
    usersTableBody: 'div[role="rowgroup"]',
    usersTableRows: 'div.oxd-table-card',
    usersTableCells: 'div.oxd-table-cell',
};

class AdminPage {

    openFromMenu() {
        cy.get(LOCATORS.mainMenuItem).contains(APP_MODULES.ADMIN).should('be.visible').click();
    }

    validateURL(expectedUrl: string = MODULE_URL_FREG.ADMIN) {
        cy.url().should('include', expectedUrl);
    }

    validateHeader() {
        cy.get(LOCATORS.headerH6)
            .should('be.visible')
            .and('contain', APP_MODULES.ADMIN);
    }

    verifyUserSearchScreen() {
        cy.contains('h5', 'System Users').should('be.visible');
    }

    clickAddButton() {
        cy.get(LOCATORS.addButton).should('be.visible').click();
        cy.url().should('include', '/admin/saveSystemUser');
    }

    typeUsername(value: string) {
        cy.get(LOCATORS.usernameInput).eq(1).type(value);
    }

    typePassword(password: string) {
        cy.get(LOCATORS.passwordInputs).eq(0).clear().type(password);
    }

    typeConfirmPassword(password: string) {
        cy.get(LOCATORS.passwordInputs).eq(1).clear().type(password);
    }

    selectUserRole(value: string) {
        cy.get(LOCATORS.userRoleDropdown).eq(0)
            .should('be.visible')
            .click();
        cy.get(LOCATORS.container)
            .contains(value)
            .should('be.visible')
            .click();
        cy.get(LOCATORS.userRoleDropdown).eq(0)
            .should('contain.text', value);
    }

    typeUserName(value: string) {
        cy.get(LOCATORS.employeeNameInput).type(value);
    }

    selectStatus(value: string) {
        cy.get(LOCATORS.statusDropdown).eq(1)
            .should('be.visible')
            .click();
        cy.get(LOCATORS.container)
            .contains(value)
            .should('be.visible')
            .click();
        cy.get(LOCATORS.statusDropdown).eq(1)
            .should('contain.text', value);
    }

    clickSearch() {
        cy.get(LOCATORS.searchButton).should('be.enabled').click();
    }

    clickEditButton(username: string) {
        cy.get(LOCATORS.usersTableRows)
            .contains(username)
            .parents(LOCATORS.usersTableRows)
            .within(() => {
                cy.get(LOCATORS.editButton).eq(1).should('be.visible').click();
            });
    }

    verifyEditUserPage() {
        cy.get(LOCATORS.editUserPageHeader)
            .should('be.visible')
            .and('contain.text', APP_MODULES.EDIT);
    }

    editRoleAndStatus(newRole: string, newStatus: string, username: string) {
        this.selectUserRole(newRole);
        this.selectStatus(newStatus);
        cy.get(LOCATORS.saveButton).should('be.enabled').click();
        this.typeUsername(username);
        this.clickSearch();
    }

    clickDeleteButton(username: string) {
        cy.get(LOCATORS.usersTableRows)
            .contains(username)
            .parents(LOCATORS.usersTableRows)
            .within(() => {
                cy.get(LOCATORS.deleteIcon).click();
            });
    }

    confirmDelete() {
        cy.get(LOCATORS.deleteConfirmButton).click();
        cy.get(LOCATORS.successToast).should('contain.text', 'Successfully Deleted');
    }

    clickSave() {
        cy.get(LOCATORS.saveButton).should('be.enabled').click();
        cy.get(LOCATORS.successToast).should('contain.text', 'Successfully Saved');
    }

    validateUserInTable(username: string, role: string, status: string) {
        cy.get(LOCATORS.usersTableBody)
            .should('exist')
            .find(LOCATORS.usersTableRows)
            .should('have.length.greaterThan', 0)
            .each((row) => {
                cy.wrap(row).within(() => {
                    cy.contains(username).should('exist');
                    cy.contains(role).should('exist');
                    cy.contains(status).should('exist');
                });
            });
    }

    validateToastMessage(message: string) {
        cy.contains(message).should('be.visible');
    }

    validateNoRecordsFound() {
        cy.contains('No Records Found').should('be.visible');
    }


}

export const adminPage = new AdminPage();
