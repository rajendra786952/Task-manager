import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular';
import { flyInOut } from '../Animation/animation';
import { task } from '../modal/task';
import { TaskService } from '../services/task.service';
@Component({
  selector: 'app-calender',
  templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
    },
    animations: [
      flyInOut()
    ]
})
export class CalenderComponent implements OnInit {
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth'
  };
  date:any=[];
  constructor(private task_service:TaskService) { }

  ngOnInit(): void {
    this.gettask();
  }
  gettask(){
    this.task_service.gettask().subscribe((res:any)=>{
      if(res){
      console.log(res);
      res.map((x:task)=>{
        this.date.push({ title:x.text,date:x.start,end:x.end});
      })
        this.calendarOptions.events=this.date;
      }
    },
    error =>{
     console.log(error);
    });
  }
}
