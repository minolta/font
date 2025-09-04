import { MatSnackBar } from '@angular/material/snack-bar';
import { JobService } from './../job.service';
import { Job } from './../job';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-jobnew',
    templateUrl: './jobnew.component.html',
    styleUrls: ['./jobnew.component.css'],
    standalone: false
})
export class JobnewComponent implements OnInit {
  job: Job = {}
  error = null
  constructor(public service: JobService, public bar: MatSnackBar) { }

  ngOnInit() {
  }

  save() {
    this.service.add(this.job).subscribe(d => {
      this.bar.open('Add', '', { duration: 5000 })
      this.job = {}
    },e=>{
      this.error = e
    })
  }
}
