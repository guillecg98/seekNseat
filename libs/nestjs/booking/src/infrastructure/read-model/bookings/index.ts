import { BookingStateWasUpdatedProjection } from "./booking-state-was-updated.projection";
import { BookingWasCanceledProjection } from "./booking-was-canceled.projection";
import { BookingWasDeletedProjection } from "./booking-was-deleted.projection";
import { BookingWasRequestedProjection } from "./booking-was-requested.projection";

export * from './booking.schema';

export const bookingProjections = [
    BookingWasRequestedProjection,
    BookingStateWasUpdatedProjection,
    BookingWasCanceledProjection,
    BookingWasDeletedProjection,
];