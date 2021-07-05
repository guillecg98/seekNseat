import { Injectable } from "@nestjs/common";
import { EventStore, StoreEventPublisher } from "event-sourcing-nestjs";

import { Category, CategoryId } from "../../domain";
import { Categories } from "../../domain/repository";


@Injectable()
export class CategoryRepository implements Categories {
    constructor(
        private publisher: StoreEventPublisher,
        private eventStore: EventStore,
    ) {}

    async find(id: CategoryId): Promise<Category | null> {
        const events = await this.eventStore.getEvents('category', id.value);
        if (events.length === 0) {
            return null;
        }

        const category: Category = Reflect.construct(Category, []);
        category.loadFromHistory(events);

        return category;
    }

    save(category: Category): void {
        category = this.publisher.mergeObjectContext(category);
        category.commit();
    }

}