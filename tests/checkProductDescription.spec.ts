import { test, expect } from "@playwright/test";
import HomePage from "../pages/HomePage";
import ProductPage from "../pages/ProductPage";
import { products } from "../test-data/products";

test("check product description", async ({ page }) => {
  //Search for Product

  const homePage = new HomePage(page);
  await homePage.load();
  const product = products.oilFilters[0];
  await homePage.searchForItem(product.model[0], product.name);
  const searchPageTitle = await homePage.getSearchResultsPageTitle();
  expect(searchPageTitle).toBe(product.name);

  //Select Product 
  await homePage.selectItemByIndex(0);
  const productPage = new ProductPage(page);
  const itemDescription = await productPage.getItemDescription();
  expect(itemDescription).toBe(product.description);
});
