class loginPage {
    elements = {
        usernameInput: () => cy.get('#username'),
        passwordInput: () => cy.get('#password'),
        loginButton: () => cy.get('#submit'),
        errorLabel: () => cy.get('#error')
    }

    enterUsername(username) {
        this.elements.usernameInput().clear();
        this.elements.usernameInput().type(username);
    }

    enterPassword(password) {
        this.elements.passwordInput().clear();
        this.elements.passwordInput().type(password);
    }

    clickButton() {
        this.elements.loginButton().click();
    }
}

export default loginPage;