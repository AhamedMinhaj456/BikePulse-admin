// cypress/e2e/leftSidebar.spec.cy.js

describe('LeftSidebar Component', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000'); // Change the URL to where your LeftSidebar component is hosted
    });
  
    it('renders the sidebar correctly', () => {
      // Check if the logo is displayed
      cy.get('.logo-container .logo-website').should('be.visible');
  
      // Check if the search bar is displayed
      cy.get('.search-bar input').should('have.attr', 'placeholder', 'Search...');
  
      // Check if the divider is displayed
      cy.get('.divider').should('exist');
  
      // Check if the white-box contains all the links
      cy.get('.white-box .list-item').should('have.length', 7);
    });
  
    it('contains correct links with icons and text', () => {
      const links = [
        { selector: 'img[alt="Shop"]', text: 'Shop Management' },
        { selector: 'img[alt="UserManagement"]', text: 'User Management' },
        { selector: 'img[alt="UserManagement"]', text: 'Admin Management' },
        { selector: 'img[alt="PaymentManagement"]', text: 'Payment Management' },
        { selector: 'img[alt="Subscription"]', text: 'Subscription Plans Management' },
        { selector: 'img[alt="Service"]', text: 'Service Plans Management' },
        { selector: 'img[alt="FaultCategory"]', text: 'Fault Category Management' },
      ];
  
      links.forEach(link => {
        cy.get(link.selector).should('be.visible');
        cy.contains('.list-item span', link.text).should('be.visible');
      });
    });
  
    it('toggles the dropdown menu', () => {
      // Click the dropdown to open it
      cy.get('.list-item.dropdown').click();
  
      // Check if the dropdown content is visible
      cy.get('.dropdown-content').should('be.visible');
      cy.get('.dropdown-content .list-item').should('have.length', 3);
  
      const dropdownLinks = [
        { selector: 'img[alt="Profile"]', text: 'Profile' },
        { selector: 'img[alt="Account Setting"]', text: 'Account Setting' },
        { selector: 'img[alt="Chat Setting"]', text: 'Chat Setting' },
      ];
  
      dropdownLinks.forEach(link => {
        cy.get(link.selector).should('be.visible');
        cy.contains('.dropdown-content .list-item span', link.text).should('be.visible');
      });
  
      // Click the dropdown again to close it
      cy.get('.list-item.dropdown').click();
  
      // Check if the dropdown content is hidden
      cy.get('.dropdown-content').should('not.exist');
    });
  
    it('navigates to correct routes when links are clicked', () => {
      const routes = [
        { linkText: 'Shop Management', route: '/shop-management' },
        { linkText: 'User Management', route: '/user-management' },
        { linkText: 'Admin Management', route: '/AdminManagementWindow' },
        { linkText: 'Payment Management', route: '/payment-management' },
        { linkText: 'Subscription Plans Management', route: '/subscription-plans' },
        { linkText: 'Service Plans Management', route: '/service-plans' },
        { linkText: 'Fault Category Management', route: '/fault-management' },
      ];
  
      routes.forEach(route => {
        cy.contains('.list-item span', route.linkText).click();
        cy.url().should('include', route.route);
        cy.go('back');
      });
  
      // Test dropdown links
      cy.get('.list-item.dropdown').click();
  
      const dropdownRoutes = [
        { linkText: 'Profile', route: '/profile' },
        { linkText: 'Account Setting', route: '/account-setting' },
        { linkText: 'Chat Setting', route: '/chat-setting' },
      ];
  
      dropdownRoutes.forEach(route => {
        cy.contains('.dropdown-content .list-item span', route.linkText).click();
        cy.url().should('include', route.route);
        cy.go('back');
      });
  
      // Close the dropdown
      cy.get('.list-item.dropdown').click();
    });
  });
  