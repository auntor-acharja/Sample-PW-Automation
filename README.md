# Sample-PW-Automation

This is a base Playwright project for automated testing. It includes a structured framework, environment handling, and reporting. The project is designed for scalability, supports multiple environments, and integrates with GitHub Actions for CI/CD execution.

## Features

- **Cross-browser testing**: Supports Chromium, Firefox, and WebKit
- **Parallel execution**: Run tests concurrently for faster execution
- **Environment handling**: Configurable `.env` files for different test environments
- **CI/CD integration**: Runs tests automatically via GitHub Actions
- **Test tagging**: Run specific test categories (e.g., smoke, regression)
- **Automatic reporting**: Generates HTML reports for test execution

## Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/en/download/) (18 or higher)
- [npm](https://www.npmjs.com/get-npm) (bundled with Node.js)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/auntor-acharja/Sample-PW-Automation.git
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Install Playwright browsers:
   ```bash
   npx playwright install
   ```

## Project Structure

```
.
/playwright-project

├── /src
│   ├── /enums
│   │   ├── apiConstants.enum.ts
│   │   ├── applicationConstants.enum.ts
│   ├── /fixtures
│   │   ├── baseFixture.ts
│   ├── /helpers
│   │   ├── fileHelpers.ts
│   │   ├── waitHelper.ts
│   │   ├── clipboardHelper.ts
│   ├── /pages
│   │   ├── /components
│   │   │   ├── dialogComponents.ts
│   │   │   ├── navbarComponents.ts
│   │   ├── basePage.ts
│   │   ├── pageManager.ts
│   │   ├── loginPage.ts
│   ├── /utils
│   │   ├── apiUtils.ts
│   │   ├── browserUtils.ts
│   │   ├── commonUtils.ts
│   │   ├── environmentUtils.ts
│   │   ├── logger.ts
│   │   ├── randomUtils.ts
│   ├── /types
│   │   ├── userTypes.ts
├── /tests
│   ├── /UI
│   │   ├── example1.spec.ts
│   │   ├── example2.spec.ts
│   ├── /API
│   │   ├── apiTest1.spec.ts
│   │   ├── apiTest2.spec.ts
├── /test-data
│   ├── testData.json
├── /report
├── .env
├── .env.staging
├── .env.uat
├── playwright.config.ts
└── package.json
```

## Running Tests

Run all tests:

```bash
npm run test
```

Run specific test file:

```bash
npx playwright test tests/ui/module-one/example1.spec.ts
```

Run tests in **headed mode** (for debugging):

```bash
npm run test:headed
```

## Environment Setup

Update `.env` file with actual credentials:

```
URL=<your_base_url>
USERNAME=<your_username>
PASSWORD=<your_password>
```

## Test Execution Modes

- **Smoke tests**: `npm run test:smoke`
- **Regression tests**: `npm run test:regression`
- **Critical tests**: `npm run test:critical`
- **Functional tests**: `npm run test:functional`
- **Run tests in UAT**: `npm run test:uat`
- **Run tests in Staging**: `npm run test:staging`

## CI/CD Integration

- Tests are executed automatically via **GitHub Actions**
- Supports caching and optimized test execution for faster runs
- Generates detailed **HTML reports** for debugging and analysis

## Configuration

- Managed in `playwright.config.ts`
- Supports **parallel execution, retries, and environment-based test runs**
- Screenshots, videos, and traces are captured for failed tests

## Reporting

After test execution, an **HTML report** is generated. You can open it using:

```bash
npx playwright show-report
```
