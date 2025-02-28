import axios from 'axios';

export const getAddress = async (lat: number, lng: number): Promise<string | null> => {
  try {
    const response = await axios.get(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
    );
    
    const address = response.data.address;
    const formattedAddress: string = `${address.city || address.town || address.village || ''}, ${address.state || ''}, ${address.country || ''}`
    ;

    return formattedAddress;
  } catch (error) {
    console.error('Error fetching address:', error);
    return null;
  }
};
