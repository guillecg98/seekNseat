import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { BookingStateWasUpdated } from '../../../domain';
import { BookingDocument, BOOKINGS_PROJECTION } from './booking.schema';

@EventsHandler(BookingStateWasUpdated)
export class BookingStateWasUpdatedProjection
  implements IEventHandler<BookingStateWasUpdated>
{
  constructor(
    @InjectModel(BOOKINGS_PROJECTION)
    private readonly bookings: Model<BookingDocument>
  ) {}

  async handle(event: BookingStateWasUpdated) {
    this.bookings
      .findByIdAndUpdate(event.aggregateId, {
        bookingState: event.bookingState,
        noShow: event.noShow,
      })
      .exec();
  }
}
