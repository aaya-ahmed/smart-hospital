import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './maincomponent/home/home.component';
import { LoginComponent } from './maincomponent/login/login.component';
import { RegComponent } from './maincomponent/reg/reg.component';
import { DepartmentsComponent } from './maincomponent/departments/departments.component';
import { scheduleComponent } from './maincomponent/schedule/schedule.component';
import { MainHomeComponent } from './maincomponent/home/main-home/main-home.component';
import { AllDoctorsComponent } from './maincomponent/all-doctors/all-doctors.component';
import { ErrorpageComponent } from './errorpage/errorpage.component';
import { AdminactiveGuard } from 'src/guards/adminactive.guard';
import { DoctoractiveGuard } from 'src/guards/doctoractive.guard';
import { PatientactiveGuard } from 'src/guards/patientactive.guard';
import { ScandoctoractiveGuard } from 'src/guards/scandoctoractive.guard';
import { LabdoctoractiveGuard } from 'src/guards/labdoctoractive.guard';
import { ReceptionistactiveGuard } from 'src/guards/receptionistactive.guard';
import { NurseactiveGuard } from 'src/guards/nurseactive.guard';

const routes: Routes = [

   {path:'',component:HomeComponent,children:[
      {path:'',component:MainHomeComponent},
      {path:'home',component:MainHomeComponent},
      {path:'login',component:LoginComponent},
      {path:'reg',component:RegComponent},
      {path:'departments',component:DepartmentsComponent},
      {path:'schedule',component:scheduleComponent},
      {path:'alldoctors',component:AllDoctorsComponent},
      {path:'alldoctors/:departmentname',component:AllDoctorsComponent}
   ]},
   {path: 'admin', loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule),canActivate:[AdminactiveGuard] },
   {path:'doctor', loadChildren: () => import('./modules/doctor/doctor.module').then(m => m.DoctorModule),canActivate:[DoctoractiveGuard] },
   {path:'nurse', loadChildren: () => import('./modules/nurse/nurse.module').then(m => m.NurseModule),canActivate:[NurseactiveGuard] },
   {path:'receptionist', loadChildren: () => import('./modules/receptionist/receptionist.module').then(m => m.ReceptionistModule),canActivate:[ReceptionistactiveGuard] },
   {path:'lab doctor', loadChildren: () => import('./modules/medical-analysit/medical-analysit.module').then(m => m.MedicalAnalysitModule),canActivate:[LabdoctoractiveGuard] },
   {path:'scan doctor', loadChildren: () => import('./modules/scan-doctor/scan-doctor.module').then(m => m.ScanDoctorModule),canActivate:[ScandoctoractiveGuard] },
   {path:'patient', loadChildren: () => import('./modules/patient/patient.module').then(m => m.PatientModule) ,canActivate:[PatientactiveGuard]},
   {path:"**",component:ErrorpageComponent}
]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
  
}
