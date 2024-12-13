import { MatSnackBar } from '@angular/material/snack-bar';
import { Ds18b20sensor } from './../ds18b20sensor';
import { Ds18sensorService } from './../ds18sensor.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-dssensornew',
    templateUrl: './dssensornew.component.html',
    styleUrls: ['./dssensornew.component.css'],
    standalone: false
})
export class DssensornewComponent implements OnInit {

  sensor: Ds18b20sensor = {}
  constructor(private bar: MatSnackBar, private service: Ds18sensorService) { }

  ngOnInit() {
  }

  save() {
    // this.service.add(this.sensor).subscribe(d => {
    //   this.bar.open('Add ', '', { duration: 2000 })
    //   this.sensor = {}
    // })
  }

}
