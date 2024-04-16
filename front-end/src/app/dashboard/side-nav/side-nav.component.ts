import { Component } from '@angular/core';
import { faListCheck,faUser,faHand,faLocationDot,faPowerOff,faHouseUser,faBarsProgress } from '@fortawesome/free-solid-svg-icons';
import { AuthenticationService } from 'src/app/authentication.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent {
  constructor(private authentication:AuthenticationService){

  }
  faUser=faUser;
  tasks=faListCheck;
  help=faHand;
  location=faLocationDot;
  logOut=faPowerOff;
  home=faHouseUser;
  details=faBarsProgress;
 
  logout(){
    this.authentication.logout();
  }
}
