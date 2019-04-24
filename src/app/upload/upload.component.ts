import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
    selector: 'app-upload',
    templateUrl: './upload.component.html',
    styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {
    private apiUrl: string;
    public imageFile: any;
    public showProgress: boolean;
    public progressText: string;
    public showSpinner: boolean;

    constructor(private sanitizer: DomSanitizer) {
    }

    ngOnInit() {
        //this.apiUrl = params.get('api_url') as string;

        this.imageFile = "";
        this.showProgress = false;
        this.progressText = "Uploading... 0%";
        this.showSpinner = false;
    }

    dismiss() {
        let data = { 'foo': 'bar' };
        //this.viewCtrl.dismiss(data);
    }

    onCloseClick() {
        this.dismiss();
    }

    onFileSelected($event) {
        //console.log($event);
        if ($event.target.value == '') {
            this.imageFile = '';
            return;
        }
        let url;
        if (navigator.userAgent.indexOf("MSIE") >= 1) { // IE
            url = $event.target.value;
        } else if (navigator.userAgent.indexOf("Firefox") > 0) { // Firefox
            url = window.URL.createObjectURL($event.files.item(0));
        } else if (navigator.userAgent.indexOf("Chrome") > 0) { // Chrome
            url = window.URL.createObjectURL($event.target.files[0]);
        }

        this.imageFile = this.sanitizer.bypassSecurityTrustUrl(url);
    }

    onUploadClick() {
        if (this.imageFile) {
            this.showProgress = true;
            this.progressText = "Uploading... 0%";
            this.showSpinner = true;
            this.doUpload();
        }
    }

    doUpload() {
        let formData = new FormData();
        formData.append('file', (document.getElementById('fileToUpload') as HTMLInputElement).files[0]);

        let self: UploadComponent = this;

        let xhr = new XMLHttpRequest();
        xhr.open('POST', this.apiUrl);
        xhr.onload = function () {
            if (xhr.status == 200) {
                //console.log(xhr.response);
                let result = JSON.parse(xhr.response);
                if (result.success) {
                    self.progressText = "Uploading... Success";
                } else {
                    self.progressText = result.msg;
                }
                self.showSpinner = false;
            } else {
                //console.log('Upload Error');
                self.progressText = "Uploading... Error";
                self.showSpinner = false;
            }
        }
        xhr.upload.onprogress = function (event) {
            if (event.lengthComputable) {
                let percent = Math.floor(event.loaded / event.total * 100);
                //console.log('Percent: ' + percent);
                self.progressText = "Uploading... " + percent + "%";
            }
        }
        xhr.send(formData);
    }

}
