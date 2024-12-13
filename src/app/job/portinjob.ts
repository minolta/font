import { Device } from '../device/device';
import { Portname } from '../device/portname';
import { Logic } from '../port/logic';
import { Pijob } from './pijob';

export interface Portinjob {
  id?: number;
  portname?: Portname;
  enable?: boolean;
  runtime?: number;
  waittime?: number;
  traget?: Device;
  device?: Device;
  ver?: number;
  status?: Logic;
  pijob_id?:number
  portname_id?:number;
  pijob?:Pijob
}
