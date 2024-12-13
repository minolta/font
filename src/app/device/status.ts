export interface Status {
  name?: string;
  ip?: string;
  version?: string;
  ssid?: string;

  status?: boolean;
  batt_volt?: number;
  psi?: number;
  duty?: number;
}
