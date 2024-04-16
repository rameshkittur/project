import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'

})
export class DataService {
  constructor(private http: HttpClient) {}

  taskUrl='http://localhost:8082/tasks';
  projectBaseUrl='http://localhost:8082/project';

  getData(): Observable<any[]> {
    return this.http.get<any[]>(`${this.taskUrl}/assignedTo`);
  }

  getProjectName(id:any){
    return this.http.get(`${this.projectBaseUrl}/${id}`);
  }

  updateTaskStatus(taskData:any){
   let id=taskData.taskId;
   
    return this.http.put(`${this.taskUrl}/status/update/${id}`,{'status':taskData.taskStatus},{responseType:'text' as 'json'});
  }
}
