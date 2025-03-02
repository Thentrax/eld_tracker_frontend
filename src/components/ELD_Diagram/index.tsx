import React from "react";
import { Log } from "../../Models/Log";
import { theme } from "../../styles/theme";

interface EldDiagramProps {
  log: Log;
  width?: number;
  height?: number;
}

const EldDiagram: React.FC<EldDiagramProps> = ({ log, width = 900, height = 300 }) => {
  if (!log || !log.cycle_hours) return null;

  const statusMap: { [key: number]: number } = {
    1: 0, // Off Duty
    2: 1, // Sleeper Berth
    3: 2, // Driving
    4: 3, // On Duty Not Driving
  };

  const hourWidth = width / 24;
  const statusHeight = height / 4;

  const formatHour = (hour: number) => {
    if (hour === 0) return "12 AM";
    if (hour === 12) return "12 PM";
    return hour < 12 ? `${hour} AM` : `${hour - 12} PM`;
  };

  const lines = log.cycle_hours.map((cycle, index) => {
    const startHour =
      parseInt(cycle.start_hour.split(":")[0]) +
      parseInt(cycle.start_hour.split(":")[1]) / 60;
    const endHour =
      parseInt(cycle.end_hour.split(":")[0]) +
      parseInt(cycle.end_hour.split(":")[1]) / 60;
    const statusY = statusMap[cycle.status_id] * statusHeight;

    return (
      <line
        key={index}
        x1={startHour * hourWidth}
        y1={statusY}
        x2={endHour * hourWidth}
        y2={statusY}
        stroke={theme.colors.primary}
        strokeWidth="5"
      />
    );
  });

  // Renderiza os horários no eixo X
  const hours = Array.from({ length: 13 }, (_, i) => (
    <text
      key={i}
      x={i * hourWidth * 2}
      y={height + 20}
      fontSize="14"
      textAnchor="middle"
      fontWeight="bold"
    >
      {formatHour(i * 2)}
    </text>
  ));

  // Labels dos status no eixo Y
  const statusLabels = [
    "Off Duty",
    "Sleeper Berth",
    "Driving",
    "On Duty",
  ].map((label, i) => (
    <text
      key={label}
      x="-5"
      y={i * statusHeight + statusHeight / 2}
      fontSize="14"
      fontWeight="bold"
      textAnchor="end"
    >
      {label}
    </text>
  ));

  return (
    <svg width="100%" height={height + 40} viewBox={`0 0 ${width} ${height + 40}`}>
      {/* Linhas de referência */}
      {Array.from({ length: 4 }, (_, i) => (
        <line
          key={i}
          x1="0"
          y1={i * statusHeight}
          x2={width}
          y2={i * statusHeight}
          stroke="#ccc"
          strokeWidth="1"
        />
      ))}

      {/* Linhas dos cycle_hours */}
      {lines}

      {/* Eixos */}
      <line x1="0" y1={height} x2={width} y2={height} stroke="black" strokeWidth="2" />
      <line x1="0" y1="0" x2="0" y2={height} stroke="black" strokeWidth="2" />

      {/* Labels */}
      {hours}
      {statusLabels}
    </svg>
  );
};

export default EldDiagram;
