import { test, expect } from '@playwright/test';
import { TodoPage } from '../../pages/TodoPage';

test.describe('TodoMVC - core user journeys', () => {
  test('user can add a task', async ({ page }) => {
    const todo = new TodoPage(page);
    await todo.open();
    await todo.addTodo('Prepare Playwright portfolio');
    await todo.expectTodo('Prepare Playwright portfolio');
    await expect(todo.items).toHaveCount(1);
  });

  test('user can complete a task', async ({ page }) => {
    const todo = new TodoPage(page);
    await todo.open();
    await todo.addTodo('Review API automation');
    await todo.completeTodo('Review API automation');
  });

  test('user can delete a task', async ({ page }) => {
    const todo = new TodoPage(page);
    await todo.open();
    await todo.addTodo('Remove obsolete test task');
    await todo.deleteTodo('Remove obsolete test task');
  });
});
