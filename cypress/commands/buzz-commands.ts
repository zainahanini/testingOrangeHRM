import { buzzPage } from "../support/pages/buzz-page";

declare global {
  namespace Cypress {
    interface Chainable {
      createBuzzPost(content: string): Chainable<void>;
      verifyBuzzPost(content: string): Chainable<void>;
    }
  }
}
Cypress.Commands.add("createBuzzPost", (content: string) => {
  buzzPage.navigateToBuzz();
  buzzPage.enterPostContent(content);
  buzzPage.clickPostButton();
  buzzPage.verifyPostToast();
});

Cypress.Commands.add("verifyBuzzPost", (content: string) => {
  buzzPage.navigateToBuzz();
  buzzPage.verifyPostInFeed(content);
});
