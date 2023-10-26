import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddscanComponent } from './addscan/addscan.component';
import { ProfileComponent } from './profile/profile.component';
import { RequestsComponent } from './requests/requests.component';
import { ScanDoctorComponent } from './scan-doctor.component';
import { ShowscanComponent } from './showscan/showscan.component';
import { ScansComponent } from './scans/scans.component';

const routes: Routes = [{ path: '', component: ScanDoctorComponent ,children:[
  {path:'',component:ProfileComponent},
  {path:'profile',component:ProfileComponent},
  {path:'requests',component:RequestsComponent},
  {path:'scans',component:ScansComponent},
  {path:'addscan',component:AddscanComponent},
  {path:'showscan',component:ShowscanComponent}
]}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScanDoctorRoutingModule { }
