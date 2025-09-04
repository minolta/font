import { PortService } from './../port.service';
import { Port } from './../port';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-portedit',
    templateUrl: './portedit.component.html',
    styleUrls: ['./portedit.component.css'],
    standalone: false
})
export class PorteditComponent implements OnInit {
  portname: Port = {};
  id: number = 0;
  constructor(
    private route: ActivatedRoute,
    public bar: MatSnackBar,
    public service: PortService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      this.service.get(this.id).subscribe((d) => {
        this.portname = d;
        console.debug('Load port to edit',d);
      });
    });
  }

  save() {
    this.service.edit(this.portname).subscribe((d) => {
      this.portname = d;
      this.bar.open('Edit', '', { duration: 5000 });
    });
  }
}
