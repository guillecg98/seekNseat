import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { UserDto } from '@seekNseat/contracts/user';

import { IUserFinder, USER_FINDER } from '../services';
import { GetUsersQuery } from './get-users.query';

@QueryHandler(GetUsersQuery)
export class GetUsersHandler implements IQueryHandler<GetUsersQuery> {
  constructor(
    @Inject(USER_FINDER)
    private readonly finder: IUserFinder
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async execute(query: GetUsersQuery): Promise<UserDto[]> {
    return this.finder.findAll();
  }
}
