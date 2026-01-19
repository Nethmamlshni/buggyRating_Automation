import { test } from '@playwright/test';
import {Logout  } from '../page/logoutPage';
import loginData from '../test-Data/loginData.json';

test.describe("user valid logout",()=>{
    for (const user of loginData){
        test ('User login and logout with valid data', async ({ page })=>{
            const logout = new Logout (page);
            await logout.goto();
            await logout.loginUser(user);
            await logout.confirmlogins();
            await logout.logoutUser();
            await logout.confirmLogouts();

        });
    }
    })