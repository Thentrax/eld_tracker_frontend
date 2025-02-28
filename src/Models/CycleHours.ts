export interface CycleHours {
  id: number;
  log_id: number
  status: 'Off Duty' | 'Sleeper Berth' | 'Driving' | 'On Duty Not Driving';
  start_location: { lat: number; lng: number };
  end_location: { lat: number; lng: number };
  distance: number;
  annotations?: string;
}