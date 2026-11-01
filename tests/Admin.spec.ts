
import { test, expect } from '../fixtures/login'
import { navigateTo } from '../pages/Navigation'
import { validUser } from '../test-data/users'
import { AdminPage1 } from '../pages/Admin'
import { systemUsers_employeeName,systemUsers_status,systemUsers_userRoles,systemUsers_userName} from '../test-data/admin'


test.describe('Admin Tests', () => {

    test('Edit Employee Info', async ({ loginpage, page }) => {

        await loginpage.login(validUser.Username, validUser.Password);

        //await navigateTo(page).Search('Admin')

        await navigateTo(page).goToAdmin();
        await expect(page).toHaveURL(/viewSystemUsers/)
        
        await AdminPage1(page).userManagementDropDown()
        const employeeUserName=  await AdminPage1(page).userName(systemUsers_userName.username);
        await expect(employeeUserName).toHaveValue(systemUsers_userName.username);

        
        const employeeRole = await AdminPage1(page).userRole(systemUsers_userRoles.admin);
        await expect(employeeRole).toHaveText(systemUsers_userRoles.admin)
        
        const employeeName= await AdminPage1(page).employeeName(systemUsers_employeeName.employee_name);
        console.log(employeeName)
        await expect(employeeName).toHaveValue(systemUsers_employeeName.employee_name)

        const employeeStatus= await AdminPage1(page).status(systemUsers_status.enabled);
       await expect(employeeStatus).toHaveText(systemUsers_status.enabled)

       await AdminPage1(page).search();
       //await AdminPage1(page).reset()



    })

})