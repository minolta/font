import { Devicegroup } from './devicegroup';
export interface Ds18b20sensor {
    id?: number;
    name?: string;
    devicename?: string;
    refid?: string;
    devicegroup?: Devicegroup;
    callname?: string;
    description?: string;
    user_id?: number;
    ver?: number;
}
