import { APP_MODULES, MODULE_URL_FREG } from "../../support/enums/modules-enums";
import { adminPage } from "../../support/pages/admin-page";
import LoginPage from "../../support/pages/login-page";

describe('Validate module URLs and headers for all pages)', () => {

    beforeEach(() => {
        cy.fixture("users").as("users");
        LoginPage.visit();
        LoginPage.isLoaded();
        cy.fixture("users").as('users');
        cy.fixture("messages").as('messages');
        cy.get('@users').then((users: any) => {
            cy.login(users.valid.username, users.valid.password);
        }); 

    });

    it('TC0: Should open admin page and validate the URL and header', () => {
        adminPage.openFromMenu(APP_MODULES.ADMIN);
        adminPage.validateURL(MODULE_URL_FREG.ADMIN);
        adminPage.validateHeader();
    })


});

