import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ManagerService } from '../manager-service/manager.service';

@Component({
  selector: 'app-project-status',
  templateUrl: './project-status.component.html',
  styleUrls: ['./project-status.component.css']
})
export class ProjectStatusComponent implements OnInit{
  constructor(private managerService:ManagerService){  }
  ngOnInit(): void {
   this.getAllYourProjects();
  }
  allYourProjects:any[]=[];
  errorOccured=false;
  updateSuccess=false;
  noInput=false;

  statusForm = new FormGroup({
    projectId: new FormControl('', Validators.required),
    projectStatus: new FormControl('', Validators.required),
  })

  updateStatus(){
    let id=this.statusForm.value.projectId;
    let status=this.statusForm.value.projectStatus;
      this.managerService.updateProjectStatus(id,status).subscribe({
          next:
          (response:any)=>{
              this.clearForm();
              this.updateSuccess=true;
          },
          error:
          (error:any)=>{
            console.log("Status of project is not updated "+error);
            this.errorOccured=true;
          }
      });
  }
  getAllYourProjects(){
    this.managerService. getProjectIdName().subscribe({
      next:
      (response:any)=>{
          this.allYourProjects=response;
      },
      error:
      (err:any)=>{
          console.log("Error in fetching projects "+err);
      }
    })
  }

  clearForm(): void {
    // Clear the form except for the values of status and tasks_id
    this.statusForm.patchValue({
      projectId:'',
      projectStatus:''
    });
  }
}
