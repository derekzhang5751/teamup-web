import { Component, OnInit } from '@angular/core';
import { TeamupService } from '../../app/teamup.service';
import { MyDatetime } from '../../app/mydatetime';
import { ActivatedRoute, Router } from '@angular/router';

declare var $: any;

@Component({
    selector: 'app-team',
    templateUrl: './team.component.html',
    styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {
    private mode: string;
    private minDate: string;
    private maxDate: string;

    public title: string;
    public team: Team;
    public photoList: Array<Photo>;

    constructor(private route: ActivatedRoute, public router: Router, private service: TeamupService) {
    }

    ngOnInit() {
        $('.team_datetime').datetimepicker({
            format: 'yyyy-mm-dd',
            autoclose: true,
            todayBtn: true,
            todayHighlight: true,
            minView: 2
        });
        this.photoList = [];
        this.team = {
            id: 0,
            author: this.service.userId,
            category: 0,
            time_begin: '2018-12-01T09:00:00Z',
            time_end: '2018-12-05T17:00:00Z',
            need_review: true,
            dp_self: 5,
            dp_other: 7,
            create_time: '',
            status: 0,
            people: '5 - 10',
            title: '',
            location: '',
            desc: ''
        };

        this.mode = this.route.snapshot.paramMap.get('mode');
        if (this.mode === 'create') {
            this.title = 'Build Your Team';
            const today = new MyDatetime();
            this.minDate = today.format('yyyy-MM-dd');
            today.addDays(3);
            this.maxDate = today.format('yyyy-MM-dd');
            this.team.time_begin = this.minDate;
            this.team.time_end = this.maxDate;
        } else {
            const id = +this.route.snapshot.paramMap.get('id');
            this.title = 'Edit Your Team';
            this.requestTeamDetail(id);
        }
    }

    onTimeBeginChange() {
        console.log(this.team.time_begin);
        if (this.team.time_begin > this.team.time_end) {
            this.team.time_end = this.team.time_begin;
        }
    }

    onTimeEndChange() {
        console.log(this.team.time_end);
    }

    onSaveTeamClick() {
        this.service.apiSaveTeamOfUser(this.team).subscribe(
            (resp: any) => {
                console.log(resp);
                if (resp.success) {
                    this.team.id = resp.data.userId;
                    const url = '/myteam/edit/' + resp.data.teamId as string;
                    // this.router.navigate([url]);
                    window.open(url, '_self');
                } else {
                    this.alert(resp.msg);
                }
            }
        );
    }

    onUploadPhotoClick($event) {
        if ($event.target.value === '') {
            return;
        }
        console.log('Set head photo', $event.target.value);

        /*let url: string;
        if (navigator.userAgent.indexOf('MSIE') >= 1) { // IE
            url = $event.target.value;
        } else if (navigator.userAgent.indexOf('Firefox') > 0) { // Firefox
            url = window.URL.createObjectURL($event.files.item(0));
        } else if (navigator.userAgent.indexOf('Chrome') > 0) { // Chrome
            url = window.URL.createObjectURL($event.target.files[0]);
        }
        this.headPhotoUrl = this.sanitizer.bypassSecurityTrustUrl(url);
        */
        this.doUpload();
    }

    onDeletePhotoClick(photo: Photo) {
        console.log(photo);
    }

    private requestTeamDetail(teamId: number) {
        this.service.apiGetTeamDetail(teamId).subscribe(
            (resp: any) => {
                console.log(resp);
                if (resp.success) {
                    this.team = resp.data.team;
                    if (this.team.id > 0) {
                        this.requestTeamPhotos(this.team.id);
                    }
                }
            }
        );
    }

    private requestTeamPhotos(teamId: number) {
        this.service.apiGetTeamPhotos(teamId).subscribe(
            (resp: any) => {
                console.log(resp);
                if (resp.success) {
                    this.photoList = resp.data.photos;
                }
            }
        );
    }

    private doUpload() {
        const apiUrl = this.service.getApiUrl('/Team/Team/do.php?action=upload_image&teamid=' + this.team.id as string);
        console.log('Upload URL:' + apiUrl);

        const formData = new FormData();
        formData.append('file', (document.getElementById('inputGroupUploadPhoto') as HTMLInputElement).files[0]);

        const xhr = new XMLHttpRequest();
        xhr.open('POST', apiUrl);
        xhr.onload = () => {
            if (xhr.status === 200) {
                // console.log(xhr.response);
                const result = JSON.parse(xhr.response);
                if (result.success) {
                    console.log('Uploading... Success');
                    this.requestTeamPhotos(this.team.id);
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
        console.log('Alart: ' + msg);
        window.alert(msg);
    }
}
