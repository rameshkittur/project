import { Component, OnInit } from '@angular/core';
import {AdminService} from '../service/admin.service'


@Component({
  selector: 'app-update-or-delete',
  templateUrl: './update-or-delete.component.html',
  styleUrls: ['./update-or-delete.component.css']
})
export class UpdateOrDeleteComponent implements OnInit {
  email: string="";
  newRole: string="";
  userEmail: string="";

  constructor(private adminService: AdminService) {}
  ngOnInit(): void {
    this.getAllEmployee();
  }
  noInput=false;
  updateSuccess=false;
  allEmployee:any[]=[];
  allEmployeeExceptAdmin:any[]=[];
  
  updateRole() {
    if (this.email && this.newRole) {
      console.log("inside if statement");
      this.adminService.updateEmployeeRole(this.email, this.newRole.toUpperCase()).subscribe({
        next:
        (response:any) => {
          console.log('Role updated successfully:'+ response);
          this.email="";
          this.newRole="";
          this.updateSuccess=true;
          // Handle success
        },
        error:
        (error:any) => {

          console.error('Failed to update role:'+ error);
          // Handle error
        }
    });
    } else {
      this.noInput=true;
      console.error('Email and new role are required.');
    }
  }
 
  noEmpleeInput=false;
  deleteSuccess=false;
  deleteUser() {
    if (this.userEmail) {
      this.adminService.deleteUserById(this.userEmail).subscribe({
        next:
        (response:any) => {
          console.log('User deleted successfully:'+ response);
          this.userEmail="";
          this.deleteSuccess=true;
          // Handle success
        },
        error:
        (error:any) => {
          console.error('Failed to delete user:'+ error);
          // Handle error
        }
       } );
    } else {
      this.noEmpleeInput=true;
      console.error('User email is required.');
    }
  }

  getAllEmployee(){
    this.adminService.getAllEmployee().subscribe({
      next:
      (res:any)=>{
        for(let employee of res){
          if(employee.role!="ADMIN")
          this.allEmployeeExceptAdmin.push(employee);
        }
          this.allEmployee=res;
      },
      error:
      (err:any)=>{
          console.log("Error occured while loding user "+err);
      }
    })
  }

}
