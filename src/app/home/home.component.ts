import { Component, OnInit } from '@angular/core';

import { TeamupService } from '../../app/teamup.service';
import { LoginComponent } from '../login/login.component';
import { TeamComponent } from '../team/team.component';
import { TeamViewComponent } from '../team-view/team-view.component';
import { MyProfileComponent } from '../my-profile/my-profile.component';

import { MyDatetime } from '../../app/mydatetime';
import { from } from 'rxjs';
import { Router } from '@angular/router';

declare var $: any;

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    public lang: string;
    public searchDate: string;
    public searchCity: string;
    public searchCondition = {
        user_id: 0,
        text: '',
        category: 0,
        city: 'Toronto',
        status: 0
    };
    public teamsRecommended: Array<Team>;
    public teamsRecent: Array<TeamBrief>;

    constructor(private service: TeamupService, public router: Router) {
        this.lang = this.service.language;

        const today = new MyDatetime();
        today.addDays(-7);
        this.searchDate = today.format('yyyy-MM-dd');
        this.searchCity = 'Toronto';
        this.teamsRecent = [];
        this.teamsRecommended = [];
    }

    ngOnInit() {
        $('.home_datetime').datetimepicker({
            format: 'yyyy-mm-dd',
            autoclose: true,
            todayBtn: true,
            todayHighlight: true,
            minView: 2
        });

        this.doSearch();
    }

    switchLanguage(lang: string) {
        this.lang = lang;
        this.service.language = this.lang;
    }

    openTeamView(teamId: number) {
        const url = '/team/view/' + teamId as string;
        this.router.navigate([url]);
    }

    openNewTeam() {
        const url = '/myteam/create/0';
        this.router.navigate([url]);
    }

    reviewTeam(teamId: number) {
        const url = '/team/review/' + teamId as string;
        this.router.navigate([url]);
    }

    onTeamClick(team: TeamBrief) {
        if (team.user_id === this.service.userId) {
            this.reviewTeam(team.id);
        } else {
            this.openTeamView(team.id);
        }
    }

    doSearch() {
        this.searchCondition.user_id = 0;
        this.service.apiSearchTeams(this.searchCondition).subscribe(
            (resp: any) => {
                console.log(resp);
                if (resp.success) {
                    this.teamsRecommended = resp.data.recommended;
                    this.teamsRecent = resp.data.recent;
                } else {
                    this.alert(resp.msg);
                }
            }
        );
    }

    private alert(msg: string) {
        console.log('Alert:', msg);
    }
}
