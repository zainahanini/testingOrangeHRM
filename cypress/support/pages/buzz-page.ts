const LOCATORS = {
  POST_TEXT_AREA: `textarea[placeholder="What's on your mind?"]`,
  SUBMIT_BUTTON: 'button[type="submit"]',
  POST_CONTAINER: ".oxd-sheet.oxd-sheet--rounded.oxd-sheet--white.orangehrm-buzz",
  POST: ".orangehrm-buzz-post-body-text",
  TOAST_MESSAGE: ".oxd-toast",
};

class BuzzPage {
  navigateToBuzz() {
    cy.get("nav").contains("Buzz").click();
  }

  enterPostContent(content: string) {
    cy.get(LOCATORS.POST_TEXT_AREA).clear().type(content);
  }

  clickPostButton() {
    cy.get(LOCATORS.SUBMIT_BUTTON).click({ force: true }); 
  }

  verifyPostToast() {
    cy.get(LOCATORS.TOAST_MESSAGE, { timeout: 10000 })
      .should("be.visible")
      .and("contain.text", "Successfully Saved");
  }

  verifyPostInFeed(content: string) {
    cy.get(LOCATORS.POST_CONTAINER)
      .find(LOCATORS.POST)
      .first()
      .should("contain.text", content);
  }
}

export const buzzPage = new BuzzPage();
