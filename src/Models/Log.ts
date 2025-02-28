import { CycleHours } from './CycleHours';

export interface Log {
  id: number;
  date: string;
  driver_name: string;
  current_location: string;
  pickup_location: string;
  dropoff_location: string;
  cycle_hours?: CycleHours[];
}