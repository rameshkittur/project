import { Component, OnInit } from '@angular/core';
import { DataService } from '../dashboardService/dataservice';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.css']
})
export class TaskDetailsComponent implements OnInit{
  constructor(private dataService:DataService){}
  ngOnInit(): void {
   this.getAllYourTask();
  }

  allYourTasks:any[]=[];
  projects:any[]=[];
  getAllYourTask(){
    this.dataService.getData().subscribe({
      next:
      (response:any)=>{
          this.allYourTasks=response;
          for(let task of this.allYourTasks){
           this.getYourProject(task);

          }
      },
      error:
      (err:any)=>{
          console.log("Error in fetching tasks "+err);
      }
    })
  }

  getYourProject(task:any){
    this.dataService.getProjectName(task.projectId).subscribe({
      next:
      (response:any)=>{
      
        this.projects.push(response.title);
      },
      error:
      (err:any)=>{
        console.log("error occured to load projects "+err);
      }
    });
  }
}
