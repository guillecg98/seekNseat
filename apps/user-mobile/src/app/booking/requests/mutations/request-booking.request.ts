import { CreateBookingDTO } from '@seekNseat/contracts/booking';
import axios from 'axios';

export const requestBooking = async (booking: CreateBookingDTO) => {
  try {
    return await axios.post('http://localhost:3333/api/bookings', {
      _id: booking._id,
      userId: booking.userId,
      username: '',
      businessId: booking.businessId,
      businessName: '',
      numberOfFoodies: booking.numberOfFoodies,
      time: booking.time,
    });
  } catch (e) {
    console.error(e);
  }
};
