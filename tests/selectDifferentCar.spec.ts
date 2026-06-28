import { test, expect } from "@playwright/test";
import CarPage from "../pages/CarPage";
import { products } from "../test-data/products";
import { models } from "../test-data/models";
import HomePage from "../pages/HomePage";
import ProductPage from "../pages/ProductPage";
import ProductHelper from "../helpers/ProductHelper";

test("select different car", async ({ page }) => {
  const homePage = new HomePage(page);
  const productPage = new ProductPage(page);
  const carPage = new CarPage(page);
  const productHelper = new ProductHelper(page);

  await homePage.load();

  const product = products.oilFilters[0];

  await productHelper.searchAndSelectProduct(product.model[0], product.name);

  await expect(productPage.getItemDescription()).toBe(
    product.description,
  );

  const model = models.fabiaSeries[0];

  await carPage.selectDifferenCar(model.modelName[0]);

  await expect(page).toHaveTitle(model.pageTitle[0]);
});
