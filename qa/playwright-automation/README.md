# Playwright QA Automation Framework

A portfolio project demonstrating end-to-end UI automation and REST API testing with **Playwright + TypeScript**.

## Coverage
- UI: TodoMVC task creation and completion journeys
- API: JSONPlaceholder GET and POST smoke/contract checks
- Design: Page Object Model for UI interactions
- Diagnostics: HTML report, screenshots on failure, trace on retry
- CI: GitHub Actions workflow for pushes and pull requests

## Requirements
- Node.js 20+
- npm

## Run locally
From this directory:
```bash
npm install
npx playwright install chromium
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

## Notes
The API uses JSONPlaceholder, a public fake REST API intended for testing and examples. Its POST endpoint simulates creation and does not persist data. The UI suite uses the public Playwright TodoMVC demo site.
