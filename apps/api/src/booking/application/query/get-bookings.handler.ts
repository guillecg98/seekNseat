import { Inject } from "@nestjs/common";
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { Model } from "mongoose";

import { BOOKING_MODEL,BookingView } from "../../infrastructure/read-model/shcema/booking.schema";
import { GetBookingsQuery } from "./get-bookings.query";

@QueryHandler(GetBookingsQuery)
export class GetBookingsHanlder implements IQueryHandler<GetBookingsQuery> {
    constructor(
        @Inject(BOOKING_MODEL)
        private bookingsModel: Model<BookingView>
    ) {}

    async execute(query: GetBookingsQuery): Promise<BookingView[]> {
        return this.bookingsModel.find().exec()
    }
}