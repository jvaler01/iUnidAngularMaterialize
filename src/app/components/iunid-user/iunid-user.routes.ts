import {Routes} from '@angular/router';
import {HelpComponent} from '../help/help.component';
import {SearchJobComponent} from './search-job/search-job.component';
import {ProfileUserComponent} from './profile-user/profile-user.component';
import {ProjectsPageComponent} from '../projects/projects-page/projects-page.component';
import {RegisterExternalComponent} from '../projects/register-external/register-external.component';
import {RegisterInternalComponent} from '../projects/register-internal/register-internal.component';
import {HomeUserComponent} from './home-user/home-user.component';

export const IUNID_USER_ROUTES: Routes = [
  { path: 'home', component: HomeUserComponent },
  { path: 'userProfile', component: ProfileUserComponent },
  { path: 'userProjects', component: ProjectsPageComponent },
  { path: 'uploadExt', component:  RegisterExternalComponent },
  { path: 'uploadInt', component: RegisterInternalComponent },
  { path: 'searchJob', component: SearchJobComponent },
  { path: 'help', component: HelpComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'userProfile' }
];