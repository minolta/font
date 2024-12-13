import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Logic } from '../port/logic';

@Injectable({
  providedIn: 'root',
})
export class LogService {
  constructor(public http: HttpClient) {
    // super(http, cfg);
    // this.urlsn = "/log/sn";
    // this.urldelete = "/log/delete";
  }

  count() {
    let url = environment.host + '/log/count';

    return this.http.get(url);
  }
  sn(s: any) {
    return this.http.post<Logic[]>(environment.host + '/log/sn', s);
  }
  delete(l: Logic) {
    return this.http.post(environment.host + '/rest/piserver/log/delete', l);
  }
}
