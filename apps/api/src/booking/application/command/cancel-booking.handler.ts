import { Inject } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";

import { BookingId, BOOKINGS, Bookings } from "../../domain";
import { CancelBookingCommand } from "./cancel-booking.command";

@CommandHandler(CancelBookingCommand)
export class CancelBookingHandler implements ICommandHandler<CancelBookingCommand> {
    constructor(
        @Inject(BOOKINGS)
        private bookings: Bookings
    ) {}

    async execute(command: CancelBookingCommand) {
        const id = BookingId.fromString(command.id);
        const booking = await this.bookings.find(id);

        if(!booking) {
            throw new Error('Booking not found')
        }

        booking.delete();
        this.bookings.save(booking);
    }
}