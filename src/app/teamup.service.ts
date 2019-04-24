import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class TeamupService {
    //private domainUrl = 'http://www.moreppl.com/main';
    private domainUrl = 'http://teamup.loc';

    private httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/x-www-form-urlencoded'
        })
    };

    private lang = 'cn';
    private username = '';
    private session = '';
    private user = {
        id: 0,
        username: '',
        level: 0,
        first_name: '',
        last_name: '',
        email: '',
        mobile: '',
        sex: 0,
        birthday: '',
        reg_time: '',
        desc: '',
        photo_url: '',
        source: ''
    };

    constructor(private http: HttpClient) {
        //console.log('TeamupService constructor');
    }

    public setLanguage(lang) {
        this.lang = lang;
    }
    public getLanguage() {
        return this.lang;
    }
    public setUsername(username) {
        this.username = username;
    }
    public getUsername() {
        return this.username;
    }
    public setSession(session) {
        this.session = session;
    }
    public getSession() {
        return this.session;
    }
    public setUser(user) {
        if (user) {
            this.user = user;
        } else {
            this.user = {
                id: 0,
                username: '',
                level: 0,
                first_name: '',
                last_name: '',
                email: '',
                mobile: '',
                sex: 0,
                birthday: '',
                reg_time: '',
                desc: '',
                photo_url: '',
                source: ''
            };
        }
    }
    public getUser() {
        return this.user;
    }

    public getApiUrl(url: string): string {
        return this.domainUrl + url + '&session=' + this.session + '&DeviceType=1';
    }

    private postFormRequest(url: string, data: string): Observable<Object> {
        return this.http.post<Object>(url, data, this.httpOptions)
            .pipe(
                catchError(this.handleError('JsonRequest', [])
                )
            );
    }
    private postJsonRequest(url: string, data: any): Observable<Object> {
        let json = JSON.stringify(data);
        return this.http.post<Object>(url, json, this.httpOptions)
            .pipe(
                catchError(this.handleError('JsonRequest', [])
                )
            );
    }

    public apiUserLogin(username, password, source, name, image, token): Observable<Object> {
        let url = this.getApiUrl('/User/User/do.php?action=login');
        let data = {
            username: username,
            password: password,
            dev_type: 'Browser',
            source: source,
            name: name,
            image: image,
            token: token
        };
        return this.postJsonRequest(url, data);
    }

    public apiUserSignup(username: string, password: string, source: string): Observable<Object> {
        let url = this.getApiUrl('/User/User/do.php?action=signup');
        let data = {
            username: username,
            password: password,
            name_type: 'email',
            source: source
        };
        return this.postJsonRequest(url, data);
    }

    public apiSaveUserProfile(user): Observable<Object> {
        let url = this.getApiUrl('/User/User/do.php?action=save_profile');
        return this.postJsonRequest(url, user);
    }

    public apiGetUserProfile($userId): Observable<Object> {
        let url = this.getApiUrl('/User/User/do.php?action=get_user');
        let data = "userid=" + $userId;
        return this.postFormRequest(url, data);
    }

    public apiCreateTeamOfUser(team): Observable<Object> {
        let url = this.getApiUrl('/Team/Team/do.php?action=create_team');
        return this.postJsonRequest(url, team);
    }

    public apiSearchTeams(condition): Observable<Object> {
        let url = this.getApiUrl('/Team/Team/do.php?action=search_team');
        return this.postJsonRequest(url, condition);
    }

    public apiApplyTeam(apply): Observable<Object> {
        let url = this.getApiUrl('/Team/Team/do.php?action=apply_team');
        return this.postJsonRequest(url, apply);
    }

    public apiGetApplyList(teamId): Observable<Object> {
        let url = this.getApiUrl('/Team/Team/do.php?action=list_apply');
        let data = "teamid=" + teamId;
        return this.postFormRequest(url, data);
    }

    public apiAcceptApply(apply): Observable<Object> {
        let url = this.getApiUrl('/Team/Team/do.php?action=accept_apply');
        return this.postJsonRequest(url, apply);
    }

    /**
     * Handle Http operation that failed.
     * Let the app continue.
     * @param operation - name of the operation that failed
     * @param result - optional value to return as the observable result
     */
    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            console.error(error);
            console.log(`${operation} failed: ${error.message}`);
            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }
}
