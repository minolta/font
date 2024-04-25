import { Component, OnInit } from '@angular/core';
import { LogicService } from '../logic.service';
import { Logic } from '../logic';

@Component({
  selector: 'app-logiclist',
  templateUrl: './logiclist.component.html',
  styleUrls: ['./logiclist.component.css'],
})
export class LogiclistComponent implements OnInit {
  constructor(public service: LogicService) {}
  rows: Logic[] = [];
  ngOnInit() {
    this.update();
  }

  update() {
    this.service.sn({ search: '', page: 0, limit: 50 }).subscribe((d) => {
      this.rows = d;
    });
  }
}
