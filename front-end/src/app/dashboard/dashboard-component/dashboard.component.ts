import { Component } from '@angular/core';
import {AuthService} from '../../service';
import {CustomInterceptor} from '../dashboardService/custom.interceptor';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { AuthenticationService } from 'src/app/authentication.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
 
})
export class DashboardComponent  {
 constructor(private authservice:AuthService,private authentication:AuthenticationService){

 }
//  isLogedIn=this.authservice.isLoggedInUser();
isLogedIn=this.authentication.isAuthenticated();

}
