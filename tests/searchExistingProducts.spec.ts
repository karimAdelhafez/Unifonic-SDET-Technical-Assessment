import { test, expect } from "@playwright/test";
import HomePage from "../pages/HomePage";
import { products } from "../test-data/products";

for (const product of products.oilFilters) {

  test(`Search for products: ${product.name}`, async ({ page }) => {

    const homePage = new HomePage(page);

    await homePage.load();

    await homePage.searchForItem(
      product.model[0],
      product.name
    );

    const searchPageTitle =
      await homePage.getSearchResultsPageTitle();

    expect(searchPageTitle).toBe(product.name);

  });

}