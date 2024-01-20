import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
@Injectable()
export class Ds18b20Service {
  constructor(public http: HttpClient) {
  }

  deleteall(id:number) {
    let url = environment.host + "/ds18value/deleteall";
    return this.http.post(url, { id: id });
  }
  deletebydate(id:number, s:any, e:any) {
    let url = environment.host + "/ds18value/deletebydate";
    return this.http.post(url, { id: id, s: s, e: e });
  }

  graph(id:number, s:any, e:any) {
    let url = environment.host + "/rest/piserver/dssensor/getgraphvalue";
    let o = { id: id, s: s, e: e };
    return this.http.post(url, o);
  }
  updatebylast(devices:any) {
    let url = environment.host + "/rest/piserver/ds18value/lasts";
    return this.http.post(url, devices);
  }
}
