import { Event } from '@aulasoftwarelibre/nestjs-eventstore';

import { CategoryWasUpdatedProps } from '../model';

export class CategoryWasRemoved extends Event<CategoryWasUpdatedProps> {
  constructor(public readonly id: string, public readonly category: string) {
    super(id, { category });
  }
}
