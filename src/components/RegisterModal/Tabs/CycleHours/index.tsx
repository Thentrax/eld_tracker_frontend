import React, { useState, useCallback, useEffect } from 'react';
import { Form, Input, Select } from 'antd';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import Button from '../../../Button';
import 'leaflet/dist/leaflet.css';
import * as L from 'leaflet';
import * as S from '../../styles';
import { getAddress } from '../../../../Helpers/geoUtils';
import { Log } from '../../../../Models/Log';
import { CycleHours } from '../../../../Models/CycleHours';

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

interface ModalCycleHoursTabProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModalCycleHoursTab: React.FC<ModalCycleHoursTabProps> = ({
  isOpen,
  onClose,
}) => {
  const [form] = Form.useForm();
  const [startLocation, setStartLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [endLocation, setEndLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [activeSelect, setActiveSelect] = useState<'start' | 'end' | null>(null);
  const [logs, setLogs] = useState<Log[]>([]);

  useEffect(()=> {
    const mockLogs = [{
      id: 1,
      date: '2024-02-28',
      driver_name: 'Thiago',
      current_location: { lat: 200, lng: 200 },
      pickup_location: { lat: 200, lng: 200 },
      dropoff_location: { lat: 200, lng: 200 },
    }];
    setLogs(mockLogs);
  }, [])

  // Calcular distância entre duas coordenadas
  const calculateDistance = (start: { lat: number; lng: number }, end: { lat: number; lng: number }): number => {
    const R = 6371;
    const dLat = (end.lat - start.lat) * (Math.PI / 180);
    const dLng = (end.lng - start.lng) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(start.lat * (Math.PI / 180)) *
      Math.cos(end.lat * (Math.PI / 180)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  // Função para buscar o endereço formatado usando o utilitário
  const getFormattedAddress = useCallback(
    async (lat: number, lng: number, type: 'start' | 'end') => {
      try {
        const formattedAddress = await getAddress(lat, lng);
        if (type === 'start') {
          form.setFieldsValue({ start_location: formattedAddress });
        } else if (type === 'end') {
          form.setFieldsValue({ end_location: formattedAddress });
        }
      } catch (error) {
        console.error('Error fetching address:', error);
      }
    },
    [form]
  );

  // Custom Hook para capturar a localização com Leaflet
  const LocationMarker = () => {
    useMapEvents({
      click(e: any) {
        if (activeSelect === 'start') {
          setStartLocation(e.latlng);
          getFormattedAddress(e.latlng.lat, e.latlng.lng, 'start');
          setActiveSelect(null);
        }
        if (activeSelect === 'end') {
          setEndLocation(e.latlng);
          getFormattedAddress(e.latlng.lat, e.latlng.lng, 'end');
          setActiveSelect(null);
        }
      }
    });
    return (
      <>
        {startLocation && <Marker position={startLocation} />}
        {endLocation && <Marker position={endLocation} />}
      </>
    );
  };

  const onSubmit = async () => {
    try {
      const fields = await form.validateFields();

      const distance = startLocation && endLocation
        ? calculateDistance(startLocation, endLocation)
        : 0;

      const formattedFields: CycleHours = {
        id: Date.now(),
        log_id: 1,
        status_id: fields.status,
        annotations: fields.annotations,
        start_location: startLocation!,
        end_location: endLocation!,
        distance
      };

      console.log(formattedFields);
    } catch (error) {
      console.error('Validation Failed:', error);
    }
  };

  return (
    <Form form={form} layout="vertical">
      <Form.Item
        label="Log"
        name="log_id"
        rules={[{ required: true, message: 'Please, select a log!' }]}
      >
        <Select placeholder="Select status">
          {logs.map((log: Log) => (
          <Select.Option value={log.id}>{log.date} - {log.driver_name}</Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        label="Status"
        name="status"
        rules={[{ required: true, message: 'Please, select a status!' }]}
      >
        <Select placeholder="Select status">
          <Select.Option value={1}>Off Duty</Select.Option>
          <Select.Option value={2}>Sleeper Berth</Select.Option>
          <Select.Option value={3}>Driving</Select.Option>
          <Select.Option value={4}>On Duty Not Driving</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item label="Annotations" name="annotations">
        <Input.TextArea placeholder="Additional notes (optional)" style={{resize: 'none', height: '100px'}}/>
      </Form.Item>

      <Form.Item label="Start Location" name="start_location">
        <Input readOnly placeholder='Select start location on the map' addonAfter={<Button title="Select" onClick={() => setActiveSelect('start')} />} />
      </Form.Item>

      <Form.Item label="End Location" name="end_location">
        <Input readOnly placeholder='Select end location on the map' addonAfter={<Button title="Select" onClick={() => setActiveSelect('end')} />} />
      </Form.Item>

      <S.MapContainer>
        <S.MapActionIndicator>
          {activeSelect === 'start'
            ? 'Select your start location'
            : activeSelect === 'end'
              ? 'Select your end location'
              : ''}
        </S.MapActionIndicator>
        <MapContainer
          center={[-22.5202, -44.1046]}
          zoom={13}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <LocationMarker />
        </MapContainer>
      </S.MapContainer>

      <S.FooterRow>
        <Button title='Cancel' onClick={onClose} variant='transparent' />
        <Button title='Save' onClick={onSubmit} htmlType='submit' />
      </S.FooterRow>
    </Form>
  );
};

export default ModalCycleHoursTab;
