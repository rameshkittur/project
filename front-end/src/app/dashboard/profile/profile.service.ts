import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  
  ProfileUrl="http://localhost:8081/profile";
  skillUrl="http://localhost:8081/skills";
  jsonData:any;
  userEmail:any=sessionStorage.getItem('userEmail');
 
  id=sessionStorage.getItem('id');
  
  constructor(private http: HttpClient) {}
  getUserProfile(): Observable<any> {
    // Make HTTP request to check if user profile exists
    return this.http.get<any>(`${this.ProfileUrl}/${this.id}`); 
  }

  addUserProfile(profileData: any): Observable<any> {
    // Make HTTP request to add/update user profile
    const data=JSON.stringify(profileData);
    console.log(JSON.parse(data));
    return this.http.post<any>(`${this.ProfileUrl}/new`,JSON.parse(data),{responseType:'json'}); 
  }

  addSkills(skill:string){
    return this.http.post<any>(`${this.skillUrl}/new`,{skillName:skill},{responseType:'json'});
    
  }
}
