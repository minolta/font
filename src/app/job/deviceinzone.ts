import { Device } from "../device/device";
import { Pijobgroup } from "./pijobgroup";

export interface Deviceinzone {

    id?:number;
    pidevice?:Device;
    pijobgroup?:Pijobgroup;
}
