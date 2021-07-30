import { Event } from '@aulasoftwarelibre/nestjs-eventstore';

export class BookingWasCanceled extends Event {
  constructor(public readonly id: string) {
    super(id);
  }
}
