import { Component, OnInit } from '@angular/core';
import { TeamupService } from '../../app/teamup.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-team-view',
    templateUrl: './team-view.component.html',
    styleUrls: ['./team-view.component.scss']
})
export class TeamViewComponent implements OnInit {
    public mode: string;
    public team: {
        id: number;
        author: number,
        category: number,
        time_begin: string,
        time_end: string,
        need_review: boolean,
        dp_self: number,
        dp_other: number,
        create_time: string,
        status: number,
        people: string,
        title: string,
        location: string,
        desc: string
    };

    constructor(private route: ActivatedRoute, private service: TeamupService) {
    }

    ngOnInit() {
        this.mode = this.route.snapshot.paramMap.get('mode');
        //this.team.id = this.route.snapshot.paramMap.get('id') as number;
        console.log(this.team);
    }

    onCloseClick() {
        //this.navCtrl.pop();
    }

    onApplyClick() {
        let userId = this.service.getUser().id;
        if (userId <= 0) {
            this.alert('Please login first.');
            return;
        }
        this.doApplyTeam(userId);
    }

    onSubscriptClick() {
        let userId = this.service.getUser().id;
        if (userId <= 0) {
            this.alert('Please login first.');
            return;
        }
        this.doSubscriptTeam(userId);
    }

    onMessageClick() {
        //
    }

    private doApplyTeam(userId) {
        let apply = {
            user_id: userId,
            team_id: this.team,
            status: 1,
            remark: 'apply'
        };
        this.service.apiApplyTeam(apply).subscribe(
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

    private doSubscriptTeam(userId) {
        let apply = {
            user_id: userId,
            team_id: this.team,
            status: 0,
            remark: 'subscript'
        };
        this.service.apiApplyTeam(apply).subscribe(
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

    private alert(msg: string) {
        //
    }
}
