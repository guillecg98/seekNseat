import { Event } from '@aulasoftwarelibre/nestjs-eventstore';
import {
  BlockBusinessDTO,
  CreateBusinessDTO,
  EditBusinessDTO,
} from '@seekNseat/contracts/business';

import { BusinessProfileWasEdited } from './business-profile-was-edited.event';
import { BusinessWasBlocked } from './business-was-blocked.event';
import { BusinessWasCreated } from './business-was-created.event';
import { BusinessWasDeleted } from './business-was-deleted.event';

export * from './business-profile-was-edited.event';
export * from './business-was-blocked.event';
export * from './business-was-created.event';
export * from './business-was-deleted.event';

export const eventTransformers = {
  BusinessWasCreated: (event: Event<CreateBusinessDTO>) =>
    new BusinessWasCreated(
      event.aggregateId,
      event.payload.ownerId,
      event.payload.name,
      event.payload.contactPhone
    ),
  BusinessProfileWasEdited: (event: Event<EditBusinessDTO>) =>
    new BusinessProfileWasEdited(
      event.aggregateId,
      event.payload.name,
      event.payload.contactPhone,
      event.payload.address,
      event.payload.description
    ),
  BusinessWasBlocked: (event: Event<BlockBusinessDTO>) =>
    new BusinessWasBlocked(event.aggregateId, event.payload.blocked),
  BusinessWasDeleted: (event: Event) =>
    new BusinessWasDeleted(event.aggregateId),
};
