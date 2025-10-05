import { TOAST_MESSAGES, ERROR_MESSAGES } from "../enums/messages-enums";
import { APP_MODULES } from "../enums/modules-enums";

const LOCATORS = {
  NAV_BAR: "nav",
  POST_TEXT_AREA: `textarea[placeholder="What's on your mind?"]`,
  SUBMIT_BUTTON: 'button[type="submit"]',
  POST_CONTAINER: ".oxd-sheet.oxd-sheet--rounded.oxd-sheet--white.orangehrm-buzz",
  POST: ".orangehrm-buzz-post-body-text",
};

class BuzzPage {
  navigateToBuzz() {
    cy.get(LOCATORS.NAV_BAR).contains(APP_MODULES.BUZZ).click();
  }

  enterPostContent(content: string) {
    cy.get(LOCATORS.POST_TEXT_AREA).scrollIntoView().clear().type(content);
  }

  clickPostButton() {
    cy.get(LOCATORS.SUBMIT_BUTTON).scrollIntoView().click({ force: true });
  }

  verifyPostToast() {
    cy.contains(TOAST_MESSAGES.SUCCESS_SAVE, { timeout: 10000 }).should("exist");
  }

  verifyPostInFeed(content: string) {
    cy.get(LOCATORS.POST_CONTAINER)
      .find(LOCATORS.POST)
      .first()
      .should("contain.text", content);
  }
}

export const buzzPage = new BuzzPage();
