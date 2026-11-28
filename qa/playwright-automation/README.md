# Playwright QA Automation Framework

A TypeScript-based UI and REST API automation project built with Playwright Test.

## Coverage

| Layer | Scenarios |
| --- | --- |
| UI | Create, edit, complete, delete, filter, and clear completed tasks |
| API | Retrieve a post, filter posts (including empty results), validate and create a post-shaped response |

## Quick start

Requirements: Node.js 24+ and npm.

```bash
npm install
npx playwright install chromium
npm run typecheck
npm test
```

## Useful commands

- `npm test` — run the full suite
- `npm run test:ui-tests` — run browser tests
- `npm run test:api` — run API tests
- `npm run typecheck` — validate TypeScript
- `npm run report` — open the latest HTML report

## Engineering practices

- Page Object Model keeps UI selectors and actions reusable.
- Role, placeholder, and test-id locators make UI intent clear.
- Playwright's auto-retrying assertions reduce timing-related flakiness.
- CI validates TypeScript before running browser and API tests.
- Screenshots, videos, traces, and HTML reports support failure investigation.

## CI schedule

GitHub Actions runs daily at 12:00 UTC (7:00 AM EST / 8:00 AM EDT), and on relevant pushes, pull requests, and manual dispatch.

## Test services

The UI suite uses the public Playwright TodoMVC demo. API tests use JSONPlaceholder; its POST endpoint simulates creation and does not persist data.
