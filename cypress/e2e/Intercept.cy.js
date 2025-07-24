describe('Intercept Test Case', () => {
  it('Intercepts and modifies a request', () => {
    cy.intercept('POST', '/web/index.php/auth/validate').as('loginRequest');
    
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    cy.get('input[name="username"]').type('Admin');
    cy.get('input[name="password"]').type('admin123');
    cy.get('button[type="submit"]').click();
    
    cy.wait('@loginRequest');
    
    cy.url().should('include', '/dashboard');
    cy.get('.oxd-topbar-header-breadcrumb > .oxd-text').should('contain', 'Dashboard');
  });

    it('Intercepts and fails a request', () => {
        cy.intercept('POST', '/web/index.php/auth/validate', {
        statusCode: 401,
        body: { message: 'Invalid credentials' }
        }).as('failedLoginRequest');
        
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
        cy.get('input[name="username"]').type('InvalidUser');
        cy.get('input[name="password"]').type('InvalidPass');
        cy.get('button[type="submit"]').click();
        
        cy.wait('@failedLoginRequest');
    });
});