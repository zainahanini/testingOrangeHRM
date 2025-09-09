describe("OrangeHRM Login", () => {
    beforeEach(() => {
        cy.visit("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login")
    
    });

    it("TC01: Should log in successfully with valid username and password", ()    => {
        cy.get("input[name='username']").type("Admin");
        cy.get("input[name='password']").type("admin123");
        cy.get("button[type='submit']").click();
        cy.contains("Dashboard").should("be.visible");
    })

    it("TC02: Should show error for valid username and invalid password", () => {
        cy.get("input[name='username']").type("Admin");
        cy.get("input[name='password']").type("wrongpass");
        cy.get("button[type='submit']").click();
        cy.contains("Invalid credentials").should("be.visible");
    })

    it("TC03: Should show error for invalid username and valid password", () => {
         cy.get("input[name='username']").type("WrongUser");
        cy.get("input[name='password']").type("admin123");
        cy.get("button[type='submit']").click();
        cy.contains("Invalid credentials").should("be.visible");
    })

    it("TC04: Should show error for invalid username and invalid password", () => {
         cy.get("input[name='username']").type("WrongUser");
        cy.get("input[name='password']").type("wrongpass");
        cy.get("button[type='submit']").click();
        cy.contains("Invalid credentials").should("be.visible");
    })

    it("TC05: Should show required message when username is empty and password is valid", () => {
        //cy.get("input[name='username']").type(" ");
        cy.get("input[name='password']").type("admin123");
        cy.get("button[type='submit']").click();
        cy.contains("Required").should("be.visible");
    })

    it("TC06: Should show required message when username is empty and password is invalid", () => {
        //cy.get("input[name='username']").type(" ");
        cy.get("input[name='password']").type("wrongpass");
        cy.get("button[type='submit']").click();
        cy.contains("Required").should("be.visible");
    })

    it("TC07: Should show required message when password is empty and username is valid", () =>{
        cy.get("input[name='username']").type("Admin");
        //cy.get("input[name='password']").type(" ");
        cy.get("button[type='submit']").click();
        cy.contains("Required").should("be.visible");
    })

    it("TC08: Should show required message when password is empty and username is invalid", () =>{
        cy.get("input[name='username']").type("WrongUser");
      //  cy.get("input[name='password']").type(" ")
        cy.get("button[type='submit']").click();
        cy.contains("Required").should("be.visible");

    })

    it("TC09: Should show required messages when both username and password are empty", () =>{
        // cy.get("input[name='username']").type(" ");
        // cy.get("input[name='password']").type(" ")
        cy.get("button[type='submit']").click();
        cy.contains("Required").should("be.visible");
    })

    it("TC10: Should mask password input by default", () => {
        cy.get("input[name='password']").should("have.prop", "type", "password");
    })
});