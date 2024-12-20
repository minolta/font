import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Devicegroup } from './devicegroup';
import { environment } from '../../environments/environment';

@Injectable()
export class DevicegroupService {
  constructor(private http: HttpClient) {
    // super(h,cfg)
    // this.config.urladd = '/rest/piserver/devicegroup/add'
    // this.config.urlsn = '/rest/piserver/devicegroup/sn'
    // this.config.urlsm = '/rest/piserver/devicegroup/sm'
    // this.config.urlget = '/rest/piserver/devicegroup/get'
    // this.config.urledit = '/rest/piserver/devicegroup/edit'
  }
  get(id:number)
  {
    return this.http.get<Devicegroup>(environment.host+'/rest/piserver/devicegroup/get/'+id)
  }
  add(devicegroup: Devicegroup) {
    return this.http.post<Devicegroup>(
      environment.host + '/rest/piserver/devicegroup/add',
      devicegroup
    );
  }
  edit(dg:Devicegroup)
  {
    return this.http.post<Devicegroup>(environment.host+'/rest/piserver/devicegroup/edit',dg)
  }
  sn(s: any) {
    return this.http.post<Devicegroup[]>(
      environment.host + '/rest/piserver/devicegroup/sn',
      s
    );
  }
}
