import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private baseUrl = 'http://localhost:8080/api/v1'; 
  private projectUrl='http://localhost:8082/project';
  private adminBaseUrl='http://localhost:8080/api/v1/admin';

  constructor(private http: HttpClient) {}

  // Update employee role
  updateEmployeeRole(email: string, newRole: string) {

    return this.http.put(`${this.baseUrl}/admin/update/${email}`,{role:newRole},{ responseType:  'text' });
  }

  // Delete user by ID
  deleteUserById(email: string) {
    return this.http.delete(`${this.baseUrl}/admin/${email}`,{ responseType:  'text' });
  }

  createNewproject(data:any){
        
      return this.http.post(`${this.projectUrl}/new`,data,{ responseType:  'text' as'json'});
  }

  managerIsPresent(id:any):boolean{
      // let res = this.http.get()
      return true;
  }
  loadTheProjects(){
    return this.http.get(`${this.projectUrl}/all`,{responseType:'json'});
  }

  getAllEmployee(){
    return this.http.get(`${this.adminBaseUrl}/allEmployees`,{responseType:'json'});
  }
  getProjectIdName(){
    return this.http.get(`${this.projectUrl}/allProjectsAssigned`,{responseType:'json'});
  }
  updateproject(data:any,id:any){
    return this.http.put(`${this.projectUrl}/update/${id}`,data,{responseType:'text'});
  }

  loadProjectById(Id:any){
    return this.http.get(`${this.projectUrl}/${Id}`,{responseType:'json'});
  }

}
