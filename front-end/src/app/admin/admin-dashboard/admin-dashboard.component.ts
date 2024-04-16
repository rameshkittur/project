import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service';
import { CreateNewAdminComponent } from '../create-new-admin/create-new-admin.component';
import { AllUsersComponent } from '../all-users/all-users.component';
import { UpdateOrDeleteComponent } from '../update-or-delete/update-or-delete.component';
import { AuthenticationService } from 'src/app/authentication.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent {
  constructor(private authService:AuthService ,private router:Router,private authentication:AuthenticationService){}
  // isLogedIn=this.authService.isLoggedInUser();
  isLogedIn=this.authentication.isAuthenticated();

  component:any=AllUsersComponent;

  // componentSelect(componentName:string){
  //     switch(componentName){
  //           case "createNewAdmin":this.component=CreateNewAdminComponent;
  //           break;
  //           case "allUsers":this.component=AllUsersComponent;
  //           break;
  //           case "updateOrDelete":this.component=UpdateOrDeleteComponent;
  //           break;
  //     }
  // }
  
}
