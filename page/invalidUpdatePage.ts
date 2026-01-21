import { Page, Locator, expect } from '@playwright/test';

export class InvalidProfile{
    readonly page:Page;
    readonly login:Locator;
    readonly password:Locator;
    readonly loginbutton:Locator;
    readonly confirmLogin:Locator;
    readonly age:Locator;
    readonly ageAlert:Locator;
    readonly phone:Locator;
    readonly save:Locator;
    readonly pass:Locator;

    constructor (page:Page){
        this.page=page;
        this.login=page.getByRole('textbox',{name:'Login'});
        this.password=page.locator('input[name="password"]')
        this.loginbutton=page.getByRole('button',{name:'Login'});
        this.confirmLogin=page.locator('a[href="/profile"]');
        this.age=page.locator('#age');
        this.ageAlert=page.getByText('Age must be in the range from 0 to 95');
        this.phone=page.locator('#phone');
        this.save= page.getByRole('button',{name:'Save'});
        this.pass=page.locator('.result.alert-success').first();
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
            await this.confirmLogin.waitFor({ state: 'visible', timeout: 20000 });
            await this.confirmLogin.click();
            console.log('User Login successfully');
    }

    async additionalUpdate(user:{
        Age:string;
        Phone:string;
    }){
        await this.age.fill(user.Age);
        if (user.Age < "0" || user.Age > "95"){
            await this.page.screenshot({ path: 'invalidAgeAlert.png' });
            console.log("Invalid age alert displayed");
           
        }
        await this.age.clear();
        await this.age.fill('23');
        console.log("Valid age added");
        await this.phone.fill(user.Phone);
        if (user.Phone.length < 10 || user.Phone.length > 15){
            await this.page.screenshot({ path: 'invalidPhoneAlert.png' });
            console.log("Invalid phone number added");
        }
        console.log("Additional profile data added successfully");
    }

    
    async dataSave(){
        await this.save.click();
        console.log("Profile updated successfully but invalid phone number is accepted");
    }
}
