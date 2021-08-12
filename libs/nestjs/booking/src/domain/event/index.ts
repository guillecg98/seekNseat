import { Event } from '@aulasoftwarelibre/nestjs-eventstore';
import { CreateBookingDTO, EditBookingDTO } from '@seekNseat/contracts/booking';

import { BookingStateWasUpdated } from './booking-state-was-updated.event';
import { BookingWasCanceled } from './booking-was-canceled.event';
import { BookingWasRequested } from './booking-was-requested.event';

export * from './booking-state-was-updated.event';
export * from './booking-was-canceled.event';
export * from './booking-was-requested.event';

export const eventTransformers = {
  BookingStateWasUpdated: (event: Event<EditBookingDTO>) =>
    new BookingStateWasUpdated(
      event.aggregateId,
      event.payload.bookingState,
      event.payload.noShow
    ),
  BookingWasCanceled: (event: Event) =>
    new BookingWasCanceled(event.aggregateId),
  BookingWasRequested: (event: Event<CreateBookingDTO>) =>
    new BookingWasRequested(
      event.aggregateId,
      event.payload.userId,
      event.payload.username,
      event.payload.businessId,
      event.payload.businessName,
      event.payload.numberOfFoodies
    ),
};
