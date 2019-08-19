import { Component, OnInit } from '@angular/core';
import { TeamupService } from '../../app/teamup.service';
import { UploadComponent } from '../upload/upload.component';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: 'app-my-profile',
    templateUrl: './my-profile.component.html',
    styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent implements OnInit {
    public dataChanged = false;
    public user: User;
    public oldPass = '';
    public newPass1 = '';
    public newPass2 = '';
    public followTeams: Array<TeamBrief>;
    public myTeams: Array<TeamBrief>;
    public headPhotoUrl: any;

    constructor(private service: TeamupService, private sanitizer: DomSanitizer) { }

    ngOnInit() {
        this.headPhotoUrl = this.service.getDomain() + '/upload/default/head.svg';
        this.user = {
            id: 0,
            username: 'Derek.Z',
            level: 0,
            first_name: 'Derek',
            last_name: 'Zhang',
            email: 'derekzhang5751@gmail.com',
            mobile: '6478651048',
            sex: 0,
            birthday: '1990-12-23',
            reg_time: '2019-01-01',
            desc: 'My Description',
            photo_url: '',
            source: 'moreppl'
        };
        this.followTeams = [];
        this.myTeams = [];
        this.dataChanged = false;
        this.updateUserProfile();
        this.updateMyFollows();
        this.updateMyTeams();
    }

    onInputChanged() {
        // console.log('Something is changed');
        this.dataChanged = true;
    }

    onSaveClick() {
        console.log('Update user profile', this.user);
        this.service.apiSaveUserProfile(this.user).subscribe(
            (resp: any) => {
                console.log(resp);
                if (resp.success) {
                    this.user = resp.data.user;
                    this.dataChanged = false;
                } else {
                    this.alert(resp.msg);
                }
            }
        );
    }

    onSetHeadPhotoClick($event) {
        if ($event.target.value === '') {
            return;
        }
        console.log('Set head photo', $event);
        let url: string;
        if (navigator.userAgent.indexOf('MSIE') >= 1) { // IE
            url = $event.target.value;
        } else if (navigator.userAgent.indexOf('Firefox') > 0) { // Firefox
            url = window.URL.createObjectURL($event.files.item(0));
        } else if (navigator.userAgent.indexOf('Chrome') > 0) { // Chrome
            url = window.URL.createObjectURL($event.target.files[0]);
        }

        this.headPhotoUrl = this.sanitizer.bypassSecurityTrustUrl(url);
        this.doUpload();
    }

    onChangePassword() {
        this.service.apiChangePassword(this.user.id, this.oldPass, this.newPass1).subscribe(
            (resp: any) => {
                console.log(resp);
                if (resp.success) {
                    this.alert('Your password has been changed.');
                } else {
                    this.alert(resp.msg);
                }
            }
        );
    }

    private updateUserProfile() {
        this.service.apiGetUserProfile(this.service.userId).subscribe(
            (resp: any) => {
                console.log(resp);
                if (resp.success) {
                    this.user = resp.data.user;
                    this.headPhotoUrl = this.service.getDomain() + this.user.photo_url;
                    this.alert('Your profile has been updated.');
                } else {
                    this.alert(resp.msg);
                }
            }
        );
    }

    private updateMyFollows() {
        this.service.apiGetUserFollows(this.service.userId).subscribe(
            (resp: any) => {
                console.log(resp);
                if (resp.success) {
                    this.followTeams = resp.data.follows;
                    this.alert('Your follows has been updated.');
                } else {
                    this.alert(resp.msg);
                }
            }
        );
    }

    private updateMyTeams() {
        this.service.apiGetUserMyTeams(this.service.userId).subscribe(
            (resp: any) => {
                console.log(resp);
                if (resp.success) {
                    this.myTeams = resp.data.myteams;
                    this.alert('Your teams has been updated.');
                } else {
                    this.alert(resp.msg);
                }
            }
        );
    }

    private doUpload() {
        const apiUrl = this.service.getApiUrl('/User/User/do.php?action=upload_photo');

        const formData = new FormData();
        formData.append('file', (document.getElementById('inputGroupHeadPhoto') as HTMLInputElement).files[0]);

        const xhr = new XMLHttpRequest();
        xhr.open('POST', apiUrl);
        xhr.onload = () => {
            if (xhr.status === 200) {
                // console.log(xhr.response);
                const result = JSON.parse(xhr.response);
                if (result.success) {
                    console.log('Uploading... Success');
                } else {
                    console.log('Uploading... Failed', result.msg);
                }
            } else {
                // console.log('Upload Error');
                console.log('Uploading... Error');
            }
        };
        xhr.upload.onprogress = (event) => {
            if (event.lengthComputable) {
                const percent = Math.floor(event.loaded / event.total * 100) ;
                console.log('Uploading... ' + percent as string + '%');
            }
        };
        xhr.send(formData);
    }

    private alert(msg: string) {
        console.log('Alert', msg);
    }
}
