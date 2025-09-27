const LOCATORS = {
    leaveModule: 'a[href="/web/index.php/leave/viewLeaveModule"]',
    assignLeaveButton: 'button.oxd-button.oxd-button--medium.oxd-button--secondary',
    employeeNameInput: 'input.oxd-input.oxd-input--active',
    leaveTypeSelect: 'div.oxd-select-text.oxd-select-text--active',
    fromDateInput: 'input.oxd-input.oxd-input--active[placeholder="yyyy-mm-dd"]',
    toDateInput: 'input.oxd-input.oxd-input--active[placeholder="yyyy-mm-dd"]',
    applyButton: 'button.oxd-button.oxd-button--medium.oxd-button--secondary.orangehrm-left-space',
    leaveTableRows: 'div.oxd-table-card',
    approveButton: 'button.oxd-button.oxd-button--medium.oxd-button--secondary.orangehrm-left-space',
};

class LeavePage {
    assignLeaveEntitlement(employee: any, entitlement: any) {
        cy.get(LOCATORS.leaveModule).click();
        cy.get(LOCATORS.assignLeaveButton).click();
        cy.get(LOCATORS.employeeNameInput).type(employee.firstName);
        cy.get(LOCATORS.leaveTypeSelect).contains(entitlement.type).click();
        cy.get(LOCATORS.fromDateInput).type(entitlement.fromDate);
        cy.get(LOCATORS.toDateInput).type(entitlement.toDate);
        cy.get(LOCATORS.applyButton).click();
    }

    applyLeave(leaveRequest: any) {
        cy.get(LOCATORS.leaveModule).click();
        cy.get(LOCATORS.employeeNameInput).type(leaveRequest.employeeName);
        cy.get(LOCATORS.leaveTypeSelect).contains(leaveRequest.type).click();
        cy.get(LOCATORS.fromDateInput).type(leaveRequest.fromDate);
        cy.get(LOCATORS.toDateInput).type(leaveRequest.toDate);
        cy.get(LOCATORS.applyButton).click();
    }

    approveLeave(leaveRequest: any) {
        cy.get(LOCATORS.leaveTableRows).contains(leaveRequest.employeeName)
            .parents(LOCATORS.leaveTableRows)
            .within(() => {
                cy.get(LOCATORS.approveButton).click();
            });
    }

    checkLeaveStatus(leaveRequest: any) {
        cy.get(LOCATORS.leaveTableRows).contains(leaveRequest.employeeName)
            .should('contain.text', 'Approved');
    }
}

export default new LeavePage();