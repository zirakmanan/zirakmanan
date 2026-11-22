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

  test('user cannot add empty or whitespace-only tasks', async ({ page }) => {
    const todo = new TodoPage(page);
    await todo.open();
    await todo.addTodo('');
    await todo.addTodo('   ');

    await todo.expectTodoCount(0);
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

  test('user can edit a task without creating a duplicate', async ({ page }) => {
    const todo = new TodoPage(page);
    await todo.open();
    await todo.addTodo('Draft task');
    await todo.editTodo('Draft task', 'Updated task');

    await todo.expectTodo('Updated task');
    await todo.expectTodoHidden('Draft task');
    await todo.expectTodoCount(1);
  });

  test('user can clear completed tasks without removing active tasks', async ({ page }) => {
    const todo = new TodoPage(page);
    await todo.open();
    await todo.addTodo('Keep this active task');
    await todo.addTodo('Remove this completed task');
    await todo.completeTodo('Remove this completed task');

    await todo.clearCompleted();

    await todo.expectTodo('Keep this active task');
    await todo.expectTodoHidden('Remove this completed task');
    await todo.expectTodoCount(1);
  });
});
