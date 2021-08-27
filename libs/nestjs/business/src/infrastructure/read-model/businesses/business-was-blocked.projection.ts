import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { BusinessWasBlocked } from '../../../domain';
import { BusinessDocument, BUSINESSES_PROJECTION } from './business.schema';

@EventsHandler(BusinessWasBlocked)
export class BusinessWasBlockedProjection
  implements IEventHandler<BusinessWasBlocked>
{
  constructor(
    @InjectModel(BUSINESSES_PROJECTION)
    private readonly businesses: Model<BusinessDocument>
  ) {}

  async handle(event: BusinessWasBlocked) {
    await this.businesses
      .findByIdAndUpdate(event.aggregateId, {
        blocked: event.blocked,
      })
      .exec();
  }
}
