import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { ArgData } from './argdata';

@Injectable({
  providedIn: 'root',
})
export class Co2Service {
  constructor(public http: HttpClient) {
    // this.urladd = '/co2/add'
    // this.urlsn = '/sensors/snbydate'
  }
  sn(s: any) {
    return this.http.post<ArgData[]>(environment.host + '/sensors/snbydate', s);
  }
}
