import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { BookingDTO } from '@seekNseat/contracts/booking';
import { BusinessId } from '@seekNseat/nestjs/business';
import {  UserId } from '@seekNseat/nestjs/user';

import { BOOKING_FINDER, IBookingFinder } from '../services';
import { GetBookingsQuery } from './get-bookings.query';

@QueryHandler(GetBookingsQuery)
export class GetBookingsHanlder implements IQueryHandler<GetBookingsQuery> {
  constructor(
    @Inject(BOOKING_FINDER)
    private readonly finder: IBookingFinder
  ) {}

  async execute(query: GetBookingsQuery): Promise<BookingDTO[]> {
    if (query.userId) {
      return this.finder.findAllByUser(UserId.fromString(query.userId));
    }

    if (query.businessId) {
      return this.finder.findAllByBusiness(
        BusinessId.fromString(query.businessId)
      );
    }

    return this.finder.findAll();
  }
}
