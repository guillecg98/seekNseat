import { Inject } from "@nestjs/common";
import { CommandHandler, ICommandHandler, QueryBus } from "@nestjs/cqrs";

import { GetBusinessQuery } from "../../../business/application";
import { BusinessId } from "../../../business/domain";
import { GetUserQuery, UserId } from "@seekNseat/nestjs/user";
import { Booking, BookingId, BookingNumberOfFoodies, BOOKINGS, Bookings } from "../../domain";
import { RequestBookingCommand } from "./request-booking.command";

@CommandHandler(RequestBookingCommand)
export class RequestBookingHandler implements ICommandHandler <RequestBookingCommand> {
    constructor(
        @Inject(BOOKINGS) private bookings: Bookings,
        private queryBus: QueryBus,
    ) {}

    async execute(command: RequestBookingCommand) {
        const id = BookingId.fromString(command.id);
        const userId = UserId.fromString(command.userId);
        const businessId = BusinessId.fromString(command.businessId);
        const numberOfFoodies = BookingNumberOfFoodies.fromNumber(command.numerOfFoodies);

        if(await this.bookings.find(id)) {
            throw new Error('Booking with this id already exists');
            //TODO - throw BusinessIdAlreadyTakenError.with(id);
        }

        if(!await this.queryBus.execute(
            new GetUserQuery(userId.value)
        )){
            throw new Error('User does not exists')
        }

        if(!await this.queryBus.execute(
            new GetBusinessQuery(businessId.value)
        )){
            throw new Error('Business does not exists')
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