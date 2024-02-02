import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-auto',
  templateUrl: './auto.component.html',
  styleUrl: './auto.component.css',
})
export class AutoComponent implements OnInit, OnChanges {
  @Input() service: any;
  @Input() obj: any;
  @Output() objChange = new EventEmitter();
  @Input() widthvalue: any;
  @Input() name?: any;
  datas: any; //เอาไว้แสดงชื่อ
  c = new UntypedFormControl();
  @Input() p: any;
  selectvalue(d: any) {
    this.objChange.emit(d);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['obj']) {
      console.debug('Change obj',this.obj)
      if(this.obj)
      {
        this.name = this.obj.name
      }
    }
  }
  ngOnInit(): void {
    console.debug('init obj',this.obj)
    this.c.valueChanges
      .pipe(debounceTime(300))
      .pipe(distinctUntilChanged())
      .subscribe((term) => {
        console.log('Term :' + term);
        if (this.service != null) {
          this.service
            .sn({ search: term, limit: 50, page: 0 })
            .subscribe((d: Array<any>) => {
              if (d.length > 0) {
                if (this.datas)
                 (this.datas as Array<any>).length = 0;
                else this.datas = Array<any>;

                if (d[0])
                  if (d[0].hasOwnProperty('callname')) {
                    for (let i = 0; i < d.length; i++) {
                      let c = d[i];
                      c.name = d[i].callname;
                      (this.datas as Array<any>).push(c);
                    }
                  } else if (d[0].hasOwnProperty('role_name')) {
                    let buffer = Array<any>();
                    for (let i = 0; i < d.length; i++) {
                      let c = d[i];
                      c.name = d[i].role_name;
                      buffer.push(c);
                    }

                    this.datas = buffer;
                  } else if (d[0].hasOwnProperty('permission_name')) {
                    let da = d as Array<any>;
                    let buffer = Array<any>();
                    for (let i = 0; i < da.length; i++) {
                      let c = da[i];
                      c.name = da[i].permission_name;
                      buffer.push(c);
                    }

                    this.datas = buffer;
                  } else if (
                    d[0].hasOwnProperty('name') != true ||
                    d[0].hasOwnProperty('name') == null
                  ) {
                    console.log('Not have name');
                    for (let i = 0; i < d.length; i++) {
                      let c = d[i];
                      if (c.hasOwnProperty('username')) c.name = d[i].username;
                      else if (c.hasOwnProperty('callname'))
                        c.name = d[i].callname;

                      (this.datas as Array<any>).push(c);
                    }
                  } else this.datas = d as any;
              }
            });
        }
      });
  }
}
