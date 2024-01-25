import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Job } from '../job';
import { Pijob } from '../pijob';

@Component({
  selector: 'app-devicejob',
  templateUrl: './devicejob.component.html',
  styleUrls: ['./devicejob.component.css'],
})
export class DevicejobComponent implements OnInit {
  id?: number;
  jobs: Pijob[] = Array<Pijob>();
  constructor(private route: ActivatedRoute, public http: HttpClient) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.id = params['ip'];
      this.http.get<Pijob[]>('http://' + this.id + '/listjobs').subscribe((d) => {
        this.jobs = d;
      });
    });
  }
}
