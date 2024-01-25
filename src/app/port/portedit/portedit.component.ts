import { PortService } from './../port.service';
import { Port } from './../port';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LsService } from '../../ls.service';

@Component({
  selector: 'app-portedit',
  templateUrl: './portedit.component.html',
  styleUrls: ['./portedit.component.css']
})
export class PorteditComponent implements OnInit {
  portname: Port = {}
  id
  constructor(private route: ActivatedRoute,
    public bar: MatSnackBar,
    public service: PortService,
    public ls: LsService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id']
      this.service.get(this.id).subscribe(d => {
        this.portname = d
        console.log(d)
      })
    })
  }

  save() {
    this.service.edit(this.portname).subscribe(d => {
      this.portname = d
      this.bar.open('Edit', '', { duration: 5000 })
    })
  }



}

