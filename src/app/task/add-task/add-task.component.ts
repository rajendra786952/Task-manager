import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements OnInit {
  date=new Date();
  taskform!: FormGroup;
  typelist=[{name:'Personal Task',value:'personal'},{name:'Team Leader Task',value:'team'},{name:'Global/Other',value:'global'}]
  constructor(public dialogRef: MatDialogRef<AddTaskComponent>,private fb:FormBuilder,
    private datePipe: DatePipe,private task_service:TaskService,private toastr: ToastrService) { 
  }
  
  ngOnInit(): void {
   this.initTaskForm();
  }
  initTaskForm(){
   this.taskform=this.fb.group({
    text:['',Validators.required],
    isGlobal:false,
    isLeader:false,
    creator:['',Validators.required],
    type:['',Validators.required],
    isCompleted: false,
    start:['',Validators.required],
    end:['',Validators.required]
   });
  }
  close() {
    this.dialogRef.close("Thanks for using me!");
  }
  
  submit(){
   console.log(this.taskform);
   if(this.taskform?.invalid){
     this.taskform.markAllAsTouched();
     return;
   }
   var start=this.taskform?.get('start')?.value;
   var end=this.taskform?.get('end')?.value;
   this.taskform?.get('start')?.setValue(this.datePipe.transform(start, 'yyyy-MM-dd'));
   this.taskform?.get('end')?.setValue(this.datePipe.transform(end, 'yyyy-MM-dd'));
   if(this.taskform?.get('type')?.value=='global'){
    this.taskform.get('isGlobal')?.setValue(true);
    this.taskform.get('isLeader')?.setValue(false);
   }
   else if(this.taskform?.get('type')?.value=='team'){
    this.taskform.get('isGlobal')?.setValue(false);
    this.taskform.get('isLeader')?.setValue(true);
   }
   var req=this.taskform?.value;
    delete req.type;
   this.task_service.createTask(req).subscribe((res:any)=>{
     //console.log(res);
     this.toastr.success('Task is created');
     this.task_service.setpersonal();
     this.dialogRef.close('successful');
   },
   error =>{
    this.toastr.error(error.message);
     console.log(error);
   })
  }
}
