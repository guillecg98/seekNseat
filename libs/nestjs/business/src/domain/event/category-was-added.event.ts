import { Event } from '@aulasoftwarelibre/nestjs-eventstore';

import { CategoryWasUpdatedProps } from '../model';

export class CategoryWasAdded extends Event<CategoryWasUpdatedProps> {
  constructor(public readonly id: string, public readonly category: string) {
    super(id, { category });
  }
}
