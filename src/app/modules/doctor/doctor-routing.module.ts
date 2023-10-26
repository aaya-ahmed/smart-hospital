import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddPrescriptionComponent } from './add-prescription/add-prescription.component';
import { AppointmentsComponent } from './appointments/appointments.component';
import { InPatientListComponent } from './inpatientlist/inpatientlist.component';
import { DoctorComponent } from './doctor.component';
import { OutPatientComponent } from './out-patient/out-patient.component';
import { ScanComponent } from './scan/scan.component';
import { ShowPrescriptionComponent } from './show-prescription/show-prescription.component';
import { ShowVitalSignsComponent } from './show-vital-signs/show-vital-signs.component';
import { InPatientComponent } from './in-patient/in-patient.component';
import { DischargeComponent } from './discharge/discharge.component';
import { ProfileComponent } from './profile/profile.component';


const routes: Routes = [
  { path: '', component:DoctorComponent,children: [
    {path:'',component:ProfileComponent},    
    {path:'profile',component:ProfileComponent},    
    {path:'appointments',component:AppointmentsComponent},
    {path:"in-patientlist",component:InPatientListComponent},
    {path: 'patient/in/vital-signs',component:ShowVitalSignsComponent},
    {path: 'patient/out/add-prescription',component:AddPrescriptionComponent},
    {path: 'patient/out/show-prescription',component:ShowPrescriptionComponent},
    {path: 'patient/in/add-prescription',component:AddPrescriptionComponent},
    {path:'outpatient',component:OutPatientComponent},
    {path:"scans",component:ScanComponent},
    {path:"in-patient",component:InPatientComponent},
    {path:"discharge",component:DischargeComponent}

  ]}

];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DoctorRoutingModule { }
