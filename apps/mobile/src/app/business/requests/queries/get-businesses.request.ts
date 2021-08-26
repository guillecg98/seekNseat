import axios from 'axios';

export const getBusinesses = async (token: string) => {
  try {
    return await axios.get('http://localhost:3333/api/businesses', {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (err) {
    console.error(err);
  }
};
