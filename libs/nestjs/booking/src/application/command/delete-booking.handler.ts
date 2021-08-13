import { AggregateRepository, InjectAggregateRepository } from "@aulasoftwarelibre/nestjs-eventstore";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";

import { Booking, BookingId } from "../../domain";
import { DeleteBookingCommand } from "./delete-booking.command";

@CommandHandler(DeleteBookingCommand)
export class DeleteBookingHandler implements ICommandHandler<DeleteBookingCommand> {
  constructor(
    @InjectAggregateRepository(Booking)
    private bookings: AggregateRepository<Booking, BookingId>
  ) {}

  async execute(command: DeleteBookingCommand) {
    const id = BookingId.fromString(command.id)
    const booking = await this.bookings.find(id);

    if(!booking) {
      throw new Error('Booking not found')
    }

    booking.delete();
    this.bookings.save(booking);
  }
}