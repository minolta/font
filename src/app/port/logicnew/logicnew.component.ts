import { MatSnackBar } from '@angular/material/snack-bar';
import { LsService } from './../../ls.service';
import { LogicService } from './../logic.service';
import { Component, OnInit } from '@angular/core';
import { Logic } from '../logic';

@Component({
  selector: 'app-logicnew',
  templateUrl: './logicnew.component.html',
  styleUrls: ['./logicnew.component.css']
})
export class LogicnewComponent implements OnInit {

  logic: Logic = {}
  constructor(public service: LogicService, public ls: LsService, public bar: MatSnackBar) { }

  ngOnInit() {
  }

  save() {
    this.service.add(this.logic).subscribe(d => {
      this.bar.open('Add', '', { duration: 5000 })
      this.logic = {}
    })
  }
}
