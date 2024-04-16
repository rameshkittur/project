import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ManagerService {

  constructor(private http:HttpClient) { }
  taskBaseUrl='http://localhost:8082/tasks';
  userBaseUrl='http://localhost:8080/api';
  projectBaseUrl='http://localhost:8082/project';

  createNewTask(data:any){
    return this.http.post(`${this.taskBaseUrl}/new`,data,{responseType:'text'});
  }
 isUserIsEmplyee(email:any):Observable<boolean>{
      let users:any[]
    return this.http.get(`${this.userBaseUrl}/manager/allEmployees`,{responseType:'json'}) .pipe(
      map(users => {
        if (Array.isArray(users)) {
          for (let user of users) {
            if (user.email === email) {
              return true;
            }
          }
        }
        return false; // Return false if user is not found
      })
    );
  }

  getProjectIdName(){
      return this.http.get(`${this.projectBaseUrl}/allProjectsAssigned`,{responseType:'json'});
  }
  getOnlyEmployee(){
    return this.http.get(`${this.userBaseUrl}/manager/allEmployees`,{responseType:'json'})
  }
  getYourProjects(){
    return this.http.get(`${this.projectBaseUrl}/yourProjectsInDetail`,{})
  }
  loadTasks(projectId:any){
    return this.http.get(`${this.taskBaseUrl}/tasksYouCreated/${projectId}`,{responseType:'json'});
  }
  updateProjectStatus(id:any,projectStatus:any){
    return this.http.put(`${this.projectBaseUrl}/status/update/${id}`,{status:projectStatus},{responseType:'text'});
  }
  updateTask(task:any,id:any){
      return this.http.put(`${this.taskBaseUrl}/update/${id}`,task,{responseType:'text'});
  }
  loadTaskById(id:any){
      return this.http.get(`${this.taskBaseUrl}/${id}`,{responseType:'json'})
  }
}
