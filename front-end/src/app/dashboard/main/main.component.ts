import { Component, OnInit } from '@angular/core';
import { faFilePowerpoint,faListCheck,faListOl,faCalendarDay} from '@fortawesome/free-solid-svg-icons';
import { DataService } from '../dashboardService/dataservice';
import { Chart } from 'chart.js';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit{
  constructor(private dataService:DataService){

  }
  tasksList: any[] = [];
  isTasksListEmpty=false;
  tasksInProgess=0;
  taskNotStarted=0;
  remainingTasks=0;
  totalProjects=0;

  ngOnInit(): void {
    this.dataService.getData().subscribe({
      next:(response:any[])=>{
        this.tasksList = response;
        if(this.tasksList.length==0){
          this.isTasksListEmpty=true;
        }
        console.log(this.tasksList);
        this.filter();
        this.createChart();
      },
      error:(error:any)=>{
        console.error("Login failed", error);
      }
    }
     );
     
     
  }

  project=faFilePowerpoint;
  tasks=faListCheck;
  remaining=faCalendarDay;

  public filter(){
    let mySet = new Set<any>();
    
    for(let i=0;i<this.tasksList.length;i++){
     
      if(this.tasksList[i].status=="NOT_STARTED"){
        this.taskNotStarted+=1;
      }

      if(this.tasksList[i].status=="IN_PROGRESS"){
        this.tasksInProgess+=1;
      }
      mySet.add(this.tasksList[i].projectId);

    }
   this.remainingTasks=(this.tasksInProgess+this.taskNotStarted);
    this.totalProjects=mySet.size;
  }

  public chart: any;

  createChart(){
   this.chart = new Chart("MyChart", {
      type: 'pie', //this denotes tha type of chart
      data: {// values on X-Axis
        labels: ["Tasks not started","Tasks In progress","Tasks completed"], 
	       datasets: [
          { data: [this.taskNotStarted,this.tasksInProgess,(this.tasksList.length-this.remainingTasks)],
            backgroundColor:['rgb(255, 99, 132)',
                             'rgb(54, 162, 235)',
                             'rgb(23, 170, 83)'
                            ]
          },
          ]
      },
      options: {
        aspectRatio: 2.5,
        plugins: {
          title: {
            display: true,
            text: 'Your Performance',
            font: {
              size: 24,
              weight: 'bold',
              family: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif"
            },
            padding: {
              top: 10,
              bottom: 30
            }
          },
          legend: {  
            display: true,
            labels: {
              font: {
                size: 14,
                family: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif"
              }
            }
          }
        }
      }
    });}
}
