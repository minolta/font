import { Component, OnInit } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { PijobgroupService } from "../pijobgroup.service";
import { DeviceService } from "../../device/device.service";
import { Zone } from "../zone";

@Component({
  selector: "app-zonelist",
  templateUrl: "./zonelist.component.html",
  styleUrls: ["./zonelist.component.css"],
})
export class ZonelistComponent implements OnInit {
  s = "";
  rows:Zone[]=Array<Zone>();
  zonebag = { obj: { name: "", id: 0 } };
  devicebag = { obj: { name: "", id: 0 } };
  constructor(public service: PijobgroupService, public ds: DeviceService,public bar:MatSnackBar) {}

  ngOnInit(): void {
    this.search();
  }

  search() {
    this.service
      .sn({ search: this.s, page: 0, limit: 1000 })
      .subscribe((d: any) => {
        this.rows = d;
      });
  }
  adddtz()
  {
      this.service.adddevicetosonze(this.devicebag.obj,this.zonebag.obj).subscribe(d=>{

        this.bar.open('Add '+this.devicebag.obj.name+" to "+this.zonebag.obj.name,"ok",{duration:2000})
      })

  }
}
