import { NgModule } from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './maincomponent/login/login.component';
import { RegComponent } from './maincomponent/reg/reg.component';
import { HomeComponent } from './maincomponent/home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {NgxPaginationModule} from 'ngx-pagination';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './maincomponent/home/navbar/navbar.component';
import { SliderComponent } from './maincomponent/home/slider/slider.component';
import { ContactsComponent } from './maincomponent/home/contacts/contacts.component';
import { ServicesComponent } from './maincomponent/home/services/services.component';
import { DoctorsComponent } from './maincomponent/home/doctors/doctors.component';
import { ContactusComponent } from './maincomponent/home/contactus/contactus.component';
import { FooterComponent } from './maincomponent/home/footer/footer.component';
import { DepartmentsComponent } from './maincomponent/departments/departments.component';
import { HomeHostComponent } from './maincomponent/home-host/home-host.component';
import { HostDirective } from './directivies/host.directive';
import { SharedModule } from './modules/shared/shared.module';
import { scheduleComponent } from './maincomponent/schedule/schedule.component';
import { MainHomeComponent } from './maincomponent/home/main-home/main-home.component';
import { AllDoctorsComponent } from './maincomponent/all-doctors/all-doctors.component';
import { InterceptorInterceptor } from 'src/interceptor/interceptor.interceptor';
import { ErrorpageComponent } from './errorpage/errorpage.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegComponent,
    HomeComponent,
    NavbarComponent,
    SliderComponent,
    ContactsComponent,
    ServicesComponent,
    DoctorsComponent,
    ContactusComponent,
    FooterComponent,
    DepartmentsComponent,
    HomeHostComponent,
    scheduleComponent,
    MainHomeComponent,
    AllDoctorsComponent,
    ErrorpageComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    AppRoutingModule,
    NgxPaginationModule,
    BrowserAnimationsModule,
    SharedModule
   ],
  providers: [{provide:HTTP_INTERCEPTORS,useClass:InterceptorInterceptor,multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
