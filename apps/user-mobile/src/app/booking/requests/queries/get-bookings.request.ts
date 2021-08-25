import axios from 'axios';

export const getBookings = async (userId: string, token: string) => {
  try {
    return await axios.get(
      `http://localhost:3333/api/bookings?userId=` + userId,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  } catch (e) {
    console.log(e);
  }
};
