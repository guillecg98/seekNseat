import axios from 'axios';

export const declineBooking = async (
  id: string,
  state: string,
  noShow: boolean
) => {
  try {
    return await axios.put(`http://localhost:3333/api/bookings/` + id, {
      bookingState: state,
      noShow: noShow,
    });
  } catch (e) {
    console.log(e);
  }
};
