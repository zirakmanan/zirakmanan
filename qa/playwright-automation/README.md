# Playwright QA Automation Framework

A portfolio project demonstrating end-to-end UI automation and REST API testing with **Playwright + TypeScript**.

## Coverage
- UI: TodoMVC task creation and completion journeys
- API: JSONPlaceholder GET, query-filtering, and POST checks
- Design: Page Object Model for reusable UI interactions
- Quality: TypeScript compile-time checks before browser tests
- Diagnostics: HTML report, screenshots and video on failure, trace on retry
- CI/CD: GitHub Actions on pushes, pull requests, manual dispatch, and a daily scheduled run

## Daily automation
GitHub Actions runs the suite every day at **12:00 UTC** (7:00 AM Eastern Standard Time). You can also start a run manually from the repository's **Actions → Playwright QA → Run workflow** page.

## Requirements
- Node.js 20+
- npm

## Run locally
From this directory:
```bash
npm install
npx playwright install chromium
npm run typecheck
npm test
```

Run only one test layer:
```bash
npm run test:ui-tests
npm run test:api
```

Open the report:
```bash
npm run report
```

## Test environment
The API uses JSONPlaceholder, a public fake REST API intended for testing and examples. Its POST endpoint simulates creation and does not persist data. The UI suite uses the public Playwright TodoMVC demo site.
