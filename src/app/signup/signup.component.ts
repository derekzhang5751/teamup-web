import { Component, OnInit } from '@angular/core';
import { TeamupService } from '../../app/teamup.service';

declare var $: any;

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
    public lang: string;
    public username = '';
    public password = '';
    public password2 = '';
    public loginType = 'moreppl';
    public alertMsg: string = '';

    constructor(private service: TeamupService) { }

    ngOnInit(): void {
        console.log('singup oninit');
        $('.alert').alert('close');
        this.lang = this.service.language;
    }

    switchLanguage(lang: string) {
        this.lang = lang;
        this.service.language = this.lang;
    }

    onLoginClick() {
        window.open('login', '_self');
    }

    onSignupClick() {
        console.log(this.username);
        console.log(this.password);
        console.log(this.password2);
        if (this.password == this.password2) {
            this.doSignup('moreppl');
        } else {
            //this.alert('Password are not same!');
            $('.alert').alert();
        }
    }

    private doSignup(source: string) {
        this.service.apiUserSignup(this.username, this.password, source).subscribe(
            resp => {
                console.log(resp);
                if (resp['success']) {
                    this.alert('Register success, please check out your email and activate your account.');
                    //this.alert(this.translate.instant('SIGNIN-OK-MSG'));
                    //this.navCtrl.popToRoot();
                } else {
                    this.alert(resp['msg']);
                }
            }
        );
    }

    private doLogin(source: string, name: string, image: string, token: string) {
        this.service.apiUserLogin(this.username, this.password, source, name, image, token).subscribe(
            resp => {
                console.log(resp);
                if (resp['success']) {
                    this.service.username = this.username;
                    this.service.setToken(resp['data']['session']);
                    //this.service.setUser(resp['data']['user']);
                    //this.events.publish('teamup:login');
                    //this.navCtrl.popToRoot();
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
        this.alertMsg = msg;
        $('.alert').alert();
    }
}
