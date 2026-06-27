import { BasePage } from "./BasePage";

export default class HomePage extends BasePage {
  private get dropDownList() {
    return this.page.locator("#top-select-model");
  }

  private get searchBox() {
    return this.page.locator("#LBautocomplete");
  }

  private get searchButton() {
    return this.page.getByRole("button", { name: "search" });
  }

  private get searchResultPageTitle() {
    return this.page.locator("span.title");
  }

  private get items() {
    return this.page.locator('ul li a[href*="spare-part"]');
  }

  //Methods

  async load() {
    await this.page.goto("./");
  }
  async selectCarModel(model: string) {
    await this.dropDownList.selectOption(model);
  }

  async enterSearchItem(item: string) {
    await this.searchBox.fill(item);
  }

  async clickSearch() {
    await this.searchButton.click();
  }

  async searchForItem(model: string, item: string) {
    await this.selectCarModel(model);
    await this.enterSearchItem(item);
    await this.clickSearch();
  }

  async getSearchResultsPageTitle(): Promise<string> {
    return await this.searchResultPageTitle.innerText();
  }

  async selectItemByIndex(index: number) {
    await this.items.nth(index).click();
  }

}
