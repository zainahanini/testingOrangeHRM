

// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }
import LoginPage from "./pages/login-page.js";
import { CreateUserRequest } from "../interfaces/users";
import { CreateUserResponse } from "../interfaces/users";


declare global {
    namespace Cypress {
        interface Chainable {
            login(username: string, password: string): Chainable<void>
            apiRequest(method: string, url: string, body?: any): Chainable<any>
        }
    }
}

Cypress.Commands.add('login', (username: string, password: string) => {
    //  LoginPage.visit();
    //  LoginPage.isLoaded();
    LoginPage.typeUsername(username);
    LoginPage.typePassword(password);
    LoginPage.submit();
}
)

Cypress.Commands.add('apiRequest', (method: string, url: string, body?: any) => {
    return cy.request({ method, url, body, 
        headers: { 
            "Content-Type": "application/json",
            "x-api-key": "reqres-free-v1"   
        } 
    });
});
