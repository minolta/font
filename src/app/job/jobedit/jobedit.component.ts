import { Component, OnInit } from '@angular/core';
import { Job } from '../job';
import { JobService } from '../job.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-jobedit',
    templateUrl: './jobedit.component.html',
    styleUrls: ['./jobedit.component.css'],
    standalone: false
})
export class JobeditComponent implements OnInit {
  job: Job = {};
  id: number = 0;
  constructor(
    public service: JobService,
    private route: ActivatedRoute,
    public bar: MatSnackBar
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      this.service.get(this.id).subscribe((d) => {
        this.job = d;
      });
    });
  }

  save() {
    this.service.edit(this.job!!).subscribe((d) => {
      this.bar.open('Edit', '', { duration: 5000 });
    });
  }
}
