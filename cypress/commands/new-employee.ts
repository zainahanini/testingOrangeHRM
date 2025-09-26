import PimPage from "../support/pages/pim-page.js";

declare global {
  namespace Cypress {
    interface Chainable {
      addEmployee(first: string, middle: string, last: string, empId: string): Chainable<void>
    }
  }
}
Cypress.Commands.add(
  "addEmployee",
  (first: string, middle: string, last: string, empId: string) => {
    PimPage.openPIMModule();
    PimPage.openAddEmployeeTab();
    PimPage.typeFirstName(first);
    PimPage.typeMiddleName(middle);
    PimPage.typeLastName(last);
   // PimPage.typeEmpId(empId);
    PimPage.clickSave();
    PimPage.assertPersonalDetailsVisible();
  }
);
