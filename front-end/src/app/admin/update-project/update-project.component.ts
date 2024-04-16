import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormGroupDirective } from '@angular/forms';
import { AdminService } from '../service/admin.service';

@Component({
  selector: 'app-update-project',
  templateUrl: './update-project.component.html',
  styleUrls: ['./update-project.component.css']
})
export class UpdateProjectComponent implements OnInit{
  projectForm!: FormGroup;
  allManager:any[]=[];
  allProjects:any[]=[];

  constructor(private fb: FormBuilder,private adminService:AdminService) { }

  ngOnInit(): void {
    this.getAllEmployee();
    this.getProjectIdName();
    this.projectForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      project_manager_id: ['', Validators.required],
      start_date: ['', Validators.required],
      end_date: [''],
      status: ['NOT_STARTED'],
      projectId:'',
      tasks_id: [[]] // Assuming tasks_id is an array of numbers
    });
  }
  projectCreated=false;
  formInvalid=false;
  onSubmit(formDirective: FormGroupDirective) {
    if (this.projectForm.valid) {
      console.log(this.projectForm.value);
      let id=this.projectForm.value.projectId;
      this.adminService.updateproject(this.projectForm.value,id).subscribe({
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
      end_date: '',
      projectId:''
    });
  }
  getProjectIdName(){
    this.adminService.loadTheProjects().subscribe({
      next:
      (response:any)=>{
        this.allProjects=response;
      },
      error:
      (error:any)=>{
        console.log("error occured while fetching project "+error);
      }
    });

  }

  loadProjectById(){
    let id=this.projectForm.value.projectId;
      this.adminService.loadProjectById(id).subscribe({
        next:
        
        (response:any)=>{
          this.projectForm.patchValue({
            description: response.description,
            title:response.title,
            project_manager_id:response.projectManagerId,
            start_date:response.start_date,
            end_date:response.end_date
           
          });
          console.log(response);
        },
        error:
        (error:any)=>{
          console.log("Error occured while fetching project "+error);
        }
      })
  }

}
