import { Page } from "@playwright/test";

class AdminPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async userManagementDropDown() {
    await this.page.getByRole("listitem").getByText('User Management').click();
    await this.page.getByRole("menuitem", { name: 'Users' }).click();
  }

  async userName(username: string) {
    const usernameInput = this.page.locator('.oxd-input-group')
      .filter({ has: this.page.getByText('Username') })
      .getByRole('textbox');

    await usernameInput.fill(username);
    return usernameInput;
  }

  async userRole(role: string) {
    const userroleOption = this.page.locator('.oxd-input-group')
      .filter({ has: this.page.getByText('User Role') })
      .locator('.oxd-select-text');

    await userroleOption.click();
    await this.page.getByRole('listbox').getByText(role).click();
    return userroleOption;
  }

  async employeeName(employeeName: string) {
    const normalizedName = employeeName.trim().replace(/\s+/g, ' ');
    const employeeInput = this.page.getByPlaceholder('Type for hints...');

    await employeeInput.pressSequentially(normalizedName, { delay: 100 });

    const option = this.page.getByRole('option')
      .filter({ hasText: normalizedName })
      .first();

    await option.waitFor({ state: 'visible', timeout: 15_000 });
    await option.click();
    return employeeInput;
  }

  async status(status: string) {
    const statusOption = this.page.locator('.oxd-input-group')
      .filter({ has: this.page.getByText('Status') })
      .locator('.oxd-select-text');

    await statusOption.click();
    await this.page.getByRole('listbox').getByText(status).click();
    return statusOption;
  }

  async search() {
    await this.page.getByRole('button', { name: 'Search' }).click();
  }

  async reset() {
    await this.page.getByRole('button', { name: 'Reset' }).click();
  }
}

export const AdminPage1 = (page: Page) => new AdminPage(page);
