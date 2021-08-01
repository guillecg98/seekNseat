import {
  AggregateRepository,
  IdNotFoundError,
  InjectAggregateRepository,
} from '@aulasoftwarelibre/nestjs-eventstore';
import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { Password, Role, User, UserId } from '../../domain';
import {
  IUserFinder,
  IUserSecurity,
  USER_FINDER,
  USER_SECURITY,
} from '../services';
import { UpdateUserCommand } from './update-user.command';

@CommandHandler(UpdateUserCommand)
export class UpdateUserHandler implements ICommandHandler<UpdateUserCommand> {
  constructor(
    @InjectAggregateRepository(User)
    private readonly users: AggregateRepository<User, UserId>,
    @Inject(USER_FINDER)
    private readonly finder: IUserFinder,
    @Inject(USER_SECURITY)
    private readonly userSecurity: IUserSecurity
  ) {}

  async execute(command: UpdateUserCommand) {
    const userId = UserId.fromString(command.userId);

    const user = await this.users.find(userId);

    if (!user || user.deleted) {
      throw IdNotFoundError.withId(userId);
    }

    await this.updatePassword(user, command);
    this.updateRoles(user, command);

    this.users.save(user);
  }


  private async updatePassword(user: User, command: UpdateUserCommand) {
    if (!command.password) {
      return;
    }

    const encodedPassword = await this.userSecurity.encodePassword(
      command.password
    );

    user.updatePassword(Password.fromString(encodedPassword));
  }

  private updateRoles(user: User, command: UpdateUserCommand) {
    if (command.roles === undefined) {
      return;
    }

    user.roles.map(
      (role) => !command.roles.includes(role.value) && user.removeRole(role)
    );

    command.roles.map((role) => user.addRole(Role.fromString(role)));
  }
}
