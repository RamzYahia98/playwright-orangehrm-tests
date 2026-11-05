import { test, expect } from '../fixtures/login'
import { validUser, invalidUser, empty, userNameWhileResetPassword } from '../test-data/users';
import { ForgotPasswordPage1 } from '../pages/ForgotPasswordPage';
import { LoginPage1 } from '../pages/Login';


test.describe('Login Tests', () => {
  //valid username and valid password
  test('Login with valid credinitals', async ({ loginpage, page }) => {

    await loginpage.login(validUser.Username, validUser.Password);
    await page.waitForURL('**/dashboard/index', { timeout: 30_000 });
    await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();


  })

  //invalid username and invalid password 
  test('Login with invalid credinitals', async ({ loginpage, page }) => {

    await loginpage.login(invalidUser.username, invalidUser.password);
    await expect(page.getByText('Invalid credentials')).toBeVisible()

  })

  //empty username and empty password
  test('Login with empty username and empty password', async ({ loginpage, page }) => {

    await loginpage.login(empty.username, empty.password);
    await expect(page.getByText('Required')).toHaveCount(2)

  })
  //forgot password

  test('Forgot password', async ({ loginpage, page }) => {

    ForgotPasswordPage1(page).clickOnForgotYourPassword();
    await expect(page).toHaveURL(/requestPasswordResetCode/)

    await expect(page.locator('.orangehrm-forgot-password-wrapper')).toBeVisible()
    //click on cancel button 

    ForgotPasswordPage1(page).clickOnCancel();
    await expect(page).toHaveURL('/web/index.php/auth/login')

    ForgotPasswordPage1(page).clickOnForgotYourPassword();
    //empty username and click on reset password

    await ForgotPasswordPage1(page).fillUserName(empty.username)
    await ForgotPasswordPage1(page).clickOnResetPassword()
    await expect(page.getByText('Required')).toBeVisible()

    //valid username and click on reset password
    await ForgotPasswordPage1(page).fillUserName(validUser.Username)
    await ForgotPasswordPage1(page).clickOnResetPassword()

  })





})