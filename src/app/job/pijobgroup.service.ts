import { Injectable } from '@angular/core';
import { Deviceinzone } from './deviceinzone';
import { HttpClient } from '@angular/common/http';
import { Device } from '../device/device';
import { Zone } from './zone';
import { environment } from '../../environments/environment';
import { Pijobgroup } from './pijobgroup';

@Injectable()
export class PijobgroupService {
  constructor(private http: HttpClient) {
    // super(h, c);
    // this.urladd = '/rest/piserver/pijobgroup/add';
    // this.urldelete = '/rest/piserver/pijobgroup/delete';
    // this.urledit = '/rest/piserver/pijobgroup/edit';
    // this.urlsn = '/rest/piserver/pijobgroup/sn';
    // this.urlsm = '/rest/piserver/pijobgroup/sm';
  }
  add(pg: any) {
    return this.http.post<Pijobgroup>(
      environment.host + '/rest/piserver/pijobgroup/add',
      pg
    );
  }
  adddevicetosonze(device: Device, zone: Pijobgroup) {
    let url = environment.host + '/rest/piserver/pijobgroup/adddevice';
    let d: Deviceinzone = {
      pidevice: device,
      pijobgroup: zone,
    };
    return this.http.post(url, d);
  }
  sn(s: any) {
    return this.http.post<Pijobgroup[]>(
      environment.host + '/rest/piserver/pijobgroup/sn',
      s
    );
  }
}
