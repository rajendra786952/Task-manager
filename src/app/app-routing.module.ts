import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CalenderComponent } from './calender/calender.component';
import { HomeComponent } from './home/home.component';
import { TaskComponent } from './task/task.component';

const routes: Routes = [
  {
   path:'',
   redirectTo:'home',
   pathMatch:'full'
  },
  {
    path:'home',
    component:HomeComponent
  },
  {
    path:'task',
    component:TaskComponent
  },
  {
    path:'task-scheduled',
    component:CalenderComponent
  },
  {
    path:'**',
    component:HomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
