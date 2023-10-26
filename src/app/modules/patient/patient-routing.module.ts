import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MakeAppointmentComponent } from '../receptionist/make-appointment/make-appointment.component';
import { IndoorRecordsComponent } from './indoor-records/indoor-records.component';
import { PatientComponent } from './patient.component';
import { PrescriptionsComponent } from './prescriptions/prescriptions.component';
import { ProfileComponent } from './profile/profile.component';
import { ScansComponent } from './scans/scans.component';
import { TestsComponent } from './tests/tests.component';


const routes: Routes = [
  { path: '', component:PatientComponent,children: [
    {path:'',component:ProfileComponent},    
    {path:'profile',component:ProfileComponent},    
    {path:'prescriptions',component:PrescriptionsComponent},
    {path:'tests',component:TestsComponent},
    {path:'scans',component:ScansComponent},
    {path:'indoor-records',component:IndoorRecordsComponent},
    {path:'make-appointment',component:MakeAppointmentComponent}
  ]}]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientRoutingModule { }
