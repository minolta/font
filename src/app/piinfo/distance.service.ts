import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Distance } from './distance';

@Injectable({
  providedIn: 'root',
})
export class DistanceService {
  constructor(public http: HttpClient) {}
  searchbydate(id: number, s: any, e: any) {
    let url = environment.host + '/searchdistancebydate';
    return this.http.post<Distance[]>(url, { id: id, s: s, e: e });
  }
}
