import { test, expect, type APIResponse } from '@playwright/test';

const apiBaseUrl = 'https://jsonplaceholder.typicode.com';

type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

function isPost(value: unknown): value is Post {
  if (typeof value !== 'object' || value === null) {
    return false;
  }

  const post = value as Record<string, unknown>;

  return (
    typeof post.userId === 'number' &&
    Number.isInteger(post.userId) &&
    post.userId > 0 &&
    typeof post.id === 'number' &&
    Number.isInteger(post.id) &&
    post.id > 0 &&
    typeof post.title === 'string' &&
    post.title.trim().length > 0 &&
    typeof post.body === 'string' &&
    post.body.trim().length > 0
  );
}

function isPostList(value: unknown): value is Post[] {
  return Array.isArray(value) && value.every(isPost);
}

function expectJsonResponse(response: APIResponse, status: number) {
  expect(response.status()).toBe(status);
  expect(response.headers()['content-type']).toContain('application/json');
}

test.describe('JSONPlaceholder Posts API', () => {
  test('GET /posts/1 returns a valid post', async ({ request }) => {
    const response = await request.get(`${apiBaseUrl}/posts/1`);
    expectJsonResponse(response, 200);

    const post: unknown = await response.json();
    expect(isPost(post)).toBe(true);
    if (!isPost(post)) {
      throw new Error('GET /posts/1 returned an invalid post payload.');
    }

    expect(post.id).toBe(1);
  });

  test('GET /posts supports query filtering', async ({ request }) => {
    const response = await request.get(`${apiBaseUrl}/posts`, {
      params: { userId: 1 },
    });
    expectJsonResponse(response, 200);

    const posts: unknown = await response.json();
    expect(isPostList(posts)).toBe(true);
    if (!isPostList(posts)) {
      throw new Error('GET /posts?userId=1 returned an invalid posts payload.');
    }

    expect(posts.length).toBeGreaterThan(0);
    expect(posts.every((post) => post.userId === 1)).toBe(true);
  });

  test('GET /posts returns an empty list when no user matches', async ({ request }) => {
    const response = await request.get(`${apiBaseUrl}/posts`, {
      params: { userId: 9999 },
    });
    expectJsonResponse(response, 200);

    const posts: unknown = await response.json();
    expect(isPostList(posts)).toBe(true);
    if (!isPostList(posts)) {
      throw new Error('GET /posts?userId=9999 returned an invalid posts payload.');
    }

    expect(posts).toEqual([]);
  });

  test('PUT /posts/1 replaces a post and returns the updated contract', async ({ request }) => {
    const update = {
      userId: 1,
      id: 1,
      title: 'Updated post via PUT',
      body: 'The full post was replaced by an automated test.',
    };
    const response = await request.put(`${apiBaseUrl}/posts/1`, {
      data: update,
    });
    expectJsonResponse(response, 200);

    const updated: unknown = await response.json();
    expect(isPost(updated)).toBe(true);
    if (!isPost(updated)) {
      throw new Error('PUT /posts/1 returned an invalid post payload.');
    }

    expect(updated).toEqual(update);
  });

  test('POST /posts creates a post-shaped response', async ({ request }) => {
    const response = await request.post(`${apiBaseUrl}/posts`, {
      data: { title: 'Playwright API test', body: 'Created by an automated test', userId: 1 },
    });
    expectJsonResponse(response, 201);

    const created: unknown = await response.json();
    expect(isPost(created)).toBe(true);
    if (!isPost(created)) {
      throw new Error('POST /posts returned an invalid post payload.');
    }

    expect(created).toMatchObject({
      title: 'Playwright API test',
      body: 'Created by an automated test',
      userId: 1,
    });
  });
});
