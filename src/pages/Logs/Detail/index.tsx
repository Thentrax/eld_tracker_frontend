import * as S from "../styles"
import { Log } from "../../../Models/Log";
import { CycleHours } from "../../../Models/CycleHours";
import EldDiagram from "../../../components/ELD_Diagram";
import { getTotalDistance } from "../../../Helpers/distanceUtils";
import { getAvailableTime } from "../../../Helpers/dailyHoursUtils";
import DetailInfoCard from "./Components/DetailInfoCard";
import CycleHoursCard from "./Components/CycleHourCard";

interface LogDetailProps {
  isOpen: boolean;
  selectedLog?: Log;
  onReturn: () => void;
}

const LogDetail: React.FC<LogDetailProps> = ({
  isOpen, selectedLog, onReturn
}) => {
  const sortCycleHoursByStartTime = (cycleHours: CycleHours[]) => {
    return [...cycleHours].sort((a, b) => a.start_hour.localeCompare(b.start_hour));
  };

  return (
    <S.Container>
      {selectedLog && (
        <>
          <S.Title>
            {`${selectedLog.date} - ${selectedLog.driver_name}`}
          </S.Title>
          <S.FixedRow>
            <DetailInfoCard title="Truck Number" value={selectedLog.truck_number} />
            <DetailInfoCard title="Total Distance" value={`${getTotalDistance(selectedLog).toFixed(2)}Km`} />
            <DetailInfoCard title="Pickup Location" value={selectedLog.pickup_location_address} />
            <DetailInfoCard title="Dropoff Location" value={selectedLog.dropoff_location_address} />
            <DetailInfoCard title="Time left to fill" value={getAvailableTime(selectedLog)} />
          </S.FixedRow>
          <div style={{ display: 'flex'}}>
            <EldDiagram log={selectedLog} />
          </div>
          <S.Col>
            {selectedLog.cycle_hours && sortCycleHoursByStartTime(selectedLog.cycle_hours).map((cycleHour: CycleHours) => 
              (
                <CycleHoursCard cycleHour={cycleHour} />
              )
            )}
          </S.Col>
        </>
      )}
    </S.Container>
  );
};

export default LogDetail;