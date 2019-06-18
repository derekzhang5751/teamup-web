import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { TeamViewComponent } from './team-view/team-view.component';
import { UploadComponent } from './upload/upload.component';
import { ActivateComponent } from './activate/activate.component';

//const rootPath = 'iot-monitor-dashboard/';
const rootPath = '';
const routes: Routes = [
    { path: '', redirectTo: '/'+rootPath+'home', pathMatch: 'full' },
    { path: rootPath+'home', component: HomeComponent },
    { path: rootPath+'signup', component: SignupComponent },
    { path: rootPath+'activate/:token', component: ActivateComponent },
    { path: rootPath+'login', component: LoginComponent },
    { path: rootPath+'profile', component: MyProfileComponent },
    { path: rootPath+'team/:mode/:id', component: TeamViewComponent },
    /*{ path: rootPath+'battery/:id', component: BatteryComponent }*/
    { path: rootPath+'upload', component: UploadComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
