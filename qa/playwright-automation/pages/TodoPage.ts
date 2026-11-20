import { expect, type Locator, type Page } from '@playwright/test';

export type TodoFilter = 'All' | 'Active' | 'Completed';

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

  async completeTodo(title: string) {
    const item = this.items.filter({ hasText: title });
    await item.getByRole('checkbox').check();
  }

  async filterBy(filter: TodoFilter) {
    await this.page.getByRole('link', { name: filter, exact: true }).click();
  }

  async expectTodo(title: string) {
    await expect(this.items.filter({ hasText: title })).toBeVisible();
  }

  async expectTodoHidden(title: string) {
    await expect(this.items.filter({ hasText: title })).toBeHidden();
  }

  async expectTodoCount(count: number) {
    await expect(this.items).toHaveCount(count);
  }
}
