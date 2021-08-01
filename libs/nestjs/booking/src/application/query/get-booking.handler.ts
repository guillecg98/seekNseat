import { IdNotFoundError } from "@aulasoftwarelibre/nestjs-eventstore";
import { Inject } from "@nestjs/common";
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { BookingDTO } from "@seekNseat/contracts/booking";

import { BookingId } from "../../domain";
import { BOOKING_FINDER, IBookingFinder } from "../services";
import { GetBookingQuery } from "./get-booking.query";

@QueryHandler(GetBookingQuery)
export class GetBookingHandler implements IQueryHandler<GetBookingQuery> {
  constructor(
    @Inject(BOOKING_FINDER)
    private readonly finder: IBookingFinder
  ) {}

  async execute(query: GetBookingQuery): Promise<BookingDTO | null> {
    const id = BookingId.fromString(query.id);

    const booking = await this.finder.find(id);

    if(!booking) {
      throw IdNotFoundError.withId(id);
    }

    return booking;
  }
}