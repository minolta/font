import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TestService {
  data = [
    { id: 0, name: '0' },
    { id: 1, name: '1' },
  ];
  constructor() {}

  sn(s: any) {
    console.debug('search for ',s)
    let r = this.data.filter((i) => i.name == s.search);
    console.debug('Found input ',r)
    if(r.length == 0)
     return of(this.data)



    return of(r);

    // return of(this.data)
  }
}
