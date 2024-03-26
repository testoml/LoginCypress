class homePage {

    elements = {
        titleLabel: () => cy.get('.post-title'),
        subTitleLabel: () => cy.get('.post-content strong'),
        logoutButton: () => cy.contains('Log out')
    }

    logoutClick() {
        this.elements.logoutButton().click();
    }
}

export default homePage;