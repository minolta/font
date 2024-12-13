import { Device } from "../device/device";

export interface Forgraph {

    hour?: number;
    day?: number;
    month?: number;
    year?: number;
    t?: number;
    h?: number;
    device?: Device;
    adddate?: Date;
}