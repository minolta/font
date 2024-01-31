import { Device } from './device';
import { Devicegroup } from './devicegroup';
export interface Ds18b20sensor {
  t?: number;
  id?: number;
  name?: string;
  devicename?: string;
  refid?: string;
  devicegroup?: Devicegroup;
  callname?: string;
  description?: string;
  user_id?: number;
  ver?: number;
  pidevice?: Device;
  valuedate?: Date;
}
