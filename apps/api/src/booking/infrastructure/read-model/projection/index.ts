import { BookingStateWasUpdatedProjection } from "./booking-state-was-updated.projection";
import { BookingWasCanceledProjection } from "./booking-was-canceled.projection";
import { BookingWasRequestedProjection } from "./booking-was-requested.projection";

export const ProjectionHandlers = [
    BookingWasRequestedProjection,
    BookingStateWasUpdatedProjection,
    BookingWasCanceledProjection,
];