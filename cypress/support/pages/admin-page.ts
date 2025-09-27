import { APP_MODULES, MODULE_URL_FREG } from "../enums/modules-enums";

const LOCATORS = {
    mainMenuItem: '.oxd-main-menu-item',
    headerH6: 'h6.oxd-topbar-header-breadcrumb-module',
    SystemUsersLabel: 'oxd-text oxd-text--h5 oxd-table-filter-title',
    usernameInput: 'input.oxd-input.oxd-input--active',
    employeeNameInput: 'input[placeholder="Type for hints..."]',
    userRoleDropdown: 'div.oxd-select-text.oxd-select-text--active',
    userRoleOptions: 'div.oxd-select-text-input',
    statusDropdown: 'div.oxd-select-text-input',
    searchButton: 'button[type="submit"]',
    usersTableRows: 'div.oxd-table-card',
    container: 'div[role="listbox"]',
    editButton: 'button.oxd-icon-button.oxd-table-cell-action-space',
    editUserPageHeader: 'h6.oxd-text.oxd-text--h6.orangehrm-main-title',
    saveButton: 'button[type="submit"]'
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
        cy.get(LOCATORS.SystemUsersLabel)
            .should('be.visible');
    }
    typeUsername(value: string) {
        cy.get(LOCATORS.usernameInput).eq(1)
            .type(value);
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
    validateUserInTable(username: string, role: string, status: string) {
        cy.get(LOCATORS.usersTableRows)
            .should('exist')
            .then((rows) => {
                const found = [...rows].some((row) => {
                    return (
                        row.innerText.includes(username) && row.innerText.includes(role) && row.innerText.includes(status));
                });
                expect(found).to.be.true;
            });
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
        adminPage.selectUserRole(newRole);
        adminPage.selectStatus(newStatus);
        cy.get(LOCATORS.saveButton).should('be.enabled').click();
        adminPage.typeUsername(username);
        adminPage.clickSearch();
    }



}

export const adminPage = new AdminPage();
