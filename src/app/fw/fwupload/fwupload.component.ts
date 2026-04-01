import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  effect,
  signal,
} from '@angular/core';
import { FwService } from '../fw.service';
import { Pifw } from '../pifw';
import { Fw } from '../../fw';

@Component({
  selector: 'app-fwupload',
  templateUrl: './fwupload.component.html',
  styleUrls: ['./fwupload.component.css'],
  standalone: false,
})
export class FwuploadComponent implements OnInit {
  ver = signal<any>(null);
  appname = signal('');
  msg = signal('');
  file = signal<FileList | null>(null);
  lastver: number = 0;
  @ViewChild('fileInput') fileInput?: ElementRef;
  testvalue = signal(1);
  constructor(public service: FwService) {}

  ngOnInit() {
    this.updatelast();

    effect(() => {
      console.log('have effect', this.testvalue());
    });
  }

  setfile(e: any) {
    this.file.set(e.target.files);
  }
  lastversion() {
    this.service.last(this.appname()).subscribe((d: any) => {
      this.ver.set(d.ver + 1);
    });
  }
  fileChange() {
    console.log(this.file());
    // let URL = this.service.config.host + '/fw/upload';
    const fileList = this.file();
    if (fileList && fileList.length > 0) {
      let file: File = fileList[0];
      let formData: FormData = new FormData();
      formData.append('afile', file, file.name);
      formData.append('ver', this.ver() + '');
      formData.append('appname', this.appname());
      let headers = new Headers();
      //  headers.append('Content-Type', 'multipart/form-data; boundary=HereGoes');

      this.msg.set('Uploading....');
      this.service.add(formData).subscribe(
        (data) => {
          console.log('upload success : ', data);
          let fw = data as any;
          this.msg.set('Upload success Version:' + fw.ver);
          this.ver.set(fw.ver);
          this.appname.set(fw.app.name);
          this.updatelast();
          if (this.fileInput) this.fileInput.nativeElement.value = '';
        },
        (error) => {
          console.log(error);
          this.msg.set('error:' + JSON.stringify(error.error.error));
        }
      );
    }
  }

  updatelast() {
    this.service.last(this.appname()).subscribe((d) => {
      console.log('re', d);
      let ver = d as any;
      this.ver.set(ver.ver + 1);
      // this.lastver = ver
    });
  }
}
