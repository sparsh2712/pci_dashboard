import axios from 'axios';

export const fetchJourneys = async () => {
  const response = await axios.get('https://pcibackend.xyz/get_data_dump');
  return response.data;
};
