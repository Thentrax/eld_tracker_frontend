import { CycleHours } from './CycleHours';

export interface Log {
  id: number;
  date: string;
  driver_name: string;
  truck_number: number;
  current_location: { lat: number; lng: number };
  current_location_address: string;
  pickup_location: { lat: number; lng: number };
  pickup_location_address: string;
  dropoff_location: { lat: number; lng: number };
  dropoff_location_address: string;
  cycle_hours?: CycleHours[];
}