import { Event } from '@aulasoftwarelibre/nestjs-eventstore';
import { CreateBookingDTO } from '@seekNseat/contracts/booking';

export class BookingWasRequested extends Event<CreateBookingDTO> {
  constructor(
    public readonly id: string,
    public readonly userId: string,
    public readonly username: string,
    public readonly businessId: string,
    public readonly businessName: string,
    public readonly numberOfFoodies: number,
    public readonly time: Date
  ) {
    super(id, {
      _id: id,
      userId,
      username,
      businessId,
      businessName,
      numberOfFoodies,
      time,
    });
  }
}
