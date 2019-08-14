import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class TeamupService {
    // private domainUrl = 'http://www.moreppl.com/main';
    private domainUrl = 'http://teamup.loc';

    private httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/x-www-form-urlencoded'
        })
    };

    private _token = '';

    constructor(private http: HttpClient) {
        // console.log('TeamupService constructor');
        this._token = this.readData('token');
        if (this._token == null) {
            this._token = '';
        }
        this._username = this.readData('username');
        if (this._username == null) {
            this._username = '';
        }
        this._lang = this.readData('lang');
        if (this._lang == null) {
            this._lang = 'cn';
        }
        this._userId = +this.readData('userid');
        if (this._userId == null) {
            this._userId = 0;
        }
    }

    private _lang = 'cn';
    public set language(lang: string) {
        this._lang = lang;
        this.saveData('lang', this._lang);
    }
    public get language(): string {
        return this._lang;
    }

    private _username = '';
    public set username(username: string) {
        this._username = username;
        this.saveData('username', this._username);
    }
    public get username(): string {
        return this._username;
    }

    private _userId = 0;
    public get userId(): number {
        return this._userId;
    }
    public set userId(id: number) {
        this._userId = id;
        this.saveData('userid', String(this._userId));
    }

    public setToken(token: string) {
        this._token = token;
        this.saveData('token', this._token);
    }

    public getApiUrl(url: string): string {
        return this.domainUrl + url + '&session=' + this._token + '&DeviceType=1';
    }

    private postFormRequest(url: string, data: string): Observable<object> {
        return this.http.post<object>(url, data, this.httpOptions)
            .pipe(
                catchError(this.handleError('JsonRequest', [])
                )
            );
    }
    private postJsonRequest(url: string, data: any): Observable<object> {
        const json = JSON.stringify(data);
        return this.http.post<object>(url, json, this.httpOptions)
            .pipe(
                catchError(this.handleError('JsonRequest', [])
                )
            );
    }

    public apiUserLogin(username: string, password: string, source: string, name: string, image: string,
                        token: string): Observable<object> {
        const url = this.getApiUrl('/User/User/do.php?action=login');
        const data = {
            username,
            password,
            dev_type: 'Browser',
            source,
            name,
            image,
            token
        };
        return this.postJsonRequest(url, data);
    }

    public apiChangePassword(userId: number, oldPass: string, newPass: string): Observable<object> {
        const url = this.getApiUrl('/User/User/do.php?action=change_password');
        const data = { userId, oldPass, newPass };
        return this.postJsonRequest(url, data);
    }

    public apiUserSignup(username: string, password: string, source: string): Observable<object> {
        const url = this.getApiUrl('/User/User/do.php?action=signup');
        const data = {
            username,
            password,
            name_type: 'email',
            source
        };
        return this.postJsonRequest(url, data);
    }

    public apiActivateUserSignup(token: string): Observable<object> {
        const url = this.getApiUrl('/User/Activate/do.php?action=activate');
        const data = 'code=' + token;
        return this.postFormRequest(url, data);
    }

    public apiSaveUserProfile(user: any): Observable<object> {
        const url = this.getApiUrl('/User/User/do.php?action=save_profile');
        return this.postJsonRequest(url, user);
    }

    public apiGetUserProfile(userId: number): Observable<object> {
        const url = this.getApiUrl('/User/User/do.php?action=get_user');
        const data = 'userid=' + userId as string;
        return this.postFormRequest(url, data);
    }

    public apiSaveTeamOfUser(team: any): Observable<object> {
        const url = this.getApiUrl('/Team/Team/do.php?action=save_team');
        return this.postJsonRequest(url, team);
    }

    public apiSearchTeams(condition: any): Observable<object> {
        const url = this.getApiUrl('/Team/Team/do.php?action=search_team');
        return this.postJsonRequest(url, condition);
    }

    public apiApplyTeam(apply: any): Observable<object> {
        const url = this.getApiUrl('/Team/Team/do.php?action=apply_team');
        return this.postJsonRequest(url, apply);
    }

    public apiGetApplyList(teamId: number): Observable<object> {
        const url = this.getApiUrl('/Team/Team/do.php?action=list_apply');
        const data = 'teamid=' + teamId as string;
        return this.postFormRequest(url, data);
    }

    public apiAcceptApply(apply: any): Observable<object> {
        const url = this.getApiUrl('/Team/Team/do.php?action=accept_apply');
        return this.postJsonRequest(url, apply);
    }

    public apiGetTeamDetail(teamId: number): Observable<object> {
        const url = this.getApiUrl('/Team/Team/do.php?action=get_team_detail');
        const data = 'teamid=' + teamId as string;
        return this.postFormRequest(url, data);
    }

    public apiGetUserFollows(userId: number): Observable<object> {
        const url = this.getApiUrl('/Team/Team/do.php?action=get_user_follows');
        const data = 'userid=' + userId as string;
        return this.postFormRequest(url, data);
    }

    public apiGetUserMyTeams(userId: number): Observable<object> {
        const url = this.getApiUrl('/Team/Team/do.php?action=get_user_myteams');
        const data = 'userid=' + userId as string;
        return this.postFormRequest(url, data);
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

    private saveData(key: string, value: string) {
        if (window.localStorage) {
            localStorage.setItem(key, value);
        } else {
            console.log('Does NOT support Local Storage');
        }
    }

    private readData(key: string): string {
        let value: string;
        if (window.localStorage) {
            value = localStorage.getItem(key);
        } else {
            console.log('Does NOT support Local Storage');
        }
        return value;
    }

}
