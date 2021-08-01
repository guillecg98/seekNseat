import { IdNotFoundError } from '@aulasoftwarelibre/nestjs-eventstore';
import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { UserDto } from '@seekNseat/contracts/user';

import { UserId } from '../../domain';
import { IUserFinder, USER_FINDER } from '../services';
import { GetUserQuery } from './get-user.query';

@QueryHandler(GetUserQuery)
export class GetUserHandler implements IQueryHandler<GetUserQuery> {
  constructor(
    @Inject(USER_FINDER)
    private readonly finder: IUserFinder
  ) {}

  async execute(query: GetUserQuery): Promise<UserDto> {
    const userId = UserId.fromString(query.id);

    const user = await this.finder.find(userId);

    if (!user) {
      throw IdNotFoundError.withId(userId);
    }

    return user;
  }
}
