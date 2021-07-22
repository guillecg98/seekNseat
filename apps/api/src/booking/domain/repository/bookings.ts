import { Booking, BookingId } from "../model";

export interface Bookings {
    save(booking: Booking): void;
    find(bookingId: BookingId): Promise<Booking | null>;
}

export const BOOKINGS = 'BOOKINGS'