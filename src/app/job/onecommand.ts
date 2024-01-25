import { Device } from './../device/device';
import { Pijob } from './pijob';
export interface Onecommand {
    name?: string;
    pidevice?: Device;
    pidevice_id?: number;
    run?: boolean;
    pijob?:Pijob;
    pijob_id?:number;
}

