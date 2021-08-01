import { Inject } from "@nestjs/common";
import { IQueryHandler, QueryBus, QueryHandler } from "@nestjs/cqrs";
import { BookingDTO } from "@seekNseat/contracts/booking";
import { BusinessId, GetBusinessQuery } from "@seekNseat/nestjs/business";
import { GetUserQuery, UserId } from "@seekNseat/nestjs/user";

import { BOOKING_FINDER, IBookingFinder } from "../services";
import { GetBookingsQuery } from "./get-bookings.query";

@QueryHandler(GetBookingsQuery)
export class GetBookingsHanlder implements IQueryHandler<GetBookingsQuery> {
    constructor(
        @Inject(BOOKING_FINDER)
        private readonly finder: IBookingFinder,
        private readonly queryBus: QueryBus,
    ) {}

    async execute(query: GetBookingsQuery): Promise<BookingDTO[]> {

        if(query.userId) {
            if(await this.queryBus.execute(
                new GetUserQuery(query.userId)
            )){
                return this.finder.findAllByUser(UserId.fromString(query.userId))
            } else {
                throw new Error('User does not exists')
            }
        }

        if(query.businessId) {
            if(await this.queryBus.execute(
                new GetBusinessQuery(query.businessId)
            )){
                return this.finder.findAllByBusiness(BusinessId.fromString(query.businessId))
            } else {
                throw new Error('Business does not exists')
            }
        }

        return this.finder.findAll()
    }
}