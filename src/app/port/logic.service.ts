import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable()
export class LogicService {
  constructor(public http: HttpClient) {
    // super(h, cfg)
    // this.urladd = '/rest/piserver/logic/add'
    // this.urlsn = '/rest/piserver/logic/sn'
    // this.urlsm = '/rest/piserver/logic/sm'
    // this.urledit = '/rest/piserver/logic/edit'
  }

  sn(s: any) {
    return this.http.post(environment.host + '/rest/piserver/logic/sn', s);
  }
}
