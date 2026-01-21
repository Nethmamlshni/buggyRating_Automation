import { Page, Locator, expect } from "@playwright/test";

export class LoginPage {
    readonly page: Page;
    readonly login: Locator;
    readonly password: Locator;
    readonly loginButton: Locator;
    readonly confirmLogin: Locator;

    constructor(page: Page) {
        this.page = page;
        this.login = page.locator('input[name="email"]'); // use real selector
        this.password = page.locator('input[name="password"]');
        this.loginButton = page.getByRole('button', { name: /login/i }); // case-insensitive
        this.confirmLogin = page.getByRole('link', { name: /profile/i }); // case-insensitive
    }

    async goto() {
        await this.page.goto(process.env.WebName!);
        console.log("Navigated to the application URL");
    }

    async loginUser(user: { email: string; password: string }) {
        await this.login.fill(user.email);
        await this.password.fill(user.password);
        await Promise.all([
            this.page.waitForNavigation({ waitUntil: 'networkidle' }),
            this.loginButton.click(),
        ]);
        console.log("Login data submitted successfully");
    }

    async confirmLoginVisible() {
        await expect(this.confirmLogin).toBeVisible({ timeout: 10000 });
        console.log("User login verified successfully");
    }
}
