# Unifonic Automation Assessment — Playwright + TypeScript

## Overview

This project contains automated end-to-end tests for the [Skoda Parts](https://www.skoda-parts.com/) spare-parts website. Tests are written in **Playwright** and **TypeScript** and run automatically on every push or pull request via GitHub Actions.

The submission includes four parts: the automated test suite, an exploratory testing document, an AI-assisted assessment, and a code review.

---

## Project Structure

```
.
├── .github/workflows/playwright.yml      # Runs tests automatically on GitHub
├── apis/
│   └── UserApi.ts                        # Handles API calls for user registration
├── docs/
│   └── Exploratory-Analysis.md           # Manual test cases, risks, and priorities
├── helpers/
│   └── ProductHelper.ts                  # Shared action: search for a product and open it
├── models/
│   └── User.ts                           # Creates a test user with random data
├── pages/
│   ├── BasePage.ts                       # Shared base that all page classes inherit from
│   ├── HomePage.ts                       # Actions for the search and home screen
│   ├── ProductPage.ts                    # Actions for the product detail page
│   └── CarPage.ts                        # Actions for the "change car" dropdown
├── test-data/
│   ├── products.ts                       # Product test fixtures (name, model, expected description)
│   └── models.ts                         # Car model fixtures (model name, expected page title)
├── tests/
│   ├── searchExistingProducts.spec.ts    # Searches for each product and checks the result title
│   ├── checkProductDescription.spec.ts   # Opens a product and checks its description text
│   └── selectDifferentCar.spec.ts        # Searches, opens a product, then switches the car model
├── playwright.config.ts                  # Test settings (base URL, browser, reporter)
└── package.json
```

---

## Deliverables

**Automated Test Suite** — this repository. Three test files covering search, description validation, and car-model switching.

**Exploratory Analysis** (`docs/Exploratory-Analysis.md`) — manual test cases, observed issues, risk areas, and test priorities found during a hands-on session with the application.

**AI Assessment** — AI-assisted review covering additional risk areas, edge cases, and coverage gaps beyond what manual exploration surfaced.

**Code Review** — a structured review of the framework covering design choices, maintainability, and suggestions for improvement.

---

## What the Tests Cover

| Test file | What it checks |
|---|---|
| `searchExistingProducts.spec.ts` | Searches for each product in the fixtures and confirms the results page title is correct. One test is created per product automatically. |
| `checkProductDescription.spec.ts` | Searches for a product, opens it, and checks that the description matches the expected text. |
| `selectDifferentCar.spec.ts` | Full flow: searches for a product, checks the description, then switches to a different car model and confirms the page title changes. |

---

## Design Decisions

**Page Object Model.** Each page has its own class under `pages/`. Locators are kept private inside the class; tests only call action methods. This means if a selector changes, it is fixed in one place.

**Shared base class.** All page classes extend `BasePage`, which holds the Playwright `page` instance. This removes the need to pass `page` around manually in every class.

**Helper for repeated steps.** The "search for a product and open it" sequence is used in more than one test, so it lives in `ProductHelper` rather than being copied into each spec file.

**Data-driven testing where it makes sense.** The search test generates one test case per product automatically, because all products go through the same steps. The other two tests stay as single cases because their flows are different enough that looping would not add value.

**Test data as typed TypeScript.** Fixtures live in `.ts` files instead of JSON or CSV. This catches typos at compile time and works directly with the test loop without any parsing.

**Faker for user data.** The `User` class generates a random name, email, and password on creation. This keeps test data realistic and avoids hardcoded values that could conflict across runs.

**`UserApi` for registration.** API calls for user creation are wrapped in their own class, separate from the tests. This makes the API layer reusable and keeps test files focused on behaviour, not HTTP details.

**HTML report saved in CI.** After every run, the HTML report is uploaded as a GitHub Actions artefact and kept for 30 days. Anyone can download and review results without re-running the tests locally.

**CI safety settings.** `forbidOnly` prevents a `test.only` from accidentally limiting what runs in CI. Retries are set to 2 in CI and 0 locally so failures are investigated quickly during development but have a chance to recover from flakiness in the pipeline.

---

## What Was Left Out and Why

**Registration and login flows are not automated.** During the exploratory session, it was clear that the production site uses bot detection and CAPTCHA. Automating these flows on production would be unreliable and would interfere with the site's security measures. The `User` model and `UserApi` class are already in place so these tests can be added once a test environment without CAPTCHA is available.

---

## Getting Started

```bash
# Install dependencies
npm ci

# Install browsers
npx playwright install --with-deps

# Run all tests
npx playwright test

# View the last report
npx playwright show-report
```

> The `UserApi` registration URL is left blank intentionally — it will be filled in once a test environment is confirmed. See `apis/UserApi.ts`.

---

## Tech Stack

| Tool | Version | Purpose |
|---|---|---|
| Playwright | ^1.61 | Browser automation and test runner |
| TypeScript | ^5.7 | Type safety across all files |
| @faker-js/faker | ^9.0 | Random test data generation |
| dotenv | ^16.4 | Environment variable support (set up, not yet active) |
| Prettier | ^3.8 | Code formatting |
| GitHub Actions | — | CI pipeline |
