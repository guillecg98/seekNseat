import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CategoryWasRemoved } from '../../../domain';
import { BusinessDocument, BUSINESSES_PROJECTION } from './business.schema';

@EventsHandler(CategoryWasRemoved)
export class CategoryWasRemovedProjection
  implements IEventHandler<CategoryWasRemoved>
{
  constructor(
    @InjectModel(BUSINESSES_PROJECTION)
    private readonly businesses: Model<BusinessDocument>
  ) {}

  async handle(event: CategoryWasRemoved) {
    this.businesses
      .findByIdAndUpdate(event.aggregateId, {
        $pull: { categories: event.category },
      })
      .exec();
  }
}
