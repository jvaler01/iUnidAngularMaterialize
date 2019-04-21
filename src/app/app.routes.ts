import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {RegisterUserComponent} from './components/register-user/register-user.component';
import {RegisterCompanyComponent} from './components/register-company/register-company.component';


import {ErrorsComponent} from './components/errors/errors.component';
import {IunidUserComponent} from './components/iunid-user/iunid-user.component';
import {AuthGuard} from './services/auth-guard';
import {IUNID_USER_ROUTES} from './components/iunid-user/iunid-user.routes';
import {IunidCompanyComponent} from './components/iunid-company/iunid-company.component';
import {IUNID_COMPANY_ROUTES} from './components/iunid-company/iunid-company.routes';



const APP_ROUTES: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'regUser', component: RegisterUserComponent },
  { path: 'regCompany', component: RegisterCompanyComponent },
  { path: 'iUnidUser', component: IunidUserComponent, canActivate: [AuthGuard], children: IUNID_USER_ROUTES },
  { path: 'iUnidCompany', component: IunidCompanyComponent, canActivate: [AuthGuard], children: IUNID_COMPANY_ROUTES },
  { path: 'error', component: ErrorsComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'login' }
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);
