describe('Admin Login Page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000'); 
  });

  it('displays the login form after clicking the emoji', () => {
    cy.get('.signup-section-home h2').should('contain', 'Sign Up');

    cy.get('.emoji').click();

    cy.get('.signup-section-home h2').should('contain', 'Login');
  });

  it('allows the admin to login with valid credentials', () => {
    cy.get('.emoji').click();

    cy.get('.signup-section-home input[type="email"]').type('admin@example.com');
    cy.get('.signup-section-home input[type="password"]').type('password123');

    cy.get('.signup-section-home form').submit();

    cy.url().should('include', '/admin/dashboard');
  });

  it('shows an error message with invalid credentials', () => {
    cy.get('.emoji').click();

    cy.get('.signup-section-home input[type="email"]').type('wrong@example.com');
    cy.get('.signup-section-home input[type="password"]').type('wrongpassword');

    cy.get('.signup-section-home form').submit();

    cy.on('window:alert', (text) => {
      expect(text).to.contains('Invalid email or password');
    });
  });

  it('toggles to sign up form when emoji is clicked', () => {
    cy.get('.signup-section-home h2').should('contain', 'Sign Up');

    cy.get('.emoji').click();

    cy.get('.signup-section-home h2').should('contain', 'Login');

    cy.get('.emoji').click();

    cy.get('.signup-section-home h2').should('contain', 'Sign Up');
  });
});
