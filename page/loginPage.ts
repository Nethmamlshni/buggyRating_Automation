import { Page, Locator, expect } from "@playwright/test";

export class LoginPage{
    readonly page:Page;
    readonly login:Locator;
    readonly password:Locator;
    readonly loginbutton:Locator;
    readonly confirmLogin:Locator;

    constructor(page:Page){
        this.page=page;
        this.login=page.getByRole('textbox',{name:'Login'});
        this.password=page.locator('input[name="password"]')
        this.loginbutton=page.getByRole('button',{name:'Login'});
        this.confirmLogin=page.getByRole('link', { name: 'Profile' });
    }

    async goto(){
        await this.page.goto(process.env.WebName!);
        console.log("Navigated to the application URL");
    }

    async loginUser(user:{
        Login:string,
        Password:string
    }){
        await this.login.fill(user.Login);
        await this.password.fill(user.Password);
        await this.loginbutton.click();
        console.log("Login data added successfully");
    }

    async confirmlogins(){
            await expect(this.confirmLogin).toBeVisible({ timeout: 10000 });
            console.log('User Login successfully');
    }
}