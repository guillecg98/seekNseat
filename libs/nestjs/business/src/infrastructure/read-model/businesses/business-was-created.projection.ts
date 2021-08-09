import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { BusinessWasCreated } from '../../../domain';
import { BusinessDocument, BUSINESSES_PROJECTION } from './business.schema';

@EventsHandler(BusinessWasCreated)
export class BusinessWasCreatedProjection
  implements IEventHandler<BusinessWasCreated>
{
  constructor(
    @InjectModel(BUSINESSES_PROJECTION)
    private readonly businesses: Model<BusinessDocument>
  ) {}

  async handle(event: BusinessWasCreated) {
    const business = new this.businesses({
      ...event.payload,
      address: '',
      description: '',
      blocked: false,
      deleted: undefined,
    });

    business.save();
  }
}
