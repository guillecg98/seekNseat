import axios from 'axios';

export const getBusiness = async (businessId: string, token: string) => {
  try {
    return await axios.get(
      `http://localhost:3333/api/businesses/` + businessId,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  } catch (e) {
    console.log(e);
  }
};
