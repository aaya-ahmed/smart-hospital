import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatientRoutingModule } from './patient-routing.module';
import { PatientComponent } from './patient.component';
import { ProfileComponent } from './profile/profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { NgxPaginationModule } from 'ngx-pagination';
import { PrescriptionsComponent } from './prescriptions/prescriptions.component';
import { TestsComponent } from './tests/tests.component';
import { IndoorRecordsComponent } from './indoor-records/indoor-records.component';
import { ScansComponent } from './scans/scans.component';
import { SharedModule } from '../shared/shared.module';
import { SidehostComponent } from './sidehost/sidehost.component';
import { PatientappointmentsComponent } from './profile/patientappointments/patientappointments.component';


@NgModule({
  declarations: [
    PatientComponent,
    ProfileComponent,
    PrescriptionsComponent,
    TestsComponent,
    IndoorRecordsComponent,
    ScansComponent,
    SidehostComponent,
    PatientappointmentsComponent
  ],
  imports: [
    CommonModule,
    PatientRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
     NgxPaginationModule ,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    MatButtonModule,
    MatIconModule,
    SharedModule
  ]
})
export class PatientModule { }
