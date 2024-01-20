import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
@Injectable()
export class Dht22valueService {
  getg = environment + '/rest/piserver/dht/getgraph';
  constructor(public http: HttpClient) {
    // this.config.urladd = '/rest/piserver/dht/add'
    // this.getg = this.config.host + '/rest/piserver/dht/getgraph';
  }

  getResult(s: any, d: any, id: number) {
    let so = { s: s, e: d, id: id };
    console.log(so);
    return this.http.post(this.getg, so);
  }
  last(id?: number) {
    let url = environment.host + '/rest/piserver/dht/last/' + id;
    return this.http.get<any>(url);
  }
}
