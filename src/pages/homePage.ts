import { Locator, Page,BrowserContext } from "@playwright/test"
import { BasePage } from "./basePage"

export class HomePage extends BasePage{
    readonly getStartedButton:Locator
 
    constructor(page:Page,context:BrowserContext){
        super(page,context)
        this.getStartedButton =  this.page.getByRole('link', { name: 'Get started' })
    }

    async clickGetStartedButton():Promise<void>{
        await this.getStartedButton.click()
    }

}