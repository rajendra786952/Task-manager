import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { task } from '../modal/task';
import { TaskService } from '../services/task.service';
import { MatTableDataSource} from '@angular/material/table';
import { flyInOut} from '../Animation/animation';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
    },
    animations: [
      flyInOut()
    ]
})
export class HomeComponent implements OnInit {
  global:task[]=[];
  personal:task[]=[];
  team_leader:task[]=[];
  displayedColumns: string[] = ['no','task', 'creator', 'start_date', 'end_date','status'];
  dataSource1=new MatTableDataSource<task>();
  dataSource2=new MatTableDataSource<task>();
  dataSource3=new MatTableDataSource<task>();
  constructor(private task_service:TaskService) { }

  ngOnInit(): void {
    this.gettask();
  }
  gettask(){
    this.task_service.gettask().subscribe((res:any)=>{
      if(res){
      console.log(res);
      res.sort((a:any,b:any)=>{
        var dateA = new Date(a.start).getTime();
        var dateB = new Date(b.start).getTime();
        return dateA > dateB ? 1 : -1;  
      });
      res.map((x:task)=>{
        if(x.isGlobal && x.isLeader){
          this.global.push(x);
          this.team_leader.push(x);
        }
        else if(x.isGlobal && !x.isLeader){
         this.global.push(x);
        }
        else{
          this.personal.push(x);
        }
      })
       this.dataSource1= new MatTableDataSource<task>(this.global);
       this.dataSource2= new MatTableDataSource<task>(this.personal);
       this.dataSource3= new MatTableDataSource<task>(this.team_leader);
      }
    },
    error =>{
     console.log(error);
    });
  }
}
