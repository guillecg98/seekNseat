import { Event } from "@aulasoftwarelibre/nestjs-eventstore";
import { CreateBusinessDTO } from "@seekNseat/contracts/business";

export class BusinessWasCreated extends Event<CreateBusinessDTO> {

    constructor(
        public readonly id: string,
        public readonly ownerId: string,
        public readonly name: string,
        public readonly contactPhone: string,
    ) {
        super(id, {_id: id, ownerId, name, contactPhone});
    }
}