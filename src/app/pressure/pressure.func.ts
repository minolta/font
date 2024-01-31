import { PressureService } from "./pressure.service";

export function newpressureService(c, h) {
    return new PressureService(c, h)
}