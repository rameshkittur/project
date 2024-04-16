import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard-component/dashboard.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { CreateNewAdminComponent } from './admin/create-new-admin/create-new-admin.component';
import { AllUsersComponent } from './admin/all-users/all-users.component';
import { UpdateOrDeleteComponent } from './admin/update-or-delete/update-or-delete.component';
import { ProfileComponent } from './dashboard/profile/profile.component';
import { MainComponent } from './dashboard/main/main.component';
import { ProjectComponent } from './admin/project/project.component';
import { AllProjectsComponent } from './admin/all-projects/all-projects.component';
import { UpdateTaskProgressComponent } from './dashboard/update-task-progress/update-task-progress.component';
import { ManagerDashboardComponent } from './manager/manager-dashboard/manager-dashboard.component';
import { CreateTasksComponent } from './manager/create-tasks/create-tasks.component';
import { AssignedProjectComponent } from './manager/assigned-project/assigned-project.component';
import { UserTasksComponent } from './manager/user-tasks/user-tasks.component';
import { TaskDetailsComponent } from './dashboard/task-details/task-details.component';
import { ProjectStatusComponent } from './manager/project-status/project-status.component';
import { UpdateProjectComponent } from './admin/update-project/update-project.component';
import { UpadeTaskComponent } from './manager/upade-task/upade-task.component';
// import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'dashboard', component: DashboardComponent,
    children: [{ path: '', component: MainComponent },
    { path: 'profile', component: ProfileComponent },
    { path: 'update-task-progress', component: UpdateTaskProgressComponent },
    { path:'task-details',component:TaskDetailsComponent}
    
    ]
  },
  {
    path: 'admin-dashboard', component: AdminDashboardComponent
    , children: [{ path: 'create-new-admin', component: CreateNewAdminComponent },
    { path: 'all-users', component: AllUsersComponent },
    { path: 'update-or-delete', component: UpdateOrDeleteComponent },
    { path: 'project', component: ProjectComponent },
    { path: 'all-projects', component: AllProjectsComponent },
    { path: 'update-projects', component: UpdateProjectComponent },
    { path: '', component: AllUsersComponent }
    ]
  },
  { path: 'manager-dashboard', component: ManagerDashboardComponent,
    children:[{path:'create-new-task',component:CreateTasksComponent},
               { path:'projects',component:AssignedProjectComponent},
               { path:'tasks',component:UserTasksComponent},
               { path:'project-status',component:ProjectStatusComponent},
               { path:'update-task',component:UpadeTaskComponent},
               {path: '', component:AssignedProjectComponent}
  ]
    },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
