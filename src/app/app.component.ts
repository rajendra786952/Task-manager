import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { TaskService } from './services/task.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'task-manager';
  show=false;
  mode:any="side";
  open=true;
  constructor(public task_service:TaskService,public breakpointObserver: BreakpointObserver){

  }
  ngOnInit(): void {
    this.breakpointObserver
    .observe(['(min-width: 1000px)'])
    .subscribe((state: BreakpointState) => {
      if (state.matches) {
           this.show=false;
           this.mode="side";
           this.open=true;
        console.log('Viewport is 900px or over!');
      } else {
        this.show=true;
        this.mode="over";
        this.open=false;
        console.log('Viewport is smaller than 900px!');
      }
    });
  }
  ngOnInt(){
   
  }
}
