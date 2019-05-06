import {Routes} from '@angular/router';
import {HelpComponent} from '../help/help.component';
import {AdminPageComponent} from './admin-page/admin-page.component';
import {RegisterUserComponent} from '../register-user/register-user.component';
import {RegisterCompanyComponent} from '../register-company/register-company.component';

export const IUNID_ADMIN_ROUTES: Routes = [
  { path: 'admin', component: AdminPageComponent },
  { path: 'newUser', component: RegisterUserComponent },
  { path: 'newCompany', component: RegisterCompanyComponent},
  { path: 'help', component: HelpComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'admin' }
];
