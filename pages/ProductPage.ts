import { BasePage } from "./BasePage";

export default class ProductPage extends BasePage {

  private get itemDescription() {
    return this.page.locator('span[itemprop="description"]');
  }

  //methods 

  async getItemDescription(): Promise<string> {
    return this.itemDescription.innerText();
  }
}
