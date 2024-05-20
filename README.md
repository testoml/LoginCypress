# Login automation with Cypress

## Introduction
Automating login functionality is crucial for streamlining testing processes, improving test coverage, ensuring accuracy and reliability, enabling faster feedback loops, optimizing resource utilization, facilitating scalability, and supporting parallel testing efforts. By automating login tests, organizations can enhance the quality, efficiency, and agility of their software development lifecycle.

### Topics
- First approach (Navigate elements basic implementation)
- Second Approach - Page Object Model (POM) 
- Third approach -  Custom Command
- Last approach - Fixture 

### Prerequisites:
Node.js installed on your machine. Cypress requires Node.js to run. npm (Node Package Manager) comes bundled with Node.js.
Set up a new project if you don't have one.  
Follow those steps if you are new [Cypress Installation](https://www.cypress.io/install)

## First approach 
- For the automation we can use this example [Page](https://practicetestautomation.com/practice-test-login/). The page mention 3 posible test cases:
- Write your test case using Cypress commands to interact with the login form and verify the login 
- In e2e folder create a new spec called login.cy.js 

##### Hook
```sh
describe('Login Test', () => {
  beforeEach(() => {
    // Runs before each test in this describe block
  });

  it('Positive LogIn test', () => {
    //test case 1
  });

  it('Negative username test', () => {  
    //test case 2
  });

  it('Negative password test', ()=>{
    //test case 2
  });
});
```

After defining various possible scenarios for interacting with the login feature, we'll begin with a broad implementation. Subsequently, we'll explore how our project evolves and optimizes the automation process by incorporating new concepts.

### Navigate elements basic implementation
In login.cy.js 
```javascript
//Hook
  beforeEach(() => {
    // Runs before each test in this describe block
    cy.visit('https://practicetestautomation.com/practice-test-login/');
  });

  it('Positive LogIn test', () => {
    //test case 1
    cy.get('input[name="username"]').type('student');
    cy.get('input[name="password"').type('Password123');
    cy.get('#submit').click();
    cy.url().should('contain', 'practicetestautomation.com/logged-in-successfully/');
    cy.get('strong').should('have.text', 'Congratulations student. You successfully logged in!');
    cy.contains('Log out').should('have.attr', 'href', 'https://practicetestautomation.com/practice-test-login/')
  });

  it(' Negative username test', () => {  
    //test case 2
    cy.get('input[name="username"]').type('incorrectUser');
    cy.get('input[name="password"').type('Password123');
    cy.get('#submit').click();
    cy.get('#error').should('have.text', 'Your username is invalid!');
  });

  it('Negative password test', ()=>{
    //test case 3
    cy.get('input[name="username"]').type('student');
    cy.get('input[name="password"').type('Password1234');
    cy.get('#submit').click();
    cy.get('#error').should('have.text', 'Your password is invalid!');
  });
});
```
### Detail of approachment
- **beforeEach() Function**:
    - This function is executed before each test case within the describe block.
  - It ensures that the web page specified by the URL ('https://practicetestautomation.com/practice-test-login/') is visited before each test runs.
  - This helps in setting up a consistent starting point for each test case, ensuring that tests are executed in a predictable environment.
- **Test Case 1 - Positive LogIn test**:
  - This test case validates a successful login scenario.
  - It fills in the username and password fields with valid credentials using cy.get().type().
  - It then clicks the login button (#submit).
  - After successful login, it verifies that the URL contains a specific string indicating a successful login ('practicetestautomation.com/logged-in-successfully/').
  - It also verifies that a specific success message is displayed on the page ('Congratulations student. You successfully logged in!').
  - Lastly, it ensures that a 'Log out' link is present with the correct href attribute.
- **Test Case 2 - Negative username test:**
    - This test case validates the scenario where an incorrect username is provided.
    - It fills in the username field with an incorrect username ('incorrectUser') and a valid password.
    - It clicks the login button.
    - It verifies that an error message is displayed on the page indicating that the username is invalid ('Your username is invalid!').

- **Test Case 3 - Negative password test**:
    - This test case validates the scenario where an incorrect password is provided.
    - It fills in the username field with a valid username ('student') and an incorrect - password ('Password1234').
    - It clicks the login button.
    - It verifies that an error message is displayed on the page indicating that the password is invalid ('Your password is invalid!').

Run and verify the implementation is working
```sh
npm run cypress:open
```

## Second Approach - Page Object Model (POM) 

In Cypress, the Object Page Model (OPM) is a design pattern used for organizing and structuring test code to improve maintainability, reusability, and readability of tests. The Object Page Model is an extension of the Page Object Model (POM) commonly used in test automation.

The main idea behind the Object Page Model is to represent each page or component of a web application as an object. These objects encapsulate the behavior and elements of the corresponding page, providing a clear and modular way to interact with them in tests.

Here's a brief description of how Object Page Model works in Cypress:

- *Page Objects*: Each page or component of the application is represented by a Page Object. These objects abstract the underlying HTML structure and provide methods to interact with the elements on the page.
- *Encapsulation*: Page Objects encapsulate the details of the page, such as locators and interactions, within themselves. This allows for easier maintenance since changes to the UI can be localized within the corresponding Page Object.
- *Reusable Methods*: Page Objects expose methods that represent actions or interactions that can be performed on the page. These methods can be reused across multiple tests, promoting code reusability and reducing duplication.
- *Readability*: By using Page Objects, test code becomes more readable and self-explanatory. Test scenarios are expressed in terms of high-level actions on the page rather than low-level DOM manipulations.
- *Separation of Concerns*: Object Page Model promotes a clear separation between test code and page-specific details. Test code focuses on defining test scenarios and making assertions, while page objects handle the implementation details of interacting with the UI.
- *Modularization*: Page Objects allow for modularization of test code, enabling teams to work on different parts of the application independently without impacting each other's tests.

### Steps

Within the 'cypress' folder, establish a new directory named 'pageObjects'. Inside this directory, proceed to create two classes.
- loginPage.js
- homePage.js

#### login.page.js
```javascript
class loginPage{
    elements = {
        usernameInput : () => cy.get('#username'),
        passwordInput: () =>  cy.get('#password'),
        loginButton : () => cy.get('#submit'),
        errorLabel :()=>  cy.get('#error')
    }

    enterUsername(username){
        this.elements.usernameInput().clear();
        this.elements.usernameInput().type(username);
    }

    enterPassword(password){
        this.elements.passwordInput().clear();
        this.elements.passwordInput().type(password);
    }

    clickButton(){
        this.elements.loginButton().click();
    }
}
export default loginPage;
```

- *Class Definition*: The code starts by defining a class named loginPage.
- Elements Object: Inside the class, there's an elements object that contains methods to locate and interact with the elements on the login page. Each method uses Cypress commands to find the corresponding HTML elements by their IDs (#username, #password, #submit, #error).
- *Methods*: The class contains three methods:
  - enterUsername(username): This method takes a username parameter, clears the username input field, and then types the provided username into the input field.
  - enterPassword(password): Similar to enterUsername, this method takes a password parameter, clears the password input field, and then types the provided password into the input field.
  - clickButton(): This method clicks on the login button.
- *Usage of Elements Object*: Inside each method, the elements from the elements object are accessed using arrow functions. This allows for a more dynamic approach where the elements are re-selected each time the method is called, ensuring that the latest state of the page is reflected.
- *Encapsulation*: The methods encapsulate the interactions with the page elements, abstracting away the details of how the interactions are performed. This promotes code reusability and maintainability, as changes to the page structure can be easily managed within the page object.

#### home.page.js
```javascript
class homePage{

    elements = {
         titleLabel : () => cy.get('.post-title'),
         subTitleLabel : () => cy.get('.post-content strong'),
         logoutButton : () => cy.contains('Log out')
    }

    logoutClick(){
        this.elements.logoutButton().click();
    }
}

export default homePage;
```

Within e2e login.cy.js added the pages created previosly 
```javascript
import homePage from "../pageObjects/homePage";
import loginPage from "../pageObjects/loginPage";
```
We are going to replace part of the code with a new function called "login_v1"

```javascript
import homePage from "../pageObjects/homePage";
import loginPage from "../pageObjects/loginPage";

 const home = new homePage();
 const login = new loginPage();

function login_v1(username, password){
     login.enterUsername(username);
     login.enterPassword(password);
     login.clickButton();
}

describe('Login Test', () => {
    beforeEach(() => {
      cy.visit('https://practicetestautomation.com/practice-test-login/');
    });
  
    it('Positive LogIn test', () => {
       /* cy.get('input[name="username"]').type('student');
        cy.get('input[name="password"').type('Password123');
        cy.get('#submit').click();*/
        login_v1('student', 'Password123');
        cy.url().should('contain', 'practicetestautomation.com/logged-in-successfully/');
        //cy.get('strong').should('have.text', 'Congratulations student. You successfully logged in!');
        home.elements.subTitleLabel().should('have.text', 'Congratulations student. You successfully logged in!');
        //cy.contains('Log out').should('have.attr', 'href', 'https://practicetestautomation.com/practice-test-login/')
        home.elements.logoutButton().should('have.attr', 'href', 'https://practicetestautomation.com/practice-test-login/');
    });
  
    it('Negative username test', () => {  
        /*cy.get('input[name="username"]').type('incorrectUser');
        cy.get('input[name="password"').type('Password123');
        cy.get('#submit').click();*/
        login_v1('incorrectUser', 'Password123');
        //cy.get('#error').should('have.text', 'Your username is invalid!');
        login.elements.errorLabel().should('have.text', 'Your username is invalid!');
    });
  
    it('Negative password test', ()=>{
        /*cy.get('input[name="username"]').type('student');
        cy.get('input[name="password"').type('Password1234');
        cy.get('#submit').click();*/
        login_v1('student', 'Password1234');
        //cy.get('#error').should('have.text', 'Your password is invalid!');
        login.elements.errorLabel().should('have.text', 'Your password is invalid!');
    });
  });
```
Save all changes and check the test cases working as expected. Remove the all comment for a better visualization

## Third approach - Custom Command
Custom commands in Cypress offer several benefits that contribute to improving the efficiency, readability, and maintainability of test code:
- Abstraction of Repeated Actions: Custom commands allow you to encapsulate commonly used sequences of actions or assertions into reusable functions. This abstraction reduces code duplication and promotes a more modular approach to writing tests.
- Enhanced Readability: By creating custom commands with descriptive names, test code becomes more self-explanatory and easier to understand. This improves the readability of tests, making it simpler for developers and testers to comprehend test scenarios at a glance.
- Reduced Code Repetition: Custom commands help eliminate the need to repeatedly write the same sequences of Cypress commands throughout test suites. This leads to cleaner and more concise test code, as repetitive actions can be replaced with a single custom command invocation.
- Improved Maintenance: When application behavior or UI elements change, updating test code can be time-consuming, especially if the same actions are performed in multiple tests. With custom commands, changes only need to be made in one central location, making maintenance more efficient and reducing the risk of errors.
- Domain-Specific Language (DSL): Custom commands enable you to create a domain-specific language tailored to your application's specific requirements and conventions. This allows tests to be written in a more natural and expressive manner, closely mirroring the language used by domain experts.
- Encapsulation of Implementation Details: Custom commands abstract away the implementation details of interactions with the application under test. This separation of concerns ensures that test code focuses on defining test scenarios, while the implementation details are handled by the custom commands, promoting better code organization and maintainability.
- Facilitation of Team Collaboration: Custom commands provide a standardized interface for interacting with the application, making it easier for team members to collaborate on test automation efforts. By adhering to a consistent set of custom commands, team members can quickly understand and contribute to test suites.

### Steps
1. In support/command.js write a code for a login 
```javascript
import loginPage from "../pageObjects/loginPage";
Cypress.Commands.add('login', (username, password, validate=false) => {
    const login = new loginPage();
    if(username.length  > 0){
        login.enterUsername(username); 
    }
    if(password.length > 0){
        login.enterPassword(password);  
    }   
    login.clickButton();
    if (validate) {
        return login.elements.errorLabel();
    }
})
```
Parameter "validate" allow return error label and it will compare in spec

2. In e2e/login.cy.js, implement the created custom command and observe how it simplifies the logic.

```javascript
import homePage from "../pageObjects/homePage";

describe('Login Test', () => {
    beforeEach(() => {
      cy.visit('https://practicetestautomation.com/practice-test-login/');
    });
   
    it('Positive LogIn test', () => {
        cy.login('student', 'Password123')// change previous implemention for login_v1('student', 'Password123');
        cy.url().should('contain', 'practicetestautomation.com/logged-in-successfully/');
        const home = new homePage();
        home.elements.subTitleLabel().should('have.text', 'Congratulations student. You successfully logged in!');
        home.elements.logoutButton().should('have.attr', 'href', 'https://practicetestautomation.com/practice-test-login/');
    });
  
    it('Negative username test', () => {  
        const result =  cy.login('incorrectUser', 'Password123', true);
        //login.elements.errorLabel().should('have.text', 'Your username is invalid!');
        result.should('have.text', 'Your username is invalid!'); //result is return because validation parameter is equal true.
    });
  
    it('Negative password test', ()=>{
        const result =  cy.login('student', 'Password1234', true);
        result.should('have.text', 'Your password is invalid!');
    });

    //Validate empty user
    //1. Navigate to login page
    //2. Usernama and Password are empty
    //3. Click on Submit button
    //4. Verify error message text is Your username is invalid!
    it('Validate empty user', ()=>{
      const result =  cy.login('', '', true);
      result.should('have.text', 'Your username is invalid!');
  });
  });
```
*I added and extra verification for empty user.* 

## Last approach - Fixture 
Implementing fixtures in Cypress offers several benefits that contribute to more efficient and effective testing:
- *Data Separation*: Fixtures allow you to separate test data from test code, promoting cleaner and more maintainable test suites. This separation of concerns enhances code organization and makes it easier to manage and update test data independently of test logic.
- *Reusable Test Data*: Fixtures enable you to define test data once and reuse it across multiple tests. This reduces redundancy in test code and ensures consistency in test data usage, leading to more reliable and maintainable tests.
- *Scalability*: As the number of tests grows, managing test data becomes increasingly complex. Fixtures provide a scalable solution for managing test data by centralizing it in external files, making it easier to organize and maintain large test suites.
- *Realistic Data Scenarios*: Fixtures allow you to include realistic data scenarios in your tests, such as sample user accounts, product details, or API responses. This enhances the realism of your tests and ensures they accurately reflect real-world usage scenarios.
- *Test Data Variation*: Fixtures support the creation of multiple data variations to test different scenarios and edge cases. This enables comprehensive test coverage and helps uncover potential bugs or issues in the application under test.
- *Dynamic Test Data*: Cypress fixtures support dynamic data generation using plugins or custom scripts, allowing you to generate test data programmatically or integrate with external data sources. This flexibility enables more sophisticated testing scenarios and facilitates integration testing with dynamic data.
- *Reduced Test Maintenance*: By externalizing test data into fixtures, updates or changes to the test data can be made without modifying test code. This reduces the maintenance overhead associated with updating tests and ensures that tests remain accurate and up-to-date.
- *Security and Privacy*: Fixtures provide a secure mechanism for storing sensitive or confidential test data, such as passwords or API keys. By keeping such data separate from test code, fixtures help mitigate security risks and ensure compliance with privacy regulations.

### Fixture Setup:
- Create a fixture file (e.g., user_credentials.json) to store test user credentials.
- Define test user data in the fixture file, including usernames and passwords for various scenarios (e.g., valid login, invalid login).
```JSON
{
    "valid": {
        "username": "student",
        "password": "Password123"
    },
    "invalidUsername": {
        "username": "incorrectUser",
        "password": "Password123",
        "error": "Your username is invalid!"
    },
    "invalidPassword": {
        "username": "student",
        "password": "Password123  ",
        "error": "Your password is invalid!"
    },
    "emptyUsername": {
        "username": "",
        "password": "",
        "error": "Your username is invalid!"
    }
}
```
- Copy logic of objectPageLogin.js in a new spec (fixtureLogin.cy.js) and implement the new code for fixture approach.
- Create a global variable to get user information 
- Use the beforeEach() hook to load the fixture data before each test.
- Load the fixture containing user credentials using cy.fixture() and assign it to a variable for easy access within tests.

```javascript
import homePage from "../pageObjects/homePage";

let userData;

describe('Fixture login implementation', () => {
    beforeEach(() => {
      cy.fixture('user_credentials').then((data)=> {
             userData = data;
      });
      cy.visit('https://practicetestautomation.com/practice-test-login/');
    });
   
    it('Positive LogIn test', () => {
        //cy.login('student', 'Password123') change set data
        cy.login(userData.valid.username, userData.valid.password)
        cy.url().should('contain', 'practicetestautomation.com/logged-in-successfully/');
        const home = new homePage();
        //Assertions
        home.elements.subTitleLabel().should('have.text', 'Congratulations student. You successfully logged in!');
        home.elements.logoutButton().should('have.attr', 'href', 'https://practicetestautomation.com/practice-test-login/');
    });
  
    it('Negative username test', () => {  
        const result =  cy.login(userData.invalidUsername.username, userData.invalidUsername.password, true);
         //Assertions
        result.should('have.text', userData.invalidUsername.error);
    });
  
    it('Negative password test', ()=>{
        const result =  cy.login(userData.invalidPassword.username, userData.invalidPassword.password, true);
         //Assertions
        result.should('have.text', userData.invalidPassword.error);
    });

    it('Validate empty user', ()=>{
        const result =  cy.login(userData.emptyUser.username, userData.emptyUser.password, true);
         //Assertions
        result.should('have.text', userData.emptyUser.error);
  });
  });
```
### Extra configuration
In cypress.config.js set baseurl

```javascript
const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://practicetestautomation.com/practice-test-login',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
```
Use this configuration in your test cases
```javascript
cy.visit('/')
```
