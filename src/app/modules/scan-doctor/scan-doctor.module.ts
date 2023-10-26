import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScanDoctorRoutingModule } from './scan-doctor-routing.module';
import { ScanDoctorComponent } from './scan-doctor.component';
import { RequestsComponent } from './requests/requests.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ScanFormComponent } from './scans/scanform/scanform.component';
import { AddscanComponent } from './addscan/addscan.component';
import { ShowscanComponent } from './showscan/showscan.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ProfileComponent } from './profile/profile.component';
import { SharedModule } from '../shared/shared.module';
import { SidehostComponent } from './sidehost/sidehost.component';
import { ScansComponent } from './scans/scans.component';


@NgModule({
  declarations: [
    ScanDoctorComponent,
    RequestsComponent,
    AddscanComponent,
    ShowscanComponent,
    ProfileComponent,
    SidehostComponent,
    ScansComponent,
    ScanFormComponent
    ],
  imports: [
    CommonModule,
    ScanDoctorRoutingModule,
    FormsModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class ScanDoctorModule { }
