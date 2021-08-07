import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { BookingWasRequested } from '../../../domain';
import { BookingDocument, BOOKINGS_PROJECTION } from './booking.schema';

@EventsHandler(BookingWasRequested)
export class BookingWasRequestedProjection
  implements IEventHandler<BookingWasRequested>
{
  constructor(
    @InjectModel(BOOKINGS_PROJECTION)
    private readonly bookings: Model<BookingDocument>
  ) {}

  async handle(event: BookingWasRequested) {
    const booking = new this.bookings({
      ...event.payload,
      bookingState: 'PENDING',
      noShow: false,
    });

    await booking.save();
  }
}
