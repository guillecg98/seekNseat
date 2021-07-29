import { Injectable } from "@nestjs/common";
import { EventStore, StoreEventPublisher } from "event-sourcing-nestjs";

import { Booking, BookingId, Bookings } from "../../domain";

@Injectable()
export class BookingRepository implements Bookings {
    constructor(
        private publisher: StoreEventPublisher,
        private eventStore: EventStore,
    ) {}

    save(booking: Booking): void {
        booking = this.publisher.mergeObjectContext(booking);
        booking.commit()
    }

    async find(bookingId: BookingId): Promise<Booking | null> {
        const events = await this.eventStore.getEvents('booking', bookingId.value);
        if(events.length === 0) {
            return null;
        }

        const booking = Reflect.construct(Booking, []);
        booking.loadFromHistory(events);

        return booking;
    }
}