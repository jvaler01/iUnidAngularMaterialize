import {Routes} from '@angular/router';
import {HelpComponent} from '../help/help.component';
import {AdminPageComponent} from './admin-page/admin-page.component';
import {RegisterUserComponent} from '../register-user/register-user.component';
import {RegisterCompanyComponent} from '../register-company/register-company.component';
import {RegisterAdminComponent} from './register-admin/register-admin.component';
import {EditUserComponent} from '../iunid-user/edit-user/edit-user.component';
import {EditCompanyComponent} from '../iunid-company/edit-company/edit-company.component';

export const IUNID_ADMIN_ROUTES: Routes = [
  { path: 'admin', component: AdminPageComponent },
  { path: 'newUser', component: RegisterUserComponent },
  { path: 'newAdmin', component: RegisterAdminComponent },
  { path: 'newCompany', component: RegisterCompanyComponent },
  { path: 'editUser', component: EditUserComponent },
  { path: 'editCompany', component: EditCompanyComponent },
  { path: 'help', component: HelpComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'admin' }
];
