import { BasePage } from "./BasePage";

export default class CarPage extends BasePage{
 
private get changeCarDropDown() {
    return this.page.getByText("change car ");
  }

  private selectCarModel(model: string) {
 // return this.page.locator("#main-nav-model ul li a", { hasText: model });
    return this.page.getByRole("link", { name: model});
}

  // Methods
  async selectDifferenCar(model: string) {
    await this.changeCarDropDown.hover();
    await this.selectCarModel(model).click();
  }
}
