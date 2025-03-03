import { CycleHours, CycleStatus } from '../../../../../Models/CycleHours';
import * as S from '../../../styles'
import DetailInfoCard from '../DetailInfoCard';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import L from 'leaflet';
import { convertTo12HourFormat } from '../../../../../Helpers/formatTo12Hours';

interface CycleHoursCardProps {
  cycleHour: CycleHours
}

const CycleHoursCard: React.FC<CycleHoursCardProps> = ({
  cycleHour
}) => {
  const startCoords = cycleHour.start_location;
  const endCoords = cycleHour.end_location;

  return (
    <S.CycleHoursCard>
        <S.Col style={{width: '100%'}}>
          <S.Title>{convertTo12HourFormat(cycleHour.start_hour)} - {convertTo12HourFormat(cycleHour.end_hour)}: {CycleStatus[cycleHour.status_id]}</S.Title>
          <S.CycleHoursRow>
            <S.Col>
              <S.FixedRow>
                <DetailInfoCard title="Status" value={CycleStatus[cycleHour.status_id]} />
                <DetailInfoCard title="Duration" value={`${convertTo12HourFormat(cycleHour.start_hour)} - ${convertTo12HourFormat(cycleHour.end_hour)}`} />
                <DetailInfoCard title="Distance" value={`${cycleHour.distance.toFixed(2)}Km`} />
                <DetailInfoCard title="Start Location" value={cycleHour.start_location_address} />
                <DetailInfoCard title="End Location" value={cycleHour.end_location_address} />
              </S.FixedRow>
              <S.Col>
                <S.SubTitle>
                  Annotations
                </S.SubTitle>
                <S.Text>
                  {cycleHour.annotations}
                </S.Text>
              </S.Col>
            </S.Col>

              {(startCoords && endCoords) && (
                <MapContainer 
                  style={{ height: '200px', width: '60%', borderRadius: '10px' }}
                  zoom={15}
                  center={[startCoords.lat, startCoords.lng]}
                  whenReady={() => {
                    const map = L.map(document.createElement('div'));
                    const bounds = L.latLngBounds([startCoords, endCoords]);
                    map.fitBounds(bounds, { padding: [20, 20] });
                  }}
                >
                  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                  <Marker position={[startCoords.lat, startCoords.lng]} />
                  <Marker position={[endCoords.lat, endCoords.lng]} />
                </MapContainer>
              )}            
            
          </S.CycleHoursRow>
        </S.Col>
    </S.CycleHoursCard>
  )
}

export default CycleHoursCard;