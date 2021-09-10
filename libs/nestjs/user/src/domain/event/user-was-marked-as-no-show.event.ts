import { Event } from '@aulasoftwarelibre/nestjs-eventstore';
import { NoShowUserDto } from '@seekNseat/contracts/user';

export class UserWasMarkedAsNoShow extends Event<NoShowUserDto> {
  constructor(
    public readonly id: string,
    public readonly noShow: boolean
  ) {
    super(id, { noShow });
  }
}