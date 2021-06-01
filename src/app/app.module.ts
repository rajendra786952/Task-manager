import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { TaskComponent } from './task/task.component';
import { MaterialModule } from './material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { FakeDataService } from './fake-data/fake-data.service';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { AddTaskComponent } from './task/add-task/add-task.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { FullCalendarModule } from '@fullcalendar/angular'; // the main connector. must go first
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin
import { CalenderComponent } from './calender/calender.component'; // a plugin
import { NgxSpinnerModule } from "ngx-spinner";
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

FullCalendarModule.registerPlugins([ 
  dayGridPlugin,
]);

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TaskComponent,
    AddTaskComponent,
    CalenderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientInMemoryWebApiModule.forRoot(FakeDataService,{ dataEncapsulation: false }),
    HttpClientModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-center',
      timeOut: 1000,
    }),
    FullCalendarModule,
    ReactiveFormsModule,
    MatDialogModule,
    NgxSpinnerModule,
    MatProgressSpinnerModule
  ],
  providers: [DatePipe, { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }],
  bootstrap: [AppComponent],
  entryComponents:[AddTaskComponent]
})
export class AppModule { }
