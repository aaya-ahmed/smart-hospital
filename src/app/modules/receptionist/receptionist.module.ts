import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReceptionistRoutingModule } from './receptionist-routing.module';
import { ReceptionistComponent } from './receptionist.component';
import { MakeAppointmentComponent } from './make-appointment/make-appointment.component';
import { MatDatepickerModule} from '@angular/material/datepicker';
import { MatInputModule} from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddpatientComponent } from './addpatient/addpatient.component';
import { ShowAppointmentComponent } from './show-appointment/show-appointment.component';
import { PatientAppointmentComponent } from './patient-appointment/patient-appointment.component';
import { ProfileComponent } from './profile/profile.component';
import { BillComponent } from './bill/bill.component';
import { SharedModule } from '../shared/shared.module';
import { SidehostComponent } from './sidehost/sidehost.component';


@NgModule({
  declarations: [
    ReceptionistComponent,
    MakeAppointmentComponent,
    AddpatientComponent,
    ShowAppointmentComponent,
    PatientAppointmentComponent,
    ProfileComponent,
    BillComponent,
    SidehostComponent
  ],
  imports: [
    CommonModule,
    ReceptionistRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    MatButtonModule,
    MatIconModule,
    SharedModule
  ]
})
export class ReceptionistModule { }
