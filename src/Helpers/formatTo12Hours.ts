export const convertTo12HourFormat = (time: string) => {
  const [hours, minutes] = time.split(':').map(Number);
  const period = hours >= 12 ? 'PM' : 'AM';
  const adjustedHours = hours % 12 || 12; // Converte 0 para 12 no formato de 12h
  return `${adjustedHours}:${minutes.toString().padStart(2, '0')} ${period}`;
};
