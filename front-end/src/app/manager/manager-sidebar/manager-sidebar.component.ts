import { Component } from '@angular/core';
import {faPenToSquare,faListCheck,faFolder,faRefresh, faArrowUpFromBracket, faPowerOff, } from '@fortawesome/free-solid-svg-icons';
import { AuthenticationService } from 'src/app/authentication.service';

@Component({
  selector: 'app-manager-sidebar',
  templateUrl: './manager-sidebar.component.html',
  styleUrls: ['./manager-sidebar.component.css']
})
export class ManagerSidebarComponent {
  constructor(private authentication:AuthenticationService){

  }
  createNewTask=faPenToSquare;
  allTasks=faListCheck;
  projects=faFolder;
  updateProjectStatus=faRefresh;
  updateTask=faArrowUpFromBracket;
  logOut=faPowerOff ;

  logout(){
    this.authentication.logout();
  }

}
