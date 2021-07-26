import { Inject } from "@nestjs/common";
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { Model } from "mongoose";

import { BOOKING_MODEL,BookingView } from "../../infrastructure/read-model/shcema/booking.schema";
import { GetBookingsByBusinessQuery } from "./get-bookings-by-business.query";

@QueryHandler(GetBookingsByBusinessQuery)
export class GetBookingsByBusinessHandler implements IQueryHandler<GetBookingsByBusinessQuery> {
    constructor(
        @Inject(BOOKING_MODEL)
        private bookingModel: Model<BookingView>
    ) {}

    async execute(query: GetBookingsByBusinessQuery): Promise<BookingView[]> {
        return this.bookingModel.find({businessId: query.businessId}).exec()
    }
}