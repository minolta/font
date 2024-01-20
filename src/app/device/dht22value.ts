import { Device } from "./device";

export interface Dht22value {
    id?: number;
    pidevice?: Device;
    t?: number;
    h?: number;
    valuedate?: Date;
    ip?: string;
    toserver?: boolean;
}
