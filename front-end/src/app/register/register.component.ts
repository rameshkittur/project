import { Component } from '@angular/core';
import {FormGroup,FormControl,Validators} from '@angular/forms'
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  constructor(private http:HttpClient,private router:Router){}

  //boolean variables
  registrationSuccess = false; 
  isFormValid=true;

  registrationForm=new FormGroup({
    firstName:new FormControl('',Validators.required),
    lastName:new FormControl('',Validators.required),
    email:new FormControl('',[Validators.required,Validators.email]),
    password:new FormControl('',[Validators.required,Validators.minLength(7)])
       
  });
   message:any
   userExist=false;
  submitForm(){
    if(this.registrationForm.valid){
      console.log(this.registrationForm.value)
      let res= this.http.post("http://localhost:8080/api/v1/auth/signup",this.registrationForm.value,{responseType:'json'})
      res.subscribe({
        next:
        (data:any)=>{this.message=data
          console.log(this.message);
          if(data.status==true){
          this.registrationSuccess = true;
          this.registrationForm.reset();
          this.router.navigateByUrl('/login')
          }
          else{
              this.userExist=true;
          }
        
        },
           

        error:
        (err:any)=>{
          console.log("Error occured during registration");
        }
      });
      
                                  }
      
    else{
        this.isFormValid=false;
    }
    }
              

}
