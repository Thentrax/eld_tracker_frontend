import { CycleHours } from './CycleHours';

export interface Log {
  id: number;
  date: string;
  driver_name: string;
  current_location: { lat: number; lng: number };
  pickup_location: { lat: number; lng: number };
  dropoff_location: { lat: number; lng: number };
  cycle_hours?: CycleHours[];
}