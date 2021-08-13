import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { BookingWasCanceled } from '../../../domain';
import { BookingDocument, BOOKINGS_PROJECTION } from './booking.schema';

@EventsHandler(BookingWasCanceled)
export class BookingWasCanceledProjection
  implements IEventHandler<BookingWasCanceled>
{
  constructor(
    @InjectModel(BOOKINGS_PROJECTION)
    private readonly bookings: Model<BookingDocument>
  ) {}

  async handle(event: BookingWasCanceled) {
    await this.bookings
      .findByIdAndUpdate(event.aggregateId, {
        bookingState: event.bookingState,
      })
      .exec();
  }
}
