import { Component, OnInit } from '@angular/core';
import { ManagerService } from '../manager-service/manager.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-tasks',
  templateUrl: './user-tasks.component.html',
  styleUrls: ['./user-tasks.component.css']
})
export class UserTasksComponent implements OnInit {
  constructor(private managerService:ManagerService){}
  ngOnInit(): void {
    this.getProjectIdName();
    
  }

  projectId: any = ''; 
  projectIdName:any[]=[];
  tasksList:any[]=[];

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
  loadTasks(projectId:any){
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

}
