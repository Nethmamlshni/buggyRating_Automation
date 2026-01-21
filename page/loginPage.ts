import { Page, Locator, expect } from "@playwright/test";

export class LoginPage {
    readonly page: Page;
    readonly login: Locator;
    readonly password: Locator;
    readonly loginButton: Locator;
    readonly confirmLogin: Locator;

    constructor(page: Page) {
        this.page = page;

        // Update selectors to match your app
        this.login = page.locator('input[name="login"]'); // safer than getByRole
        this.password = page.locator('input[name="password"]');
        this.loginButton = page.getByRole('button', { name: /login/i }); // case-insensitive
        this.confirmLogin = page.getByRole('link', { name: /profile/i }); // case-insensitive
    }

    async goto() {
        await this.page.goto(process.env.WebName!);
        console.log("Navigated to the application URL");
    }

    async loginUser(user: { Login: string; Password: string }) {
        await this.login.fill(user.Login);
        await this.password.fill(user.Password);

        // Wait for navigation after clicking login
        await Promise.all([
            this.page.waitForNavigation({ waitUntil: 'networkidle' }),
            this.loginButton.click(),
        ]);

        console.log("Login data submitted successfully");
    }

    async confirmLoginVisible() {
        await expect(this.confirmLogin).toBeVisible({ timeout: 15000 }); // 15s timeout for slow pages
        console.log("User login verified successfully");
    }
}
