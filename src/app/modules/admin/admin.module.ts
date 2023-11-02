import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { EmployeesComponent } from './employees/employees.component';
import { DepartmentsComponent } from './departments/departments.component';
import { DoctorComponent } from './doctor/doctor.component';
import { NurseComponent } from './nurse/nurse.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination';
import { SeatBedsComponent } from './seat-beds/seat-beds.component';
import { ProfileComponent } from './profile/profile.component';
import { AdddoctorComponent } from './doctor/adddoctor/adddoctor.component';
import { ShowdoctorComponent } from './doctor/showdoctor/showdoctor.component';
import { SidehostComponent } from './sidehost/sidehost.component';
import { SharedModule } from '../shared/shared.module';
import { AddnurseComponent } from './nurse/addnurse/addnurse.component';
import { ShownurseComponent } from './nurse/shownurse/shownurse.component';
import { AddemployeeComponent } from './employees/addemployee/addemployee.component';
import { AdddepartmentComponent } from './departments/adddepartment/adddepartment.component';
import { AddbedComponent } from './seat-beds/addbed/addbed.component';
import { ShowScheduleComponent } from './schadule/showschadule/showschedule.component';
import { SetScheduleComponent } from './schadule/setschadule/setschedule.component';
import { scheduleComponent } from './schadule/schedule.component';
import { UpdateScheduleComponent } from './schadule/update-schedule/update-schedule.component';

@NgModule({
  declarations: [
    AdminComponent,
    EmployeesComponent,
    scheduleComponent,
    DepartmentsComponent,
    DoctorComponent,
    NurseComponent,
    SetScheduleComponent,
    SeatBedsComponent,
    ProfileComponent,
    AdddoctorComponent,
    ShowdoctorComponent,
    SidehostComponent,
    AddnurseComponent,
    ShownurseComponent,
    AddemployeeComponent,
    AdddepartmentComponent,
    AddbedComponent,
    ShowScheduleComponent,
    UpdateScheduleComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule ,
    SharedModule 
   ]
})
export class AdminModule { }
