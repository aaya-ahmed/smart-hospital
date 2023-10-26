import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { EmployeesComponent } from './employees/employees.component';
import { DepartmentsComponent } from './departments/departments.component';
import { DoctorComponent } from './doctor/doctor.component';
import { NurseComponent } from './nurse/nurse.component';
import { SeatBedsComponent } from './seat-beds/seat-beds.component';
import { ProfileComponent } from './profile/profile.component';
import { scheduleComponent } from './schadule/schedule.component';
import { SetScheduleComponent } from './schadule/setschadule/setschedule.component';

const routes: Routes = [
  { path: '', component: AdminComponent,children: [
    {path: '', component: ProfileComponent},
    {path: 'profile', component: ProfileComponent},
    {path: 'doctors', component:DoctorComponent},
    {path: 'nursies', component:NurseComponent},
    {path:'employees',component:EmployeesComponent},
    {path:'schedule',component:scheduleComponent},
    {path:'departments',component:DepartmentsComponent},
    {path:'setschedule',component:SetScheduleComponent},
    {path:'setbed',component:SeatBedsComponent}
  ]}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
