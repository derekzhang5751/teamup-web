import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

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

import { TeamupService } from './teamup.service';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ActivateComponent } from './activate/activate.component';

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
    UploadComponent,
    HeaderComponent,
    FooterComponent,
    ActivateComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    TeamupService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
