import {
  AggregateRepository,
  InjectAggregateRepository,
} from '@aulasoftwarelibre/nestjs-eventstore';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { States } from '@seekNseat/contracts/booking';

import { Booking, BookingId, State } from '../../domain';
import { UpdateBookingStateCommand } from './update-booking-state.command';

@CommandHandler(UpdateBookingStateCommand)
export class UpdateBookingStateHandler
  implements ICommandHandler<UpdateBookingStateCommand>
{
  constructor(
    @InjectAggregateRepository(Booking)
    private readonly bookings: AggregateRepository<Booking, BookingId>
  ) {}

  async execute(command: UpdateBookingStateCommand) {
    const id = BookingId.fromString(command.id);
    const booking = await this.bookings.find(id);

    if (!booking) {
      throw new Error('Booking not found');
      //TODO
      //BookingNotFound.with(id) Error
    }

    const bookingState = State.fromString(command.bookingState as States);
    const noShow = command.noShow;

    booking.updateBookingState(bookingState, noShow);
    this.bookings.save(booking);
  }
}
