import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css']
})
export class AllUsersComponent implements OnInit{
  constructor(private http:HttpClient){

  }
  ngOnInit(): void {
    this.getAllEmployees();
  }
  employeeList:any[]=[];

  getAllEmployees(){
    let res=this.http.get<any[]>('http://localhost:8080/api/v1/admin/allEmployees').subscribe({
      next:(data:any)=>{
          this.employeeList=data;
      },
      error:(error: any)=>{
        console.log("unable to fetch user "+ error);
      }
    });
  }
}
