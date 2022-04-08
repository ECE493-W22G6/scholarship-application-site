describe('Sign Up as organization', function () {
    beforeEach(() => {
        // cy.visit('http://localhost:3000')
    })

    it('should navigate to sign in after successful sign up as an organization', function () {
        let randomHash = (+new Date).toString(36).slice(-5).toString();

        // Landing Page
        cy.visit('http://localhost:3000');

        cy.contains('Sign up').click();
        cy.wait(100);

        // Sign Up Page
        cy.url().should('contains', 'http://localhost:3000/signup');
        cy.wait(1000);
        cy.get('input[name="firstName"]').type('TestFirstName').should('have.value', 'TestFirstName');
        cy.get('input[name="lastName"]').type('TestLastName').should('have.value', 'TestLastName');
        cy.get('input[name="email"]').type('TestEmail_' + randomHash + '@gmail.com')
            .should('have.value', 'TestEmail_' + randomHash + '@gmail.com');
        cy.get('input[name="password"]').type('1234567890Test').should('have.value', '1234567890Test');
        cy.get('[id=user-type-id]').click().get('[name=organization]').click().get('[id=user-type-id]').contains('Organization')
        cy.wait(100);

        // Successful Sign Up as Organization
        cy.get('[id=signUpFormButton]').click();
        cy.wait(1000);

        // Sign In Page as Organization
        cy.url().should('contains', 'http://localhost:3000/');

        cy.get('input[name="email"]').type('TestEmail_' + randomHash + '@gmail.com')
            .should('have.value', 'TestEmail_' + randomHash + '@gmail.com');
        cy.get('input[name="password"]').type('1234567890Test').should('have.value', '1234567890Test');
        cy.wait(100);

        // Successful Sign In as Organization
        cy.get('[id=signInFormButton]').click();
        cy.wait(1000);

        // Get welcomed to home page

        /*
        // Click Sign In Button
        cy.get('[id=signInButton]').click();

        // Click Sign Up Button
        cy.get('[id=signUpButton]').click();

        // Click Log Out Button
        cy.get('[id=logOutButton]').click();

        // Click All Scholarships Button
        cy.get('[id=allScholarshipsButton]').click();

        // Click Profile Button
        cy.get('[id=profileButton]').click();

        // Click Notifications Button
        cy.get('[id=notificationsButton]').click();

        // Click Settings Button
        cy.get('[id=settingsButton]').click();
        */

        // cy.get('[id=logOutButton]').click();
    });
});
