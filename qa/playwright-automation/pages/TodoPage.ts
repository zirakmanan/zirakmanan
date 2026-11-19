import { expect, type Locator, type Page } from '@playwright/test';

export class TodoPage {
  readonly newTodo: Locator;
  readonly items: Locator;

  constructor(private readonly page: Page) {
    this.newTodo = page.getByPlaceholder('What needs to be done?');
    this.items = page.getByTestId('todo-item');
  }

  async open() {
    await this.page.goto('https://demo.playwright.dev/todomvc/');
  }

  async addTodo(title: string) {
    await this.newTodo.fill(title);
    await this.newTodo.press('Enter');
  }

  async expectTodo(title: string) {
    await expect(this.items.filter({ hasText: title })).toBeVisible();
  }
}
