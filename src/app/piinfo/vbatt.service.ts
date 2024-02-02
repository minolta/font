import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Vbatt } from './vbatt';

@Injectable()
export class VbattService {
  // @Inject('VBATT_OPTIONS') c
  constructor(public http: HttpClient) {}

  getGraph(id: number, s: any, e: any) {
    let url = environment.host + '/vbatt/graphvalue';
    return this.http.post<Vbatt[]>(url, { id: id, s: s, e: e });
  }
  findwatt(id: number, s: any, e: any) {
    let url = environment.host + '/rest/piserver/findwatt';
    return this.http.post(url, { id: id, s: s, e: e });
  }
}
