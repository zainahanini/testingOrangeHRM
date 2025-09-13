
const LOCATORS = {
  dashboardFregment : "/dashboard"
}



class DashboardPage  {
    isLoaded(){
        cy.url().should("include", LOCATORS.dashboardFregment);
    }
}

export default new DashboardPage();