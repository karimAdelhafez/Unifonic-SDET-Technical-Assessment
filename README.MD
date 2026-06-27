# Unifonic Automation Assessment — Playwright + TypeScript

## Overview

The project focuses on demonstrating a practical automation approach for the [Skoda Parts](https://www.skoda-parts.com/) spare-parts catalogue, built with **Playwright** and **TypeScript**. The suite covers product search, product description validation, and car-model switching. A GitHub Actions workflow runs the tests on every push and pull request to `main`/`master`.

---

## Project Structure

```
.
├── .github/workflows/playwright.yml   # CI pipeline (GitHub Actions)
├── apis/
│   └── UserApi.ts                     # Playwright APIRequestContext wrapper for user registration
├── helpers/
│   └── ProductHelper.ts               # Reusable composite action: search + select a product
├── models/
│   └── User.ts                        # User entity; uses @faker-js/faker for dynamic test data
├── pages/
│   ├── BasePage.ts                    # Base class that holds the shared Playwright Page instance
│   ├── HomePage.ts                    # Locators and actions for the search / home screen
│   ├── ProductPage.ts                 # Locators and actions for the product detail page
│   └── CarPage.ts                     # Locators and actions for the "change car" dropdown
├── test-data/
│   ├── products.ts                    # Static product fixtures (name, model, expected description)
│   └── models.ts                      # Static car-model fixtures (model name, expected page title)
├── tests/
│   ├── searchExistingProducts.spec.ts # Parametrised search tests across all fixture products
│   ├── checkProductDescription.spec.ts# Verifies product description on the detail page
│   └── selectDifferentCar.spec.ts     # End-to-end: search → product page → switch car model
├── playwright.config.ts               # Playwright configuration (baseURL, reporter, browser)
└── package.json
```

---

## Test Scenarios

| Spec file | What it validates |
|---|---|
| `searchExistingProducts.spec.ts` | For every product in `test-data/products.ts`, asserts the search-results page title matches the product name. Tests are generated dynamically via a `for…of` loop. |
| `checkProductDescription.spec.ts` | Searches for a product, navigates to its detail page, and asserts the description text matches the fixture value. |
| `selectDifferentCar.spec.ts` | Full flow: searches for a product, confirms the description, then uses the "change car" dropdown to switch models and asserts the resulting page title. |

---

## Design Decisions

**Page Object Model (POM).** Each page in the application has a dedicated class under `pages/`. Locators are private getters; only high-level action methods are exposed to tests. This prevents locator duplication and makes selector updates a single-file change.

**`BasePage` inheritance.** All page objects extend `BasePage`, which injects the Playwright `Page` instance through the constructor. This avoids passing `page` into every method call and keeps page classes concise.

**Helper layer for composite actions.** `ProductHelper` encapsulates the "search and select" multi-step action that is reused across multiple test files. Composite actions that span more than one page object belong in `helpers/`, not in the test itself, keeping specs readable.

**Static test data in TypeScript files.** `test-data/products.ts` and `test-data/models.ts` export typed constants rather than JSON or CSV files. This gives compile-time checking on fixture shape and enables the `for…of` dynamic test generation in `searchExistingProducts.spec.ts` without a CSV parser or external dependency.

**`User` model with Faker.** The `User` class generates realistic but unique data on construction via `@faker-js/faker`. This design isolates data generation from test logic and is ready to support API-level setup (see `UserApi.ts`) without test files needing to know how users are created.

**`UserApi` class.** Wraps Playwright's `APIRequestContext` for the user-registration endpoint. Placing API calls in a dedicated class separates transport concerns from test intent and makes the API layer reusable across multiple specs that may need a pre-registered user.

**HTML reporter + CI artefact.** `playwright.config.ts` uses the `html` reporter. The GitHub Actions workflow uploads the generated `playwright-report/` directory as a 30-day artefact, so test results are inspectable after every run without local reproduction.

**CI environment guards.** `forbidOnly: !!process.env.CI` prevents accidentally committed `test.only` calls from silently narrowing CI coverage. Retries are set to 2 on CI and 0 locally, balancing flakiness tolerance against fast local feedback.

---

## Getting Started

```bash
# Install dependencies
npm ci

# Install Playwright browsers
npx playwright install --with-deps

# Run all tests (headed)
npx playwright test

# Open last HTML report
npx playwright show-report
```

> **Note:** The `UserApi` registration endpoint URL is intentionally left blank pending the target environment. See the comment in `apis/UserApi.ts`.

---

## Tech Stack

| Tool | Version | Purpose |
|---|---|---|
| Playwright | ^1.61 | Browser automation & test runner |
| TypeScript | ^5.7 | Type safety across all layers |
| @faker-js/faker | ^9.0 | Dynamic user data generation |
| dotenv | ^16.4 | Environment variable loading (wired, not yet activated) |
| Prettier | ^3.8 | Code formatting |
| GitHub Actions | — | CI / CD pipeline |