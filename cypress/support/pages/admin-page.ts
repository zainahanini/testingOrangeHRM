import { APP_MODULES, MODULE_URL_FREG } from "../enums/modules-enums";

const LOCATORS = {
    mainMenuItem: '.oxd-main-menu-item',
    headerH6: 'h6.oxd-topbar-header-breadcrumb-module',
};

class AdminPage {

    openFromMenu(mainMenuItem: APP_MODULES) {
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
}

export const adminPage = new AdminPage();
