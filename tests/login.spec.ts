import { test, expect } from '../fixtures/login';
import { validUser, invalidUser, empty } from '../test-data/users';
import { ForgotPasswordPage1 } from '../pages/ForgotPasswordPage';

test.describe('Login Tests', () => {
  test('Login with valid credentials', async ({ loginpage, page }) => {
    await loginpage.login(validUser.Username, validUser.Password);
    await page.waitForURL('**/dashboard/index', { timeout: 30_000 });
    await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
  });

  test('Login with invalid credentials', async ({ loginpage, page }) => {
    await loginpage.login(invalidUser.username, invalidUser.password);
    await expect(page.getByText('Invalid credentials')).toBeVisible();
  });

  test('Login with empty username and password', async ({ loginpage, page }) => {
    await loginpage.login(empty.username, empty.password);
    await expect(page.getByText('Required')).toHaveCount(2);
  });

  test('Forgot password', async ({ page }) => {
    await ForgotPasswordPage1(page).clickOnForgotYourPassword();
    await expect(page).toHaveURL(/requestPasswordResetCode/, { timeout: 30_000 });
    await expect(page.locator('.orangehrm-forgot-password-wrapper')).toBeVisible();

    await ForgotPasswordPage1(page).clickOnCancel();
    await expect(page).toHaveURL(/\/web\/index\.php\/auth\/login$/);

    await ForgotPasswordPage1(page).clickOnForgotYourPassword();
    await ForgotPasswordPage1(page).fillUserName(empty.username);
    await ForgotPasswordPage1(page).clickOnResetPassword();
    await expect(page.getByText('Required')).toBeVisible();

    await ForgotPasswordPage1(page).fillUserName(validUser.Username);
    await ForgotPasswordPage1(page).clickOnResetPassword();
    await expect(page).toHaveURL(/requestPasswordResetCode|sendPasswordReset/, { timeout: 30_000 });
  });
});
