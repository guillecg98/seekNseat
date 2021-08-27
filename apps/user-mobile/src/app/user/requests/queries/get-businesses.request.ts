import axios from 'axios';

export const getBusinesses = async (category: string, token: string) => {
  try {
    const url = category
      ? `http://localhost:3333/api/businesses?category=` + category
      : 'http://localhost:3333/api/businesses';
    // return await axios.get(`${process.env.RN_REMOTE_URL}/api/businesses`);
    return await axios.get(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (e) {
    console.error(e);
  }
};
