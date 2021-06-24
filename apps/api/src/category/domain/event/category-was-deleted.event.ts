import { StorableEvent } from 'event-sourcing-nestjs';

export class CategoryWasDeleted extends StorableEvent {
    eventAggregate = 'category';
    eventVersion = 1;
    public readonly createdOn = new Date();

    constructor(public readonly id: string) {
        super();
    }
}