# Code Review — Unifonic Automation Assessment

Reviewed files: all files under `tests/`, `pages/`, `helpers/`, `models/`, `apis/`, `test-data/`, and `playwright.config.ts`.

---

## Summary

The framework is well-structured for the scope of the task. The Page Object Model is applied correctly, the helper layer is used appropriately, and the CI setup is solid. The issues below are real findings — some affect reliability, some are code quality concerns, and some are things that would need to change before this framework scales.

---

## Issues

### 1. `BasePage` imports from `"playwright"` instead of `"@playwright/test"`

**File:** `pages/BasePage.ts`

```ts
// Current
import { Page } from "playwright";

// Should be
import { Page } from "@playwright/test";
```

All other files import from `@playwright/test`. Using the bare `playwright` package bypasses the test runner's type extensions and can cause type mismatches. It should be consistent across the project.

---

### 2. Typo in method name

**File:** `pages/CarPage.ts`

```ts
// Current
async selectDifferenCar(model: string) {

// Should be
async selectDifferentCar(model: string) {
```

The method is missing the `t` in `Different`. It is called in the test file with the same typo, so it works — but it will confuse anyone reading the code and should be fixed before it gets copied further.

---

### 3. `getByText("change car ")` has a trailing space

**File:** `pages/CarPage.ts`

```ts
// Current
return this.page.getByText("change car ");
```

The string has a trailing space after `"change car "`. This can cause the locator to silently fail if the site ever trims whitespace, or to break in a different browser. Use `exact: false` with a trimmed string, or switch to a role-based locator if one is available.

```ts
// Safer
return this.page.getByText("change car", { exact: false });
```

---

### 4. Inconsistent use of `expect` vs `await expect`

**File:** `tests/selectDifferentCar.spec.ts`

```ts
// Current — wraps an already-resolved value in expect
await expect(await productPage.getItemDescription()).toBe(product.description);

// Better — let Playwright's expect handle the await
await expect(productPage.getItemDescription()).resolves.toBe(product.description);
```

Alternatively, resolve the value first and use a plain `expect`:

```ts
const description = await productPage.getItemDescription();
expect(description).toBe(product.description);
```

The current pattern works but mixes `await` inside `expect(...)`, which is not idiomatic Playwright. In `checkProductDescription.spec.ts` the same assertion is written correctly without the double-await, so the two specs are inconsistent.

---

### 5. `ProductPage` is instantiated after navigation in one spec

**File:** `tests/checkProductDescription.spec.ts`

```ts
await homePage.selectItemByIndex(0);
const productPage = new ProductPage(page); // instantiated after click
```

In `selectDifferentCar.spec.ts`, `ProductPage` is instantiated at the top with the other page objects, which is the correct pattern. Page objects should always be created at the start of the test, not mid-flow. The object itself is stateless so it doesn't matter at runtime, but it is inconsistent and harder to read.

---

### 6. `selectItemByIndex` is a fragile locator strategy

**File:** `pages/HomePage.ts`

```ts
async selectItemByIndex(index: number) {
  await this.items.nth(index).click();
}
```

Selecting by index means the test will click whatever item happens to be at position 0 in the results. If the site changes the order of results, the test picks a different product silently and may still pass. A better approach is to select by the product name:

```ts
async selectItemByName(name: string) {
  await this.items.filter({ hasText: name }).first().click();
}
```

This is a known trade-off for now (the fixture ties the product name and the expected description), but it is worth flagging as a reliability risk.

---

### 7. `octaviaSeries` fixture is unused

**File:** `test-data/models.ts`

```ts
octaviaSeries: [
  {
    modelNames: ["Octavia 4", "Octavia 3"],
  },
],
```

This fixture is never imported or used in any test. It also has a different field name (`modelNames`) compared to `fabiaSeries` (`modelName`), which suggests it was added early and then abandoned. It should either be used or removed to avoid confusion.

---

### 8. `products.oilFilters[1]` has an empty description

**File:** `test-data/products.ts`

```ts
{
  model: ["Fabia 4"],
  name: "brake pads front",
  description: "",
}
```

The second product has an empty description. The search test will still run for it (because `searchExistingProducts.spec.ts` loops over all `oilFilters`), but any description assertion against this product would pass vacuously — it would succeed even if the page showed a real description. Either add the correct description or add a note explaining why it is empty.

---

### 9. Inconsistent indentation in `User.ts`

**File:** `models/User.ts`

The class mixes indentation levels — some methods start at column 0, some are indented. This is a formatting issue that Prettier should catch. Running `npx prettier --write .` would fix it, but the fact it was committed suggests Prettier is not running as a pre-commit hook or in CI.

---

### 10. `UserApi.register` has no response validation

**File:** `apis/UserApi.ts`

```ts
async register(user: User) {
  return await this.request.post('', { ... });
}
```

The method returns the raw response but does not check the status code. Any caller would need to remember to check `response.ok()` themselves. A small improvement would be to assert inside the method:

```ts
async register(user: User) {
  const response = await this.request.post('', { ... });
  expect(response.ok()).toBeTruthy();
  return response;
}
```

This is not critical while the API is unused, but it is worth noting for when it gets activated.

---

### 11. `////Check readme Note////` comment should be removed

**File:** `apis/UserApi.ts`

```ts
                               ////Check readme Note////
```

This is a temporary development note and should not be in submitted code. The README already explains the missing URL — the inline comment is redundant and looks unfinished.

---

## What Is Done Well

- Page objects keep locators private and only expose action methods. This is correct POM usage.
- `searchForItem` composes smaller methods (`selectCarModel`, `enterSearchItem`, `clickSearch`) rather than doing everything in one big method. Easy to debug and reuse.
- The `for...of` loop in `searchExistingProducts.spec.ts` is a clean way to generate parameterised tests in Playwright without a plugin.
- `playwright.config.ts` is clean: `forbidOnly`, retry logic, and the HTML reporter are all configured correctly.
- The GitHub Actions workflow is complete and correct — it installs dependencies, installs browsers, runs tests, and uploads the report.
- Separating test data (`test-data/`) from page logic (`pages/`) and test logic (`tests/`) is the right structure for a framework that will grow.

---

## Priority Summary

| # | Issue | Priority |
|---|---|---|
| 1 | Wrong import source in `BasePage` | Medium |
| 2 | Typo in `selectDifferenCar` | Low |
| 3 | Trailing space in `getByText` locator | Medium |
| 4 | Double-await in `expect` | Low |
| 5 | `ProductPage` instantiated mid-test | Low |
| 6 | `selectItemByIndex` is fragile | Medium |
| 7 | Unused `octaviaSeries` fixture | Low |
| 8 | Empty description in fixture | Medium |
| 9 | Inconsistent formatting in `User.ts` | Low |
| 10 | No response validation in `UserApi` | Low |
| 11 | Development comment left in `UserApi` | Low |
