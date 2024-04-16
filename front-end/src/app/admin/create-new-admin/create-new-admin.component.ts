import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-new-admin',
  templateUrl: './create-new-admin.component.html',
  styleUrls: ['./create-new-admin.component.css']
})
export class CreateNewAdminComponent {

  constructor(private http:HttpClient){}

  //boolean variables
  registrationSuccess = false; 
  isFormValid=true;
  createNewAdminUrl="http://localhost:8080/api/v1/admin/new";
  createNewMAnagerUrl="http://localhost:8080/api/v1/admin/new/manager";

  registrationForm=new FormGroup({
    firstName:new FormControl('',Validators.required),
    lastName:new FormControl('',Validators.required),
    email:new FormControl('',[Validators.required,Validators.email]),
    password:new FormControl('',[Validators.required,Validators.minLength(7)]),
    role:new FormControl('',[Validators.required])
       
  });
   message:any
   userExist=false;
  submitForm(){
    if(this.registrationForm.valid){
      console.log(this.registrationForm.value)
      let res;
      if(this.registrationForm.value.role=="MANAGER"){
         res= this.http.post(this.createNewMAnagerUrl,this.registrationForm.value,{responseType:'json'})
      }
      else{
       res= this.http.post(this.createNewAdminUrl,this.registrationForm.value,{responseType:'json'})
      }
      res.subscribe({
        next:
        (data:any)=>{
          if(data.status==true){
            this.message=data;
            this.registrationSuccess = true;
            this.registrationForm.reset();
            this.clearForm();

          }
          else{
            this.userExist=true;
            console.log("User alredy exist try to update user role")
          }
      
      }
      
      
      });
      console.log(this.message);
  
                                  }
      
    else{
        this.isFormValid=false;
    }
    }
    clearForm(){
      this.registrationForm.patchValue({
        role:''
      });
    }

}
