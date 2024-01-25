import { Injectable } from '@angular/core';
import { Runobject } from './runobject';

@Injectable({
  providedIn: 'root',
})
export class DirectioService {
  runs = Array<Runobject>();
  history = Array<Runobject>();
  constructor() {}
  find(obj: Runobject) {
    return this.runs.find(
      (item) => item.deviceid == obj.deviceid && item.portid == obj.portid
    );
  }

  add(obj: Runobject) {
    this.runs.push(obj);
  }

  //สำหรับ update counter
  updaterun() {
    try {
      this.runs.forEach((item) => {
        if (item.nowrun!! < item.runtime!!) item.nowrun!!++;
      });
    } catch (e) {
      console.error('update Run ', e);
    }
  }

  updatehistory() {
    try {
      this.runs.forEach((item) => {
        if (item.nowrun!! >= item.runtime!!) {
          if (
            !this.history.find(
              (i) =>
                i.deviceid == item.deviceid &&
                i.portid == item.portid &&
                i.runtime == item.runtime
            )
          )
            this.savetohistory(item);
        }
      });
    } catch (e) {
      console.error('Update history ', e);
    }
  }

  savetohistory(item: Runobject) {
    this.history.push(item);
    localStorage.setItem('directiohistory', JSON.stringify(this.history));
  }
  loadtohistory() {
    if (localStorage.getItem('directiohistory') != null) {
      let h = localStorage.getItem('directiohistory');
      if (h) {
        this.history = JSON.parse(h);
      }
    }
  }
  removeallhistory() {
    localStorage.removeItem('directiohistory');
  }
  removehistory(item: Runobject) {
    console.log('Found ' + JSON.stringify(item));

    let index = this.history.findIndex(
      (i, index) =>
        i.deviceid == item.deviceid &&
        i.portid == item.portid &&
        i.runtime == item.runtime
    );

    if (index != -1) {
      console.log('YYYY' + index);
      this.history.splice(index, 1);
      localStorage.setItem('directiohistory', JSON.stringify(this.history));
    }
  }
  //run
  removeoverrun() {
    try {
      this.runs = this.runs.filter(
        (item) => item && item.nowrun!! < item.runtime!!
      );
    } catch (e) {
      console.error('remove over run ', e);
    }
  }
  //
  getbydeviceid(id: number) {
    return this.runs.find((item) => item.deviceid == id);
  }
}
