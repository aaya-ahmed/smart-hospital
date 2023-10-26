import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HostDirective } from 'src/app/directivies/host.directive';
import { HeaderComponent } from './header/header.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { UpdateprofileComponent } from './profile/updateprofile/updateprofile.component';
import { UpdatepasswordComponent } from './profile/updatepassword/updatepassword.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { sidehosttemplate } from './sidehosttemplate/sidehost.component';
import { ProfileImageComponent } from './profile/profile-image/profile-image.component';
import { ProfileInfoComponent } from './profile/profile-info/profile-info.component';



@NgModule({
  declarations: [
    HostDirective,
    HeaderComponent,
    SidebarComponent,
    UpdateprofileComponent,
    UpdatepasswordComponent,
    ProfileImageComponent,
    ProfileInfoComponent
  ],
  imports: [
    CommonModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports:[ProfileInfoComponent,HostDirective,HeaderComponent,SidebarComponent,UpdateprofileComponent,UpdatepasswordComponent,ProfileImageComponent]
})
export class SharedModule { }
