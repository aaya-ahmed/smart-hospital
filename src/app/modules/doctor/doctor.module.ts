import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DoctorRoutingModule } from './doctor-routing.module';
import { DoctorComponent } from './doctor.component';
import { AppointmentsComponent } from './appointments/appointments.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddPrescriptionComponent } from './add-prescription/add-prescription.component';
import { ShowVitalSignsComponent } from './show-vital-signs/show-vital-signs.component';
import {NgxPaginationModule} from 'ngx-pagination'; 
import { LabComponent } from './lab/lab.component';
import { ScanComponent } from './scan/scan.component';
import { ShowPrescriptionComponent } from './show-prescription/show-prescription.component';
import { InPatientListComponent } from './inpatientlist/inpatientlist.component';
import { MatDatepickerModule} from '@angular/material/datepicker';
import { MatInputModule} from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { DischargeComponent } from './discharge/discharge.component';
import { ProfileComponent } from './profile/profile.component';
import { OldIndoorRecordsComponent } from './old-indoor-records/old-indoor-records.component';
import { ReqScanComponent } from './req-scan/req-scan.component';
import { ReqLabComponent } from './req-lab/req-lab.component';
import { SharedModule } from '../shared/shared.module';
import { SidehostComponent } from './sidehost/sidehost.component';
import { ExaminationComponent } from './examination/examination.component';
@NgModule({
  declarations: [
    DoctorComponent,
    AppointmentsComponent,
    AddPrescriptionComponent,
    ShowVitalSignsComponent,
    LabComponent,
    ScanComponent,
    ShowPrescriptionComponent,
    InPatientListComponent,
    DischargeComponent,
    ProfileComponent,
    OldIndoorRecordsComponent,
    ReqScanComponent,
    ReqLabComponent,
    SidehostComponent,
    ExaminationComponent
  ],
  imports: [
    CommonModule,
    DoctorRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule ,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    MatButtonModule,
    MatIconModule,
    SharedModule
 ]
})
export class DoctorModule { }
