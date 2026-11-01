
import { Page } from "@playwright/test";
class LoginPage{

    readonly page:Page;

   constructor(page:Page)
   {
        this.page=page;
   }
  
   async fillUserName (userName:String)
   {
      await this.page.getByPlaceholder('Username').fill(`${userName}`);

   }

   async fillPassword (password:String)
   {
      await this.page.getByPlaceholder('Password').fill(`${password}`);

   }
    

   async clickLogin()
   {
      await this.page.getByRole('button' ,{name: 'Login' }).click();
   }   

   /***
    * This method to login with valid credinitals 
    * @param userName , valid username ,type string 
    * @param password , valid password , type string 
    */
   async login(userName:string , password:string)
   {
    await this.fillUserName(userName);
    await this.fillPassword(password);
    await this.clickLogin();
   }

}
export const LoginPage1= (page:Page)=> new LoginPage(page);