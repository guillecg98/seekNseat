import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { UserPasswordWasUpdated } from '../../../domain';
import { UserDocument, USERS_PROJECTION } from './user.schema';

@EventsHandler(UserPasswordWasUpdated)
export class UserPasswordWasUpdatedProjection
  implements IEventHandler<UserPasswordWasUpdated>
{
  constructor(
    @InjectModel(USERS_PROJECTION)
    private readonly users: Model<UserDocument>
  ) {}

  async handle(event: UserPasswordWasUpdated) {
    this.users
      .findByIdAndUpdate(event.aggregateId, {
        password: event.password,
      })
      .exec();
  }
}
