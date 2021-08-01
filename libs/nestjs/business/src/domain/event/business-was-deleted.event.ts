import { Event } from "@aulasoftwarelibre/nestjs-eventstore";

export class BusinessWasDeleted extends Event {
    constructor(
        public readonly id: string,
    ) {
        super(id);
    }
}