import { test } from '@playwright/test';
import { LoginPage } from '../page/loginPage';
import loginData from '../test-Data/loginData.json';

test.describe("User Login", () => {

    loginData.forEach((user, index) => {
        test(`User Login with valid data - ${user.Login} [${index}]`, async ({ page }) => {
            const loginPage = new LoginPage(page);

            await loginPage.goto();

            await loginPage.loginUser(user);

            await loginPage.confirmLoginVisible();
        });
    });

});
