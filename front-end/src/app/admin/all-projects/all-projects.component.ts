import { Component, OnInit } from '@angular/core';
import { AdminService } from '../service/admin.service';

@Component({
  selector: 'app-all-projects',
  templateUrl: './all-projects.component.html',
  styleUrls: ['./all-projects.component.css']
})
export class AllProjectsComponent implements OnInit{
  constructor(private adminService:AdminService){

  }

  ngOnInit(): void {
   this.allProjects();
  }
  projects:any[]=[];
  isProjectEmpty=false;
  allProjects(){
    let reponse=this.adminService.loadTheProjects();
    let data=reponse.subscribe({
      next:
      (res:any)=>{
          this.projects=res;
          
          if(this.projects.length==0)
          this.isProjectEmpty=true;

          console.log(res);
      },
      error:
      (error:any)=>{
          console.log("Error in fetching projects: "+error);
      }
    })
  }
}
