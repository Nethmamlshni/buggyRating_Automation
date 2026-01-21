import { test } from '@playwright/test';
import invalidUpdateData from '../test-Data/invalidUpdateData.json';
import {InvalidProfile} from '../page/invalidUpdatePage';
import loginData from '../test-Data/loginData.json';

test.describe('User profile updated with invalid data', () => {
    test('user login', async ({ page }) => {
        const profile = new InvalidProfile(page);
        for (const user of loginData) {
            await profile.goto();
            await profile.loginUser(user);
            await profile.confirmlogins();
        }

        for (const users of invalidUpdateData) {
            await profile.additionalUpdate(users);
            await profile.dataSave();
        }
    })


})