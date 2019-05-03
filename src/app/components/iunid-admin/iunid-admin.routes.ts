import {Routes} from '@angular/router';
import {HelpComponent} from '../help/help.component';
import {AdminPageComponent} from './admin-page/admin-page.component';

export const IUNID_ADMIN_ROUTES: Routes = [
  { path: 'admin', component: AdminPageComponent },
  { path: 'help', component: HelpComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'admin' }
];
