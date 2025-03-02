import { Log } from "../Models/Log";

  export const getTotalDistance = (log: Log): number => {
    if (!log.cycle_hours || log.cycle_hours.length === 0) return 0;
  
    return log.cycle_hours.reduce((total, cycle) => total + (cycle.distance || 0), 0);
  };