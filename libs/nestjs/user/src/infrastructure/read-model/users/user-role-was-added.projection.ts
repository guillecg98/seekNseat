import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { UserRoleWasAdded } from '../../../domain';
import { UserDocument, USERS_PROJECTION } from './user.schema';

@EventsHandler(UserRoleWasAdded)
export class UserRoleWasAddedProjection
  implements IEventHandler<UserRoleWasAdded>
{
  constructor(
    @InjectModel(USERS_PROJECTION)
    private readonly users: Model<UserDocument>
  ) {}

  async handle(event: UserRoleWasAdded) {
    this.users
      .findByIdAndUpdate(event.aggregateId, {
        $push: { roles: event.role },
      })
      .exec();
  }
}
