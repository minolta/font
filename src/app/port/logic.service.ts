import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Logic } from './logic';

@Injectable()
export class LogicService {
  constructor(public http: HttpClient) {
    // super(h, cfg)
    // this.urladd = '/rest/piserver/logic/add'
    // this.urlsn = '/rest/piserver/logic/sn'
    // this.urlsm = '/rest/piserver/logic/sm'
    // this.urledit = '/rest/piserver/logic/edit'
  }

  edit(o: Logic) {
    return this.http.post<Logic>(
      environment.host + '/rest/piserver/logic/edit',
      o
    );
  }
  get(id: number) {
    return this.http.get<Logic>(
      environment.host + '/rest/piserver/logic/get/' + id
    );
  }
  sn(s: any) {
    return this.http.post<Logic[]>(
      environment.host + '/rest/piserver/logic/sn',
      s
    );
  }
  add(a: any) {
    return this.http.post<Logic>(
      environment.host + '/rest/piserver/logic/add',
      a
    );
  }
}
