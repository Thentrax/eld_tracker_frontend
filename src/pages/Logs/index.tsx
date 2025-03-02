import { useEffect, useState } from "react";
import Card from "../../components/Card";
import Skeleton from "../../components/Skeleton";
import * as S from "./styles"
import { Log } from "../../Models/Log";
import { get } from "../../services/api";
import LogDetail from "./Detail";
import { getTotalDistance } from "../../Helpers/distanceUtils";
import { getAvailableTime } from "../../Helpers/dailyHoursUtils";

const Logs: React.FC = () => {
  const [logs, setLogs] = useState<Log[]>([]);
  const [selectedLog, setSelectedLog] = useState<Log>();
  const [openDetails, setOpenDetails] = useState<boolean>(false);

  useEffect(() => {  
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    try {
      const response: Log[] = await get('/logs');
      setLogs(response);
    } catch (error) {
      console.error('Log Fetch Error:', error);
    }
  };

  const handleSelectLog = (log: Log) => {
    setSelectedLog(log);
    setOpenDetails(true);
  }

  const handleReturn = () => {
    setSelectedLog(undefined);
    setOpenDetails(false);
  }
  
  return (
    <Skeleton>
      {!openDetails ? (
      <S.Container>
          <S.Title>
            Logs
          </S.Title>
          <S.SubTitle>
            Here you can see your logs, if you want to create a new log, please click in the "New Register" button in the header
          </S.SubTitle>
          <S.Row>
            {logs.map((log: Log) => 
              (
                <Card title={`${log.date} - ${log.driver_name}`} onClick={() => handleSelectLog(log)}>
                  <div> 
                    <p>Total Distance: {getTotalDistance(log).toFixed(2)} Km</p>
                    <p>Time left to fill: {getAvailableTime(log)}</p>
                  </div>
                </Card>
              )
            )}
          </S.Row>
      </S.Container>
      ) : (
        <LogDetail isOpen={openDetails} selectedLog={selectedLog} onReturn={handleReturn} />
      )

      }
    </Skeleton>
  );
};

export default Logs;