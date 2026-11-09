import { Page } from "@playwright/test";

class AdminPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async employeeName(employeeName: string) {
    const normalizedName = employeeName.trim().replace(/\s+/g, ' ');

    const employeeInput = this.page.getByPlaceholder('Type for hints...');
    await employeeInput.pressSequentially(normalizedName, { delay: 100 });

    const option = this.page
      .locator('[role="option"]')
      .filter({ hasText: normalizedName })
      .first();

    await option.waitFor({ state: 'visible', timeout: 15000 });
    await option.click();

    return employeeInput;
  }
}

export const AdminPage1 = (page: Page) => new AdminPage(page);
