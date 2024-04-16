import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './authentication.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  constructor(private authService:AuthenticationService ){}
  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.authService.resetSessionTimer();
    }
  }
  title = 'homepage';
}
