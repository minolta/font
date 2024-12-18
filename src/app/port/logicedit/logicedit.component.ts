import { LogicService } from './../logic.service';
import { Component, OnInit } from '@angular/core';
import { Logic } from '../logic';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-logicedit',
  templateUrl: './logicedit.component.html',
  styleUrls: ['./logicedit.component.css'],
})
export class LogiceditComponent implements OnInit {
  logic: Logic = {};
  id: number = 0;
  constructor(
    public service: LogicService,
    private route: ActivatedRoute,
    public bar: MatSnackBar
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      this.service.get(this.id).subscribe((d) => {
        this.logic = d;
      });
    });
  }

  save() {
    this.service.edit(this.logic).subscribe((d) => {
      this.bar.open('Edit', '', { duration: 5000 });
    });
  }
}
