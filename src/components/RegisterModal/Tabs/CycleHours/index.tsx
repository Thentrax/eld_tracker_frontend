import React, { useState, useCallback, useEffect } from 'react';
import { Form, Input, Select, TimePicker } from 'antd';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import Button from '../../../Button';
import 'leaflet/dist/leaflet.css';
import * as L from 'leaflet';
import * as S from '../../styles';
import { getAddress } from '../../../../Helpers/geoUtils';
import { Log } from '../../../../Models/Log';
import { get, post } from '../../../../services/api';
import { useNavigate } from 'react-router-dom';

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
  const [occupiedRanges, setOccupiedRanges] = useState<{ start: string; end: string }[]>([]);
  const navigate = useNavigate();

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

  const handleLogChange = (logId: number) => {
    form.setFieldsValue({ log: logId });
  
    const selectedLog = logs.find(log => log.id === logId);
    if (selectedLog && selectedLog.cycle_hours) {
      setOccupiedRanges(
        selectedLog.cycle_hours.map(ch => ({
          start: ch.start_hour,
          end: ch.end_hour
        }))
      );
    }
  };

  const validateTimeRange = (_: any, value: any) => {
    if (!value || value.length !== 2) return Promise.resolve();
  
    const selectedStart = value[0].format('HH:mm');
    const selectedEnd = value[1].format('HH:mm');
  
    const conflict = occupiedRanges.find(({ start, end }) => 
      (selectedStart >= start && selectedStart < end) || 
      (selectedEnd > start && selectedEnd <= end) || 
      (selectedStart <= start && selectedEnd >= end) 
    );
  
    if (conflict) {
      return Promise.reject(new Error(`Invalid period: there is a register between ${conflict.start} - ${conflict.end} in this log.`));
    }
  
    return Promise.resolve();
  }; 

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

      const formattedFields = {
        log: 1,
        status_id: fields.status,
        start_hour: fields.time_range[0].format('HH:mm'),
        end_hour: fields.time_range[1].format('HH:mm'),
        annotations: fields.annotations,
        start_location: startLocation!,
        end_location: endLocation!,
        distance
      };
      await post('cycle_hours/', formattedFields);
      navigate('/logs')
      onClose();
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
        <Select placeholder="Select status" onChange={handleLogChange}>
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

      <Form.Item
        label="Time Range" name="time_range"
        rules={[
          { required: true, message: 'Please select an available time range!' },
          { validator: validateTimeRange }
        ]}
      > 
        <TimePicker.RangePicker format="HH:mm" style={{ width: '100%' }} />
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
