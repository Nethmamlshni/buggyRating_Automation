import { Page, Locator,expect} from '@playwright/test';

export class Logout {
    readonly page:Page;
    readonly login:Locator;
    readonly password:Locator;
    readonly loginbutton:Locator;
    readonly confirmLogin:Locator;
    readonly logout:Locator;
    readonly confirmLogout:Locator;

    constructor(page:Page){
        this.page=page;
        this.login=page.getByRole('textbox',{name:'Login'});
        this.password=page.locator('input[name="password"]')
        this.loginbutton=page.getByRole('button',{name:'Login'});
        this.confirmLogin=page.locator('a[href="/profile"]')
        this.logout=page.getByRole('link',{name:'Logout'});
        this.confirmLogout=page.getByRole('button',{name:'Login'});
    }

    async goto(){
        await this.page.goto(process.env.WebName!);
        console.log('Naviagte to the page');
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

    async logoutUser(){
         await this.logout.click();
         console.log('Logout link clicked');
    }

    async confirmLogouts(){
        if (await this.confirmLogout.isVisible()){
                await expect(this.confirmLogout).toBeVisible({ timeout:1000});
                console.log('User logged out successfully');
        }else {
            await this.page.screenshot({path:`./screenshots/userLogout${Date.now()}.png`});
            console.log('User logout failed');
        }
   
    }

   
}