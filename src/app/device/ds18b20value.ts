import { Ds18b20sensor } from './ds18b20sensor';
import { Device } from './device';
export interface Ds18b20value {
    id?: number;
    t?: number;
    valuedate?: Date;
    ip?: string;
    toserver?: boolean;
    ds18sensor?: Ds18b20sensor;
    pidevice?: Device;
    ver?: number;
}
