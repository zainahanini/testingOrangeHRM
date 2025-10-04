import LoginPage from "../../support/pages/login-page.js";

beforeEach(() => {
  LoginPage.visit();
  LoginPage.isLoaded();
  cy.fixture("users").as("users");
  cy.fixture("postInfo").as("postInfo");

  cy.get("@users").then((users: any) => {
    cy.login(users.valid.username, users.valid.password);
  });
});

describe("Buzz - Add New Post", () => {
  it("TC18: User adds a new post and verifies it appears in the feed", function () {
    cy.get("@postInfo").then((post: any) => {
      const randomSuffix = Math.random().toString(36).substring(2, 8);
      const postContent = `${post.content} - ${randomSuffix}`;
      cy.createBuzzPost(postContent);
      cy.verifyBuzzPost(postContent);
    });
  });
});
