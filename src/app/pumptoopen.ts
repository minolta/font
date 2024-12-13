import { Device } from './device/device';

export interface Pumptoopen {
  pump?: Device;
  enable?: boolean;
  run?: boolean;
  v?:number
  psi?:number
  duty?:number

}
