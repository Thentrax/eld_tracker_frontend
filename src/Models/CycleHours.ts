export interface CycleHours {
  id: number;
  log: number
  status_id: number;
  start_hour: string;
  end_hour: string;
  start_location: { lat: number; lng: number };
  end_location: { lat: number; lng: number };
  distance: number;
  annotations?: string;
}

export enum CycleStatus {
  'Off Duty'= 1,
  'Sleeper Berth'= 2,
  'Driving'= 3,
  'On Duty Not Driving'=4,
}