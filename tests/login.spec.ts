import { test , expect} from '@playwright/test';
import { LoginPage } from '../page/loginPage';
import loginData from '../test-Data/loginData.json';

test.describe("User Login ",()=>{
    for(const user of loginData){
        test("User Login with valid data ",async({page})=>{
            const loginPage = new LoginPage(page);
            await loginPage.goto();
            await loginPage.loginUser(user);
            await loginPage.confirmlogins();
        })
    }
})