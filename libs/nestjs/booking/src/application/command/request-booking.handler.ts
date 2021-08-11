import {
  AggregateRepository,
  InjectAggregateRepository,
} from '@aulasoftwarelibre/nestjs-eventstore';
import { CommandHandler, ICommandHandler, QueryBus } from '@nestjs/cqrs';
import { BusinessId, GetBusinessQuery } from '@seekNseat/nestjs/business';
import { GetUserQuery, UserId } from '@seekNseat/nestjs/user';

import { Booking, BookingId, NumberOfFoodies } from '../../domain';
import { RequestBookingCommand } from './request-booking.command';

@CommandHandler(RequestBookingCommand)
export class RequestBookingHandler
  implements ICommandHandler<RequestBookingCommand>
{
  constructor(
    @InjectAggregateRepository(Booking)
    private readonly bookings: AggregateRepository<Booking, BookingId>,
    private readonly queryBus: QueryBus
  ) {}

  async execute(command: RequestBookingCommand) {
    const id = BookingId.fromString(command.id);
    const userId = UserId.fromString(command.userId);
    const businessId = BusinessId.fromString(command.businessId);
    const numberOfFoodies = NumberOfFoodies.fromNumber(command.numerOfFoodies);

    if (await this.bookings.find(id)) {
      throw new Error('Booking with this id already exists');
      //TODO - throw BusinessIdAlreadyTakenError.with(id);
    }

    const user = await this.queryBus.execute(new GetUserQuery(command.userId));

    if (Object.keys(user).length === 0) {
      throw new Error('User not found');
    }

    const business = this.queryBus.execute(
      new GetBusinessQuery(command.businessId)
    );
    if (Object.keys(business).length === 0) {
      throw new Error('Business not found');
    }

    const booking = Booking.create(id, userId, businessId, numberOfFoodies);
    this.bookings.save(booking);
  }
}
