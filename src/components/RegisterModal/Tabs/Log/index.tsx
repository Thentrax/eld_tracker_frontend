import React, { useState, useCallback } from 'react';
import { Form, Input, DatePicker } from 'antd';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import Button from '../../../Button';
import 'leaflet/dist/leaflet.css';
import * as L from 'leaflet';
import * as S from '../../styles';
import { getAddress } from '../../../../Helpers/geoUtils';
import { post } from '../../../../services/api';
import { useNavigate } from 'react-router-dom';

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

interface ModalLogTabProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModalLogTab: React.FC<ModalLogTabProps> = ({
  isOpen,
  onClose,
}) => {
  const [form] = Form.useForm();
  const [currentLocation, setCurrentLocation] = useState<{ lat: number; lng: number } | undefined>(undefined);
  const [pickupLocation, setPickupLocation] = useState<{ lat: number; lng: number } | undefined>(undefined);
  const [dropoffLocation, setDropoffLocation] = useState<{ lat: number; lng: number } | undefined>(undefined);
  const [activeSelect, setActiveSelect] = useState<'current' | 'pickup' | 'dropoff' | null>(null);
  const navigate = useNavigate();

  const getFormattedAddress = useCallback(
    async (lat: number, lng: number, type: 'current' | 'pickup' | 'dropoff') => {
      try {
        const formattedAddress = await getAddress(lat, lng);
        
        if (type === 'current') {
          form.setFieldsValue({ current_location: formattedAddress });
        } else if (type === 'pickup') {
          form.setFieldsValue({ pickup_location: formattedAddress });
        } else if (type === 'dropoff') {
          form.setFieldsValue({ dropoff_location: formattedAddress });
        }
      } catch (error) {
        console.error('Error fetching address:', error);
      }
    }, [form]);

  const LocationMarker = () => {
    useMapEvents({
      click(e: any) {
        if (activeSelect === 'current') {
          setCurrentLocation(e.latlng);
          getFormattedAddress(e.latlng.lat, e.latlng.lng, 'current');
          setActiveSelect(null);
        }
        if (activeSelect === 'pickup') {
          setPickupLocation(e.latlng);
          getFormattedAddress(e.latlng.lat, e.latlng.lng, 'pickup');
          setActiveSelect(null);
        }
        if (activeSelect === 'dropoff') {
          setDropoffLocation(e.latlng);
          getFormattedAddress(e.latlng.lat, e.latlng.lng, 'dropoff');
          setActiveSelect(null);
        }
      }
    });
    return (
      <>
        {currentLocation && <Marker position={currentLocation} />}
        {pickupLocation && <Marker position={pickupLocation} />}
        {dropoffLocation && <Marker position={dropoffLocation} />}
      </>
    );
  };

  const onSubmit = async () => {
    try {
      const fields = await form.validateFields();
    
      const formattedFields = {
        date: fields.date.format('YYYY-MM-DD'),
        driver_name: fields.driver_name,
        truck_number: fields.truck_number,
        current_location: currentLocation,
        current_location_address: fields.current_location,
        pickup_location: pickupLocation,
        pickup_location_address: fields.pickup_location,
        dropoff_location: dropoffLocation,
        dropoff_location_address: fields.dropoff_location,
      }
      await post('logs/', formattedFields)
      navigate('/logs')
      onClose();
      console.log(formattedFields);
    } catch (error) {
      console.error('Validation Failed:', error);
    }
  };

  return (
    <>
      <Form form={form} layout="vertical">
        <Form.Item
          label="Date"
          name="date"
          rules={[{ required: true, message: 'Please, select a date!' }]}
        >
          <DatePicker style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item
          label="Driver's name"
          name="driver_name"
          rules={[{ required: true, message: 'Please, insert the drivers name!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Truck's number"
          name="truck_number"
          rules={[{ required: true, message: 'Please, insert the truck number!' }]}
        >
          <Input type='number'/>
        </Form.Item>

        <Form.Item label="Current Location" name="current_location">
          <Input readOnly placeholder='Select the locatinon in the map' addonAfter={<Button title="Select" onClick={() => setActiveSelect('current')} />} />
        </Form.Item>

        <Form.Item label="Pickup Location" name="pickup_location">
          <Input readOnly placeholder='Select the locatinon in the map' addonAfter={<Button title="Select" onClick={() => setActiveSelect('pickup')} />} />
        </Form.Item>

        <Form.Item label="Dropoff Location" name="dropoff_location">
          <Input readOnly placeholder='Select the locatinon in the map' addonAfter={<Button title="Select" onClick={() => setActiveSelect('dropoff')} />} />
        </Form.Item>

        <S.MapContainer>
          <S.MapActionIndicator>
            {activeSelect === 'current' ? 'Select your current location' : activeSelect === 'pickup' ? 'Select your pickup location' : activeSelect === 'dropoff' ? 'Select your current location' : ''}
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
    </>
  );
};

export default ModalLogTab;
