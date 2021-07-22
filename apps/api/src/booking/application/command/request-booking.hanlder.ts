import { Inject } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";

import { BusinessId } from "../../../business/domain";
import { UserId } from "../../../user/domain";
import { Booking, BookingId, BookingNumberOfFoodies, BOOKINGS,Bookings } from "../../domain";
import { RequestBookingCommand } from "./request-booking.command";

@CommandHandler(RequestBookingCommand)
export class RequestBookingHandler implements ICommandHandler <RequestBookingCommand> {
    constructor(
        @Inject(BOOKINGS) private bookings: Bookings
    ) {}

    async execute(command: RequestBookingCommand) {
        const id = BookingId.fromString(command.id);
        const userId = UserId.fromString(command.userId);
        const businessId = BusinessId.fromString(command.businessId);
        const numberOfFoodies = BookingNumberOfFoodies.fromString(command.numerOfFoodies);

        if(await this.bookings.find(id)) {
            throw new Error('Booking with this id already exists');
            //TODO - throw BusinessIdAlreadyTakenError.with(id);
        }

        const booking = Booking.create(
            id,
            userId,
            businessId,
            numberOfFoodies,
        );

        this.bookings.save(booking);
    }
}