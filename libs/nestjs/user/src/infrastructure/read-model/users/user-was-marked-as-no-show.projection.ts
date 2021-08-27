import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { UserWasMarkedAsNoShow } from '../../../domain';
import { UserDocument, USERS_PROJECTION } from './user.schema';

@EventsHandler(UserWasMarkedAsNoShow)
export class UserWasMarkedAsNoShowProjection
  implements IEventHandler<UserWasMarkedAsNoShow>
{
  constructor(
    @InjectModel(USERS_PROJECTION) private readonly users: Model<UserDocument>
  ) {}

  async handle(event: UserWasMarkedAsNoShow) {
    await this.users
      .findByIdAndUpdate(event.aggregateId, {
        noShow: event.noShow,
      })
      .exec();
  }
}
