import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Job } from './job';

@Injectable()
export class JobService {
  constructor(private http: HttpClient) {}

  add(j: any) {
    return this.http.post<Job>(environment.host + '/rest/piserver/job/add', j);
  }
  get(id: number) {
    return this.http.get<Job>(environment.host + '/rest/piserver/job/get' + id);
  }
  sn(s: any) {
    return this.http.post<Job[]>(environment + '/rest/piserver/job/sn', s);
  }
  edit(job: Job) {
    return this.http.post<Job>(
      environment.host + '/rest/piserver/job/edit',
      job
    );
  }
}
