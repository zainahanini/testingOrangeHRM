import DashboardPage from "../../support/pages/dashboard-page.js";
import LoginPage from "../../support/pages/login-page.js";

describe("OrangeHRM Login", () => {
    before(() => {
        // cy.fixture("users").as('users');
        // cy.fixture("messages").as('messages');
    });

    beforeEach(() => {
        LoginPage.visit();
        LoginPage.isLoaded();
        cy.fixture("users").as('users');
        cy.fixture("messages").as('messages');
    });

    it("TC01: Should log in successfully with valid username and password", () => {
        cy.get('@users').then((users: any) => {
            cy.login(users.valid.username, users.valid.password);
            DashboardPage.isLoaded();
        })
    });

    it("TC02: Should show error for valid username and invalid password", () => {
        cy.get('@users').then((users: any) => {
            cy.get('@messages').then((messages: any) => {
                cy.login(users.valid.username, users.invalid.password);
                LoginPage.assertInvalidCredentials(messages.invalidCreds);
            });
        });
    });

    it("TC03: Should show error for invalid username and valid password", () => {
        cy.get('@users').then((users: any) => {
            cy.get('@messages').then((messages: any) => {
                cy.login(users.invalid.username, users.valid.password);
                LoginPage.assertInvalidCredentials(messages.invalidCreds);
            });
        });
    });

    it("TC04: Should show error for invalid username and invalid password", () => {
        cy.get('@users').then((users: any) => {
            cy.get('@messages').then((messages: any) => {
                cy.login(users.invalid.username, users.invalid.password);
                LoginPage.assertInvalidCredentials(messages.invalidCreds);
            });
        });
    });

    it("TC05: Should show required message when username is empty and password is valid", () => {
        cy.get('@users').then((users: any) => {
            cy.get('@messages').then((messages: any) => {
                cy.login(' ', users.valid.password);
                LoginPage.assertRequiredAt(0, messages.required);
            });
        });
    });

    it("TC06: Should show required message when username is empty and password is invalid", () => {
        cy.get('@users').then((users: any) => {
            cy.get('@messages').then((messages: any) => {
                cy.login(' ', users.invalid.password);
                LoginPage.assertRequiredAt(0, messages.required);
            });
        });
    });

    it("TC07: Should show required message when password is empty and username is valid", () => {
        cy.get('@users').then((users: any) => {
            cy.get('@messages').then((messages: any) => {
                cy.login(users.valid.username, ' ');
                LoginPage.assertRequiredAt(0, messages.required);
            });
        });
    });

    it("TC08: Should show required message when password is empty and username is invalid", () => {
        cy.get('@users').then((users: any) => {
            cy.get('@messages').then((messages: any) => {
                cy.login(users.invalid.username, ' ');
                LoginPage.assertRequiredAt(0, messages.required);
            });
        });
    });

    it("TC09: Should show required messages when both username and password are empty", () => {
        cy.get('@users').then((users: any) => {
            cy.get('@messages').then((messages: any) => {
                cy.login(' ', ' ');
                LoginPage.assertRequiredAt(0, messages.required);
                LoginPage.assertRequiredAt(1, messages.required);
            });
        });
    });

    it("TC10: Should mask password input by default", () => {
        cy.get('@users').then((users: any) => {
             LoginPage.passwordShouldBeMasked();
            cy.login(users.valid.username, users.valid.password);
        });
    });
});
