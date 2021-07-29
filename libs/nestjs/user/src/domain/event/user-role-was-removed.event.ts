import { Event } from '@aulasoftwarelibre/nestjs-eventstore';

export type UserRoleWasRemovedProps = { role: string };

export class UserRoleWasRemoved extends Event<UserRoleWasRemovedProps> {
  constructor(public readonly id: string, public readonly role: string) {
    super(id, { role });
  }
}
