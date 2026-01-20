import { test, expect } from '@playwright/test';
import loginData from '../test-Data/loginData.json';
import commentData from '../test-Data/commentData.json';
import { Comment } from '../page/commentPage';

test.describe("Add comment using valid data", () => {
    
    test("First login with valid data", async ({ page }) => {
        const comment = new Comment(page);
        for (const user of loginData) {
            await comment.goto();
            await comment.loginUser(user);
            await comment.confirmlogins();
        }

        for (const users of commentData as any[]) {
            await comment.addcomments(users);
            await comment.confirmvote();
        }
    })
    })
