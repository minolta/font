import { Loglevel } from './loglevel';

export interface Log {
  date?: Date;
  formatted_message?: string;
  caller_class?: string;
  caller_method?: string;
  caller_line?: string;
  arg2?: string;
  arg0?: string;
  mac?: string;
  level?: Loglevel;
  arg1?: string;
}
