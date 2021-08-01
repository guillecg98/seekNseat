import { EventStoreModule } from '@aulasoftwarelibre/nestjs-eventstore';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';

import { commandHandlers, queryHandlers } from '../application';
import { Booking, eventTransformers } from '../domain';
import { bookingProviders } from './booking.providers';
import { BookingController } from './controller';
import {
  bookingProjections,
  BOOKINGS_PROJECTION,
  BookingSchema,
} from './read-model';
import { BookingService } from './services';

@Module({
  controllers: [BookingController],
  imports: [
    CqrsModule,
    EventStoreModule.forFeature([Booking], eventTransformers),
    MongooseModule.forFeature([
      {
        name: BOOKINGS_PROJECTION,
        schema: BookingSchema,
      },
    ]),
  ],
  providers: [
    ...bookingProviders,
    ...commandHandlers,
    ...bookingProjections,
    ...queryHandlers,
    BookingService,
  ],
})
export class BookingModule {}
