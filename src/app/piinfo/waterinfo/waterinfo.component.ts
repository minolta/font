import { environment } from '../../../environments/environment';
import { Ds18b20Service } from './../../device/ds18b20.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
    selector: 'app-waterinfo',
    templateUrl: './waterinfo.component.html',
    styleUrls: ['./waterinfo.component.css'],
    standalone: false
})
export class WaterinfoComponent implements OnInit,OnDestroy {

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
      console.log("Unsubscription")
    }
  }
  info:any
  subscription:any
  constructor(public ds:Ds18b20Service) { }

  ngOnInit() {
    // let timer = TimerObservable.create(2000, 60000);
    // this.subscription = timer.subscribe(t => {
    //   this.getinfo()
    // });
  }

  getinfo()
  {
     let url = environment.host+'/waterinfo'
    
     this.ds.http.get(url).subscribe(d=>{
       this.info = d
     })

  }

}
