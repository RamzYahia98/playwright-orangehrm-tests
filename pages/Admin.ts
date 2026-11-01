
import { Page } from "@playwright/test";


class AdminPage{

    readonly page:Page;

   constructor(page:Page)
   {
        this.page=page;
   }
  
   async userManagementDropDown()
   {
    //const userManagementdropdown= 
    await this.page.getByRole("listitem").getByText('User Management').click()
     await this.page.getByRole("menuitem",{name:'Users'}).click();

   }
   async userName(username:string)
   {
    
     const usernameInput = this.page.locator('.oxd-input-group')
    .filter({ has: this.page.getByText('Username') })
    .getByRole('textbox');

     await usernameInput.fill(username);
     return usernameInput;
    
   }
   
   async userRole(role:string)
   {
    
    const userroleOption =await this.page.locator('.oxd-input-group').filter({has:this.page.getByText('User Role')})
    .locator('.oxd-select-text');
    await userroleOption.click()
    await this.page.getByRole('listbox').getByText(`${role}`).click()

    return userroleOption

   }

   async employeeName(employeeName:string)
   {
     
     
     const employeeInput = this.page.getByPlaceholder('Type for hints...');

      await employeeInput.pressSequentially('Jo', { delay: 100 });

      const options = this.page.getByRole('option');
       await options.filter({hasText :employeeName}).waitFor();

      const name = await this.page.getByRole('option', { name: employeeName})
      await name.click();


     return employeeInput
   }

   async status(status:string)
   {
    const statusOption=  await this.page.locator('.oxd-input-group').filter({has: this.page.getByText('Status')})
     .locator('.oxd-select-text');

     await statusOption.click()
     await this.page.getByRole('listbox').getByText(status).click()
   

     return statusOption


   }
   async search()
   {
      await this.page.getByRole('button', {name: 'Search' }).click()
   }
   async reset()
   {
     await this.page.getByRole('button' ,{name:'Reset'})
   }
   

}
export const AdminPage1= (page:Page)=> new AdminPage(page);