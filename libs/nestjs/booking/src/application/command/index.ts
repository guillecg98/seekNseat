import { CancelBookingHandler } from './cancel-booking.handler';
import { RequestBookingHandler } from './request-booking.handler';
import { UpdateBookingStateHandler } from './update-booking-state.handler';

export * from './cancel-booking.command';
export * from './request-booking.command';
export * from './update-booking-state.command';

export const commandHandlers = [
  CancelBookingHandler,
  RequestBookingHandler,
  UpdateBookingStateHandler,
]