import { Component, OnInit } from '@angular/core';
import { TeamupService } from '../teamup.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    public username: string;

    constructor(private service: TeamupService) { }

    ngOnInit() {
        this.username = this.service.username;
        console.log('username', this.username);
    }

}
