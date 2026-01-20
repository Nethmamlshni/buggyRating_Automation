import { Page, Locator, expect } from '@playwright/test';

export class Comment{
    readonly page:Page;
    readonly login:Locator;
    readonly password:Locator;
    readonly loginbutton:Locator;
    readonly confirmLogin:Locator;
    readonly listall:Locator;
    readonly viewmore:Locator;
    readonly addcomment:Locator;
    readonly vote:Locator;
    readonly displaycomment:Locator;

    constructor(page:Page){
        this.page=page;
        this.login=page.getByRole('textbox',{name:'Login'});
        this.password=page.locator('input[name="password"]')
        this.loginbutton=page.getByRole('button',{name:'Login'});
        this.confirmLogin=page.getByRole('link', { name: 'Profile' });
        this.listall=page.locator("//img[@src='/img/overall.jpg']");
        this.viewmore=page.locator("//a[text()='AVENTADOR']");
        this.addcomment=page.locator("//textarea[@id='comment']");
        this.vote=page.locator("//button[text()='Vote!']");
        this.displaycomment=page.locator("//table/tbody/tr[1]/td[1]");
    }

    async goto(){
        await this.page.goto(process.env.WebName!);
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

    async addcomments(user:{
        message:string
    }){
        await this.listall.click();
        await this.viewmore.click();
        await this.addcomment.fill(user.message);
        await this.vote.click();
        console.log('Comment added');
    }

    async confirmvote(){
        await expect(this.displaycomment).toBeVisible({ timeout: 10000 });
        console.log('Vote confirmed successfully');
    }

    

}