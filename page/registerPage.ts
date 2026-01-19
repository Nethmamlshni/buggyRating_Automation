import { Page, Locator, expect} from '@playwright/test';


export class RegisterPage{
    readonly page:Page;
    readonly register:Locator;
    readonly login:Locator;
    readonly firstname:Locator;
    readonly lastname:Locator;
    readonly password:Locator;
    readonly confirmpassword:Locator;
    readonly confirmregister:Locator;
    readonly notification:Locator;
    readonly badNortification:Locator;

    constructor(page: Page){
        this.page= page;
        this.register = page.getByRole('link',{name:'Register'});
        this.login= page.locator('#username');
        this.firstname = page.locator('#firstName');
        this.lastname = page.locator('#lastName');
        this.password = page.locator('#password');
        this.confirmpassword = page.locator('#confirmPassword');
        this.confirmregister = page.getByRole('button',{name:'Register'});
        this.notification = page.getByText('Registration is successful');
        this.badNortification = page.getByText('UsernameExistsException: User already exists');
    }

    async goto(){
        await this.page.goto(process.env.WebName!);
        console.log('Navigated to the application URL');
    }

    async registeruser(user:{
        Login:string,
        FirstName:string,
        LastName:string,
        Password:string,
        ConfirmPassword:string
    }){
        await this.register.click();
        await this.login.fill(user.Login);
        await this.firstname.fill(user.FirstName);
        await this.lastname.fill(user.LastName);
        await this.password.fill(user.Password);
        await this.confirmpassword.fill(user.ConfirmPassword);
        await this.confirmregister.click();
        console.log('User data added successfully');
    }

    async confirmUserRegister(){
       if (await this.notification.isVisible()){
        await expect(this.notification).toBeVisible();
        console.log('User registered successfully');
       }else{
        await expect(this.badNortification).toBeVisible();
        await this.page.screenshot({path:`./screenshots/userRegistrationFailed${Date.now()}.png`});
        console.log('User registration failed');

       }
    }

}