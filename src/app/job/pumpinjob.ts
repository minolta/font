import { Device } from "../device/device";
import { Portname } from "../device/portname";

export interface Pumpinjob {
  id?: number;
  enable?: boolean;
  pidevice?:Device
  portname?:Portname
  name?:string
}
