import { Component, OnInit } from '@angular/core';
import { TeamupService } from '../../app/teamup.service';
import { UploadComponent } from '../upload/upload.component';

@Component({
    selector: 'app-my-profile',
    templateUrl: './my-profile.component.html',
    styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent implements OnInit {
    public dataChanged = false;
    public user: User;

    constructor(private service: TeamupService) { }

    ngOnInit() {
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
        this.dataChanged = false;
        //this.updateUserProfile();
    }

    onInputChanged() {
        //console.log('Something is changed');
        this.dataChanged = true;
    }

    onCloseClick() {
        //this.navCtrl.pop();
    }

    onSaveClick() {
        this.service.apiSaveUserProfile(this.user).subscribe(
            resp => {
                console.log(resp);
                if (resp['success']) {
                    //this.service.setUser(this.user);
                    this.dataChanged = false;
                    //this.navCtrl.pop();
                } else {
                    this.alert(resp['msg']);
                }
            }
        );
    }

    onUploadHeadPhotoClick() {
        /*let opt = {
            showBackdrop: true,
            enableBackdropDismiss: false,
            cssClass: 'upload-modal'
        };
        let url = this.service.getApiUrl('/User/User/do.php?action=upload_photo&userid=' + this.user.id);
        let uploadModal = this.modalCtrl.create(UploadPage,
            {
                user_id: this.user.id,
                api_url: url
            },
            opt);
        uploadModal.onDidDismiss(data => {
            console.log('Upload return ', data);
            this.updateUserProfile();
        });
        uploadModal.present();*/
    }

    private updateUserProfile() {
        this.service.apiGetUserProfile(this.user.id).subscribe(
            resp => {
                console.log(resp);
                if (resp['success']) {
                    this.user = resp['data']['user'];
                    //this.service.setUser(this.user);
                } else {
                    this.alert(resp['msg']);
                }
            }
        );
    }

    private alert(msg: string) {
        //
    }
}
