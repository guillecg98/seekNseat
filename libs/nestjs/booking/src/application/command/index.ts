import { CancelBookingHandler } from './cancel-booking.handler';
import { DeleteBookingHandler } from './delete-booking.handler';
import { RequestBookingHandler } from './request-booking.handler';
import { UpdateBookingStateHandler } from './update-booking-state.handler';

export * from './cancel-booking.command';
export * from './delete-booking.command';
export * from './request-booking.command';
export * from './update-booking-state.command';

export const commandHandlers = [
  RequestBookingHandler,
  UpdateBookingStateHandler,
  CancelBookingHandler,
  DeleteBookingHandler,
]