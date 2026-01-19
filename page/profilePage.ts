import { Page, Locator, expect } from '@playwright/test';

export class Profile{
    readonly page:Page;
    readonly login:Locator;
    readonly password:Locator;
    readonly loginbutton:Locator;
    readonly confirmLogin:Locator;
    readonly firstname:Locator;
    readonly lastname:Locator;
    readonly gender:Locator;
    readonly age:Locator;
    readonly address:Locator;
    readonly phone:Locator;
    readonly hobby:Locator;
    readonly currentpassword:Locator;
    readonly newpassword:Locator;
    readonly confirmpassword:Locator;
    readonly language:Locator;
    readonly save:Locator;
    readonly pass:Locator;

    constructor (page:Page){
        this.page=page;
        this.login=page.getByRole('textbox',{name:'Login'});
        this.password=page.locator('input[name="password"]')
        this.loginbutton=page.getByRole('button',{name:'Login'});
        this.confirmLogin=page.locator('a[href="/profile"]');
        this.firstname=page.locator('#firstName');
        this.lastname=page.locator('#lastName');
        this.gender=page.locator('#gender');
        this.age=page.locator('#age');
        this.address=page.locator('#address');
        this.phone=page.locator('#phone');
        this.hobby=page.locator('#hobby');
        this.currentpassword=page.locator('#currentPassword');
        this.newpassword=page.locator('#newPassword');
        this.confirmpassword=page.locator('#newPasswordConfirmation');
        this.language=page.locator('#language');
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

    async basicUpdate(user:{
        firstName:string;
        lastName:string;
    }){
        await this.firstname.fill(user.firstName);
        await this.lastname.fill(user.lastName);
        console.log('Basic profile data updated');
    }

    async additionalUpdate(user:{
        Gender:string;
        Age:string;
        Address:string;
        Phone:string;
        hobby:string;
    }){
        await this.gender.fill(user.Gender);
        await this.age.fill(user.Age);
        await this.address.fill(user.Address);
        await this.phone.fill(user.Phone);
        await this.hobby.selectOption({ label: user.hobby });
        console.log('Additional profile data updated');
    }

    async passwordUpdate(user:{
        currentPassword:string;
        newPassword:string;
        confirmPassword:string;
    }){
        await this.currentpassword.fill(user.currentPassword);
        await this.newpassword.fill(user.newPassword);
        await this.confirmpassword.fill(user.confirmPassword);
        console.log('Password data updated');
    }

    async languageUpdate(user:{
        Language:string;
    }){
        await this.language.selectOption(user.Language);
        console.log('Language updated');
    }

    async dataSave(){
        await this.save.click();
        console.log("Profile updated successfully");
    }
}
