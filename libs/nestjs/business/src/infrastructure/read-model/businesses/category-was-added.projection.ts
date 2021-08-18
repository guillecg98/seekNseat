import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CategoryWasAdded } from '../../../domain';
import { BusinessDocument, BUSINESSES_PROJECTION } from './business.schema';

@EventsHandler(CategoryWasAdded)
export class CategoryWasAddedProjection
  implements IEventHandler<CategoryWasAdded>
{
  constructor(
    @InjectModel(BUSINESSES_PROJECTION)
    private readonly businesses: Model<BusinessDocument>
  ) {}

  async handle(event: CategoryWasAdded) {
    this.businesses
      .findByIdAndUpdate(event.aggregateId, {
        $push: { categories: event.category },
      })
      .exec();
  }
}
