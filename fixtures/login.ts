import { test as base } from '@playwright/test';
import { LoginPage1 } from '../pages/Login';

type MyFixtures = {
  loginpage: ReturnType<typeof LoginPage1>;
};

export const test = base.extend<MyFixtures>({
  loginpage: async ({ page }, use) => {
    const loginPage = LoginPage1(page);
    await page.goto('/');
    await use(loginPage);
  },
});

export { expect } from '@playwright/test';