import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DeviceService } from '../../device/device.service';
import { Profiles } from '../profiles';
import { Device } from '../../device/device';
import { Devicetoshow } from '../devicetoshow';
@Component({
  selector: 'app-parameterview',
  templateUrl: './parameterview.component.html',
  styleUrls: ['./parameterview.component.css'],
})
export class ParameterviewComponent implements OnInit, OnDestroy {
  parametertoshow? = '';
  search = '';
  subscription: any;
  description = '';
  bag = { obj: { name: '', id: 0, ip: '' } };
  parameter = '';
  timetoupdate = 60000;
  // t;
  profiles: Profiles[] = Array<Profiles>();
  profile?: string = '';
  currentprofile?: Profiles;
  devices?: Devicetoshow[] = Array<Devicetoshow>();
  devicestoshow?: Devicetoshow[];
  result = {};
  errormessage = [];
  sub: any;
  id: any; //เอาไว้หยุด refresh
  constructor(
    public http: HttpClient,
    public service: DeviceService,
    public bar: MatSnackBar
  ) {}
  ngOnDestroy(): void {
    // console.log("SUB", this.sub);
    // this.sub.unsubscribe();
    console.debug('stop Interval', this.id);
    clearInterval(this.id);
  }
  ngOnInit(): void {
    this.loaddevice();
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        console.info('Hidden info ', 'Hidden');
        // if (this.subscription) {
        //   this.subscription.unsubscribe();
        //   console.log("Unsubscription");
        // }
        clearInterval(this.id);
        // tab is changed
      } else {
        // console.info("Hidden info", "Actinve");
        // this.subscription = source.subscribe((val) => this.update());
        this.id = setInterval(() => {
          this.g();
        }, this.timetoupdate);
      }
    });
    // this.sub = interval(this.timetoupdate).subscribe((val) => {
    //   this.g();
    // });

    this.id = setInterval(() => {
      this.g();
    }, this.timetoupdate);
    // console.log('SUB', this.sub)
    this.g();
  }
  updateprofile() {
    console.log('PROFILE:' + this.profile);
    let found = this.profiles.find((e) => e.profile === this.profile);
    console.log(found);
    if (!found) {
      //new profile
      let f: Profiles = {
        profile: this.profile,
        devices: Array<Devicetoshow>(),
        parametertoshow: '',
      };
      this.parametertoshow = '';
      this.profiles.push(f);
      this.currentprofile = f;
      this.devices = this.currentprofile.devices;
      this.savedevice();
    } else {
      this.currentprofile = found;
      this.devices = this.currentprofile.devices;
      this.parametertoshow = found.parametertoshow;
    }

    this.g();
    console.log('select profile ' + found);
  }
  reload() {
    // if (this.devices)
    //   this.devices.forEach((i) => {
    //     this.service.get(i.id!!).subscribe((d) => {
    //       i = d;
    //     });
    //   });
  }
  getvalue(obj: any, name: any) {
    console.log(obj.name);
    return obj[name];
  }
  loaddevice() {
    if (localStorage.getItem('parameterdevices') != null)
      this.devices = JSON.parse(localStorage.getItem('parameterdevices')!!);
    if (localStorage.getItem('gettime') != null)
      this.timetoupdate = JSON.parse(localStorage.getItem('gettime')!!);
    if (localStorage.getItem('getprofile') != null) {
      this.profiles = JSON.parse(localStorage.getItem('getprofile')!!);
    }
    if (localStorage.getItem('getcurrentprofiles') != null) {
      this.currentprofile = JSON.parse(
        localStorage.getItem('getcurrentprofiles')!!
      );
      if (this.currentprofile) {
        this.devices = this.currentprofile.devices;
        this.profile = this.currentprofile.profile;
        this.parametertoshow = this.currentprofile.parametertoshow;
      }
    }
  }
  savedevice() {
    localStorage.setItem('parameterdevices', JSON.stringify(this.devices));
    localStorage.setItem('gettime', JSON.stringify(this.timetoupdate));
    localStorage.setItem('getprofile', JSON.stringify(this.profiles));
    localStorage.setItem(
      'getcurrentprofiles',
      JSON.stringify(this.currentprofile)
    );
  }
  removeshow(show: any, i: any) {
    show.splice(i, 1);
    this.savedevice();
  }

  finddevice(id: number) {
    console.log(this.currentprofile);
    if (this.currentprofile?.devices) {
      let f = this.currentprofile.devices!!.find((dd) => dd.device?.id == id);
      console.log('find device:' + id + ' found:' + f);
      return f;
    }
    return null;
  }
  add() {
    let havedevice = this.finddevice(this.bag.obj.id);
    if (!havedevice) {
      let d = this.service.get(this.bag.obj.id).subscribe((d) => {
        let o: Devicetoshow = {
          ip: this.bag.obj.ip,
          device: d,
          // shows: [this.parameter],
          result: {},
        };
        if (this.currentprofile?.devices) {
          this.currentprofile.devices.push(o);
          this.devices = this.currentprofile.devices;
          this.devicestoshow = this.devices;
          console.log(this.devices);
        }
      });
    } else {
      // havedevice.shows.push(this.parameter);
      console.log('ADD ' + JSON.stringify(havedevice.shows));
    }
    this.savedevice();
  }
  testport(ip: string) {
    let url = 'http://' + ip + '/run?port=test&value=1delay=10';

    // this.http
    //   .post(environment.host + '/rest/piserver/getrequest', {
    //     url: url,
    //     delay: 20,
    //   })
    //   .subscribe((d) => {
    //     this.bar.open('Test now', ip, { duration: 4000 });
    //   });
  }

  removedevice(o: Devicetoshow) {
    if (this.devices) {
      let index = this.devices.findIndex((i) => o.device?.id == i.device?.id);

      // let ei = this.errormessage.findIndex((ee) => ee.device.id == o.device.id);

      // if (ei > -1) {
      //   this.errormessage.splice(ei, 1);
      // }

      console.log('Array devices ' + this.devices.length + ' ' + index);
      if (index > -1) {
        this.devices.splice(index, 1);
      }

      this.g();
    }
    // this.devicestoshow.splice(i, 1)

    // this.devices = this.devicestoshow
    this.savedevice();
  }
  updatetimetonew() {
    console.log('Change speed ' + this.timetoupdate);
    // if (this.subscription) this.subscription.unsubscribe();
    // this.subscription = interval(this.timetoupdate).subscribe((val) => {
    //   this.g();
    // });
    clearInterval(this.id);
    this.id = setInterval(() => {
      this.g();
    }, this.timetoupdate);
  }
  // seterror(i, e) {
  //   console.error(e);
  //   if (i.result) i.result.errormessage = 'ERROR ' + Date();
  //   let found = this.errormessage.find((r) => i.device.id == r.device.id);

  //   console.log(JSON.stringify(e));
  //   if (found) {
  //     let m = e.status;
  //     if (e.error) {
  //       m = m + ' ' + e.error.error + ' ' + e.error.error.message;
  //     }

  //     found.message = m;
  //     found.time = Date();
  //     found.error = e;
  //   } else {
  //     let m = e.status;
  //     if (e.error) {
  //       m = m + ' ' + e.error.error + ' ' + e.error.error.message;
  //     }
  //     this.errormessage.push({
  //       device: i.device,
  //       message: m,
  //       error: e,
  //       time: Date(),
  //     });
  //   }
  // }
  customshow?: string[];
  showsomeparameter() {
    if (this.parametertoshow) {
      console.log(this.parametertoshow);
      let toshows = this.parametertoshow.split(',');
      if (this.currentprofile) {
        this.currentprofile.parametertoshow = this.parametertoshow;
        if (toshows.length > 0) {
          this.customshow = toshows;
        }
        if (this.devices)
          this.devices.map((i) => {
            i.shows = this.customshow;
            console.debug('show', this.customshow);
          });
      }
    }
  }
  g() {
    this.showsomeparameter();
    if (this.search == '') {
      this.devicestoshow = this.devices;
      if (this.devicestoshow)
        this.devicestoshow.map((i) => {
          let url = 'http://' + i.device?.ip;
          this.http
            .get(url) ///delay เปลียนเป็น millisec แล้ว
            .subscribe(
              (d) => {
                i.result = d;
                // i.shows = this.parameter.split(',')
                console.debug('Device paramter view', i);
                // let found = this.errormessage.findIndex(
                //   (r) => i.device?.id == r.device.id
                // );
                // if (found > -1) this.errormessage.splice(found, 1);

                // console.log('found:' + found);
              },
              (e) => {
                console.log('IIIIIIIIIIIIII' + JSON.stringify(i));
                // this.seterror(i, e);
              }
            );
        });
    } else {
      // this.devicestoshow = this.devices.filter((i) => {
      //   if (i.device.name.indexOf(this.search) != -1) return i;
      // });
      // console.log('By fliter' + JSON.stringify(this.devicestoshow));
      // this.devicestoshow.map((i) => {
      //   let url = 'http://' + i.device.ip;
      //   this.http
      //     .post(environment.host + '/rest/piserver/getrequest', { url: url })
      //     .subscribe(
      //       (d) => {
      //         i.result = d;
      //         console.log(i);
      //         console.log('Timer' + JSON.stringify(this.t));
      //       },
      //       (e) => {
      //         this.seterror(i, e);
      //       }
      //     );
      // });
    }
    this.savedevice();
    this.bar.open('Open', 'Get', { duration: 1000 });

    // this.errormessage = this.errormessage.filter((ii) => {
    //   //หาว่าใน error message ตรงกับที่แสดงเปล่า
    //   let index = this.devicestoshow.findIndex(
    //     (e) => e.device.id == ii.device.id
    //   );
    //   if (index != -1) {
    //     return ii; //มีในที่แสดง
    //   }
    // });
    // console.log('ERROR MESSAGE ' + JSON.stringify(this.errormessage));
  }
  reboot(ip?: string) {
    let url = 'http://' + ip + '/restart';
    this.http.get(url).subscribe(
      (d) => {
        this.bar.open('Reboot', '' + ip, { duration: 2000 });
      },
      (e) => {
        this.bar.open('ERROR', 'Can not restart device', { duration: 4000 });
      }
    );
  }
}
