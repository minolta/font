import { JobService } from './../job.service';
import { Component, OnInit } from '@angular/core';
import { Job } from '../job';
import { Subject } from 'rxjs';

@Component({
    selector: 'app-joblist',
    templateUrl: './joblist.component.html',
    styleUrls: ['./joblist.component.css'],
    standalone: false
})
export class JoblistComponent implements OnInit {
  constructor(public service: JobService) {}
  rows: Job[] = Array<Job>();
  subject = new Subject<string>();
  ngOnInit() {
    this.update();
    this.subject.subscribe((ss) => {
      if (ss)
        this.service.sn({ search: ss, page: 0, limit: 50 }).subscribe((d) => {
          this.rows = d;
        });
    });
  }
  havekey(e:any)
  {
    this.subject.next(e.target.value)
  }
  update() {
    this.service.sn({ search: '', page: 0, limit: 50 }).subscribe((d) => {
      this.rows = d;
    });
  }
}
