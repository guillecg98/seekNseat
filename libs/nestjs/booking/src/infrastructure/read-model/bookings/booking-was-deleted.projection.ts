import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { BookingWasDeleted } from '../../../domain';
import { BookingDocument, BOOKINGS_PROJECTION } from './booking.schema';

@EventsHandler(BookingWasDeleted)
export class BookingWasDeletedProjection
  implements IEventHandler<BookingWasDeleted>
{
  constructor(
    @InjectModel(BOOKINGS_PROJECTION)
    private readonly bookings: Model<BookingDocument>
  ) {}

  async handle(event: BookingWasDeleted) {
    await this.bookings.findByIdAndDelete(event.aggregateId).exec();
  }
}
