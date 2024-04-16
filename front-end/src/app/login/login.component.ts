import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { Router } from '@angular/router';
import {AuthService} from '../service';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private http: HttpClient, private router: Router,private service:AuthService,private authentication:AuthenticationService) { }
  ngOnInit(): void {

  }

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(7)])

  });
  message: any
  loginFailed = false
  formInvalid=false;
  userNotExist=false;
  submitForm() { 
    if(this.loginForm.valid){
    let res = this.http.post("http://localhost:8080/api/v1/auth/signin", this.loginForm.value, { responseType:  'json' })
      .subscribe({
        next:
        (response: any) => {
          if(response.status==true){
            this.message = response;
            let loginCredentials=this.loginForm.value;
             console.log(loginCredentials);
             console.log(response);
             this.service.login();
             sessionStorage.setItem('id',response.id);
             sessionStorage.setItem('key',JSON.stringify(response));
             if(loginCredentials.email){
             sessionStorage.setItem('userEmail',loginCredentials.email);
             }
             this.authentication.login(response.token);
   
             if(response.authority=="USER")
             this.router.navigateByUrl('/dashboard')
             else if(response.authority=="ADMIN"){
               
               this.router.navigateByUrl('/admin-dashboard');
             }
             else{
                 this.router.navigateByUrl('/manager-dashboard')
             }
           }
           else{
            this.userNotExist=true;
            console.log("User not exist in database");
           }
          },
        error: (error: any) => {
          this.loginFailed=true;
          console.error("Login failed", error);
        }
      }
      );

  }

  else{
    console.log("Please enter all fields");
    this.formInvalid=true;
  }
}


}
