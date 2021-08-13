import { Event } from '@aulasoftwarelibre/nestjs-eventstore';

export class BookingWasDeleted extends Event {
  constructor(public readonly id: string) {
    super(id);
  }
}
