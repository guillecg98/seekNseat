import { Event } from "@aulasoftwarelibre/nestjs-eventstore";
import { EditBusinessDTO } from "@seekNseat/contracts/business";

export class BusinessProfileWasEdited extends Event<EditBusinessDTO> {
    
    constructor(
        public readonly id: string,
        public readonly name: string,
        public readonly contactPhone: string,
        public readonly address: string,
        public readonly description: string
    ) {
        super(id, {name, contactPhone, address, description});
    }
}