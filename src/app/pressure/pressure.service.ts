import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Pressure } from './pressure';

@Injectable()
export class PressureService  {

  dataforgraphurl = "/rest/piserver/pressure/getvalues"
  constructor(public http:HttpClient) {
  }

  getgraph(id:number,s:any,e:any)
  {
      let url = environment.host+this.dataforgraphurl
      let o = { id: id, s: s, e: e }
      return this.http.post<Pressure[]>(url, o)
  }

}

