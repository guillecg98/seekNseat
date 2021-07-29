import { StorableEvent } from "event-sourcing-nestjs";

export class BookingStateWasUpdated extends StorableEvent {
    eventAggregate = 'booking';
    eventVersion = 1;

    constructor(
        public readonly id: string,
        public readonly bookingState: string,
        public readonly noShow: boolean
    ) {
        super();
    }
}