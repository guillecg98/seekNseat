import { Inject } from "@nestjs/common";
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { Model } from "mongoose";

import { BOOKING_MODEL,BookingView } from "../../infrastructure/read-model/shcema/booking.schema";
import { GetBookingsByUserQuery } from "./get-bookings-by-user.query";

@QueryHandler(GetBookingsByUserQuery)
export class GetBookingByUserHandler implements IQueryHandler<GetBookingsByUserQuery> {
    constructor(
          @Inject(BOOKING_MODEL)
          private bookinModel: Model<BookingView>
    ) {}

    async execute(query: GetBookingsByUserQuery): Promise<BookingView[]> {
        return this.bookinModel.find({userId: query.userId}).exec()
    }
}