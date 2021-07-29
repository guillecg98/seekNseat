import { Inject } from "@nestjs/common";
import { IQueryHandler, QueryBus, QueryHandler } from "@nestjs/cqrs";
import { Model } from "mongoose";

import { GetBusinessQuery } from "../../../business/application";
import { GetUserQuery } from "../../../user/application";
import { BOOKING_MODEL,BookingView } from "../../infrastructure/read-model/schema/booking.schema";
import { GetBookingsQuery } from "./get-bookings.query";

@QueryHandler(GetBookingsQuery)
export class GetBookingsHanlder implements IQueryHandler<GetBookingsQuery> {
    constructor(
        @Inject(BOOKING_MODEL)
        private bookingsModel: Model<BookingView>,
        private queryBus: QueryBus,
    ) {}

    async execute(query: GetBookingsQuery): Promise<BookingView[]> {

        if(query.userId) {
            if(await this.queryBus.execute(
                new GetUserQuery(query.userId)
            )){
                return this.bookingsModel.find({userId: query.userId}).exec()
            } else {
                throw new Error('User does not exists')
            }
        }

        if(query.businessId) {
            if(await this.queryBus.execute(
                new GetBusinessQuery(query.businessId)
            )){
                return this.bookingsModel.find({businessId: query.businessId}).exec()
            } else {
                throw new Error('Business does not exists')
            }
        }

        return this.bookingsModel.find().exec()
    }
}