import axios from 'axios';

export const acceptBooking = async (
  id: string,
  state: string,
  token: string
) => {
  try {
    return await axios.put(
      `http://localhost:3333/api/bookings/` + id,
      {
        bookingState: state,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  } catch (e) {
    console.log(e);
  }
};
