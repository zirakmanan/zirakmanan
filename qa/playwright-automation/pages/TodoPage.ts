import { expect, type Locator, type Page } from '@playwright/test';

export type TodoFilter = 'All' | 'Active' | 'Completed';

export class TodoPage {
  readonly newTodo: Locator;
  readonly items: Locator;

  constructor(private readonly page: Page) {
    this.newTodo = page.getByPlaceholder('What needs to be done?');
    this.items = page.getByTestId('todo-item');
  }

  private itemByTitle(title: string) {
    const escapedTitle = title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return this.items.filter({ hasText: new RegExp(`^\\s*${escapedTitle}\\s*$`) });
  }

  async open() {
    await this.page.goto('https://demo.playwright.dev/todomvc/');
  }

  async addTodo(title: string) {
    await this.newTodo.fill(title);
    await this.newTodo.press('Enter');
  }

  async completeTodo(title: string) {
    await this.itemByTitle(title).getByRole('checkbox').check();
  }

  async clearCompleted() {
    await this.page.getByRole('button', { name: 'Clear completed' }).click();
  }

  async deleteTodo(title: string) {
    const item = this.itemByTitle(title);
    await item.hover();
    await item.locator('button.destroy').click();
  }

  async editTodo(currentTitle: string, updatedTitle: string) {
    const item = this.itemByTitle(currentTitle);
    await item.locator('label').dblclick();

    const editor = item.locator('input.edit');
    await editor.fill(updatedTitle);
    await editor.press('Enter');
  }

  async filterBy(filter: TodoFilter) {
    await this.page.getByRole('link', { name: filter, exact: true }).click();
  }

  async expectTodo(title: string) {
    await expect(this.itemByTitle(title)).toBeVisible();
  }

  async expectTodoHidden(title: string) {
    await expect(this.itemByTitle(title)).toBeHidden();
  }

  async expectTodoCompleted(title: string) {
    await expect(this.itemByTitle(title)).toHaveClass(/completed/);
  }

  async expectTodoActive(title: string) {
    await expect(this.itemByTitle(title)).not.toHaveClass(/completed/);
  }

  async expectTodoCount(count: number) {
    await expect(this.items).toHaveCount(count);
  }
}
