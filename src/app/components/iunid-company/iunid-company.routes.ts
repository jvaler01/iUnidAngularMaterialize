import {Routes} from '@angular/router';
import {HelpComponent} from '../help/help.component';
import {ProjectsPageComponent} from '../projects/projects-page/projects-page.component';
import {SearchColaboratorComponent} from './search-colaborator/search-colaborator.component';
import {ProfileCompanyComponent} from './profile-company/profile-company.component';
import {RegisterExternalComponent} from '../projects/register-external/register-external.component';
import {RegisterInternalComponent} from '../projects/register-internal/register-internal.component';
import {HomeCompanyComponent} from './home-company/home-company.component';
import {LobbyRoomComponent} from '../lobby/lobby-room/lobby-room.component';
import {ChatRoomComponent} from '../lobby/chat-room/chat-room.component';
import {EditCompanyComponent} from './edit-company/edit-company.component';
import {EditExternalComponent} from '../projects/edit-external/edit-external.component';
import {EditInternalComponent} from '../projects/edit-internal/edit-internal.component';

export const IUNID_COMPANY_ROUTES: Routes = [
  { path: 'home', component:  HomeCompanyComponent},
  { path: 'companyProfile', component:  ProfileCompanyComponent},
  { path: 'editProfile', component:  EditCompanyComponent},
  { path: 'companyProjects', component: ProjectsPageComponent },
  { path: 'searchColaborators', component: SearchColaboratorComponent },
  { path: 'uploadExt', component:  RegisterExternalComponent },
  { path: 'editExt', component:  EditExternalComponent },
  { path: 'uploadInt', component: RegisterInternalComponent },
  { path: 'editInt', component: EditInternalComponent },
  { path: 'lobby', component: LobbyRoomComponent },
  { path: 'chat', component: ChatRoomComponent },
  { path: 'help', component: HelpComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'companyProfile' }
];
