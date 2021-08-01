import { GetBookingHandler } from './get-booking.handler';
import { GetBookingsHanlder } from './get-bookings.handler';

export * from './get-booking.query';
export * from './get-bookings.query';

export const queryHandlers = [
  GetBookingHandler,
  GetBookingsHanlder,
]