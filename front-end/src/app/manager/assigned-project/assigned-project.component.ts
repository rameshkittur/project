import { Component, OnInit } from '@angular/core';
import { ManagerService } from '../manager-service/manager.service';

@Component({
  selector: 'app-assigned-project',
  templateUrl: './assigned-project.component.html',
  styleUrls: ['./assigned-project.component.css']
})
export class AssignedProjectComponent implements OnInit{
  constructor(private managerService:ManagerService){}
  projects:any[]=[];

  ngOnInit(): void {
    this.getYourProjects();
  }

  getYourProjects(){
      this.managerService.getYourProjects().subscribe({
          next:
          (response:any)=>{
            this.projects=response;
          },
          error:
          (err:any)=>{
            console.log("Error while fetching projects " +err);
          }
        
      });
  }



}
