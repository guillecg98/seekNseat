import {
  AggregateRepository,
  IdNotFoundError,
  InjectAggregateRepository,
} from '@aulasoftwarelibre/nestjs-eventstore';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { User, UserId } from '../../domain';
import { NoShowUserCommand } from './no-show-user.command';

@CommandHandler(NoShowUserCommand)
export class NoShowUserHandler implements ICommandHandler<NoShowUserCommand> {
  constructor(
    @InjectAggregateRepository(User)
    private readonly users: AggregateRepository<User, UserId>
  ) {}

  async execute(command: NoShowUserCommand) {
    const userId = UserId.fromString(command.id);
    const user = await this.users.find(userId);

    if (!user) {
      throw IdNotFoundError.withId(userId);
    }
    user.markAsNoShow(command.noShow);
    this.users.save(user);
  }
}
