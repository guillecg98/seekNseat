import { Inject } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";

import { BookingId, BOOKINGS, Bookings, BookingState } from "../../domain";
import { UpdateBookingStateCommand } from "./update-booking-state.command";

@CommandHandler(UpdateBookingStateCommand)
export class UpdateBookingStateHandler implements ICommandHandler<UpdateBookingStateCommand> {
    constructor(
        @Inject(BOOKINGS) private bookings: Bookings,
    ) {}

    async execute(command: UpdateBookingStateCommand) {
        const id = BookingId.fromString(command.id);
        const booking = await this.bookings.find(id);

        if(!booking) {
            throw new Error('Booking not found')
            //TODO
            //BookingNotFound.with(id) Error
        }

        const bookingState = BookingState.fromString(command.bookingState);
        const noShow = command.noShow;

        booking.updateBookingState(bookingState, noShow)
        this.bookings.save(booking);
    }


}