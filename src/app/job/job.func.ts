import { JobService } from './job.service';
import { PijobService } from './pijob.service';
import { OnecommandService } from './onecommand.service';
export function newjobservice(c, h) {
    return new JobService(c, h)
}

export function newpijobservice(c, h) {
    return new PijobService(c, h)
}

export function newonecommandservice(c, h) {
    return new OnecommandService(c, h)
}