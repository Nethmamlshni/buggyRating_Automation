import { test} from '@playwright/test';
import {RegisterPage} from '../page/registerPage';
import registerData from '../test-Data/registerData.json';

test.describe ('User Register with valid data',()=>{
    for(const user of registerData){
        test (`10 user register in to the sysytem ${user.FirstName}`, async ({page})=>{
            let registerPage = new RegisterPage(page);
            await registerPage.goto();
            await registerPage.registeruser(user);
            await registerPage.confirmUserRegister();
        })
    }
})