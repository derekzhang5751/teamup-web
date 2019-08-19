import { Component, OnInit } from '@angular/core';
import { TeamupService } from '../../app/teamup.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-team-view',
    templateUrl: './team-view.component.html',
    styleUrls: ['./team-view.component.scss']
})
export class TeamViewComponent implements OnInit {
    private mode: string;
    private teamId: number;

    public userId: number;
    public team: Team;
    public photoList: Array<Photo>;
    // for Request
    public requestRemark: string;

    constructor(private route: ActivatedRoute, private service: TeamupService) {
    }

    ngOnInit() {
        this.userId = this.service.userId;
        this.photoList = [];
        this.team = {
            id: 0,
            author: this.service.userId,
            category: 0,
            time_begin: '',
            time_end: '',
            need_review: true,
            dp_self: 5,
            dp_other: 7,
            create_time: '',
            status: 0,
            people: '',
            title: '',
            location: '',
            desc: ''
        };
        this.requestRemark = '';

        this.mode = this.route.snapshot.paramMap.get('mode');
        this.teamId = +this.route.snapshot.paramMap.get('id');
        this.requestTeamDetail(this.teamId);
    }

    onRequestJoinClick() {
        if (this.userId <= 0) {
            this.alert('Please login first.');
            return;
        }
        let remark = 'Request join';
        if (this.requestRemark.length > 0) {
            remark = this.requestRemark;
        }
        this.requestJoinTeam(this.userId, remark);
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

    onSubscriptClick() {
        const userId = this.service.userId;
        if (userId <= 0) {
            this.alert('Please login first.');
            return;
        }
        this.doSubscriptTeam(userId);
    }

    private requestJoinTeam(userId: number, remark: string) {
        const apply = {
            user_id: userId,
            team_id: this.team.id,
            status: 1,
            remark
        };
        this.service.apiApplyTeam(apply).subscribe(
            (resp: any) => {
                console.log(resp);
                if (resp.success) {
                    // this.navCtrl.pop();
                } else {
                    this.alert(resp.msg);
                }
            }
        );
    }

    private doSubscriptTeam(userId) {
        let apply = {
            user_id: userId,
            team_id: this.team,
            status: 0,
            remark: 'subscript'
        };
        this.service.apiApplyTeam(apply).subscribe(
            (resp: any) => {
                console.log(resp);
                if (resp.success) {
                    // this.navCtrl.pop();
                } else {
                    this.alert(resp.msg);
                }
            }
        );
    }

    private alert(msg: string) {
        console.log('Alart: ' + msg);
        window.alert(msg);
    }
}
