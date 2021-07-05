import { StorableEvent } from 'event-sourcing-nestjs';

export class CategoryWasRenamed extends StorableEvent {
    eventAggregate = 'category';
    eventVersion = 1;

    constructor(
        public readonly id: string,
        public readonly name: string
    ) {
        super();
    }
}