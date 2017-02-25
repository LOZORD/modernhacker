import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';



@Injectable()
export class AppService {
    constructor(private http: Http) { }
    getCode(link: string): Observable<string> {
        return this.http.get(link).map(resp => resp.text());
    }
}