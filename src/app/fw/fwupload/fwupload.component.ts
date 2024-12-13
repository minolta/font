import { Component, OnInit, effect, signal } from '@angular/core';
import { FwService } from '../fw.service';
import { Pifw } from '../pifw';

@Component({
    selector: 'app-fwupload',
    templateUrl: './fwupload.component.html',
    styleUrls: ['./fwupload.component.css'],
    standalone: false
})
export class FwuploadComponent implements OnInit {
  ver:any
  appname:string=''
  msg:string = ''
  file:any
  lastver:number =0
  
  testvalue = signal(1)
  constructor(public service: FwService) { }

  ngOnInit() {
    this.updatelast()

   effect(()=>{
    console.log('have effect',this.testvalue())
   })
  }

  setfile(e:any) {
    this.file = e.target.files
  }
  lastversion() {
    this.service.last(this.appname).subscribe((d: any) => {
      this.ver = d.ver + 1
    })
  }
  fileChange() {
    console.log(this.file)
    // let URL = this.service.config.host + '/fw/upload';
    let fileList: FileList = this.file;
    if (fileList.length > 0) {
      let file: File = fileList[0];
      let formData: FormData = new FormData();
      formData.append('afile', file, file.name);
      formData.append('ver', this.ver+'');
      formData.append('appname', this.appname);
      let headers = new Headers();
      //  headers.append('Content-Type', 'multipart/form-data; boundary=HereGoes');


      this.msg = 'Uploading....';
      this.service.add(formData)
        .subscribe(
          data => {
            console.log('success : ' + data);
            this.msg = 'Upload success Version:' + this.ver;
            this.ver = 0;
            this.appname = 'default';
            this.updatelast()
          },
          error => {
            console.log(error);
            this.msg = 'error:' + JSON.stringify(error.error.error);
          }
        )
    }
  }

  updatelast() {
    this.service.last(this.appname).subscribe(d => {

      let ver = d as any
      this.ver = ver.ver + 1
      // this.lastver = ver
    })
  }
}
