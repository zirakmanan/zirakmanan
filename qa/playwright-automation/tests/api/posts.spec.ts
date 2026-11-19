import { test, expect } from '@playwright/test';

const apiBaseUrl = 'https://jsonplaceholder.typicode.com';

test.describe('JSONPlaceholder Posts API', () => {
  test('GET /posts/1 returns a valid post', async ({ request }) => {
    const response = await request.get(`${apiBaseUrl}/posts/1`);
    expect(response.status()).toBe(200);

    const post = await response.json();
    expect(post).toMatchObject({
      userId: expect.any(Number),
      id: 1,
      title: expect.any(String),
      body: expect.any(String),
    });
  });

  test('GET /posts supports query filtering', async ({ request }) => {
    const response = await request.get(`${apiBaseUrl}/posts`, {
      params: { userId: 1 },
    });
    expect(response.status()).toBe(200);

    const posts = await response.json();
    expect(Array.isArray(posts)).toBe(true);
    expect(posts.length).toBeGreaterThan(0);
    expect(posts.every((post: { userId: number }) => post.userId === 1)).toBe(true);
  });

  test('POST /posts creates a post-shaped response', async ({ request }) => {
    const response = await request.post(`${apiBaseUrl}/posts`, {
      data: { title: 'Playwright API test', body: 'Created by an automated test', userId: 1 },
    });
    expect(response.status()).toBe(201);

    const created = await response.json();
    expect(created).toMatchObject({
      title: 'Playwright API test',
      body: 'Created by an automated test',
      userId: 1,
    });
    expect(created.id).toBeTruthy();
  });
});
