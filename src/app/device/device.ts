import { Devicegroup } from './devicegroup';
export interface Device {
  id?: number;
  code?: string;
  name?: string;
  mac?: string;
  ver?: number;
  ip?: string;
  password?: string;
  description?: string;
  devicegroup?: Devicegroup;
  pidevicegroup?: Devicegroup;
  lastupdate?: Date;
  user_id?: number;
  a0?: number;
  lastcheckinlong?: number;
  lastuptime?: number;
}
