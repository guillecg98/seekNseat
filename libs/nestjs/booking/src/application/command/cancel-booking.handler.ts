import { AggregateRepository, InjectAggregateRepository } from "@aulasoftwarelibre/nestjs-eventstore";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";

import { Booking,BookingId } from "../../domain";
import { CancelBookingCommand } from "./cancel-booking.command";

@CommandHandler(CancelBookingCommand)
export class CancelBookingHandler implements ICommandHandler<CancelBookingCommand> {
    constructor(
        @InjectAggregateRepository(Booking)
        private readonly bookings: AggregateRepository<Booking, BookingId>,
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