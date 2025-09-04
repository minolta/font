import { MatSnackBar } from '@angular/material/snack-bar';
import { LogicService } from './../logic.service';
import { Component, OnInit } from '@angular/core';
import { Logic } from '../logic';

@Component({
    selector: 'app-logicnew',
    templateUrl: './logicnew.component.html',
    styleUrls: ['./logicnew.component.css'],
    standalone: false
})
export class LogicnewComponent implements OnInit {
  logic: Logic = {}
  constructor(public service: LogicService, public bar: MatSnackBar) { }

  ngOnInit() {
    
  }

  save() {
    this.service.add(this.logic).subscribe(d => {
      this.bar.open('Add', '', { duration: 5000 })
      this.logic = {}
    })
  }
}
