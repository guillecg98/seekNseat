import axios from 'axios';

export const deleteBooking = async (id: string, token: string) => {
  try {
    await axios.delete(`http://localhost:3333/api/bookings/` + id, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (e) {
    console.error(e);
  }
};
