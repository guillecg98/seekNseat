import {
  ExecutionContext,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { AuthGuard } from '@nestjs/passport';
import { Role } from '@seekNseat/contracts';

import { GetBookingQuery } from '../../application';
import { BookingDocument } from '../read-model';

@Injectable()
export class BookingGuard extends AuthGuard('jwt') {
  private readonly logger = new Logger(BookingGuard.name);

  constructor(private readonly queryBus: QueryBus) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();

    const { id } = req?.params;

    if (id) {
      req.booking = await this.queryBus.execute(new GetBookingQuery(id));
    }
    return super.canActivate(context) as boolean;
  }

  handleRequest(err, user, info, context: ExecutionContext) {
    if (err || !user) {
      throw err || new UnauthorizedException();
    }

    const booking: BookingDocument = context
      .switchToHttp()
      .getRequest()?.booking;

    if (booking && booking.userId.includes(user.id)) {
      user?.roles.push(Role.User)
    }

    if (booking && booking.businessId.includes(user.id)) {
      user?.roles.push(Role.BusinessOwner)
    }

    return user;
  }
}
