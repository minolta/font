import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DeviceService } from '../../device/device.service';
import { environment } from '../../../environments/environment';
@Component({
  selector: 'app-editconfig',
  templateUrl: './editconfig.component.html',
  styleUrls: ['./editconfig.component.css'],
})
/**
 * สำหรับ edit config ตรงๆ เลยไม่ผ่าน device
 */
export class EditconfigComponent implements OnInit {
  bag = { obj: {name:'',id:0} };
  constructor(public service: DeviceService, public bar: MatSnackBar) {}
  config: string[] = [];
  keys: string[] = [];
  configname: string = '';
  value: any;
  ngOnInit(): void {
    let device = localStorage.getItem('editdeviceconfig');
    if (device != null) {
      this.bag.obj = JSON.parse(device);
      this.getConfig();
    }
  }
  newconfig() {
    let device = this.bag.obj as any;
    let url =
      'http://' +
      device.ip +
      ':/setp?configname=' +
      this.configname +
      '&value=' +
      this.value;
    this.service.http.get(url).subscribe((d: any) => {
      console.log('config', d);
      this.bar.open('New config ok', d, { duration: 2000 });
    });
  }
  edit(key: number) {
    console.log('value', this.config[key]);
    let device = this.bag.obj as any;
    let url =
      'http://' +
      device.ip +
      ':/setp?configname=' +
      key +
      '&value=' +
      this.config[key];
    this.service.http
      .post(environment.host + '/getrequest', { url: url })
      .subscribe((d: any) => {
        console.log('config', d);
        this.bar.open('Edit ok', d, { duration: 2000 });
      });
  }
  getConfig() {
    // console.log('Device', this.bag)
    // let device = this.bag.obj as any
    // localStorage.setItem('editdeviceconfig', JSON.stringify(device))
    // let url = "http://" + device.ip + ":/config"
    // this.service.http.post(environment.host + "/getrequest", { url: url }).subscribe((d: any) => {
    //   this.config = d
    //   this.keys = Object.keys(d)
    //   console.log('config', d)
    // })
  }
}
