import { StorableEvent } from "event-sourcing-nestjs";

export class BookingWasRequested extends StorableEvent {
    eventAggregate = 'booking';
    eventVersion = 1;

    constructor(
        public readonly id: string,
        public readonly userId: string,
        public readonly businessId: string,
        public readonly numberOfFoodies: number,
    ) {
        super();
    }
}