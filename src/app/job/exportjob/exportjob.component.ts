import { PijobService } from './../pijob.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';
import * as FileSaver from 'file-saver';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-exportjob',
  templateUrl: './exportjob.component.html',
  styleUrls: ['./exportjob.component.css']
})
export class ExportjobComponent implements OnInit {

  constructor(public bar:MatSnackBar,public ps:PijobService,private http:HttpClient) { }

  ngOnInit() {
  }

  download()
  {
      let url = environment.host+'/rest/piserver/pijob/exports'
      this.http.get(url, { responseType: "blob" }).subscribe(d => {
        console.log("return:" + d)
        FileSaver.saveAs(d,  "allpijob.json")
      })
  }
}
