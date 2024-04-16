import { Component, OnInit } from '@angular/core';
import { ProfileService } from './profile.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { faUserPen,faUser} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  editProfile=faUserPen;
  user=faUser;
 
  userProfile: any;
  userEmail:any=sessionStorage.getItem('userEmail');
  userId:any;
  loginResponse:any=sessionStorage.getItem('key');
  

  constructor(private profileService: ProfileService) {}

  ngOnInit() {
    this.loadUserProfile();
    console.log("oninit");
  }
 
  skills:any[]=[];
  loadUserProfile() {
    this.profileService.getUserProfile().subscribe({
      next:
      (data) => {
        this.userProfile = data;
        this.skills=data.allSkills;
      },
      error:
      (error) => {
        console.error('Error fetching user profile:', error);
      }
  });
  }

  skill:string="";

  profile: any = {
    id:sessionStorage.getItem('id'),
    phoneNumber: '',
    address: '',
    department: '',
    gender: '',
    skillId: [] 
  };
 
  profileInvalid=false;
  profileCreated=true;
  success=false;
  wrongPhoneNumber=false;
  onSubmit() {

    if (this.profile.phoneNumber.length < 10 || this.profile.phoneNumber.length > 10) {
     this.wrongPhoneNumber=true;
    }else{
    this.profile.skillId=[...this.intSet];
  

      console.log('Submitted profile:', this.profile);
      this.profileService.addUserProfile(this.profile).subscribe({
        next:
        (res:any)=>{
          console.log(res);
          this.loadUserProfile();
          this.success=true;
       
        },
        error:
        (error:any)=>{
            console.log(error);
            this.profileCreated=false;
        }
      });
    }
    
    // Here you can send the profile data to your backend server
  }
  intSet = new Set<number>();
  addSkill() {
    this.profileService.addSkills(this.skill).subscribe({
      next:
      (data) => {
       this.intSet.add(data.id);
       console.log(this.intSet);
       this.skill="";
      },
      error:
      (error) => {
        console.error('Error fetching user profile:', error);
      }
  });
    
  }

 

}
