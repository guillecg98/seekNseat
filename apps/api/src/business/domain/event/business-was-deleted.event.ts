import { StorableEvent } from "event-sourcing-nestjs";

export class BusinessWasDeleted extends StorableEvent {
    eventAggregate = 'business';
    eventVersion = 1;
    public readonly modifiedOn = new Date();

    constructor(
        public readonly id: string,
    ) {
        super();
    }
}