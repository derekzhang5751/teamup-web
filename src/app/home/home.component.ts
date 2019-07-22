import { Component, OnInit } from '@angular/core';

import { TeamupService } from '../../app/teamup.service';
import { LoginComponent } from '../login/login.component';
import { TeamComponent } from '../team/team.component';
import { TeamViewComponent } from '../team-view/team-view.component';
import { MyProfileComponent } from '../my-profile/my-profile.component';

import { MyDatetime } from '../../app/mydatetime';
import { from } from 'rxjs';

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
    public teamsRecent: Array<Team>;

    constructor(private service: TeamupService) {
        this.lang = this.service.language;

        const today = new MyDatetime();
        today.addDays(-7);
        this.searchDate = today.format('yyyy-MM-dd');
        this.searchCity = 'Toronto';
        this.teamsRecent = [];
        this.teamsRecommended = [];
    }

    ngOnInit() {
        console.log('home on init');
        $('.home_datetime').datetimepicker({
            format: 'yyyy-mm-dd',
            autoclose: true,
            todayBtn: true,
            todayHighlight: true,
            minView: 2
        });
    }

    switchLanguage(lang) {
        this.lang = lang;
        this.service.language = this.lang;
    }

    onLoginClick() {
        window.open('login', '_self');
    }

    onLSignupClick() {
        window.open('signup', '_self');
    }

    onMyProfileClick() {
        window.open('profile', '_self');
    }

    openTeamView(team: Team) {
        window.open('team/view/' + team.id, '_self');
    }

    openNewTeam() {
        window.open('myteam/create/0', '_self');
    }

    reviewTeam(team: Team) {
        window.open('team/review/' + team.id, '_self');
    }

    onTeamClick(team: Team) {
        if (team.author === this.service.userId) {
            this.reviewTeam(team);
        } else {
            this.openTeamView(team);
        }
    }

    doSearch() {
        this.searchCondition.user_id = 0;
        this.service.apiSearchTeams(this.searchCondition).subscribe(
            (resp: any) => {
                console.log(resp);
                if (resp.success) {
                    this.teamsRecommended = resp.data;
                    this.teamsRecent = resp.data;
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
