import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { AdminService } from '../service/admin.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent {
  projectForm!: FormGroup;
  allManager:any[]=[];
  constructor(private fb: FormBuilder,private adminService:AdminService) { }

  ngOnInit(): void {
    this.getAllEmployee();
    this.projectForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      project_manager_id: ['', Validators.required],
      start_date: ['', Validators.required],
      end_date: [''],
      status: ['NOT_STARTED'],
      tasks_id: [[]] // Assuming tasks_id is an array of numbers
    });
  }
  projectCreated=false;
  formInvalid=false;
  onSubmit(formDirective: FormGroupDirective) {
    if (this.projectForm.valid) {
      console.log(this.projectForm.value);
      this.adminService.createNewproject(this.projectForm.value).subscribe({
        next:
        (response:any)=>{
          console.log("response after creating new project " +response)
          this.projectCreated=true;
          // formDirective.resetForm();
          this.clearForm();
          this.projectForm.value.status='NOT_STARTED';
         
          
        },
        error:
        (err:any)=>{
          console.log("error occured"+err);
        }
      });

      // Here you can send the form data to your backend API
    } else {
      console.error('Form is invalid');
      this.formInvalid=true;
    }
   
  }
  getAllEmployee(){
    this.adminService.getAllEmployee().subscribe({
      next:
      (res:any)=>{
          let allEmployee=res;
        
          for(let employee of allEmployee){
            console.log(employee);
            if(employee.role=="MANAGER")
            this.allManager.push(employee);
           
          }
      },
      error:
      (err:any)=>{
          console.log("Error occured while loding user "+err);
      }
    })
  }
  clearForm(): void {
    // Clear the form except for the values of status and tasks_id
    this.projectForm.patchValue({
      title: '',
      description: '',
      project_manager_id: '',
      start_date: '',
      end_date: ''
    });
  }
  

}
