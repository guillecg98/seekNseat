import { StorableEvent } from 'event-sourcing-nestjs';

export class CategoryNameWasUpdated extends StorableEvent {
    eventAggregate = 'category';
    eventVersion = 1;

    constructor(
        public readonly id: string,
        public readonly name: string
    ) {
        super();
    }
}