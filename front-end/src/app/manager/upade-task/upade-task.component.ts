import { Component, OnInit } from '@angular/core';
import { ManagerService } from '../manager-service/manager.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-upade-task',
  templateUrl: './upade-task.component.html',
  styleUrls: ['./upade-task.component.css']
})
export class UpadeTaskComponent implements OnInit{
  
  constructor(private managerService:ManagerService,private fb: FormBuilder){}
  taskForm!: FormGroup;
  managerEmail = sessionStorage.getItem('userEmail');

  ngOnInit(): void {
    this.taskForm = this.fb.group({
      taskName: ['', Validators.required],
      description: ['', Validators.required],
      assigned_to: ['', [Validators.required,Validators.email]],
      due_date: ['', Validators.required],
      projectId: ['', Validators.required],
      taskId:['',Validators.required],
      assigned_by: [this.managerEmail, Validators.required],
      completed_on: [''],
      status: ['NOT_STARTED'],
      // Assuming tasks_id is an array of numbers
    });
    this.getProjectIdName();
    this.getOnlyEmployee();
    
  }
  projectIdName:any[]=[];
  onlyEmployees:any[]=[];
  formInValid=false;
  taskCreationSuccess=false;
  responseError=false;
  tasksList:any[]=[];

  onSubmit(){
   let taskId=this.taskForm.value.taskId;
   if(this.taskForm.valid){
    this.managerService.updateTask(this.taskForm.value,taskId).subscribe({
      next:
      (response:any)=>{
        console.log(response);
        this.taskCreationSuccess=true;
        this.clearForm();
      },
      error:
      (error:any)=>{
        this.responseError=true;
        console.log("Task is not updated "+error)
      }
    });
  }
  else{
    this.formInValid=true;
    console.log("Please enter all the fields");
  }

}
 

  getProjectIdName(){
    this.managerService.getProjectIdName().subscribe({
      next:
      (response:any)=>{
          this.projectIdName=response;
      },
      error:
      (error:any)=>{
          console.log("Error in fetching project"+error);
      }
    });
  }
  getOnlyEmployee(){
    this.managerService.getOnlyEmployee().subscribe({
      next:
      (response:any)=>{
          this.onlyEmployees=response;
      },
      error:
      (error:any)=>{
          console.log("error while fetching user" +error);
      }
    })
  }
  loadTasks(){
    let projectId=this.taskForm.value.projectId;
    this.managerService.loadTasks(projectId).subscribe({
      next:
      (response:any)=>{
          this.tasksList=response;
          console.log(response);
      },
      error:
      (error:any)=>{
          console.log("Error in fetching project"+error);
      }

    })
  }
  loadTaskById(){
    let id=this.taskForm.value.taskId;
    this.managerService.loadTaskById(id).subscribe({
      next:
      (response:any)=>{
        console.log(response);
        this.taskForm.patchValue({
          taskName: response.taskName,
          description: response.description,
          assigned_to:response.assigned_to,
          due_date: response.due_date,
          projectId:response.projectId ,
         
          
        });
      },
      error:
      (error:any)=>{
        console.log("error while fetching task "+error)
      }
    });
  }
  clearForm(): void {
    // Clear the form except for the values of status and tasks_id
    this.taskForm.patchValue({
      taskName: '',
      description: '',
      assigned_by: '',
      assigned_to: '',
      due_date: '',
      projectId:'',
      taskId:'',
     
    });
  }

}
