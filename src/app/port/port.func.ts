import { PortService } from "./port.service";
import { LogicService } from "./logic.service";

export function newportservice(c,h)
{
    return new PortService(c,h)
}
export function newlogicservice(c,h)
{
    return new LogicService(c,h)
}