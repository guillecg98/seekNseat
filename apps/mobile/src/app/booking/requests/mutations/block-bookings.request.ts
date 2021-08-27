import axios from 'axios';

export const blockBookings = async (
  businessId: string,
  block: boolean,
  token: string
) => {
  try {
    return await axios.put(
      `http://localhost:3333/api/businesses/block/` + businessId,
      {
        blocked: block,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  } catch (err) {
    console.error(err);
  }
};
