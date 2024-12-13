import { Device } from "../device/device"
import { Pijob } from "./pijob"

export interface Sensorinjob {
    id?:number
    name?:string
    pidevice_id?:number
    pijob?:Pijob
    pijob_id?:number
    refid?:number
    sensor?:Device
}
