import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'app-deletepijob',
    templateUrl: './deletepijob.component.html',
    styleUrls: ['./deletepijob.component.css'],
    standalone: false
})
export class DeletepijobComponent implements OnInit {

  constructor( public dialogRef: MatDialogRef<DeletepijobComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

}
