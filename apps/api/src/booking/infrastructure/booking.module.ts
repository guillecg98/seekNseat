import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { EventSourcingModule } from "event-sourcing-nestjs";

import { AuthModule } from "../../auth/auth.module";
import { DatabaseModule } from "../../database/database.module";
import { CancelBookingHandler, GetBookingsHanlder, RequestBookingHandler, UpdateBookingStateHandler } from "../application";
import { BookingProviders } from "./booking.provider";
import { BookingController } from "./controller/booking.controller";
import { BookingStateWasUpdatedProjection } from "./read-model/projection/booking-state-was-updated.projection";
import { BookingWasCanceledProjection } from "./read-model/projection/booking-was-canceled.projection";
import { BookingWasRequestedProjection } from "./read-model/projection/booking-was-requested.projection";
import { BookingMapper } from "./repository";

const CommandHandlers = [
    RequestBookingHandler,
    UpdateBookingStateHandler,
    CancelBookingHandler,
];

const QueryHandlers = [
    GetBookingsHanlder,
];

const ProjectionHandlers = [
    BookingWasRequestedProjection,
    BookingStateWasUpdatedProjection,
    BookingWasCanceledProjection,
];

@Module({
    controllers: [BookingController],
    imports: [AuthModule, CqrsModule, EventSourcingModule.forFeature(), DatabaseModule],
    providers: [
        ...CommandHandlers,
        ...QueryHandlers,
        ...ProjectionHandlers,
        ...BookingProviders,
        BookingMapper,
    ]
})

export class BookingModule {}