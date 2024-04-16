import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  userName:string="";
  ngOnInit(): void {
    this.getLoggedUserData();
  }


private getLoggedUserData(){
  let loggedUserData:any;
  let localdata=sessionStorage.getItem('key');

  if(localdata!=null){
    loggedUserData=JSON.parse(localdata);
  }
  this.userName=loggedUserData.name;
}
}
