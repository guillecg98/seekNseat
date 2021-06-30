import { Injectable } from "@nestjs/common";
import { EventStore, StoreEventPublisher } from "event-sourcing-nestjs";

import { Business, Businesses } from "../../domain";

@Injectable()
export class BusinessRepository implements Businesses {
    constructor(
        private publisher: StoreEventPublisher,
        private eventStore: EventStore,
    ) {}

    save(business: Business): void {
        business = this.publisher.mergeObjectContext(business);
        business.commit()
    }
}