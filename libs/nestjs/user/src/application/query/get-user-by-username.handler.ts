import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { UserDto } from '@seekNseat/contracts/user';

import { UsernameNotFoundError } from '../../domain';
import { Username } from '../../domain/model/username';
import { IUserFinder, USER_FINDER } from '../services';
import { GetUserByUsernameQuery } from './get-user-by-username.query';

@QueryHandler(GetUserByUsernameQuery)
export class GetUserByUsernameHandler
  implements IQueryHandler<GetUserByUsernameQuery>
{
  constructor(
    @Inject(USER_FINDER)
    private readonly finder: IUserFinder
  ) {}

  async execute(query: GetUserByUsernameQuery): Promise<UserDto> {
    const username = Username.fromString(query.username);

    const user = await this.finder.findOneByUsername(username);

    if (!user) {
      return;
    }

    return user;
  }
}
