import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { task } from '../modal/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasksUrl = 'api/tasks/';
  public  personal$ = new BehaviorSubject(0);
  public  team$ = new BehaviorSubject(0);
  constructor(private http: HttpClient) {
    this.setpersonal();
   }

  gettask(): Observable<task[]> {
    return this.http.get<task[]>(this.tasksUrl);
  }
  
  updatetask(data:any):Observable<task>{
    return this.http.put<task>(this.tasksUrl+data.id,data);
  }
  createTask(data:any):Observable<task>{
    return this.http.post<task>(this.tasksUrl,data);
  }
  setpersonal(){
    this.gettask().subscribe((res:any)=>{
      if(res){
      console.log(res);
      var personal=0;
      var team=0;
      for(let x of res){
        if(x.isLeader){
          team++;
        }
        else if(!x.isGlobal && !x.isLeader){
         personal++;
        }
      }
       this.personal$.next(personal);
       this.team$.next(team)
      }
    },
    error =>{
     console.log(error);
    });
  }
}


