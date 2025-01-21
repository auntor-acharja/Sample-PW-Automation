import {Page,BrowserContext } from "@playwright/test"

export class BasePage{
    readonly page: Page
    readonly context:BrowserContext

    constructor(page:Page,context:BrowserContext){
        this.page = page
        this.context = context
    }

    async waitForTextSelector(text:string,index?:number):Promise<void>{
        const locator = this.page.getByText(text,{exact:true})
        const element = index !=undefined?locator.nth(index):locator
        await element.waitFor({state:'visible'})
    }

    async clickByTextLocator(text:string,index?:number):Promise<void>{
        const locator = this.page.getByText(text,{exact:true})
        const element  = index !=undefined?locator.nth(index):locator
        await element.click()
    }

    /* We can add wrapper for the following Playwright methods as they doesn't support auto-waiting:
     locator.blur(),locator.focus(),locator.press(),locator.pressSequentially(),locator.setInputFiles()
     */
}