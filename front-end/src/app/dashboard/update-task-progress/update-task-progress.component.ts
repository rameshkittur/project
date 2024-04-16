import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../dashboardService/dataservice';
import { HttpErrorResponse } from '@angular/common/http';
import { MainComponent } from '../main/main.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-update-task-progress',
  templateUrl: './update-task-progress.component.html',
  styleUrls: ['./update-task-progress.component.css']
})
export class UpdateTaskProgressComponent implements OnInit {
  constructor(private dataService: DataService) {

  }
  userTasks:any[]=[];
  updateSuccess=false;
  errorOccured=false;
  ngOnInit(): void {
    this.dataService.getData().subscribe({
      next:
      (res:any)=>{
          this.userTasks=res;
                },
      error:
      (error:any)=>{
        this.errorOccured=true;
        console.log("Error in fetching tasks");
      }
    });
    this. getAllYourTask();
  }

   
  statusForm = new FormGroup({
    taskId: new FormControl('', Validators.required),
    taskStatus: new FormControl('', Validators.required),
  })

  invalidTask=false;
  noInput=false;
  updateStatus() {
    if (this.statusForm.valid) {
      let validTaskId = false;
      let taskId = this.statusForm.value.taskId;
      for (let i = 0; i < this.userTasks.length; i++) {
        console.log(i);
        if (this.userTasks[i].taskId == taskId) {
          validTaskId = true;
          break;
        }
      }
      if (validTaskId) {
        this.dataService.updateTaskStatus(this.statusForm.value).subscribe({
          next:
            (response: any) => {
              console.log("status updated");
              this.updateSuccess=true;
              this.clearForm();
            },
          error:
            (err: HttpErrorResponse) => {
              console.log("error in updating status " + err.message);
            }
        });
        console.log(this.statusForm.value)
      }
      else{
        this.invalidTask=true;
        console.log("The entered Id is not valid");
      }
    }
    else {
      this.noInput=true;
      console.log("You did not entered required inputs");
    }

  }
  allYourTasks:any[]=[];
  getAllYourTask(){
    this.dataService.getData().subscribe({
      next:
      (response:any)=>{
          this.allYourTasks=response;
      },
      error:
      (err:any)=>{
          console.log("Error in fetching tasks "+err);
      }
    })
  }
  clearForm(): void {
    // Clear the form except for the values of status and tasks_id
    this. statusForm .patchValue({
    taskId:'',
    taskStatus:''
    });
  }


}
