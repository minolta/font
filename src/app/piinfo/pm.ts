import { Device } from '../device/device';

export interface Pm {
    pidevice?:Device;
    pm25?:number;
    pm1?:number;
    pm10?:number;
    valuedate?:Date;
}
