import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Device } from './device';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
@Injectable()
export class DeviceService {
  constructor(public http: HttpClient) {}
  add(newdevice: Device): Observable<Device> {
    return this.http.post(
      environment.host + '/rest/piserver/pidevice/add',
      newdevice
    );
  }
  get(id: number) {
    return this.http.get<Device>(
      environment.host + '/rest/piserver/pidevice/get/' + id
    );
  }
  sn(s: any): Observable<Device[]> {
    return this.http.post<Device[]>(
      environment.host + '/rest/piserver/pidevice/sn',
      s
    );
  }
  last(id: number) {
    let url = environment.host + '/rest/piserver/checkin/last/' + id;
    return this.http.get(url);
  }
  edit(device: Device) {
    return this.http.post<Device>(
      environment.host + '/rest/piserver/pidevice/edit',
      device
    );
  }
}
