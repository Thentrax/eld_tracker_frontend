export interface CycleHours {
  id: number;
  log_id: number
  status_id: number;
  start_location: { lat: number; lng: number };
  end_location: { lat: number; lng: number };
  distance: number;
  annotations?: string;
}

//   OffDuty= 1,
//   SleeperBerth= 2,
//   Driving= 3,
//   OnDutyNotDriving=4,