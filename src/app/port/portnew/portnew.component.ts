import { MatSnackBar } from '@angular/material/snack-bar';
import { PortService } from './../port.service';
import { Component, OnInit } from '@angular/core';
import { Port } from '../port';
import { Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'app-portnew',
  templateUrl: './portnew.component.html',
  styleUrls: ['./portnew.component.css']
})
export class PortnewComponent implements OnInit {
  @Output() newItemEvent = new EventEmitter<Port>();
  portname: Port = {}
  constructor(public service: PortService, public bar: MatSnackBar) { }

  ngOnInit() {
  }

  save() {
    console.log('Add new Port ===========>', this.portname)
    this.service.add(this.portname).subscribe(d => {
      console.log('Add new port from server', d)
      this.newItemEvent.emit(d);
      this.bar.open('Add', '', { duration: 5000 })
      this.portname = {}
    }, e => {
      console.log("Error " + e)
    })
  }
}
