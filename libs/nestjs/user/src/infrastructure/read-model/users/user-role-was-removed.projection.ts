import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { UserRoleWasRemoved } from '../../../domain';
import { UserDocument, USERS_PROJECTION } from './user.schema';

@EventsHandler(UserRoleWasRemoved)
export class UserRoleWasRemovedProjection
  implements IEventHandler<UserRoleWasRemoved>
{
  constructor(
    @InjectModel(USERS_PROJECTION)
    private readonly users: Model<UserDocument>
  ) {}

  async handle(event: UserRoleWasRemoved) {
    await this.users
      .findByIdAndUpdate(event.aggregateId, {
        $pull: { roles: event.role },
      })
      .exec();
  }
}
