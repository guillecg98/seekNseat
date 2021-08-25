import { Event } from '@aulasoftwarelibre/nestjs-eventstore';
import { EditUserDto } from '@seekNseat/contracts/user';

export type UserPasswordWasUpdatedProps = Pick<EditUserDto, 'password'>;

export class UserPasswordWasUpdated extends Event<UserPasswordWasUpdatedProps> {
  constructor(public readonly id: string, public readonly password: string) {
    super(id, { password });
  }
}
