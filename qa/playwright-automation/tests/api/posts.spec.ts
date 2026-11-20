import { test, expect } from '@playwright/test';
import { PostsApi, type Post } from '../../api/PostsApi';

test.describe('JSONPlaceholder Posts API', () => {
  test('GET /posts/1 returns a valid post', async ({ request }) => {
    const api = new PostsApi(request);
    const response = await api.getPost(1);

    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toContain('application/json');

    const post = (await response.json()) as Post;
    expect(post).toMatchObject({
      userId: expect.any(Number),
      id: 1,
      title: expect.any(String),
      body: expect.any(String),
    });
    expect(post.title.length).toBeGreaterThan(0);
  });

  test('GET /posts supports query filtering', async ({ request }) => {
    const api = new PostsApi(request);
    const response = await api.getPostsByUser(1);

    expect(response.status()).toBe(200);
    const posts = (await response.json()) as Post[];
    expect(posts.length).toBeGreaterThan(0);
    expect(posts.every((post) => post.userId === 1)).toBe(true);
  });

  test('POST /posts accepts a new post payload', async ({ request }) => {
    const api = new PostsApi(request);
    const payload = {
      title: 'Playwright API test',
      body: 'Created by an automated test',
      userId: 1,
    };
    const response = await api.createPost(payload);

    expect(response.status()).toBe(201);
    expect(await response.json()).toMatchObject({ ...payload, id: expect.any(Number) });
  });

  test('GET /posts/999999 returns not found', async ({ request }) => {
    const api = new PostsApi(request);
    const response = await api.getPost(999999);

    expect(response.status()).toBe(404);
  });
});
