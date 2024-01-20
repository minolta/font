import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Ds18sensorService } from '../ds18sensor.service';
import { Ds18b20sensor } from '../ds18b20sensor';

@Component({
  selector: 'app-dssensoredit',
  templateUrl: './dssensoredit.component.html',
  styleUrls: ['./dssensoredit.component.css']
})
export class DssensoreditComponent implements OnInit {

  constructor(private route: ActivatedRoute, public service: Ds18sensorService,
    public bar: MatSnackBar) { }

  id:number =0
  ds18sensor:Ds18b20sensor = {}
  bag = { obj: { name: '', id: 0 } }
  baguser = { obj: { name: '', id: 0 } }
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id']
      this.service.get(this.id).subscribe(d => {
        this.ds18sensor = d
        
        if (this.ds18sensor.devicegroup != null)
          this.bag.obj = this.ds18sensor.devicegroup as any

        console.log(d)
      })
    })
  }

  save() {
    if (this.baguser.obj != null) {
      this.ds18sensor.user_id = this.baguser.obj.id
    }
    this.service.edit(this.ds18sensor).subscribe(d => {
      this.ds18sensor = d
      this.bar.open('Edit', '', { duration: 5000 })
    })
  }

}
