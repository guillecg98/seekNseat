import axios from 'axios';

export const deleteBooking = async (id: string) => {
  try {
    await axios.delete(`http://localhost:3333/api/bookings/` + id);
  } catch (e) {
    console.error(e);
  }
};
