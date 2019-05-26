import { Component, OnInit } from '@angular/core';
import { TeamupService } from '../../app/teamup.service';
import { MyDatetime } from '../../app/mydatetime';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-team',
    templateUrl: './team.component.html',
    styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {
    public mode: string;
    public team: Team;
    public applyList: Array<{
        id: number,
        user_id: number,
        team_id: number,
        status: number,
        remark: string,
        first_name: string,
        user_photo: string
    }>;
    public title: string;
    public beginMin: string;
    public beginMax: string;
    public endMin: string;
    public endMax: string;

    constructor(private route: ActivatedRoute, private service: TeamupService,) {
    }

    ngOnInit() {
        this.applyList = [];
        this.mode = this.route.snapshot.paramMap.get('mode');
        if (this.mode == 'create') {
            this.team = {
                id: 0,
                author: this.service.getUser().id,
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
            this.title = 'Build Your Team';
            let today = new MyDatetime();
            this.beginMin = today.format("yyyy-MM-dd");
            today.addMonths(6);
            this.beginMax = today.format("yyyy-MM-dd");
            this.endMin = this.beginMin;
            this.endMax = this.beginMax;
        } else {
            let id = this.route.snapshot.paramMap.get('id');
            //this.team = params.get('team');
            this.title = this.team.title;
            this.beginMin = '2018-01-01';
            this.beginMax = '2068-01-01';
            this.endMin = this.beginMin;
            this.endMax = this.beginMax;
            this.updateApplyList();
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

    onCloseClick() {
        //this.navCtrl.pop();
    }

    onSaveClick() {
        this.service.apiCreateTeamOfUser(this.team).subscribe(
            resp => {
                console.log(resp);
                if (resp['success']) {
                    //this.navCtrl.pop();
                } else {
                    this.alert(resp['msg']);
                }
            }
        );
    }

    onAcceptClick(apply) {
        this.service.apiAcceptApply(apply).subscribe(
            resp => {
                console.log(resp);
                if (resp['success']) {
                    apply.status = 2;
                } else {
                    this.alert(resp['msg']);
                }
            }
        );
    }

    private updateApplyList() {
        this.service.apiGetApplyList(this.team.id).subscribe(
            resp => {
                console.log(resp);
                if (resp['success']) {
                    this.applyList = resp['data']['users'];
                }
            }
        );
    }

    private alert(msg: string) {
        //
    }
}
