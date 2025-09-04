import { DevicegroupService } from './../devicegroup.service';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Devicegroup } from '../devicegroup';

@Component({
    selector: 'app-devicegroupedit',
    templateUrl: './devicegroupedit.component.html',
    styleUrls: ['./devicegroupedit.component.css'],
    standalone: false
})
export class DevicegroupeditComponent implements OnInit {

  constructor(private route: ActivatedRoute, public bar: MatSnackBar, public service: DevicegroupService) { }
  id:number =0
  devicegroup: Devicegroup = {}
  ngOnInit() {

    this.route.params.subscribe(params => {
      this.id = params['id']
      this.service.get(this.id).subscribe(d => {
        this.devicegroup = d
      })
    })
  }

  save() {
    this.service.edit(this.devicegroup).subscribe(d => {
      this.bar.open('Edit', '', { duration: 5000 })
      this.devicegroup = d
    })
  }

}