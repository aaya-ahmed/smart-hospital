import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TestResultComponent } from './testResult/testResult.component';
import { MedicalAnalysitComponent } from './medical-analysit.component';
import { ProfileComponent } from './profile/profile.component';
import { LabsComponent } from './labs/labs.component';
import { ShowRequstsComponent } from './show-requsts/show-requsts.component';
import { ShowtestComponent } from './showtest/showtest.component';

const routes: Routes = [{ path: '', component: MedicalAnalysitComponent ,children:[
  
  {path:'',component:ProfileComponent},
  {path:'profile',component:ProfileComponent},
  {path:'requests',component:ShowRequstsComponent},
  {path:'newtest',component:LabsComponent},
  {path:'showtest',component:ShowtestComponent},
  {path:'testresult',component:TestResultComponent}
  
]}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MedicalAnalysitRoutingModule { }
