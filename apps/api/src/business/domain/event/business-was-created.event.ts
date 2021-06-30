import { StorableEvent } from "event-sourcing-nestjs";

export class BusinessWasCreated extends StorableEvent {
    eventAggregate = 'business';
    eventVersion = 1;

    constructor(
        public readonly id: string,
        public readonly name: string,
        //public readonlu contactPhone: Phone,
    ) {
        super();
    }
}