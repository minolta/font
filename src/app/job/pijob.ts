import { Device } from '../device/device';
import { Ds18b20sensor } from '../device/ds18b20sensor';
import { Job } from './job';
import { Pijobgroup } from './pijobgroup';

export interface Pijob {
  id?: number;
  refid?: number;

  //ช่วงเวลาและวันที่ ที่ทำงาน
  sdate?: Date;
  edate?: Date;

  /**
   * ช่วงเวลาทำงานและหยุดรอ
   */
  runtime?: number;
  waittime?: number;
  descriotion?: string;
  enable?: boolean; //job นี้ทำงานได้หรือเปล่า

  ds18sensor?: Ds18b20sensor;
  ds18sensor_id?: number;

  //ประเภทงานที่ต้องทำ
  job?: Job;
  job_id?: number;

  //pidevice บอกว่ามาจากไหน
  pidevice?: Device;
  pidevice_id?: number;
  desdevice?: Device;
  desdevice_id?: number;
  //ค่าสำหรับเงือนไขของ dht
  thigh?: number;
  tlow?: number;

  hhigh?: number;
  hlow?: number;

  //ช่วงเวลาสำหรับ ทำทุกวัน
  stime?: Date;
  etime?: Date;
  stimes?: string;
  etimes?: string;
  description?: string;
  name?: string;
  callname?: string;
  ports?: any;

  runwithid?: number;
  runfirstid?: number;
  ver?: number;
  timetorun?: number;
  pijobgroup?: Pijobgroup;
  token?: string;
  priority?: number;
}
