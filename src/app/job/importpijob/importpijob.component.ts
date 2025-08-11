import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { PijobService } from './../pijob.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-importpijob',
    templateUrl: './importpijob.component.html',
    styleUrls: ['./importpijob.component.css'],
    standalone: false
})
export class ImportpijobComponent implements OnInit {
  msg: any;
  file: any;
  constructor(public service: PijobService, public http: HttpClient) {}

  ngOnInit() {}
  setfile(e: any) {
    this.file = e.target.files;
  }
  fileChange() {
    console.log(this.file);
    let URL = environment.host + '/rest/piserver/pijob/import';
    let fileList: FileList = this.file;
    if (fileList.length > 0) {
      let file: File = fileList[0];
      let formData: FormData = new FormData();
      formData.append('afile', file, file.name);

      let headers = new Headers();
      //  headers.append('Content-Type', 'multipart/form-data; boundary=HereGoes');

      this.msg = 'Uploading....';
      this.http.post(URL, formData).subscribe(
        (data) => {
          console.log('success : ' + data);
          this.msg = 'Upload success :';
        },
        (error) => {
          console.log(error);
          this.msg = 'error:' + JSON.stringify(error.error.error);
        }
      );
    }
  }
}
