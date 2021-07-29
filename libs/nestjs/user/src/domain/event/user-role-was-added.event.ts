import { Event } from '@aulasoftwarelibre/nestjs-eventstore';

export type UserRoleWasAddedProps = { role: string };

export class UserRoleWasAdded extends Event<UserRoleWasAddedProps> {
  constructor(public readonly id: string, public readonly role: string) {
    super(id, { role });
  }
}
