import { Pijob } from './pijob';

export interface Portinjobobj {
  id?: number;
  enable?: boolean;
  portname?: any;
  status?: any;
  runtime?: number;
  waittime?: number;
  device?: any;
  ver?: number; //สำหรับ delete
  pijob_id?: number;
  pijob?: Pijob;
}
