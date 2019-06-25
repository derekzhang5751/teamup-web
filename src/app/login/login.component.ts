import { Component, OnInit } from '@angular/core';

import { TeamupService } from '../../app/teamup.service';
import { SignupComponent } from '../signup/signup.component';


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    public lang: string;
    public username: string;
    public password: string;
    public rememberMe: boolean;
    public loginType: string;

    constructor(private service: TeamupService) { }

    ngOnInit(): void {
        this.lang = this.service.language;
        this.username = '';
        this.password = '';
        this.rememberMe = false;
        this.loginType = 'moreppl';
    }

    switchLanguage(lang: string) {
        this.lang = lang;
        this.service.language = this.lang;
    }

    onSignupClick() {
        window.open('signup', '_self');
    }

    onLoginClick() {
        //console.log('On Login', this.username, this.password, this.rememberMe);
        this.doLogin('moreppl', '', '', '');
    }

    doLogin(source: string, name: string, image: string, token: string) {
        this.service.apiUserLogin(this.username, this.password, source, name, image, token).subscribe(
            resp => {
                console.log(resp);
                if (resp['success']) {
                    this.service.username = this.username;
                    this.service.setToken(resp['data']['session']);
                    //this.service.setUser(resp['data']['user']);
                    window.open('home', '_self');
                } else {
                    this.alert(resp['msg']);
                }
            }
        );
    }

    public socialSignIn(socialPlatform: string) {
        /*let socialPlatformProvider;
        if (socialPlatform == "facebook") {
            this.alert('Developing, coming soon.');
            return;
            //socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
        } else if (socialPlatform == "google") {
            socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
        }

        this.socialAuthService.signIn(socialPlatformProvider).then(
            (userData) => {
                console.log(socialPlatform + " sign in data : ", userData);
                this.username = userData.email;
                if (socialPlatform == 'google') {
                    this.doLogin(socialPlatform, userData.name, userData.image, userData.idToken);
                } else if (socialPlatform == "facebook") {
                    this.doLogin(socialPlatform, userData.name, userData.image, userData.idToken);
                }
            }
        );*/
    }

    private alert(msg: string) {
        /*let alert = this.alertCtrl.create({
            title: this.translate.instant('DLG-TIP'),
            message: msg,
            buttons: [
                {
                    text: this.translate.instant('GOT-IT'),
                    handler: () => {
                        //console.log('Buy clicked');
                    }
                }
            ]
        });
        alert.present();*/
    }
}
