import { test } from '@playwright/test';
import profileData from '../test-Data/profileData.json';
import { Profile } from '../page/profilePage';
import loginData from '../test-Data/loginData.json';

test.describe('User profile updated with valid data', () => {
    test('user login', async ({ page }) => {
        const profile = new Profile(page);
        for (const user of loginData) {
            await profile.goto();
            await profile.loginUser(user);
            await profile.confirmlogins();
        }

        for (const users of profileData) {
            await profile.basicUpdate(users);
            await profile.additionalUpdate(users);
            await profile.passwordUpdate(users);
            await profile.languageUpdate(users);
            await profile.dataSave();
        }
    })


})