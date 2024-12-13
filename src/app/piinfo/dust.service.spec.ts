import { CommonModule } from "@angular/common";
import { TestBed } from "@angular/core/testing";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatDialogModule } from "@angular/material/dialog";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatListModule } from "@angular/material/list";
import { MatMenuModule } from "@angular/material/menu";
import { MatSelectModule } from "@angular/material/select";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatTabsModule } from "@angular/material/tabs";
import { MatToolbarModule } from "@angular/material/toolbar";
import { RouterModule } from "@angular/router";
import { AutoModule } from "@kykub/auto";
import { DeviceModule } from "../device/device.module";
import { ActivedeviceComponent } from "./activedevice/activedevice.component";
import { DeviceactiveComponent } from "./deviceactive/deviceactive.component";
import { DhtinfoComponent } from "./dhtinfo/dhtinfo.component";
import { DistanceService } from "./distance.service";
import { DistanceinfoComponent } from "./distanceinfo/distanceinfo.component";
import {
  Ds18b20infoComponent,
  AskbeforedeletedsComponent,
} from "./ds18b20info/ds18b20info.component";
import { DssComponent } from "./dss/dss.component";

import { DustService } from "./dust.service";
import { DustinfoComponent } from "./dustinfo/dustinfo.component";
import { LogService } from "./log.service";
import { LoginfoComponent } from "./loginfo/loginfo.component";
import { ParameterviewComponent } from "./parameterview/parameterview.component";
import { VbattService } from "./vbatt.service";
import { VbattinfoComponent } from "./vbattinfo/vbattinfo.component";
import { WaterinfoComponent } from "./waterinfo/waterinfo.component";
const cfg = {};
describe("DustService", () => {
  let service: DustService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        AutoModule,
        MatButtonModule,
        MatIconModule,
        MatTabsModule,
        MatDialogModule,
        MatAutocompleteModule,
        MatSelectModule,
        MatSnackBarModule,
        MatSidenavModule,
        MatListModule,
        MatMenuModule,
        MatToolbarModule,
        MatInputModule,
        MatCheckboxModule,
        MatCardModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        DeviceModule,
        MatDatepickerModule,
      ],
      declarations: [
        DhtinfoComponent,
        Ds18b20infoComponent,
        WaterinfoComponent,
        DeviceactiveComponent,
        DssComponent,
        AskbeforedeletedsComponent,
        ActivedeviceComponent,
        VbattinfoComponent,
        ParameterviewComponent,
        DustinfoComponent,
        LoginfoComponent,
        DistanceinfoComponent,
      ],
      providers: [
        { provide: "VBATT_OPTIONS", useValue: cfg },
        { provide: "DUST_OPTIONS", useValue: cfg },
        { provide: "DISTANCEOPTIONS", useValue: cfg },
        VbattService,
        DustService,
        LogService,
        DistanceService,
      ],
    });
    service = TestBed.inject(DustService);
  });

  it("call get graph", () => {
    // service.http.post('http://192.168.88.21:888/pm/findbydate',{id:})
  });
  it("should be created", () => {
    // expect(service).toBeTruthy();
  });
});
