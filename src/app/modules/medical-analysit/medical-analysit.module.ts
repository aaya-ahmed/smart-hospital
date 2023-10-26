import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MedicalAnalysitRoutingModule } from './medical-analysit-routing.module';
import { MedicalAnalysitComponent } from './medical-analysit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {  HttpClientModule } from '@angular/common/http';
import { LabsComponent } from './labs/labs.component';
import { TestResultComponent } from './testResult/testResult.component';
import { ShowRequstsComponent } from './show-requsts/show-requsts.component';
import { ShowtestComponent } from './showtest/showtest.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ProfileComponent } from './profile/profile.component';
import { SharedModule } from '../shared/shared.module';
import { SidehostComponent } from './sidehost/sidehost.component';
import { LabformComponent } from './labs/labform/labform.component';


@NgModule({
  declarations: [
    MedicalAnalysitComponent,
    LabsComponent,
    TestResultComponent,
    ShowRequstsComponent,
    ShowtestComponent,
    ProfileComponent,
    SidehostComponent,
    LabformComponent
  ],
  imports: [
    CommonModule,
    MedicalAnalysitRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule,
    NgxPaginationModule,
    SharedModule
  ]
})
export class MedicalAnalysitModule { }
