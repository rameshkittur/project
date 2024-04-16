import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ManagerService } from '../manager-service/manager.service';

@Component({
  selector: 'app-create-tasks',
  templateUrl: './create-tasks.component.html',
  styleUrls: ['./create-tasks.component.css']
})
export class CreateTasksComponent implements OnInit {
  taskForm!: FormGroup;
  projectIdName:any[]=[];
  onlyEmployees:any[]=[];
  formInValid=false;
  constructor(private fb: FormBuilder, private managerService: ManagerService) { }
  managerEmail = sessionStorage.getItem('userEmail');

  ngOnInit(): void {
    this.taskForm = this.fb.group({
      taskName: ['', Validators.required],
      description: ['', Validators.required],
      assigned_to: ['', [Validators.required,Validators.email]],
      due_date: ['', Validators.required],
      projectId: ['', Validators.required],
      assigned_by: [this.managerEmail, Validators.required],
      completed_on: [''],
      status: ['NOT_STARTED'],
      // Assuming tasks_id is an array of numbers
    });
    this.getProjectIdName();
    this.getOnlyEmployee();
  }

  taskCreationSuccess=false;
  onSubmit() {

    if (this.taskForm.valid) {
     
          this.managerService.createNewTask(this.taskForm.value).subscribe({
            next:
              (response: any) => {
                console.log("task created");
                this.taskCreationSuccess=true;
                this.clearForm();
              },
            error:
              (error: any) => {
                console.log("There is an issue while creating task" + error)
              }
          });
          console.log(this.taskForm.value);
    }
    else {
        this.formInValid=true;
      console.log('please enter all the details');
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
  clearForm(): void {
    this.taskForm.patchValue({
      taskName: '',
      description: '',
      assigned_to: '',
      due_date: '',
      projectId:''      
    });
  }
}
