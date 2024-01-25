import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Port } from './port';
import { environment } from '../../environments/environment';

@Injectable()
export class PortService {
  constructor(public http: HttpClient) {
    // this.host = cfg.host
    // this.urladd="/rest/piserver/portname/add",
    // this.urlsn="/rest/piserver/portname/sn",
    // this.urlsm="/rest/piserver/portname/sm"
  }
  sn(s: any) {
    return this.http.post<Port[]>(environment.host + '/rest/piserver/portname/sn', s);
  }
}
