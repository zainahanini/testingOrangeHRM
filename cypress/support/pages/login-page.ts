const LOCATORS = {
  username: 'input[name="username"]',
  password: 'input[name="password"]',
  submitBtn: 'button[type="submit"]',
  requiredMsg: '.oxd-input-group__message',
  userDropdown: '.oxd-userdropdown-tab',
  logoutOption: 'ul.oxd-dropdown-menu li', 
};

class LoginPage {
  visit() {
    cy.visit('/');
  }

  isLoaded() {
    cy.get(LOCATORS.username).should('be.visible');
  }

  typeUsername(value: string) {
    cy.get(LOCATORS.username).clear().type(value);
  }

  typePassword(value: string) {
    cy.get(LOCATORS.password).clear().type(value);
  }

  submit() {
    cy.get(LOCATORS.submitBtn).click();
  }

  passwordShouldBeMasked() {
    cy.get(LOCATORS.password).should('have.attr', 'type', 'password');
  }

  assertRequiredAt(index: number, text: string) {
    cy.get(LOCATORS.requiredMsg).eq(index).should('contain', text);
  }

  assertInvalidCredentials(text: string) {
    cy.contains(text).should('be.visible');
  }

  openUserDropdown() {
    cy.get(LOCATORS.userDropdown, { timeout: 10000 })
      .should('be.visible')
      .click();
  }

  clickLogout() {
    cy.get(LOCATORS.logoutOption)
      .contains('Logout', { matchCase: false })
      .click({ force: true });
  }

  verifyLogout() {
    cy.url().should('include', '/auth/login');
    cy.get(LOCATORS.submitBtn).should('be.visible');
  }

  logout() {
    this.openUserDropdown();
    this.clickLogout();
    this.verifyLogout();
  }
}

export default new LoginPage();
