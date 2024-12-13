import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
@Injectable()
export class FwService {

  constructor(public  http: HttpClient) {
    // this.host = environment.fwhost
    // this.urlsn = "/sn"
    // this.config.urlsn = this.urlsn
    // console.log('FwServer', this.config)
  }

  last(appname:string) {
    let url = environment.fwhost + '/rest/fw/lastversion/'+appname
    console.log('call ' + url)
    return this.http.get(url)
  }
  add(file: any) {
    console.log('Upload file', file)
    let URL = environment.fwhost + '/rest/fw/upload';
    return this.http.post(URL, file)
  }
  uploadfile(formData: FormData) {
    console.log('Upload file', formData)
    let URL = environment.fwhost + '/rest/fw/upload';
    return this.http.post(URL, formData)
  }
  sn(s: any) {

    let url = environment.fwhost + '/rest/fw/sn'
    console.log('call ' + url)
    return this.http.post(url, s)
  }
}
