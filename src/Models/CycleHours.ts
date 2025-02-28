export interface CycleHours {
  id: number;
  log_id: number
  status: 'Off Duty' | 'Sleeper Berth' | 'Driving' | 'On Duty Not Driving';
  location: string;
  odometer_etart: number;
  odometer_end: number;
  annotations?: string;
}