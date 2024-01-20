import { DevicegroupService } from './../devicegroup.service';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LsService } from '../../ls.service';
import { ActivatedRoute } from '@angular/router';
import { Devicegroup } from '../devicegroup';

@Component({
  selector: 'app-devicegroupedit',
  templateUrl: './devicegroupedit.component.html',
  styleUrls: ['./devicegroupedit.component.css']
})
export class DevicegroupeditComponent implements OnInit {

  constructor(private route: ActivatedRoute, public bar: MatSnackBar, public service: DevicegroupService, public ls: LsService) { }
  id
  devicegroup: Devicegroup = {}
  ngOnInit() {

    this.route.params.subscribe(params => {
      this.id = params['id']
      this.service.get(this.id).subscribe(d => {
        this.devicegroup = d
      })
    })
    this.ls.message('Device edit')
  }

  save() {
    this.service.edit(this.devicegroup).subscribe(d => {
      this.bar.open('Edit', '', { duration: 5000 })
     // this.devicegroup = {}
    })
  }

}