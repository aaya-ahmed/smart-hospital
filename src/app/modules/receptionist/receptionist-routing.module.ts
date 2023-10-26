import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddpatientComponent } from './addpatient/addpatient.component';
import { BillComponent } from './bill/bill.component';
import { MakeAppointmentComponent } from './make-appointment/make-appointment.component';
import { PatientAppointmentComponent } from './patient-appointment/patient-appointment.component';
import { ProfileComponent } from './profile/profile.component';
import { ReceptionistComponent } from './receptionist.component';
import { ShowAppointmentComponent } from './show-appointment/show-appointment.component';

const routes: Routes = [
  { path: '', component: ReceptionistComponent,children: [
    { path: '', component: ProfileComponent },
    { path: 'profile', component: ProfileComponent },
    {path:'bill',component:BillComponent},
  { path: 'patient', component: AddpatientComponent},
  { path: 'show-appointment', component:ShowAppointmentComponent},
  {path:'make-appointment',component:MakeAppointmentComponent},
  {path:'patient-appointment',component:PatientAppointmentComponent}
]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReceptionistRoutingModule { }
