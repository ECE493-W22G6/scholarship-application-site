describe('Organization', function () {
    it('should navigate to sign in and make new scholarship after successful sign up as an organization', function () {
        let randomHash = (+new Date).toString(36).slice(-5).toString();

        // Landing Page
        cy.visit('http://localhost:3000', {
            onBeforeLoad(win) {
                cy.stub(win.console, 'log').as('consoleLog')
            }
        })

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
        cy.wait(3000);

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

        // Open Profile Page and Verify the details there
        cy.url().should('contains', 'http://localhost:3000');
        cy.get('[id=profileButton]').click();
        cy.wait(1000);

        let today = new Date();
        let dueDate = (today.getMonth() < 9 ? '0' : '') + (today.getMonth() + 1) + '/' +
            (today.getDate() < 9 ? '0' : '') + (today.getDate() + 1) + '/' + today.getFullYear();

        // Click Create Scholarship
        cy.get('[id=CreateScholarshipButton]').click();
        cy.wait(1000);

        // Fill Scholarship form
        cy.get('#name').click();
        cy.get('#name').type('Test Scholarship');
        cy.get('.MuiGrid-root:nth-child(3) > .MuiFormControl-root').click();
        cy.get('#amount').type('1000');
        cy.get('#numberOfAwards').click();
        cy.get('#numberOfAwards').type('1');
        cy.get('#questons').click();
        cy.get('#questons').type('What do you like to do?; Why do you want the award?; What do you wish to do upon receiving the award');
        cy.get('#weightings').click();
        cy.get('#weightings').type('academic: 30, leadership: 40, volunteer: 30');
        cy.get('#description').click();
        cy.get('#description').type('Scholarship Test Description');

        cy.get('#mui-3').type('{backspace}');
        cy.get('#mui-3').type('{backspace}');
        cy.get('#mui-3').type('{backspace}');
        cy.get('#mui-3').type('{backspace}');
        cy.get('#mui-3').type('{backspace}');
        cy.get('#mui-3').type('{backspace}');
        cy.get('#mui-3').type('{backspace}');
        cy.get('#mui-3').type('{backspace}');
        cy.get('#mui-3').type(dueDate).should('have.value', dueDate);

        cy.get('[id=SubmitScholarship]').click();
        cy.wait(1000);

        // Open Profile Page and Verify the details there
        cy.get('[id=profileButton]').click();
        cy.wait(1000);
        cy.contains('Number of awards:') 

        // Logout
        cy.get('[id=logOutButton]').click();
    });

    it('should navigate to sign in and edit profile and change password after successful sign up as an organization', function () {
        let randomHash = (+new Date).toString(36).slice(-5).toString();

        // Landing Page
        cy.visit('http://localhost:3000', {
            onBeforeLoad(win) {
                cy.stub(win.console, 'log').as('consoleLog')
            }
        })

        // cy.get('[id=logOutButton]').click();

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
        cy.wait(3000);

        // Get welcomed to home page
        cy.get('[id=settingsButton]').click();
        // cy.url().should('contains', 'http://localhost:3000/settings');

        // cy.get('#email').type('TestEmail_' + randomHash + '@gmail.com');
        // cy.get('#password').type('1234567890Test');
        // cy.get('#new-icon-url').click();
        // cy.get('#new-icon-url').type('https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Circle-icons-computer.svg/800px-Circle-icons-computer.svg.png');
        // cy.get('#firstName').click();
        // cy.get('#firstName').click();
        // cy.get('#firstName').type('TestFirstName');
        // cy.get('#lastName').type('TestLastName');

        // cy.get('Settings').click();
        // cy.get('.MuiGrid-container').submit();

        cy.url().should('contains', 'http://localhost:3000/settings');
        cy.get('.MuiButtonBase-root:nth-child(3) .MuiTypography-root').click();
        cy.get('#old_password').click();
        cy.get('#old_password').type('1234567890Test');
        cy.get('#new_password').click();
        cy.get('#new_password').type('1234');
        cy.get('.MuiButton-contained').click();
        cy.wait(1000);

        // Logout
        cy.get('[id=logOutButton]').click();
    });

});

describe('Student', function () {

    it('should navigate to sign in and edit profile and change password after successful sign up as an organization', function () {
        let randomHash = (+new Date).toString(36).slice(-5).toString();

        // Landing Page
        cy.visit('http://localhost:3000', {
            onBeforeLoad(win) {
                cy.stub(win.console, 'log').as('consoleLog')
            }
        })

        // cy.get('[id=logOutButton]').click();

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
        cy.get('[id=user-type-id]').click().get('[name=student]').click().get('[id=user-type-id]').contains('Student')
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
        cy.wait(3000);

        // Get welcomed to home page
        cy.get('[id=settingsButton]').click();

        cy.url().should('contains', 'http://localhost:3000/settings');
        cy.get('.MuiButtonBase-root:nth-child(3) .MuiTypography-root').click();
        cy.get('#old_password').click();
        cy.get('#old_password').type('1234567890Test');
        cy.get('#new_password').click();
        cy.get('#new_password').type('1234');
        cy.get('.MuiButton-contained').click();
        cy.wait(1000);

        // Logout
        cy.get('[id=logOutButton]').click();
    });

});


describe('Judge', function () {

    it('should navigate to sign in and edit profile and change password after successful sign up as an organization', function () {
        let randomHash = (+new Date).toString(36).slice(-5).toString();

        // Landing Page
        cy.visit('http://localhost:3000', {
            onBeforeLoad(win) {
                cy.stub(win.console, 'log').as('consoleLog')
            }
        })

        // cy.get('[id=logOutButton]').click();

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
        cy.get('[id=user-type-id]').click().get('[name=judge]').click().get('[id=user-type-id]').contains('Judge')
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
        cy.wait(3000);

        // Get welcomed to home page
        cy.get('[id=settingsButton]').click();
        cy.url().should('contains', 'http://localhost:3000/settings');
        cy.get('.MuiButtonBase-root:nth-child(3) .MuiTypography-root').click();
        cy.get('#old_password').click();
        cy.get('#old_password').type('1234567890Test');
        cy.get('#new_password').click();
        cy.get('#new_password').type('1234');
        cy.get('.MuiButton-contained').click();
        cy.wait(1000);

        // Logout
        cy.get('[id=logOutButton]').click();
    });

});