import { expect, type Locator, type Page } from '@playwright/test';

export class TodoPage {
  readonly newTodo: Locator;
  readonly items: Locator;
  readonly clearCompleted: Locator;

  constructor(private readonly page: Page) {
    this.newTodo = page.getByPlaceholder('What needs to be done?');
    this.items = page.getByTestId('todo-item');
    this.clearCompleted = page.getByRole('button', { name: 'Clear completed' });
  }

  async open(): Promise<void> {
    await this.page.goto('./');
  }

  async addTodo(title: string): Promise<void> {
    await this.newTodo.fill(title);
    await this.newTodo.press('Enter');
  }

  async completeTodo(title: string): Promise<void> {
    const item = this.items.filter({ hasText: title });
    await item.getByRole('checkbox').check();
    await expect(item).toHaveClass(/completed/);
  }

  async deleteTodo(title: string): Promise<void> {
    const item = this.items.filter({ hasText: title });
    await item.hover();
    await item.locator('button.destroy').click();
    await expect(item).toHaveCount(0);
  }

  async expectTodo(title: string): Promise<void> {
    await expect(this.items.filter({ hasText: title })).toBeVisible();
  }
}
