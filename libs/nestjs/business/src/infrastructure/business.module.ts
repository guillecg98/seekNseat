import { EventStoreModule } from '@aulasoftwarelibre/nestjs-eventstore';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';

import { commandHandlers, queryHandlers } from '../application';
import { Business, eventTransformers } from '../domain';
import { businessProviders } from './business.providers';
import { BusinessController } from './controller/business.controller';
import {
  BUSINESSES_PROJECTION,
  businessProjections,
  BusinessSchema,
} from './read-model';
import { BusinessService } from './services';

@Module({
  controllers: [BusinessController],
  imports: [
    CqrsModule,
    EventStoreModule.forFeature([Business], eventTransformers),
    MongooseModule.forFeature([
      {
        name: BUSINESSES_PROJECTION,
        schema: BusinessSchema,
      },
    ]),
  ],
  providers: [
    ...businessProviders,
    ...commandHandlers,
    ...businessProjections,
    ...queryHandlers,
    BusinessService,
  ],
})
export class BusinessModule {}
