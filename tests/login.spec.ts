import { test, expect} from '@playwright/test';

//first test case
test('user can login with valid credentials', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');

    await page.getByPlaceholder('Username').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.getByRole('button', { name: 'Login' }).click();
    //await page.locator('[data-test="login-button"]').click();

    await expect(page).toHaveURL(/inventory/);
    await expect(page.getByText('Products')).toBeVisible();
});

test('shows an error for a wrong password', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');

    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('123456');
    await page.locator('[data-test="login-button"]').click();

    //await expect(page.locator('[data-test="error"]')).toBeVisible();
    //to show the message text when the test runs
    const error = page.locator('[data-test="error"]');
    await expect(error).toBeVisible();
    await expect(error).toHaveText('Epic sadface: Username and password do not match any user in this service');

    const errorText = await error.innerText();
    await test.info().attach('Error message shown', {
        body: errorText,
        contentType: 'text/plain',
    });

    /*await test.info().attach('Error screenshot', {
        body: await page.screenshot(),
        contentType: 'image/png',
    });*/
});