# Playwright QA Automation Framework

A portfolio-ready UI and REST API automation framework built with **Playwright + TypeScript**.

## What this demonstrates

- **UI automation:** create, complete, and delete TodoMVC tasks
- **API automation:** GET by ID, query-parameter filtering, POST payload validation, and 404 handling
- **Maintainable design:** Page Object Model for UI and a reusable API client for service requests
- **Quality gates:** strict TypeScript checks, CI retries, and failure diagnostics
- **Reporting:** HTML report, screenshots, video, and traces for failed tests
- **CI/CD:** GitHub Actions on pushes, pull requests, manual runs, and a daily schedule

## Project structure

```text
api/                 Reusable API clients and request models
pages/               Page Object Model classes
tests/api/           REST API specifications
tests/ui/            Browser end-to-end specifications
playwright.config.ts Playwright configuration
```

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

Run a specific layer:

```bash
npm run test:ui-tests
npm run test:api
```

Open the HTML report:

```bash
npm run report
```

## Configuration

- `TODOMVC_BASE_URL`: override the TodoMVC demo URL
- `JSONPLACEHOLDER_API_URL`: override the API base URL

Both default to public demo services. JSONPlaceholder simulates POST creation; it does not persist submitted records.

## CI schedule

The workflow runs daily at **12:00 UTC** (7:00 AM EST / 8:00 AM EDT), and also runs for relevant pushes and pull requests. You can start a run manually from **Actions → Playwright QA → Run workflow**.

## Test strategy

Tests use isolated Playwright browser contexts, role/placeholder-based locators where possible, explicit response assertions, and reusable page/API abstractions. CI blocks focused tests and runs TypeScript validation before browser execution.
