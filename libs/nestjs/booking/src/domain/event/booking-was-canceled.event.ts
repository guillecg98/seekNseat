import { Event } from '@aulasoftwarelibre/nestjs-eventstore';
import { EditBookingDTO } from '@seekNseat/contracts/booking';

export class BookingWasCanceled extends Event<EditBookingDTO> {
  constructor(
    public readonly id: string,
    public readonly bookingState: string
  ) {
    super(id, {bookingState});
  }
}
