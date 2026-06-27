import { Page } from "@playwright/test";
import HomePage from "../pages/HomePage";

export default class ProductHelper {
    private homePage: HomePage;

    constructor(private page: Page) {
        this.homePage = new HomePage(page);
        
    }

    // Search for a product and select it from the search results.
     
    async searchAndSelectProduct(model: string,item : string , Index = 0) {
        await this.homePage.searchForItem(model , item);
        await this.homePage.selectItemByIndex(Index);
    }

}