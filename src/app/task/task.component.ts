import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { task, tasktype } from '../modal/task';
import { TaskService } from '../services/task.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { AddTaskComponent } from './add-task/add-task.component';
import { flyInOut } from '../Animation/animation';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
    },
    animations: [
      flyInOut()
    ]
})
export class TaskComponent implements OnInit,AfterViewInit {
  displayedColumns: string[] = ['no','task','type', 'creator', 'start_date', 'end_date','status','action'];
  dataSource=new MatTableDataSource<tasktype>();
  @ViewChild(MatSort)
  sort: MatSort = new MatSort;
  data:tasktype[]=[];
  constructor(private task_service:TaskService,private toastr: ToastrService,private dialog: MatDialog) { }

  ngOnInit(): void {
    this.gettask();
  }
  
  ngAfterViewInit() {
   // this.dataSource.sort = this.sort;
  }
  gettask(){
    this.task_service.gettask().subscribe((res:any)=>{
      if(res){
        this.data=[];
      console.log(res);
      for(let x of res){
        var req:any={}
        if(x.isGlobal && x.isLeader){
          //x.start=new Date(x.start);
          req=x;
          req.type='Global';
          this.data.push(req);
          this.data.push({creator:x.creator,end:x.end,
          isCompleted:x.isCompleted,
          isGlobal:x.isGlobal,
          isLeader:x.isLeader,
          start:x.start,
          text:x.text,type:'Team Leader',id:x.id});
        }
        else if(x.isGlobal && !x.isLeader){
         // x.start=new Date(x.start);
          req=x;
         req.type='Global';
         this.data.push(req);
        }
        else if(!x.isGlobal && x.isLeader){
          req=x;
          req.type='Team Leader';
          this.data.push(req);
        }
        else{
          //x.start=new Date(x.start);
          req=x;
         req.type='Personal';
         this.data.push(req);
        }
      }
        this.data.sort((a,b)=>{
          var dateA = new Date(a.start).getTime();
          var dateB = new Date(b.start).getTime();
          return dateA > dateB ? 1 : -1;  
        })

       this.dataSource= new MatTableDataSource<tasktype>(this.data);
       this.dataSource.sort = this.sort;
      }
    },
    error =>{
     console.log(error);
    });
 }

 setstatus(v: any,i: any){
  this.data[i].isCompleted=v.target.checked;
  this.task_service.updatetask(this.data[i]).subscribe((res:any)=>{
      if(this.data[i].isCompleted){
        this.toastr.success('Task is Done');
      }
      else{
        this.toastr.error("Task is Incompleted");    
      }
  },error =>{
    this.toastr.error(error.message);
    console.log(error);
  })
 }

 applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();
}

createTask(){
  const dialogRef = this.dialog.open(AddTaskComponent,{ width: '600px'});
  dialogRef.afterClosed().subscribe(result => {
    if(result=='successful'){
      this.gettask();
    }
    })
}

}
