# Cypress Proyect

### Prerequisites:

Node.js installed on your machine. Cypress requires Node.js to run.
npm (Node Package Manager) comes bundled with Node.js.

#### Create a New Project or Navigate to Existing Project:

If you're starting a new project, create a new directory for your project.
If you're adding Cypress to an existing project, navigate to your project's root directory in your terminal.

- Initialize a New npm Project (if starting a new project):
```
npm init
```
This command initializes a new npm project with default settings.

- Install Cypress:
Run the following command in your terminal:
```
npm install cypress --save-dev
```
This installs Cypress as a development dependency in your project.

- You can add scripts to your package.json file to simplify running Cypress commands.
```
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "cypress:open": "cypress open",
    "cypress:run": "cypress run"
  },
```
Using cypress open is a convenient way to interactively develop and debug your Cypress tests.

- After Cypress has been installed, you can open it by running:
```
npm run cypress:open
```
- Modal is opened, configure E2E Testing > Continue

End-to-End (E2E) testing and Component testing are two distinct approaches to testing applications, each serving different purposes. Here's a breakdown of the differences between E2E testing and Component testing with Cypress:

Scope:

E2E Testing: E2E testing involves testing the entire application flow from the user's perspective. It covers multiple components, modules, and interactions within the application. E2E tests simulate real user behavior, including navigation between pages, interaction with UI elements, and data flow across different layers of the application.
Component Testing: Component testing, on the other hand, focuses on testing individual components or units in isolation. It verifies the functionality and behavior of specific components, such as React components, Angular directives, or Vue.js components. Component tests typically do not involve interactions with external dependencies or APIs.
Dependencies:

E2E Testing: E2E tests often require a fully deployed application with all its dependencies, including databases, APIs, and external services. They may interact with backend APIs, databases, and other external systems to simulate real-world scenarios.
Component Testing: Component tests are usually run in isolation, without external dependencies. They are primarily concerned with the behavior of individual components and do not rely on the presence of backend services or other external resources.
Speed:

E2E Testing: E2E tests tend to be slower compared to component tests because they involve testing the entire application stack. They may require setup and teardown of the entire environment, including database initialization, server startup, etc.
Component Testing: Component tests are generally faster than E2E tests since they focus on testing isolated components without the overhead of the entire application stack. They can be executed quickly, making them suitable for rapid iteration during development.
Granularity:

E2E Testing: E2E tests provide a high-level view of the application's behavior from the user's perspective. They validate end-to-end user scenarios and ensure that all integrated components work together seamlessly.
Component Testing: Component tests offer a finer-grained view of individual components. They verify the functionality and behavior of specific UI components, such as buttons, forms, or widgets, in isolation from the rest of the application.
Debugging:

E2E Testing: Debugging E2E tests can be more challenging due to their complex nature and dependence on the entire application stack. Identifying the root cause of failures may require tracing through multiple layers of the application.
Component Testing: Component tests are easier to debug since they focus on isolated components. Developers can pinpoint issues more quickly and accurately by examining the behavior of individual components in isolation.
In summary, while both E2E testing and Component testing are essential parts of a comprehensive testing strategy, they serve different purposes and target different levels of the application stack. E2E testing validates the application as a whole from the user's perspective, while Component testing verifies the behavior of individual components in isolation. Cypress supports both approaches, allowing developers to choose the most suitable testing strategy based on their specific requirements.

- Choose browser in my case I selected Chrome
- Dashboard is displayed and you are ready to start with the automation.
- Create new spec named login
- Run the spec

The installation is completed and are you ready to start with the automation

#### Create a new spec 
- Expand cypress folder from your vs code, the organization folders were created, if you don't understand some concepts related to folder structure please check this [Documentation](https://docs.cypress.io/guides/core-concepts/writing-and-organizing-tests#Folder-structure).
```
my-cypress-project/
├── cypress.json
├── cypress/
│   ├── fixtures/
│   │   └── example.json
│   ├── integration/
│   │   ├── authentication/
│   │   │   ├── login.spec.js
│   │   │   └── logout.spec.js
│   │   ├── home/
│   │   │   ├── dashboard.spec.js
│   │   │   └── sidebar.spec.js
│   │   └── products/
│   │       ├── product-list.spec.js
│   │       └── product-details.spec.js
│   ├── plugins/
│   │   └── index.js
│   ├── support/
│   │   ├── commands.js
│   │   └── index.js
│   └── videos/
└── package.json
```
Summary
cypress.json:

The cypress.json file is the main configuration file for Cypress. It contains settings such as base URL, viewport size, and other options that configure how Cypress runs your tests.
Integration Tests:

The cypress/integration directory is where you store your test files.
Group your tests into subdirectories based on features, modules, or functionalities of your application.
Use descriptive names for your test files to reflect the functionality being tested.
Support Files:

The cypress/support directory contains support files that are shared across your tests.
commands.js: Custom commands that you want to use across your tests. You can define reusable commands here to simplify your test code.
index.js or index.ts: This file is used for importing and configuring modules, plugins, or other configurations needed for your tests.
Plugins:

The cypress/plugins directory contains files for Cypress plugins.
index.js or index.ts: This file is used for loading Cypress plugins. You can configure custom plugins or extend Cypress functionality using plugins.
Fixtures:

The cypress/fixtures directory is where you store static data files (e.g., JSON, XML, CSV) that are used as test data or input for your tests.
Screenshots and Videos:

By default, Cypress generates screenshots and videos of test runs for debugging purposes.
You can configure the directories where these screenshots and videos are saved using the screenshotsFolder and videosFolder options in cypress.json.
Configuration:

Cypress allows you to configure various options using the cypress.json file.
Apart from screenshotsFolder and videosFolder, you can configure options such as baseUrl, viewportWidth, viewportHeight, etc.

### Login automation

After the installation of cypress go to login.spec.js and follow those steps

#### First aproach 
For the automation we can use this example [Page](https://practicetestautomation.com/practice-test-login/). The page mention 3 posible test cases:

Write your test case using Cypress commands to interact with the login form and verify the login 

##### Hook
```
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

### FIRST IMPLEMENTATION 
login.cy.js
```
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