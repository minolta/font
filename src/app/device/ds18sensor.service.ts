import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Ds18b20sensor } from './ds18b20sensor';
import { Observable } from 'rxjs';
@Injectable()
export class Ds18sensorService {
  constructor(public http: HttpClient) {
    // super(h, cfg)
    // this.urlget = '/rest/piserver/dssensor/get'
    // this.urladd = '/rest/piserver/dssensor/add'
    // this.urlsn = '/rest/piserver/dssensor/sn'
    // this.urlsm = '/rest/piserver/dssensor/sm'
    // this.urledit = '/rest/piserver/dssensor/edit'
    // this.urldelete='/rest/piserver/dssensor/delete'
  }
  sn(s: any) {
    console.log('----------------------------' + JSON.stringify(s));
    return this.http.post<Ds18b20sensor[]>(
      environment.host + '/rest/piserver/dssensor/sn',
      s
    );
  }
  smmac(s: any) {
    let url = environment.host + '/rest/piserver/dssensor/smmac/' + s;
    return this.http.get(url);
  }
  delete(sensor: Ds18b20sensor) {
    return this.http.delete(
      environment.host + '/rest/piserver/dssensor/delete/' + sensor.id
    );
  }
  get(id: number): Observable<Ds18b20sensor> {
    return this.http.get(environment.host + 'rest/piserver/dssensor/get');
  }
  edit(sensor: Ds18b20sensor): Observable<Ds18b20sensor> {
    return this.http.post(
      environment.host + 'rest/piserver/dssensor/edit',
      sensor
    );
  }
}
