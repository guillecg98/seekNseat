import { EventStoreModule } from '@aulasoftwarelibre/nestjs-eventstore';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';

import { commandHandlers, queryHandlers } from '../application';
import { eventTransformers, User } from '../domain';
import { UserController } from './controller';
import { projectionHandlers, USERS_PROJECTION, UserSchema } from './read-model';
import { UserService } from './services';
import { UserCli } from './user.cli';
import { userProviders } from './user.providers';

@Module({
  controllers: [UserController],
  imports: [
    CqrsModule,
    EventStoreModule.forFeature([User], eventTransformers),
    MongooseModule.forFeature([
      {
        name: USERS_PROJECTION,
        schema: UserSchema,
      },
    ]),
  ],
  providers: [
    ...userProviders,
    ...commandHandlers,
    ...queryHandlers,
    ...projectionHandlers,
    UserService,
    UserCli,
  ],
})
export class UserModule {}
