import { Component, OnInit } from '@angular/core';
import { TeamupService } from '../../app/teamup.service';


@Component({
    selector: 'app-my-messages',
    templateUrl: './my-messages.component.html',
    styleUrls: ['./my-messages.component.scss']
})
export class MyMessagesComponent implements OnInit {
    public mode: string;
    public team: {
        id: number;
        author: number,
        category: number,
        time_begin: string,
        time_end: string,
        need_review: boolean,
        dp_self: number,
        dp_other: number
        create_time: string,
        status: number,
        people: string,
        title: string,
        location: string,
        desc: string
    };
    public applyList: Array<{
        id: number,
        user_id: number,
        team_id: number,
        status: number,
        remark: string,
        first_name: string,
        user_photo: string
    }>;

    constructor(private service: TeamupService) {
        //
    }

    ngOnInit() {
    }

    onCloseClick() {
        //
    }

    onSaveClick() {
        //
    }

    private alert(msg: string) {
        //
    }
}
