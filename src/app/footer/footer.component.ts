import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
    public showFooter: boolean = false;

    constructor() { }

    ngOnInit() {
    }

    onFooterEnterClick() {
        this.showFooter = true;
    }

    onFooterCloseClick() {
        this.showFooter = false;
    }

}
