import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';



@Injectable()
export class AppService {
    defaultLink = 'https://raw.githubusercontent.com/LOZORD/xanadu/master/src/game/actions.ts';
    constructor(private http: Http) {}
    getCode(link = this.defaultLink): Observable<string> {
        return this.http.get(link).map(resp => resp.text());
    }
}