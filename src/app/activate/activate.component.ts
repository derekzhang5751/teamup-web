import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TeamupService } from '../teamup.service';

@Component({
    selector: 'app-activate',
    templateUrl: './activate.component.html',
    styleUrls: ['./activate.component.scss']
})
export class ActivateComponent implements OnInit {
    private token = '';
    public showTitle = '';
    public showMsg = 'Please wait, activating ...';

    constructor(private route: ActivatedRoute, private service: TeamupService) { }

    ngOnInit() {
        this.token = this.route.snapshot.paramMap.get('token');
        this.doActivate();
    }

    doActivate() {
        this.service.apiActivateUserSignup(this.token).subscribe(
            resp => {
                console.log(resp);
                if (resp['success']) {
                    this.showTitle = 'Success';
                    this.showMsg = resp['msg'];
                } else {
                    this.showTitle = 'Activate Failed';
                    this.showMsg = resp['msg'];
                }
            }
        );
    }

}
