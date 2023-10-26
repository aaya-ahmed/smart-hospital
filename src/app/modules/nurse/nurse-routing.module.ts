import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddVitalSignComponent } from './in-patient/add-vital-sign/add-vital-sign.component';
import { InPatientComponent } from './in-patient/in-patient.component';
import { NurseComponent } from './nurse.component';
import { ProfileComponent } from './profile/profile.component';
import { ReversePatientComponent } from './reverse-patient/reverse-patient.component';
import { ShowMedicineComponent } from './in-patient/show-medicine/show-medicine.component';
import { ShowVitalComponent } from './in-patient/show-vital/show-vital.component';

const routes: Routes = [
  { path: '', component:NurseComponent,children: [
    {path:"",component:ProfileComponent},
    {path:"profile",component:ProfileComponent},
   {path:"patient-rereverstion",component:ReversePatientComponent},
   {path:"in-patient",component:InPatientComponent}
  ]}

];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NurseRoutingModule { }
