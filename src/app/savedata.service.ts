import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SavedataService {

  save(n:string, o:any) {
    localStorage.setItem(n, JSON.stringify(o))
  }
  load(n:string) {
    let o = localStorage.getItem(n)
    if (o != null)
      return JSON.parse(o)

    return null
  }
  constructor() { }
}
