  import {
  ExecutionContext,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { AuthGuard } from '@nestjs/passport';
import { Role } from '@seekNseat/contracts/auth';

import { GetBusinessQuery } from '../../application';
import { BusinessDocument } from '../read-model';

@Injectable()
export class BusinessGuard extends AuthGuard('jwt') {
  private readonly logger = new Logger(BusinessGuard.name);

  constructor(private readonly queryBus: QueryBus) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();

    const { id } = req?.params;

    if (id) {
      req.business = await this.queryBus.execute(new GetBusinessQuery(id));
    }
    return super.canActivate(context) as boolean;
  }

  handleRequest(err, user, info, context: ExecutionContext) {
    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    const business: BusinessDocument = context
      .switchToHttp()
      .getRequest()?.business;

    if (business && business.ownerId === user._id) {
      user?.roles.push(Role.BusinessOwner)
    }

    return user;
  }
}
