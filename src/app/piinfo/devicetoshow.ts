import { Device } from '../device/device';

export interface Devicetoshow {
  ip:string;
  device: Device;
  shows?: string[];
  result?: any;
}
