import homePage from "../pageObjects/homePage";

describe('Login Test', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Positive LogIn test', () => {
    cy.login('student', 'Password123')// change previous implemention for login_v1('student', 'Password123');
    cy.url().should('contain', 'practicetestautomation.com/logged-in-successfully/');
    const home = new homePage();
    home.elements.subTitleLabel().should('have.text', 'Congratulations student. You successfully logged in!');
    home.elements.logoutButton().should('have.attr', 'href', 'https://practicetestautomation.com/practice-test-login/');
  });

  it('Negative username test', () => {
    const result = cy.login('incorrectUser', 'Password123', true);
    //login.elements.errorLabel().should('have.text', 'Your username is invalid!');
    result.should('have.text', 'Your username is invalid!');
  });

  it('Negative password test', () => {
    const result = cy.login('student', 'Password1234', true);
    result.should('have.text', 'Your password is invalid!');
  });

  it('Validate empty user', () => {
    const result = cy.login('', '', true);
    result.should('have.text', 'Your username is invalid!');
  });
});