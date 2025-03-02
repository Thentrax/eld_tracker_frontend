import * as S from "../styles"
import { Log } from "../../../Models/Log";
import { CycleHours, CycleStatus } from "../../../Models/CycleHours";
import EldDiagram from "../../../components/ELD_Diagram";
import { getTotalDistance } from "../../../Helpers/distanceUtils";
import { getAvailableTime } from "../../../Helpers/dailyHoursUtils";

interface LogDetailProps {
  isOpen: boolean;
  selectedLog?: Log;
  onReturn: () => void;
}

const LogDetail: React.FC<LogDetailProps> = ({
  isOpen, selectedLog, onReturn
}) => {
  return (
    <S.Container>
      {selectedLog && (
        <>
          <S.Title>
            {`${selectedLog.date} - ${selectedLog.driver_name}`}
          </S.Title>
          <S.FixedRow>
          <S.Col>
            <S.Text><b>Total Distance:</b> {getTotalDistance(selectedLog).toFixed(2)}Km</S.Text>
            <S.Text><b>Time left to fill:</b> {getAvailableTime(selectedLog)}</S.Text>
          </S.Col>
          <S.Col>
            <S.Text><b>Time left to fill:</b> {getAvailableTime(selectedLog)}</S.Text>
            <S.Text><b>Time left to fill:</b> {getAvailableTime(selectedLog)}</S.Text>
          </S.Col>
          </S.FixedRow>
          <div style={{ width: '100%'}}>
            <EldDiagram log={selectedLog} />
          </div>
          <S.Row>
            {selectedLog.cycle_hours && selectedLog.cycle_hours.map((cycleHour: CycleHours) => 
              (
                <>
                {CycleStatus[cycleHour.status_id]}
                </>
              )
            )}
          </S.Row>
        </>
      )}
    </S.Container>
  );
};

export default LogDetail;