// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
import loginPage from "../pageObjects/loginPage";
Cypress.Commands.add('login', (username, password, validate = false) => {
    const login = new loginPage();
    if (username.length > 0) {
        login.enterUsername(username);
    }
    if (password.length > 0) {
        login.enterPassword(password);
    }
    login.clickButton();
    if (validate) {
        return login.elements.errorLabel();
    }
})
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })