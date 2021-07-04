import { Injectable } from "@nestjs/common";
import { EventStore, StoreEventPublisher } from "event-sourcing-nestjs";

import { Business, Businesses, BusinessId } from "../../domain";

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

    async find(businessId: BusinessId): Promise <Business | null> {
        const events = await this.eventStore.getEvents('business', businessId.value);
        if(events.length === 0) {
            return null;
        }

        const business: Business = Reflect.construct(Business, []);
        business.loadFromHistory(events);

        return business;
    }
}