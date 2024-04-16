import { Component } from '@angular/core';
import { AuthenticationService } from 'src/app/authentication.service';

@Component({
  selector: 'app-manager-dashboard',
  templateUrl: './manager-dashboard.component.html',
  styleUrls: ['./manager-dashboard.component.css']
})
export class ManagerDashboardComponent {
  constructor(private authentication:AuthenticationService){
    
  }
  isLogedIn=this.authentication.isAuthenticated();

}
