
import { Page } from "@playwright/test";
class NavigationPage{

    readonly page:Page;

   constructor(page:Page)
   {
        this.page=page;
   }

   async Search(value:String)
   {
     await this.page.getByPlaceholder('Search').fill(`${value}`);
     await this.page.getByPlaceholder('Search').press('Enter');
   }
  
   async goToAdmin()
   {
      this.openSidebarIfClosed()
      await this.page.getByRole('link',{name:'Admin'}).click()
    
   }
   async goToPIM()
   {
      this.openSidebarIfClosed()
      await this.page.getByRole('link',{name:'PIM'}).click()
   }

    async goToLeave()
   {
      this.openSidebarIfClosed()
      await this.page.getByRole('link',{name:'Leave'}).click()
   }
     async goToTime()
   {
      this.openSidebarIfClosed()
      await this.page.getByRole('link',{name:'Time'}).click()
   }
   
     async goToRecruitment()
   {
      this.openSidebarIfClosed()
      await this.page.getByRole('link',{name:'Recruitment'}).click()
   }
   
   
     async goToMyInfo()
   {
      this.openSidebarIfClosed()
      await this.page.getByRole('link',{name:'My Info'}).click()
   }

     async goToPerformance()
   {
      this.openSidebarIfClosed()
      await this.page.getByRole('link',{name:'Performance'}).click()
   }
   
      async goToDashboard()
   {
      this.openSidebarIfClosed()
      await this.page.getByRole('link',{name:'Dashboard'}).click()
   }

       async goToMaintenance()
   {
      this.openSidebarIfClosed()
      await this.page.getByRole('link',{name:'Maintenance'}).click()
   }

     async goToClaim()
   {
      this.openSidebarIfClosed()
      await this.page.getByRole('link',{name:'Claim'}).click()
   }

     async goToBuzz()
   {
      this.openSidebarIfClosed()
      await this.page.getByRole('link',{name:'Buzz'}).click()
   }


   /**
    * This method to check if the sidebar if closed or not and if it closed then  will open it
    * 
    */

   async openSidebarIfClosed ()
   {
    // const navClosed=  await this.page.locator('.bi-chevron-right')
        const expandIcon=  await this.page.locator('.oxd-icon.bi-chevron-right')
     if(await expandIcon.isVisible())
     {
        await expandIcon.click();
     }

   }

  

}
export const navigateTo= (page:Page)=> new NavigationPage(page);
