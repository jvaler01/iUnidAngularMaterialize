import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


import { APP_ROUTING } from './app.routes';

import { ControllerService } from './services/controller.service';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './services/auth-guard';

import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { ErrorsComponent } from './components/errors/errors.component';
import { HelpComponent } from './components/help/help.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RegisterCompanyComponent } from './components/register-company/register-company.component';
import { RegisterUserComponent } from './components/register-user/register-user.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { IunidUserComponent } from './components/iunid-user/iunid-user.component';
import { IunidCompanyComponent } from './components/iunid-company/iunid-company.component';
import { SearchJobComponent } from './components/iunid-user/search-job/search-job.component';
import { ProfileUserComponent } from './components/iunid-user/profile-user/profile-user.component';
import { ProjectsPageComponent } from './components/projects/projects-page/projects-page.component';
import { RegisterInternalComponent } from './components/projects/register-internal/register-internal.component';
import { RegisterExternalComponent } from './components/projects/register-external/register-external.component';
import { SearchColaboratorComponent } from './components/iunid-company/search-colaborator/search-colaborator.component';
import { ProfileCompanyComponent } from './components/iunid-company/profile-company/profile-company.component';
import { LobbyRoomComponent } from './components/lobby/lobby-room/lobby-room.component';
import { ChatRoomComponent } from './components/lobby/chat-room/chat-room.component';
import { EditUserComponent } from './components/iunid-user/edit-user/edit-user.component';
import { EditCompanyComponent } from './components/iunid-company/edit-company/edit-company.component';
import { EditExternalComponent } from './components/projects/edit-external/edit-external.component';
import { EditInternalComponent } from './components/projects/edit-internal/edit-internal.component';
import { IunidAdminComponent } from './components/iunid-admin/iunid-admin.component';
import { AdminPageComponent } from './components/iunid-admin/admin-page/admin-page.component';
import { RegisterAdminComponent } from './components/iunid-admin/register-admin/register-admin.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    ErrorsComponent,
    HelpComponent,
    LoginComponent,
    NavbarComponent,
    RegisterCompanyComponent,
    RegisterUserComponent,
    SidebarComponent,
    IunidUserComponent,
    IunidCompanyComponent,
    SearchJobComponent,
    ProfileUserComponent,
    ProjectsPageComponent,
    RegisterInternalComponent,
    RegisterExternalComponent,
    SearchColaboratorComponent,
    ProfileCompanyComponent,
    LobbyRoomComponent,
    ChatRoomComponent,
    EditUserComponent,
    EditCompanyComponent,
    EditExternalComponent,
    EditInternalComponent,
    IunidAdminComponent,
    AdminPageComponent,
    RegisterAdminComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    APP_ROUTING
  ],
  providers: [
    ControllerService,
    AuthService,
    AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
