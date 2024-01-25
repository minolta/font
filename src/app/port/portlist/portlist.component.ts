import { PortService } from './../port.service';
import { ListbaseComponent } from '@kykub/list';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-portlist',
  templateUrl: './portlist.component.html',
  styleUrls: ['./portlist.component.css']
})
export class PortlistComponent extends ListbaseComponent implements OnInit {

  constructor(public service: PortService) { super(service) }
  updatefromnewcomponent($event)
  {
    console.log('Add',$event)
    this.update()
  }
  ngOnInit() 
  {
    this.update()
  }

  update()
  {
    this.service.sn({search:'',page:0,limit:50}).subscribe(d=>{
      this.rows = d
    })
  }
}
