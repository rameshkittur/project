import { Component } from '@angular/core';
import { faCaretUp,faUserTie,faUserPlus,faTrash,faUsers,faPowerOff,faPlus,faFolder,faPenToSquare  } from '@fortawesome/free-solid-svg-icons';
import { AdminDashboardComponent } from '../admin-dashboard/admin-dashboard.component';
import { AuthenticationService } from 'src/app/authentication.service';

@Component({
  selector: 'app-admin-sidebar',
  templateUrl: './admin-sidebar.component.html',
  styleUrls: ['./admin-sidebar.component.css']
})
export class AdminSidebarComponent {
  constructor(private admindashboard:AdminDashboardComponent,private authentication:AuthenticationService){

  }
  newAdmin=faUserTie;
  newManager=faUserPlus;
  updateRole=faCaretUp;
  deletUser=faTrash;
  allUsers=faUsers;
  logOut=faPowerOff ;
  addProject=faPlus;
  allProjects=faFolder;
  updateProject=faPenToSquare;

  logout(){
    this.authentication.logout();
  }

  // selectFunction(num:any){
  //   switch(num){
  //     case 1:this.admindashboard.componentSelect("allUsers");
  //            break;
  //     case 2:this.admindashboard.componentSelect("createNewAdmin");
  //             break;
  //     case 4:this.admindashboard.componentSelect("updateOrDelete");
  //             break;
  //   }
  // }

}
