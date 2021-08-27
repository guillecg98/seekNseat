import { Event } from '@aulasoftwarelibre/nestjs-eventstore';
import { CreateBookingDTO, EditBookingDTO } from '@seekNseat/contracts/booking';

import { BookingStateWasUpdated } from './booking-state-was-updated.event';
import { BookingWasCanceled } from './booking-was-canceled.event';
import { BookingWasDeleted } from './booking-was-deleted.event';
import { BookingWasRequested } from './booking-was-requested.event';

export * from './booking-state-was-updated.event';
export * from './booking-was-canceled.event';
export * from './booking-was-deleted.event';
export * from './booking-was-requested.event';

export const eventTransformers = {
  BookingWasRequested: (event: Event<CreateBookingDTO>) =>
    new BookingWasRequested(
      event.aggregateId,
      event.payload.userId,
      event.payload.username,
      event.payload.businessId,
      event.payload.businessName,
      event.payload.numberOfFoodies,
      event.payload.time
    ),
  BookingStateWasUpdated: (event: Event<EditBookingDTO>) =>
    new BookingStateWasUpdated(event.aggregateId, event.payload.bookingState),
  BookingWasCanceled: (event: Event<EditBookingDTO>) =>
    new BookingWasCanceled(event.aggregateId, event.payload.bookingState),
  BookingWasDeleted: (event: Event) => new BookingWasDeleted(event.aggregateId),
};
