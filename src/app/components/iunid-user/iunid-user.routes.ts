import {Routes} from '@angular/router';
import {HelpComponent} from '../help/help.component';
import {SearchJobComponent} from './search-job/search-job.component';
import {ProfileUserComponent} from './profile-user/profile-user.component';
import {ProjectsPageComponent} from '../projects/projects-page/projects-page.component';
import {RegisterExternalComponent} from '../projects/register-external/register-external.component';
import {RegisterInternalComponent} from '../projects/register-internal/register-internal.component';
import {LobbyRoomComponent} from '../lobby/lobby-room/lobby-room.component';
import {ChatRoomComponent} from '../lobby/chat-room/chat-room.component';
import {EditUserComponent} from './edit-user/edit-user.component';
import {EditExternalComponent} from '../projects/edit-external/edit-external.component';
import {EditInternalComponent} from '../projects/edit-internal/edit-internal.component';

export const IUNID_USER_ROUTES: Routes = [
  { path: 'userProfile', component: ProfileUserComponent },
  { path: 'editProfile', component: EditUserComponent },
  { path: 'userProjects', component: ProjectsPageComponent },
  { path: 'uploadExt', component:  RegisterExternalComponent },
  { path: 'editExt', component:  EditExternalComponent },
  { path: 'uploadInt', component: RegisterInternalComponent },
  { path: 'editInt', component: EditInternalComponent },
  { path: 'searchJob', component: SearchJobComponent },
  { path: 'lobby', component: LobbyRoomComponent },
  { path: 'chat', component: ChatRoomComponent },
  { path: 'help', component: HelpComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'userProfile' }
];
