import {Routes} from '@angular/router';
import {HelpComponent} from '../help/help.component';
import {ProjectsPageComponent} from '../projects/projects-page/projects-page.component';
import {SearchColaboratorComponent} from './search-colaborator/search-colaborator.component';
import {ProfileCompanyComponent} from './profile-company/profile-company.component';
import {RegisterExternalComponent} from '../projects/register-external/register-external.component';
import {RegisterInternalComponent} from '../projects/register-internal/register-internal.component';
import {HomeCompanyComponent} from './home-company/home-company.component';

export const IUNID_COMPANY_ROUTES: Routes = [
  { path: 'home', component:  HomeCompanyComponent},
  { path: 'companyProfile', component:  ProfileCompanyComponent},
  { path: 'companyProjects', component: ProjectsPageComponent },
  { path: 'searchColaborators', component: SearchColaboratorComponent },
  { path: 'uploadExt', component:  RegisterExternalComponent },
  { path: 'uploadInt', component: RegisterInternalComponent },
  { path: 'help', component: HelpComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'companyProfile' }
];
