import { MatSnackBar } from '@angular/material/snack-bar';
import { PijobService } from './../pijob.service';
import { Component, OnInit } from '@angular/core';
import { Pijobgroup } from '../pijobgroup';
import { PijobgroupService } from '../pijobgroup.service';

@Component({
    selector: 'app-pijobgroupnew',
    templateUrl: './pijobgroupnew.component.html',
    styleUrls: ['./pijobgroupnew.component.css'],
    standalone: false
})
export class PijobgroupnewComponent implements OnInit {
  pijobgroup: Pijobgroup = {}
  constructor(public service: PijobgroupService, public bar: MatSnackBar) { }

  ngOnInit() {
  }

  save() {
    this.service.add(this.pijobgroup).subscribe(d => {
      this.bar.open('Add pijob group', "", { duration: 2000 })
      this.pijobgroup = {}
    })
  }
}
