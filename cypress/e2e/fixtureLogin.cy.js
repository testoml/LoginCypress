import homePage from "../pageObjects/homePage";

let userData;

describe('Fixture login implementation', () => {
    beforeEach(() => {
        cy.fixture('user_credentials').then((data) => {
            userData = data;
        });
        cy.visit('/');
    });

    it('Positive LogIn test', () => {
        //cy.login('student', 'Password123') change set data
        cy.login(userData.valid.username, userData.valid.password)
        cy.url().should('contain', 'practicetestautomation.com/logged-in-successfully/');
        const home = new homePage();
        home.elements.subTitleLabel().should('have.text', 'Congratulations student. You successfully logged in!');
        home.elements.logoutButton().should('have.attr', 'href', 'https://practicetestautomation.com/practice-test-login/');
    });

    it('Negative username test', () => {
        const result = cy.login(userData.invalidUsername.username, userData.invalidUsername.password, true);
        result.should('have.text', userData.invalidUsername.error);
    });

    it('Negative password test', () => {
        const result = cy.login(userData.invalidPassword.username, userData.invalidPassword.password, true);
        result.should('have.text', userData.invalidPassword.error);
    });
    it('Validate empty user', () => {
        const result = cy.login(userData.emptyUser.username, userData.emptyUser.password, true);
        result.should('have.text', userData.emptyUser.error);
    });
});