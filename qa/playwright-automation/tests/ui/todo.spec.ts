import { test, expect } from '@playwright/test';
import { TodoPage } from '../../pages/TodoPage';

test.describe('TodoMVC - core user journeys', () => {
  test('user can add a task', async ({ page }) => {
    const todo = new TodoPage(page);
    await todo.open();
    await todo.addTodo('Prepare Playwright portfolio');
    await todo.expectTodo('Prepare Playwright portfolio');
    await todo.expectTodoCount(1);
  });

  test('user can complete a task', async ({ page }) => {
    const todo = new TodoPage(page);
    await todo.open();
    await todo.addTodo('Review API automation');
    await todo.completeTodo('Review API automation');

    const item = todo.items.filter({ hasText: 'Review API automation' });
    await expect(item).toHaveClass(/completed/);
  });

  test('user can filter completed tasks', async ({ page }) => {
    const todo = new TodoPage(page);
    await todo.open();
    await todo.addTodo('Completed task');
    await todo.addTodo('Active task');
    await todo.completeTodo('Completed task');

    await todo.filterBy('Completed');
    await todo.expectTodo('Completed task');
    await todo.expectTodoHidden('Active task');
    await todo.expectTodoCount(1);

    await todo.filterBy('Active');
    await todo.expectTodo('Active task');
    await todo.expectTodoHidden('Completed task');
    await todo.expectTodoCount(1);
  });
});
