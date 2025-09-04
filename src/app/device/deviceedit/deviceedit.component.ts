import { DevicegroupService } from './../devicegroup.service';
import { DeviceService } from './../device.service';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Device } from '../device';

@Component({
    selector: 'app-deviceedit',
    templateUrl: './deviceedit.component.html',
    styleUrls: ['./deviceedit.component.css'],
    standalone: false
})
export class DeviceeditComponent implements OnInit {
  device: Device = {};
  id: number = 0;
  bag = { obj: { name: '', id: 0 } };
  baguser = { obj: { name: '', id: 0 } };
  constructor(
    private route: ActivatedRoute,
    public bar: MatSnackBar,
    public service: DeviceService,
    public pgs: DevicegroupService
  ) {}
  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      this.service.get(this.id).subscribe((d) => {
        this.device = d;
        console.info(JSON.stringify(d));
        if (this.device.devicegroup != null) {
          console.log('Group ====> ' + this.device.devicegroup);
          this.bag.obj = this.device.devicegroup as any;
        }
        // if (this.device.user_id != null && this.device.user_id != 0) {
        //   console.log("User_id ====> "+this.device.user_id)
        //   // this.us.get(this.device.user_id).subscribe(d => {
        //   //   console.log("User =======> "+d)
        //   //   this.baguser.obj = d as any
        //   // })
        // }
      });
    });
  }

  save() {
    this.device.devicegroup = this.bag.obj;
    this.device.pidevicegroup = this.bag.obj;

    // if (this.baguser.obj != null)
    //   this.device.user_id = this.baguser.obj.id
    console.log('Edit' + JSON.stringify(this.device));
    this.service.edit(this.device).subscribe((d) => {
      this.bar.open('Edit', '', { duration: 5000 });
    });
  }
}
