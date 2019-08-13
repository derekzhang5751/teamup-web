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
    public photoList: Array<string>;
    public applyList: Array<{
        id: number,
        user_id: number,
        team_id: number,
        status: number,
        remark: string,
        first_name: string,
        user_photo: string
    }>;

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

        this.applyList = [];
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

    onCancelClick() {
        // this.navCtrl.pop();
    }

    onSaveTeamClick() {
        this.service.apiSaveTeamOfUser(this.team).subscribe(
            (resp: any) => {
                console.log(resp);
                if (resp.success) {
                    // this.team.id = resp.data.userId;
                    const url = '/myteam/edit/' + resp.data.teamId as string;
                    this.router.navigate([url]);
                } else {
                    this.alert(resp.msg);
                }
            }
        );
    }

    onUploadPhotoClick() {
        //
    }

    onAcceptClick(apply) {
        this.service.apiAcceptApply(apply).subscribe(
            (resp: any) => {
                console.log(resp);
                if (resp.success) {
                    apply.status = 2;
                } else {
                    this.alert(resp.msg);
                }
            }
        );
    }

    private requestTeamDetail(teamId: number) {
        this.service.apiGetTeamDetail(teamId).subscribe(
            (resp: any) => {
                console.log(resp);
                if (resp.success) {
                    this.team = resp.data.team;
                }
            }
        );
    }

    private updateApplyList() {
        this.service.apiGetApplyList(this.team.id).subscribe(
            (resp: any) => {
                console.log(resp);
                if (resp.success) {
                    this.applyList = resp.data.users;
                }
            }
        );
    }

    private alert(msg: string) {
        //
    }
}
