import { Locator, Page } from "@playwright/test"
import { BasePage } from "./basePage"

export class ProductPage extends BasePage{
    private productTitle:Locator
 
    constructor(page:Page){
        super(page)
        this.productTitle =  this.page.locator('[data-test="title"]')
    }

    async isProductTitleVisible():Promise<boolean>{
        return this.isVisible(this.productTitle)
    }

}