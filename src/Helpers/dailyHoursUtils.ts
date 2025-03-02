import { Log } from "../Models/Log";

export const getAvailableTime = (log: Log): string => {
  if (!log.cycle_hours || log.cycle_hours.length === 0) return "24:00";

  const filledRanges = log.cycle_hours.map(cycle => ({
    start: parseInt(cycle.start_hour.split(':')[0]) * 60 + parseInt(cycle.start_hour.split(':')[1]),
    end: parseInt(cycle.end_hour.split(':')[0]) * 60 + parseInt(cycle.end_hour.split(':')[1])
  }));

  filledRanges.sort((a, b) => a.start - b.start);

  let totalFilled = 0;
  let lastEnd = 0;

  filledRanges.forEach(({ start, end }) => {
    if (start > lastEnd) {
      totalFilled += end - start;
    } else if (end > lastEnd) {
      totalFilled += end - lastEnd;
    }
    lastEnd = Math.max(lastEnd, end);
  });

  const availableMinutes = (24 * 60) - totalFilled;
  const hours = Math.floor(availableMinutes / 60);
  const minutes = availableMinutes % 60;

  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
};
