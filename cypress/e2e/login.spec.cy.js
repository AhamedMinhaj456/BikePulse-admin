describe('Admin Login and Registration', () => {
  it('Logs in an admin successfully', () => {
    cy.visit('http://localhost:3000');  

    cy.get('.login-form input[type="text"]').type('admin@example.com');
    cy.get('.login-form input[type="password"]').type('password');
    cy.get('.login-form button[type="submit"]').click();

    cy.url().should('include', '/admin/dashboard');
    cy.contains('h1', 'Welcome to Admin Dashboard').should('be.visible');
  });

  it('Displays an error message for incorrect login', () => {
    cy.visit('http://localhost:3000');  

    cy.get('.login-form input[type="text"]').type('wrongadmin@example.com');
    cy.get('.login-form input[type="password"]').type('wrongpassword');
    cy.get('.login-form button[type="submit"]').click();
  });

  it('Registers a new admin successfully', () => {
    cy.visit('http://localhost:3000');  

    cy.get('.signup-form input[type="text"]').first().type('New Admin');
    cy.get('.signup-form input[type="email"]').type('newadmin@example.com');
    cy.get('.signup-form input[type="password"]').type('newpassword');
    cy.get('.signup-form input[type="text"]').last().type('Admin Role'); 
    cy.get('.signup-form button[type="submit"]').click();

    cy.url().should('include', '/admin/dashboard');
    cy.contains('h1', 'Welcome to Admin Dashboard').should('be.visible');
  });

  it('Displays an error message for failed registration', () => {
    cy.visit('http://localhost:3000');  

    cy.get('.signup-form input[type="text"]').first().type('Existing Admin');
    cy.get('.signup-form input[type="email"]').type('admin@example.com');  
    cy.get('.signup-form input[type="password"]').type('password');
    cy.get('.signup-form input[type="text"]').last().type('Admin Role');
    cy.get('.signup-form button[type="submit"]').click();

  });
});
