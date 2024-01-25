import { ListbaseComponent } from '@kykub/list';
import { Component, OnInit } from '@angular/core';
import { LogicService } from '../logic.service';

@Component({
  selector: 'app-logiclist',
  templateUrl: './logiclist.component.html',
  styleUrls: ['./logiclist.component.css']
})
export class LogiclistComponent extends ListbaseComponent implements OnInit {

  constructor(public service: LogicService) { super(service) }

  ngOnInit() {
    this.update()
  }

  update() {
    this.service.sn({ search: '', page: 0, limit: 50 }).subscribe(d => {
      this.rows = d
    })
  }
}
