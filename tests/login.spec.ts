import { test, expect} from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

//test.describe acts as test suite
test.describe('Login', () => {
    let loginPage: LoginPage; //calling object from LoginPage

    //run this before each test case
    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.goto();
    });

    //first test case
    test('user can login with valid credentials', async ({ page }) => {
        /*await page.getByPlaceholder('Username').fill('standard_user');
        await page.locator('[data-test="password"]').fill('secret_sauce');
        await page.getByRole('button', { name: 'Login' }).click();*/
        //await page.locator('[data-test="login-button"]').click();

        //calling username, password and clicking login button from LoginPage
        await loginPage.login('standard_user', 'secret_sauce'); 

        await expect(page).toHaveURL(/inventory/);
        await expect(page.getByText('Products')).toBeVisible();
    });

    //2nd test case
    test('shows an error for a wrong password', async ({ page }) => {
        //calling username, password and clicking login button from LoginPage
        await loginPage.login('standard_user', '123456');
        await expect(loginPage.errorMessage).toHaveText('Epic sadface: Username and password do not match any user in this service');

        const errorText = await loginPage.errorMessage.innerText();
        await test.info().attach('Error message shown', {
            body: errorText,
            contentType: 'text/plain',
        });
    });

    //3rd test case
    test('locked out user sees an error', async ({ page }) => {
        //calling username, password and clicking login button from LoginPage
        await loginPage.login('locked_out_user', 'secret_sauce');

        const error = page.locator('[data-test="error"]');
        await expect(error).toBeVisible();
        await expect(error).toHaveText('Epic sadface: Sorry, this user has been locked out.');

        const errorText = await error.innerText();
        await test.info().attach('Error message shown', {
            body: errorText,
            contentType: 'text/plain',
        });
    })

    //4th test case
    test('shows an error when fields are empty', async () => {
        await loginPage.loginButton.click();
        await expect(loginPage.errorMessage).toHaveText('Epic sadface: Username is required');
    });
})