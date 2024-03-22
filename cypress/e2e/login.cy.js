describe('Login Test', () => {
    beforeEach(() => {
      cy.visit('https://practicetestautomation.com/practice-test-login/');
    });
  
    it('Positive LogIn test', () => {
        cy.get('input[name="username"]').type('student');
        cy.get('input[name="password"').type('Password123');
        cy.get('#submit').click();
        cy.url().should('contain', 'practicetestautomation.com/logged-in-successfully/');
        cy.get('strong').should('have.text', 'Congratulations student. You successfully logged in!');
        cy.contains('Log out').should('have.attr', 'href', 'https://practicetestautomation.com/practice-test-login/')
    });
  
    it('Negative username test', () => {  
        cy.get('input[name="username"]').type('incorrectUser');
        cy.get('input[name="password"').type('Password123');
        cy.get('#submit').click();
        cy.get('#error').should('have.text', 'Your username is invalid!');
    });
  
    it('Negative password test', ()=>{
        cy.get('input[name="username"]').type('student');
        cy.get('input[name="password"').type('Password1234');
        cy.get('#submit').click();
        cy.get('#error').should('have.text', 'Your password is invalid!');
    });
  });