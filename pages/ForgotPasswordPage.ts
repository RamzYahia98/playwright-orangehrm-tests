import { Page } from '@playwright/test';

class ForgotPasswordPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async clickOnForgotYourPassword() {
    await this.page.getByText('Forgot your password? ').click();
  }

  async clickOnCancel() {
    await this.page.getByRole('button', { name: 'Cancel' }).click();
  }

  async clickOnResetPassword() {
    await this.page.getByRole('button', { name: 'Reset Password' }).click();
  }

  async fillUserName(username: string) {
    await this.page.getByPlaceholder('Username').fill(String(username));
  }
}

export const ForgotPasswordPage1 = (page: Page) => new ForgotPasswordPage(page);
