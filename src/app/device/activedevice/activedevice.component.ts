import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
// import { environment } from 'src/environments/environment';
import { Activedevice } from '../activedevice';
@Component({
  selector: 'app-activedevice',
  templateUrl: './activedevice.component.html',
  styleUrls: ['./activedevice.component.css']
})
export class ActivedeviceComponent implements OnInit {
  rows: Activedevice[] = []
  constructor(private http: HttpClient) { }

  getactivedevice() {
    // this.http.get(environment.host + "/ipbuffer").subscribe((d: Activedevice[]) => {
    //   console.log("Active device", d)
    //   this.rows = d
    // })
  }
  ngOnInit(): void {
    this.getactivedevice()
  }

}
