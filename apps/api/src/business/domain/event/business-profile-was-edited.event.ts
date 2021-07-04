import { StorableEvent } from "event-sourcing-nestjs";

export class BusinessProfileWasEdited extends StorableEvent {
    eventAggregate = 'business';
    eventVersion = 1;

    constructor(
        public readonly id: string,
        public readonly name: string,
        public readonly contactPhone: string,
        public readonly address: string,
        public readonly description: string
    ) {
        super();
    }
}