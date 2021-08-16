import { AggregateRepository, InjectAggregateRepository } from "@aulasoftwarelibre/nestjs-eventstore";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { States } from "@seekNseat/contracts";

import { Booking,BookingId, State } from "../../domain";
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
        const bookingState = State.fromString(command.bookingState as States);

        if(!booking) {
            throw new Error('Booking not found')
        }

        if(booking.bookingState.value !== States.Accepted) {
            throw new Error('Cannot cancel a booking which was not accepted previously')
        }

        booking.cancel(bookingState);
        this.bookings.save(booking);
    }
}