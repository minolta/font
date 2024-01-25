import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Pijob } from './pijob';
import { Portinjob } from './portinjob';
import { Portinjobobj } from './portinjobobj';

@Injectable()
export class PijobService {
  bydeviceid: string = environment.host + '/rest/piserver/pijob/searchbydevice';
  enableurl: string = environment.host + '/rest/piserver/pijob/searchbydevice';
  // this.enableurl = this.config.host + '/rest/piserver/pijob/enable'
  constructor(private http: HttpClient) {
    // super(h, cfg)
    // this.urladd = '/rest/piserver/pijob/add'
    // this.urlsn = '/rest/piserver/pijob/sn'
    // this.urlsm = '/rest/piserver/pijob/sm'
    // this.urledit = '/rest/piserver/pijob/edit'
    // this.urldelete = '/rest/piserver/pijob/delete'
    // this.urlget = '/rest/piserver/pijob/get'
    // this.bydeviceid = this.config.host + '/rest/piserver/pijob/searchbydevice'
    // this.enableurl = this.config.host + '/rest/piserver/pijob/enable'
  }
  add(p:any)
  {
    return this.http.post<Pijob>(environment.host+'/rest/piserver/pijob/add',p)
  }
  edit(p: Pijob) {
    return this.http.post<Pijob>(
      environment.host + '/rest/piserver/pijob/edit',
      p
    );
  }
  get(id: number) {
    return this.http.get<Pijob>(
      environment.host + '/rest/piserver/pijob/get' + id
    );
  }
  sn(s: any) {
    return this.http.post<Pijob[]>(
      environment.host + '/rest/piserver/pijob/sn',
      s
    );
  }
  convertport(ports: string) {
    let a = JSON.parse(JSON.stringify(ports));

    console.log('-------------------------------------');
    console.log('Port to edit ports' + JSON.stringify(ports));
    console.log('-------------------------------------');

    for (let i = 0; i < a.length; i++) {
      if (a[i].traget != null && a[i].traget.obj != null) {
        let device = a[i].traget.obj;
        a[i].traget = device;
      }
    }
    console.log('Return ------------------------------------------');
    console.log(JSON.stringify(a));
    console.log('Return ------------------------------------------');
    return a;
  }
  findbydeviceid(id: number, limit: number) {
    let s = { search: '', id: id, page: 0, limit: limit };
    return this.http.post(this.bydeviceid, s);
  }

  enable(id: number) {
    let e = this.enableurl + '/' + id;
    return this.http.get<Pijob>(e);
  }
  listport(id: number) {
    let url = environment.host + '/rest/piserver/portstatusinjob/lists/' + id;
    return this.http.get<Portinjob[]>(url);
  }
  removeport(port: Portinjobobj) {
    console.log('delete port' + JSON.stringify(port));
    let url =
      environment.host + '/rest/piserver/portstatusinjob/delete/' + port.id;
    return this.http.get(url);
  }
  delete(p: Pijob) {
    return this.http.post(environment.host + '/rest/piserver/pijob/delete', p);
  }
}
