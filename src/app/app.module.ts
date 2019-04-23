import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MyMessagesComponent } from './my-messages/my-messages.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { MySubscriptsComponent } from './my-subscripts/my-subscripts.component';
import { MyTeamsComponent } from './my-teams/my-teams.component';
import { SignupComponent } from './signup/signup.component';
import { TeamComponent } from './team/team.component';
import { TeamViewComponent } from './team-view/team-view.component';
import { UploadComponent } from './upload/upload.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    MyMessagesComponent,
    MyProfileComponent,
    MySubscriptsComponent,
    MyTeamsComponent,
    SignupComponent,
    TeamComponent,
    TeamViewComponent,
    UploadComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
