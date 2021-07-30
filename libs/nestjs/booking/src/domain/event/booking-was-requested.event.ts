import { Event } from '@aulasoftwarelibre/nestjs-eventstore';
import { CreateBookingDTO } from '@seekNseat/contracts/booking';

export class BookingWasRequested extends Event<CreateBookingDTO> {

  constructor(
    public readonly id: string,
    public readonly userId: string,
    public readonly businessId: string,
    public readonly numberOfFoodies: number
  ) {
    super(id, { _id: id, userId, businessId, numberOfFoodies });
  }
}
