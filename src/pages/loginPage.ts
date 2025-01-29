import { Locator, Page } from "@playwright/test"
import { BasePage } from "./basePage"

export class LoginPage extends BasePage{
    private username:Locator
    private loginButton:Locator
    private password:Locator
 
    constructor(page:Page){
        super(page)
        this.username =  this.page.locator('#user-name')
        this.password =  this.page.locator('#password')
        this.loginButton =  this.page.locator('#login-button')
    }

    async loginToApplication(username:string,pass:string):Promise<void>{
        await this.type(this.username,username)
        await this.type(this.password,pass)
        await this.click(this.loginButton)
    }

}