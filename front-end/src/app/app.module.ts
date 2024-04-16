import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RegisterComponent } from './register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { DashboardComponent } from './dashboard/dashboard-component/dashboard.component';
import { HeaderComponent } from './dashboard/header/header.component';
import { SideNavComponent } from './dashboard/side-nav/side-nav.component';
import { MainComponent } from './dashboard/main/main.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CustomInterceptor } from './dashboard/dashboardService/custom.interceptor';

import { AdminHeaderComponent } from './admin/admin-header/admin-header.component';
import { AdminSidebarComponent } from './admin/admin-sidebar/admin-sidebar.component';
// import { AdminMainComponent } from './admin/admin-main/admin-main.component';
import { CreateNewAdminComponent } from './admin/create-new-admin/create-new-admin.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import {Chart, registerables} from 'node_modules/chart.js';
import { AllUsersComponent } from './admin/all-users/all-users.component';
import { UpdateOrDeleteComponent } from './admin/update-or-delete/update-or-delete.component';
import { ProfileComponent } from './dashboard/profile/profile.component';
import { ProjectComponent } from './admin/project/project.component';
import { AllProjectsComponent } from './admin/all-projects/all-projects.component';
import { AlltasksComponent } from './dashboard/alltasks/alltasks.component';
import { UpdateTaskProgressComponent } from './dashboard/update-task-progress/update-task-progress.component';
import { ManagerDashboardComponent } from './manager/manager-dashboard/manager-dashboard.component';
import { ManagerSidebarComponent } from './manager/manager-sidebar/manager-sidebar.component';
import { ManagerHeaderComponent } from './manager/manager-header/manager-header.component';
import { CreateTasksComponent } from './manager/create-tasks/create-tasks.component';
import { AssignedProjectComponent } from './manager/assigned-project/assigned-project.component';
import { UserTasksComponent } from './manager/user-tasks/user-tasks.component';
import { TaskDetailsComponent } from './dashboard/task-details/task-details.component';
import { ProjectStatusComponent } from './manager/project-status/project-status.component';
import { UpdateProjectComponent } from './admin/update-project/update-project.component';
import { UpadeTaskComponent } from './manager/upade-task/upade-task.component';
Chart.register(...registerables);

// import {CustomInterceptor} from '../'


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    NotFoundComponent,
    RegisterComponent,
    DashboardComponent,
    HeaderComponent,
    SideNavComponent,
    MainComponent,
    AdminDashboardComponent,
    AdminHeaderComponent,
    AdminSidebarComponent,
   
    CreateNewAdminComponent,
    AllUsersComponent,
    UpdateOrDeleteComponent,
    ProfileComponent,
    ProjectComponent,
    AllProjectsComponent,
    AlltasksComponent,
    UpdateTaskProgressComponent,
    ManagerDashboardComponent,
    ManagerSidebarComponent,
    ManagerHeaderComponent,
    CreateTasksComponent,
    AssignedProjectComponent,
    UserTasksComponent,
    TaskDetailsComponent,
    ProjectStatusComponent,
    UpdateProjectComponent,
    UpadeTaskComponent,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    FontAwesomeModule,
    
   
  ],
  providers:[     {
    provide: HTTP_INTERCEPTORS,
    useClass: CustomInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
